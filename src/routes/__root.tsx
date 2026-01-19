import { BLIND_DISABILITY } from '@/data/const/disability'
import { useAuthStore } from '@/data/store/auth_store'
import { useVoiceStore } from '@/data/store/voice_store'
import { useVoiceAssistant } from '@/hooks/use-voice-assistant'
import { Outlet, createRootRoute, useRouter } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
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
    const { setIsActive, isActive, lastTranscript, speak } = useVoiceStore()
    const { disability, firstRender, isAuthenticated, login, logout, setFirstRender, role } = useAuthStore()
    
    const [isOpenDisabilityModal, setIsOpenDisabilityModal] = useState(false)

    const router = useRouter()
    
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
    }])
    
    useEffect(() => {
      if(role !== ROLE_TEACHER && !isActive && isFirst) {
        setIsFirst(false)
        speak('silahkan ketuk layar terlebih dahulu untuk memulai fitur asisten suara')
      }
    }, [role, isActive, isFirst])

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
      if(isAuthenticated && disability === null && role === ROLE_STUDENT) setIsOpenDisabilityModal(true)
    }, [isAuthenticated, disability])

    if(firstRender) return <LoadingPage />
    return (
      <>
        <DisabilityCheckModal isOpen={isOpenDisabilityModal} setIsOpen={setIsOpenDisabilityModal} />
        <Outlet />
        <Toaster richColors position="top-right" />

        {role !== ROLE_TEACHER && !isActive && <button className='fixed left-0 right-0 bottom-0 top-0 opacity-0 z-9999' onClick={startAssistant}></button>}

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
