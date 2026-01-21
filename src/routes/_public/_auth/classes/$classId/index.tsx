import { Link, createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import PublicHeaderGap from '@/layout/PublicHeaderGap'
import { TimelinePane } from './-panes/TimelinePane'
import { AssignmentsPane } from './-panes/AssignmentsPane'
import { PeoplePane } from './-panes/PeoplePane'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  CheckCircle, 
  Palette, 
  Code, 
  Folder, 
  Lock, 
  HelpCircle, 
  ArrowLeft 
} from 'lucide-react'
import { COURSE } from '@/data/const/api_path'
import { useQueryData } from '@/hooks/api/use-global-fetch'
import type { ApiResponseType } from '@/data/types/api_response_types'
import type { StudentCourseDetail } from '@/data/types/course_type'
import { useRegisterCommands } from '@/hooks/use-register-command'
import { useVoiceStore } from '@/data/store/voice_store'

export const Route = createFileRoute('/_public/_auth/classes/$classId/')({
  component: RouteComponent,
})

function RouteComponent() {
  const panelList = {
    materials: 'materi',
    assignments: 'tugas',
    people: 'anggota'
  } as const

  const [activeTab, setActiveTab] = useState("materials")
  const { classId } = Route.useParams()
  const { data } = useQueryData<ApiResponseType<'single', StudentCourseDetail>>(COURSE.STUDENT_DETAIL, { course_id: classId })
  const course = data?.data
  const speak = useVoiceStore(state => state.speak)

  const totalMaterials = course?.modules?.reduce((acc, m) => acc + m.materials.length, 0) || 0
  const completedMaterials = course?.modules?.reduce((acc, m) => acc + m.materials.filter(mat => mat.is_completed).length, 0) || 0
  const progress = totalMaterials > 0 ? (completedMaterials / totalMaterials) * 100 : 0

  useRegisterCommands([
    {
      pattern: /(?:buka|pindah|lihat|ke)\s+(?:panel|tab|bagian)\s*(.+)/i, 
      description: "buka panel [nama panel] adalah untuk berpindah ke panel lain",
      priority: 9,
      action: ([target]) => {
        const t = target.toLowerCase().trim()
        
        // Cari key berdasarkan value (bahasa indonesia) atau key itu sendiri
        const foundKey = Object.keys(panelList).find(key => {
            const value = panelList[key as keyof typeof panelList]
            return value === t || key === t || (t.includes(value))
        })

        if (foundKey) {
            setActiveTab(foundKey)
            speak(`Membuka panel ${panelList[foundKey as keyof typeof panelList]}`)
        } else {
            speak(`Panel ${t} tidak ditemukan. Panel yang tersedia: materi, tugas, dan anggota.`)
        }
      }
    },
    {
      pattern: /(?:baca|sebutkan)+(?:progres|kemajuan)/i,
      description: "baca [progres/kemajuan] adalah untuk mengetahui progres kelas saat ini",
      action: () => {
        speak(`Progres kelas anda saat ini adalah ${Math.round(progress)} persen`)
      }
    }
  ])

  useEffect(() => {
    if(course?.title) {
        speak(`Anda berada di kelas ${course.title}. Terdapat 3 panel: materi, tugas, dan anggota. Katakan 'buka materi' atau lainnya untuk berpindah.`)
    }
  }, [course?.title])

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-[#18181b] text-slate-800 dark:text-slate-100 font-sans">
      <PublicHeaderGap />
      
      <div className="flex flex-1 overflow-hidden">
        
        <aside className="w-72 h-full flex-col border-r border-slate-100 dark:border-zinc-800 bg-[#F8F8F8] dark:bg-zinc-900/50 shrink-0 z-20 hidden md:flex">
          <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            <p className="px-3 font-bold text-slate-400 mb-2">Modul Kelas</p>
            {course?.modules?.map((module) => (
               <button key={module.id} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:bg-white hover:shadow-sm dark:hover:bg-zinc-800 dark:text-slate-400 transition-all group cursor-pointer">
                  <Folder className="w-4 h-4 text-slate-400" />
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{module.title}</span>
                  </div>
               </button>
            ))}
          </div>
        </aside>

        <main className="flex-1 h-full overflow-y-auto bg-white dark:bg-[#18181b] relative">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="bg-white/90 dark:bg-[#18181b]/90 backdrop-blur-md border-b border-slate-100 dark:border-zinc-800 px-6 md:px-8 pt-4 pb-0">
              <div className="max-w-5xl mx-auto w-full">
                <div className="flex flex-col gap-4">
                  <Link 
                    to="/classes" 
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-[#2280c3] transition-colors w-fit group"
                  >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Kembali
                  </Link>
                  
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                      <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{course?.title || '-'}</h1>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{course?.description}</p>
                    </div>
                    <div className="w-full md:w-64 flex flex-col gap-1.5">
                      <div className="flex justify-between items-end">
                        <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Progres Keseluruhan</span>
                        <span className="text-sm font-bold text-[#2280c3]">{Math.round(progress)}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-[#2280c3] rounded-full" style={{ width: `${progress}%` }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Tabs */}
                  <div className="mt-8 bg-white/90 dark:bg-[#18181b]/90 backdrop-blur-md border-b border-slate-100 dark:border-zinc-800">
                    <TabsList className="flex w-full border-b border-slate-200 dark:border-zinc-800 bg-transparent p-0">
                       <TabsTrigger
                        value="materials" 
                        className="cursor-pointer pb-3 px-4 text-sm font-medium rounded-none shadow-none bg-transparent border-0 border-b-2 border-transparent data-[state=active]:border-[#2280c3] data-[state=active]:text-[#2280c3] data-[state=active]:bg-transparent data-[state=active]:shadow-none text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 transition-all focus-visible:ring-0 focus-visible:ring-offset-0"
                      >
                        Materi
                      </TabsTrigger>
                      <TabsTrigger 
                        value="assignments" 
                        className="cursor-pointer pb-3 px-4 text-sm font-medium rounded-none shadow-none bg-transparent border-0 border-b-2 border-transparent data-[state=active]:border-[#2280c3] data-[state=active]:text-[#2280c3] data-[state=active]:bg-transparent data-[state=active]:shadow-none text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 transition-all focus-visible:ring-0 focus-visible:ring-offset-0 flex items-center gap-2"
                      >
                        Tugas
                      </TabsTrigger>
                      <TabsTrigger 
                        value="people" 
                        className="cursor-pointer pb-3 px-4 text-sm font-medium rounded-none shadow-none bg-transparent border-0 border-b-2 border-transparent data-[state=active]:border-[#2280c3] data-[state=active]:text-[#2280c3] data-[state=active]:bg-transparent data-[state=active]:shadow-none text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 transition-all focus-visible:ring-0 focus-visible:ring-offset-0"
                      >
                        Anggota
                      </TabsTrigger>
                    </TabsList>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 md:px-8 py-8">
              <div className="max-w-5xl mx-auto w-full">
                <TabsContent value="materials" className="mt-0">
                  <TimelinePane data={course} />
                </TabsContent>
                <TabsContent value="assignments" className="mt-0">
                  <AssignmentsPane />
                </TabsContent>
                <TabsContent value="people" className="mt-0">
                  <PeoplePane />
                </TabsContent>
              </div>
            </div>
          </Tabs>
          <div className="h-20"></div>
        </main>
      </div>
    </div>
  )
}
