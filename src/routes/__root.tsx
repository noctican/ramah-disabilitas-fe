import { BLIND_DISABILITY } from '@/data/const/disability'
import { useAuthStore } from '@/data/store/auth_store'
import { useVoiceStore } from '@/data/store/voice_store'
import { useVoiceAssistant } from '@/hooks/use-voice-assistant'
import { Outlet, createRootRoute, useNavigate, useRouter } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { Toaster } from 'sonner'
import { DisabilityCheckModal } from './-components/DisabilityCheckModal'
import { getToken } from '@/lib/token-handler'
import { apiClient } from '@/lib/api-client'
import { AUTH } from '@/data/const/api_path'
import { LoadingPage } from '@/components/custom/LoadingPage'
import { useRegisterCommands } from '@/hooks/use-register-command'
import { ROLE_STUDENT, ROLE_TEACHER } from '@/data/enums/roles'


export const Route = createRootRoute({
  component: () => {
    const [isFirst, setIsFirst] = useState(true)
    const { setIsActive, isActive, lastTranscript, speak, isSystemSpeaking, stopSpeaking } = useVoiceStore()
    const { disability, firstRender, isAuthenticated, login, logout, setFirstRender, role } = useAuthStore()
    const navigate = useNavigate()
    
    // const [isOpenDisabilityModal, setIsOpenDisabilityModal] = useState(false)

    const router = useRouter()
    const startBtnRef = useRef<HTMLButtonElement>(null)

    const authRef = useRef({isAuthenticated, role})

    useEffect(() => {
      authRef.current = {isAuthenticated, role}
    }, [isAuthenticated, role])
    
    const startAssistant = () => {
      setIsActive(true)
      speak('microfon aktif. katakan "bantuan" untuk melihat daftar perintah')
    }

    useVoiceAssistant()

    useRegisterCommands([{
      pattern: /^kembali/i,
      description: "kembali... adalah untuk kembali ke halaman sebelumnya.",
      action: () => {
        router.history.back()
      }
    },{
      pattern: /^(?:buka|ke)\s+(.+)$/i,
      description: "buka... adalah untuk membuka halaman yang diminta. contoh: buka beranda, login, daftar, kelas, atau tugas",
      action: ([match]) => {
        const page = match.toLowerCase().trim()
        if(page === "beranda" || page === "home") {
          speak("Membuka halaman beranda");
          navigate({ to: '/' });
        } else if(page === "login" || page === "masuk") {
          if(authRef.current.isAuthenticated) return speak("Anda sudah login");
          speak("Membuka halaman login");
          navigate({ to: '/login' });
        } else if(page === "register" || page === "daftar") {
          if(authRef.current.isAuthenticated) return speak("Anda sudah login");
          speak("Membuka halaman daftar");
          navigate({ to: '/register' });
        } else if(page === "kelas") {
          if(!authRef.current.isAuthenticated || authRef.current.role !== ROLE_STUDENT) return speak("Anda harus login sebagai siswa terlebih dahulu");
          speak("Membuka halaman kelas");
          navigate({ to: '/classes' });
        } else if(page === "tugas") {
          if(!authRef.current.isAuthenticated || authRef.current.role !== ROLE_STUDENT) return speak("Anda harus login sebagai siswa terlebih dahulu");
          speak("Membuka halaman tugas");
          navigate({ to: '/assignments' });
        } else if(page === "dashboard") {
          if(!authRef.current.isAuthenticated || authRef.current.role !== ROLE_TEACHER) return speak("Anda harus login sebagai guru terlebih dahulu");
          speak("Membuka halaman dashboard");
          navigate({ to: '/teacher' });
        } else {
          speak("Halaman tidak ditemukan");
        }
      }
    }])

    useEffect(() => {
      if (isFirst && !isActive && role !== ROLE_TEACHER) {
        const timer = setTimeout(() => {startBtnRef.current?.focus() }, 500)
        return () => clearTimeout(timer)
      }
    }, [isFirst, isActive, role])
    
    useEffect(() => {
      if(role !== ROLE_TEACHER && !isActive && isFirst) {
        setIsFirst(false)
        speak('silahkan ketuk layar terlebih dahulu untuk memulai fitur asisten suara')
      }
    }, [role, isActive, isFirst])

    useEffect(() => {
      const handleInterruption = () => {
        if (isSystemSpeaking) {
          console.log("Interupsi User: Mematikan suara sistem, menyalakan mic...");
          stopSpeaking();
        }
      };

      // window.addEventListener('click', handleInterruption);
      window.addEventListener('touchstart', handleInterruption);
      window.addEventListener('keydown', function(e) {
        if(e.key === "j" || e.key === 'J') handleInterruption()
      });
    
    console.log({isSystemSpeaking})
    
    return () => {
        window.removeEventListener('keydown', function(e) {
          if(e.key === "j" || e.key === 'J') handleInterruption()
        });
        window.removeEventListener('touchstart', handleInterruption);
      };
    }, [isSystemSpeaking, stopSpeaking]);

    useEffect(() => {
      const getCurrentUser = async () => {
        const token = getToken()
        
        if (!isAuthenticated) {
          if (token) {
            try {
              const userData = await apiClient.get(AUTH.ME)
              login(userData.data)
              return 
            } catch (error) {
              console.error("Session timeout", error)
            }
          }
          
          logout()
        }

        setFirstRender(false)
      }
      if(firstRender) getCurrentUser()
    }, [firstRender, isAuthenticated])

    useEffect(() => {
      if(isActive && !firstRender) speak('katakan "bantuan" untuk melihat daftar perintah')
    }, [isAuthenticated, firstRender, isActive])

    // useEffect(() => {
    //   if(isAuthenticated && disability === null && role === ROLE_STUDENT) setIsOpenDisabilityModal(true)
    // }, [isAuthenticated, disability])

    if(firstRender) return <LoadingPage />
    return (
      <>
        {/* <DisabilityCheckModal isOpen={isOpenDisabilityModal} setIsOpen={setIsOpenDisabilityModal} /> */}
        <Outlet />
        <Toaster richColors position="top-right" />

        {role !== ROLE_TEACHER && !isActive && <button ref={startBtnRef} aria-label="Selamat datang. Ketuk layar dua kali di mana saja untuk mengaktifkan asisten suara." className='fixed left-0 right-0 bottom-0 top-0 opacity-0 z-9999' onClick={startAssistant}></button>}

        {role !== ROLE_TEACHER &&
          <div className='fixed left-0 right-0 bottom-0 z-999'>
            <div className={`p-4 text-white flex justify-between items-center ${isActive ? 'bg-lime-500' : 'bg-yellow-500'}`}>
              <div>
                Status: <strong>{isActive ? 'Mendengarkan...' : 'Nonaktif (Klik layar)'}</strong>
                <br/>
                <span className="text-sm opacity-80">Mendengar: "{lastTranscript}"</span>
              </div>
            </div>
          </div>
        }
        {role !== ROLE_TEACHER &&
          <div className={`p-4 text-white flex justify-between items-center opacity-0 ${isActive ? 'bg-lime-500' : 'bg-yellow-500'}`}>
            <div>
              Status: <strong>{isActive ? 'Mendengarkan...' : 'Nonaktif (Klik layar)'}</strong>
              <br/>
              <span className="text-sm opacity-80">Mendengar: "{lastTranscript}"</span>
            </div>
          </div>
        }
      </>
    )
  },
})
