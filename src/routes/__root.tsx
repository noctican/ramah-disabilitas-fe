import { HEARING_DISABILITY } from '@/data/const/disability'
import { useAuthStore } from '@/data/store/auth_store'
import { useVoiceStore } from '@/data/store/voice_store'
import { useVoiceAssistant } from '@/hooks/use-voice-assistant'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Toaster } from 'sonner'
import { DisabilityCheckModal } from './-components/DisabilityCheckModal'
import { getToken } from '@/lib/token-handler'
import { apiClient } from '@/lib/api-client'
import { AUTH } from '@/data/const/api_path'
import { LoadingPage } from '@/components/custom/LoadingPage'


export const Route = createRootRoute({
  component: () => {
    useVoiceAssistant()
    const [isFirst, setIsFirst] = useState(true)
    const { setIsActive, isActive, lastTranscript, speak } = useVoiceStore()
    const { disability, firstRender, isAuthenticated, login, logout, setFirstRender } = useAuthStore()

    const [isOpenDisabilityModal, setIsOpenDisabilityModal] = useState(false)

    const startAssistant = () => {
      setIsActive(true)
      speak('microfon aktif')
    }
  
    useEffect(() => {
      if(disability?.some(d => d == HEARING_DISABILITY) && !isActive && isFirst) {
        setIsFirst(false)
        speak('silahkan ketuk layar terlebih dahulu untuk memulai fitur asisten suara')
      }
    }, [disability, isActive, isFirst])

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

    if(firstRender) return <LoadingPage />
    return (
      <>
        <DisabilityCheckModal isOpen={isOpenDisabilityModal} setIsOpen={setIsOpenDisabilityModal} />
        <Outlet />
        <Toaster richColors position="top-right" />

        {disability?.some(d => d == HEARING_DISABILITY) && !isActive && <button className='absolute left-0 right-0 bottom-0 top-0 opacity-0 z-9999' onClick={startAssistant}></button>}

        {disability?.some(d => d == HEARING_DISABILITY) &&
          <div className='absolute left-0 right-0 bottom-0 z-10'>
            <div className={`p-4 text-white flex justify-between items-center ${isActive ? 'bg-lime-500' : 'bg-yellow-500'}`}>
              <div>
                Status: <strong>{isActive ? 'Mendengarkan...' : 'Nonaktif (Klik Start)'}</strong>
                <br/>
                <span className="text-sm opacity-80">Mendengar: "{lastTranscript}"</span>
              </div>
            </div>
          </div>
        }
      </>
    )
  },
})
