import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import PublicHeaderGap from '@/layout/PublicHeaderGap'
import { 
  Plus, 
  School, 
  Calculator, 
  History, 
  ArrowRight, 
  Lightbulb, 
  Check,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { JoinClassDialog } from './-component/JoinClassDialog'
import { useQueryData } from '@/hooks/api/use-global-fetch'
import { COURSE } from '@/data/const/api_path'
import type { ApiResponseType } from '@/data/types/api_response_types'
import { ClassCard } from './-component/ClassCard'
import type { JoinedCourse } from '@/data/types/course_type'
import { TaskCard } from './-component/TaskCard'
import { ASSIGNMENT } from '@/data/const/api_path'
import type { AssignmentType } from '@/data/types/assignment_type'
import { useRegisterCommands } from '@/hooks/use-register-command'
import { useVoiceStore } from '@/data/store/voice_store'
import { useAuthStore } from '@/data/store/auth_store'
import { Button } from '@/components/ui/button'
import { SLOW_LEARNER } from '@/data/const/disability'

export const Route = createFileRoute('/_public/_auth/classes/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false)
  
  const { data } = useQueryData<ApiResponseType<'multiple', JoinedCourse>>(COURSE.JOINED)
  const { data: assignmentsData } = useQueryData<ApiResponseType<'multiple', AssignmentType>>(ASSIGNMENT.MY_ASSIGNMENTS, { filter: 'upcoming' })
  const speak = useVoiceStore(state => state.speak)
  const { user, hasDisability } = useAuthStore()
  const navigate = useNavigate()
  const classesRef = useRef(data?.data)
  const assignmentsRef = useRef(assignmentsData?.data)

  useEffect(() => {
    classesRef.current = data?.data
  }, [data])

  useEffect(() => {
    assignmentsRef.current = assignmentsData?.data
  }, [assignmentsData])

  useRegisterCommands([
    // {
    //   pattern:  /^gabung kelas$/i,
    //   description: 'gabung kelas... adalah untuk bergabung dengan kelas baru',
    //   action: () => setIsJoinDialogOpen(true)
    // },
    {
      pattern: /^daftar\s+(.+)$/i, 
      description: "daftar... adalah untuk membacakan daftar yang ada. Nama daftar dapat berupa: kelas, tugas.",
      action: ([target]) => {
        const jenis = target.toLowerCase().trim()
        if (jenis.includes('kelas') || jenis.includes('course') || jenis.includes('pelajaran')) {
          const classes = classesRef?.current || []
          let mustSpoke = ''

          if (classes.length === 0) {
            mustSpoke = "Anda belum bergabung dengan kelas manapun."
          }
          mustSpoke = `Anda memiliki ${classes.length} kelas.`
        
          const classNames = classes.map((c, i) => `Kelas ke-${i+1}: ${c.title}`).join('. ')
          mustSpoke += `Yaitu: ${classNames}`
          speak(mustSpoke)
        } 
        
        else if (jenis.includes('tugas') || jenis.includes('assignment') || jenis.includes('pr')) {
          const tasks = assignmentsRef?.current || []
          let mustSpoke = ''
          if (tasks.length === 0) {
            mustSpoke = "Tidak ada tugas aktif yang harus dikumpulkan."
          }
          mustSpoke = `Ada ${tasks.length} tugas aktif.`
          
          const taskTitles = tasks.map((t, i) => `Tugas ${i+1}: ${t.title}`).join('. ')
          mustSpoke += `yaitu: ${taskTitles}`
          speak(mustSpoke)
        } 
        
        else {
          speak(`Maaf, saya tidak bisa membacakan daftar ${jenis}. Coba katakan 'Daftar kelas' atau 'Daftar tugas'.`)
        }
      }
    },
    {
      pattern: /^(?:buka|lihat|ke) kelas\s+(.+)$/i,
      priority: 10,
      description: "buka kelas... adalah untuk masuk ke kelas yang sudah ada. perintah diikuti oleh nama kelas",
      action: ([target]) => {
        const className = target.toLowerCase().trim()
        const classData = classesRef?.current?.find(c => c.title.toLowerCase().replace(/[^a-z0-9]/g, '') === className.replace(/[^a-z0-9]/g, ''))
        if (!classData) {
          speak(`Kelas ${className} tidak ditemukan.`)
          return
        }
        navigate({to: "/classes/$classId", params: { classId: String(classData.id) } })
      }
    },
    {
      pattern: /^(?:buka|lihat|ke) tugas\s+(.+)$/i,
      priority: 10,
      description: "buka tugas... adalah untuk masuk ke tugas yang sudah ada. perintah diikuti oleh nama tugas",
      action: ([target]) => {
        const taskName = target.toLowerCase().trim()
        const taskData = assignmentsRef?.current?.find(c => c.title.toLowerCase().replace(/[^a-z0-9]/g, '') === taskName.replace(/[^a-z0-9]/g, ''))
        if (!taskData) {
          speak(`Tugas ${taskName} tidak ditemukan.`)
          return
        }
        navigate({to: "/assignments/$assignmentId", params: { assignmentId: String(taskData.id) } })
      }
    },
  ])

  return (
    <>
      <JoinClassDialog isOpen={isJoinDialogOpen} setIsOpen={setIsJoinDialogOpen} />
      <PublicHeaderGap />

      <div className="container mx-auto  px-4 mb-8 space-y-8">
        
        <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-gray-900 dark:text-white text-3xl font-black leading-tight tracking-[-0.03em]">Selamat belajar, {user.name}! 👋</h2>
            {!hasDisability(SLOW_LEARNER) &&<p className="text-gray-600 dark:text-gray-400 text-base font-normal">Anda memiliki <span className="font-bold text-primary">3 tugas</span> yang harus dikumpulkan minggu ini.</p>}
          </div>
          {/* <button 
            onClick={() => setIsJoinDialogOpen(true)}
            className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-300 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-[0_4px_10px_rgba(45,106,118,0.3)] hover:shadow-[0_6px_15px_rgba(45,106,118,0.4)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            <span>Gabung Kelas</span>
          </button> */}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-6">
              <h3 className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">Kelas Saya</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data?.data?.map((course) => (
                <ClassCard key={course.id} data={course} />
              ))}
              {/* {!hasDisability(SLOW_LEARNER) &&
                <div 
                    onClick={() => setIsJoinDialogOpen(true)}
                    className="bg-gray-100 dark:bg-white/5 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 p-4 flex flex-col items-center justify-center min-h-[250px] group cursor-pointer hover:border-primary/50 transition-colors"
                >
                  <div className="bg-white dark:bg-white/10 p-4 rounded-full mb-3 group-hover:scale-110 transition-transform">
                    <Plus className="text-gray-400 w-8 h-8" />
                  </div>
                  <p className="text-gray-900 dark:text-white font-bold text-base">Bergabung dengan Kelas</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm text-center px-4 mt-1">Cari kelas baru untuk bergabung.</p>
                </div>
              } */}
              {!data?.data?.length &&
                <div 
                    className="col-span-2 bg-gray-100 dark:bg-white/5 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 p-4 flex flex-col items-center justify-center min-h-[250px] transition-colors"
                >
                  <div className="bg-white dark:bg-white/10 p-4 rounded-full mb-3 transition-transform">
                    <X className="text-gray-400 w-8 h-8" />
                  </div>
                  <p className="text-gray-900 dark:text-white font-bold text-base">Belum Ada Kelas</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm text-center px-4 mt-1">Minta pengajar untuk menambahkan anda.</p>
                </div>
              }
            </div>
          </div>
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">Tugas Aktif Terbaru</h3>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
              <div className="flex flex-col gap-5">
                {assignmentsData?.data?.length === 0 ? (
                    <p className="text-center text-gray-500 text-sm py-4">Tidak ada tugas.</p>
                ) : (
                    assignmentsData?.data?.map((assignment, index) => (
                        <div key={assignment.id}>
                            <TaskCard data={assignment} />
                            {index < (assignmentsData.data!.length - 1) && <div className="h-px bg-gray-100 dark:bg-gray-700 w-full mt-5"></div>}
                        </div>
                    ))
                )}
              </div>
              <Button asChild variant="outline" className='w-full mt-5 text-gray-600'><Link to="/assignments">Lihat Semua Tugas</Link></Button>
            </div>

            <div className="bg-gradient-to-br from-primary to-primary-300 rounded-2xl p-6 text-white relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Lightbulb className="w-24 h-24 rotate-12" />
              </div>
              <div className="relative z-10">
                <div className="bg-white/20 w-fit p-2 rounded-lg mb-3">
                  <Lightbulb className="w-5 h-5 text-yellow-300" />
                </div>
                <h4 className="font-bold text-lg mb-1">Tips Belajar Hari Ini</h4>
                <p className="text-blue-50 text-sm leading-relaxed mb-4">Bagilah sesi belajar Anda menjadi sesi 25 menit dengan istirahat 5 menit untuk menjaga fokus.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
