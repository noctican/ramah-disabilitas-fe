import { HEARING_DISABILITY } from '@/data/const/disability'
import { useAuthStore } from '@/data/store/auth_store'
import { useVoiceStore } from '@/data/store/voice_store'
import { useVoiceAssistant } from '@/hooks/use-voice-assistant'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Toaster } from 'sonner'
// import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
// import { TanStackDevtools } from '@tanstack/react-devtools'


export const Route = createRootRoute({
  component: () => {
    useVoiceAssistant()
    const [isFirst, setIsFirst] = useState(true)
    const { setIsActive, isActive, isListening, lastTranscript, speak } = useVoiceStore()
    const { disability } = useAuthStore()

    const startAssistant = () => {
      setIsActive(true)
      speak('microfon aktif')
    }
  
    useEffect(() => {
      if(disability?.some(d => d == HEARING_DISABILITY) && !isActive && isFirst) {
        setIsFirst(false)
        speak('silahkan ketuk layar terlebih dahulu untuk memu')
      }
    }, [disability, isActive, isFirst])
    return (
      <>
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
        {/* <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        /> */}
      </>
    )
  },
})
