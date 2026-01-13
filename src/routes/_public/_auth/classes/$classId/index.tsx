import { Link, createFileRoute } from '@tanstack/react-router'
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

export const Route = createFileRoute('/_public/_auth/classes/$classId/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { classId } = Route.useParams()
  const { data } = useQueryData<ApiResponseType<'single', StudentCourseDetail>>(COURSE.STUDENT_DETAIL, { course_id: classId })
  const course = data?.data

  const totalMaterials = course?.modules?.reduce((acc, m) => acc + m.materials.length, 0) || 0
  const completedMaterials = course?.modules?.reduce((acc, m) => acc + m.materials.filter(mat => mat.is_completed).length, 0) || 0
  const progress = totalMaterials > 0 ? (completedMaterials / totalMaterials) * 100 : 0

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-[#18181b] text-slate-800 dark:text-slate-100 font-sans">
      <PublicHeaderGap />
      
      {/* Content Container (Sidebar + Main) */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Sidebar */}
        <aside className="w-72 h-full flex flex-col border-r border-slate-100 dark:border-zinc-800 bg-[#F8F8F8] dark:bg-zinc-900/50 flex-shrink-0 z-20 hidden md:flex">
          <div className="p-6 pb-4 border-b border-slate-100 dark:border-zinc-800/50">
            <div className="flex items-start gap-3 mb-3">
              <div 
                className="w-10 h-10 rounded-xl bg-cover bg-center shadow-sm flex-shrink-0" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCys9uc_SI6Ykm2IqM4qQhr-V6AjeCWT-RwSkvEqiwajRcUG-_z-jNsdNbLO4fdZ4a9WY-Ywf2vNHLahMdyqcfk2F9QRIhw3yI2Mr5r1xTOY91BoaeaO1qiity45p7OcgtPWCUL_yHLo2Lep3lS7ntqnNHW8xE3DV6EtgGIh-gHDTczmCfBgmKSjaOZhNUvaOP-ffEJNXECAsA374YM7bHp8tzgqyKdYA-HWNsdo5HwzWKx4H_cz17x02EQyHHORMdoESHaDhdWOjzX')" }}
              >
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white leading-tight mb-0.5">{course?.title || 'Loading...'}</h2>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Instructor: {course?.teacher_id}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-2.5 py-1 bg-[#2280c3]/10 rounded-lg w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2280c3] animate-pulse"></span>
              <span className="text-[10px] font-semibold text-[#2280c3]">In Progress</span>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Modul Kursus</p>
            {course?.modules?.map((module) => (
               <button key={module.id} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:bg-white hover:shadow-sm dark:hover:bg-zinc-800 dark:text-slate-400 transition-all group cursor-pointer">
                  <Folder className="w-4 h-4 text-slate-400" />
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{module.title}</span>
                  </div>
               </button>
            ))}
          </div>
          
          <div className="p-4 border-t border-slate-100 dark:border-zinc-800">
            <button className="flex items-center gap-2 w-full p-2 hover:bg-white dark:hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer">
              <HelpCircle className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Butuh Bantuan?</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 h-full overflow-y-auto bg-white dark:bg-[#18181b] relative">
          <Tabs defaultValue="materials" className="w-full">
            <div className="sticky top-0 z-10 bg-white/90 dark:bg-[#18181b]/90 backdrop-blur-md border-b border-slate-100 dark:border-zinc-800 px-6 md:px-8 pt-4 pb-0">
              <div className="max-w-5xl mx-auto w-full">
                <div className="flex flex-col gap-4">
                  <Link 
                    to="/classes" 
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-[#2280c3] transition-colors w-fit group"
                  >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Kembali ke Dasbor
                  </Link>
                  
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                      <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{course?.title || 'Memuat...'}</h1>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{course?.description || 'Memuat deskripsi kelas...'}</p>
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
                  <div className="mt-8">
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
                        <span className="flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 text-[10px] font-bold text-white bg-red-500 rounded-full shadow-sm">3</span>
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
