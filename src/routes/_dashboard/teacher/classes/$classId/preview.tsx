import { createFileRoute, Link } from '@tanstack/react-router'
import { getFetcher } from '@/lib/api-client'
import { COURSE } from '@/data/const/api_path'
import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { 
    ChevronLeft, 
    PlayCircle, 
    FileText, 
    CheckCircle, 
    Lock, 
    Menu,
    ChevronDown,
    ChevronRight,
    Loader2
} from 'lucide-react'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/_dashboard/teacher/classes/$classId/preview')({
  component: CoursePreviewPage,
})

function CoursePreviewPage() {
  const { classId } = Route.useParams()
  const [activeMaterialId, setActiveMaterialId] = useState<string | number | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // 1. Fetch Data (Reusing Existing API)
  const { data: courseData, isLoading } = useQuery({
      queryKey: ['lecturer-course', classId],
      queryFn: () => getFetcher(COURSE.DETAIL.replace('{course_id}', classId)),
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const course = (courseData as any)?.data
  
  // 2. Set Initial Active Material (First material of first module)
  useEffect(() => {
    if (course?.modules?.length > 0 && !activeMaterialId) {
        for (const module of course.modules) {
            if (module.materials?.length > 0) {
                setActiveMaterialId(module.materials[0].id)
                break
            }
        }
    }
  }, [course, activeMaterialId])

  // Helper to find current material object
  const activeMaterial = course?.modules
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ?.flatMap((m: any) => m.materials || [])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .find((mat: any) => mat.id === activeMaterialId)

  if (isLoading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-indigo-600" /></div>
  if (!course) return <div className="p-8 text-center bg-red-50 text-red-600 rounded-xl m-4">Gagal memuat kelas</div>

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] bg-white dark:bg-[#020617] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm relative">
        
        {/* Top Navigation Bar */}
        <div className="h-16 border-b border-gray-100 dark:border-gray-800 flex items-center px-4 bg-white dark:bg-[#0f172a] shrink-0 z-20">
            <Link to="/teacher/classes/$classId" params={{ classId }} className="mr-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                <ChevronLeft className="w-5 h-5 text-gray-500" />
            </Link>
            <h1 className="font-bold text-gray-900 dark:text-white line-clamp-1 flex-1">
                Preview: {course.title}
            </h1>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg lg:hidden">
                <Menu className="w-5 h-5" />
            </button>
        </div>

        <div className="flex flex-1 overflow-hidden relative">
            
            {/* MAIN CONTENT AREA */}
            <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-[#020617] p-4 lg:p-8 flex flex-col items-center">
                <div className="w-full max-w-4xl space-y-6">
                    
                    {/* Content Player / Viewer */}
                    <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg relative flex items-center justify-center group bg-slate-900 border border-slate-800">
                        {activeMaterial ? (
                            <div className="w-full h-full flex flex-col items-center justify-center">
                                {/* RENDER CONTENT BASED ON TYPE */}
                                
                                {/* 1. YOUTUBE / VIDEO */}
                                {(activeMaterial.type === 'youtube' || activeMaterial.type === 'video') && (
                                    <>
                                        {activeMaterial.source_url ? (
                                            <iframe 
                                                src={`https://www.youtube.com/embed/${getYoutubeId(activeMaterial.source_url)}?autoplay=1`}
                                                title={activeMaterial.title}
                                                className="w-full h-full"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                        ) : (
                                            <div className="text-center text-gray-500">
                                                <PlayCircle className="w-16 h-16 mb-4 opacity-50 mx-auto" />
                                                <p>URL Video tidak tersedia</p>
                                            </div>
                                        )}
                                    </>
                                )}

                                {/* 2. PDF / FILE */}
                                {activeMaterial.type === 'pdf' && (
                                    <>
                                        {activeMaterial.source_url ? (
                                           <iframe
                                                src={activeMaterial.source_url} // Browser uses built-in PDF viewer
                                                className="w-full h-full bg-white"
                                                title={activeMaterial.title}
                                           />
                                        ) : (
                                            <div className="text-center text-gray-400">
                                                <FileText className="w-16 h-16 mb-4 opacity-50 mx-auto" />
                                                <p>File PDF tidak dapat dimuat</p>
                                            </div>
                                        )}
                                    </>
                                )}

                                {/* 3. TEXT / ARTICLE */}
                                {activeMaterial.type === 'text' && (
                                    <div className="w-full h-full bg-white dark:bg-[#1e293b] p-8 overflow-y-auto custom-scrollbar text-left font-sans">
                                        <div className="prose dark:prose-invert max-w-none mx-auto">
                                            <h1>{activeMaterial.title}</h1>
                                            <div dangerouslySetInnerHTML={{ __html: activeMaterial.raw_content || '<p>Tidak ada konten teks.</p>' }} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-gray-500 flex flex-col items-center">
                                <PlayCircle className="w-12 h-12 mb-3 opacity-20" />
                                <p>Pilih materi untuk memulai belajar</p>
                            </div>
                        )}
                    </div>

                    {/* Meta Info */}
                    {activeMaterial && (
                        <div className="bg-white dark:bg-[#0f172a] p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{activeMaterial.title}</h2>
                            <div className="flex gap-4 text-sm text-gray-500">
                                <span className="capitalize badge bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded text-xs font-bold border border-indigo-100">{activeMaterial.type}</span>
                                <span>{activeMaterial.duration_min} Menit</span>
                            </div>
                        </div>
                    )}

                </div>
            </div>

            {/* SIDEBAR (Curriculum) */}
            <div className={cn(
                "w-80 bg-white dark:bg-[#0f172a] border-l border-gray-200 dark:border-gray-800 flex flex-col shrink-0 absolute right-0 top-0 bottom-0 z-10 transition-transform duration-300 lg:relative lg:translate-x-0 shadow-xl lg:shadow-none",
                !sidebarOpen && "translate-x-full lg:hidden"
            )}>

                <div className="flex-1 overflow-y-auto">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {course.modules?.map((module: any, idx: number) => (
                        <div key={module.id} className="border-b border-gray-100 dark:border-gray-800 last:border-0">
                            <div className="px-4 py-3 bg-gray-50 dark:bg-[#1e293b/30] flex justify-between items-center cursor-default">
                                <div>
                                    <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-200 line-clamp-1">{module.title}</h4>
                                    <p className="text-[10px] text-gray-500">{module.materials?.length || 0} Materi</p>
                                </div>
                                {/* <ChevronDown className="w-4 h-4 text-gray-400" /> */}
                            </div>
                            <div>
                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                {module.materials?.map((mat: any) => {
                                    const isActive = activeMaterialId === mat.id;
                                    return (
                                        <button 
                                            key={mat.id}
                                            onClick={() => setActiveMaterialId(mat.id)}
                                            className={cn(
                                                "w-full text-left px-4 py-3 flex gap-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors relative",
                                                isActive && "bg-indigo-50 dark:bg-indigo-900/10"
                                            )}
                                        >
                                            <div className="mt-0.5">
                                                { isActive ? 
                                                    <PlayCircle className="w-4 h-4 text-indigo-600" /> : 
                                                    (mat.type === 'video' || mat.type === 'youtube') ? 
                                                    <CheckCircle className="w-4 h-4 text-gray-300" /> :
                                                    <FileText className="w-4 h-4 text-gray-300" />
                                                }
                                            </div>
                                            <div className="flex-1">
                                                <p className={cn(
                                                    "text-sm font-medium line-clamp-2",
                                                    isActive ? "text-indigo-700 dark:text-indigo-400" : "text-gray-600 dark:text-gray-400"
                                                )}>
                                                    {mat.title}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                                                    {mat.duration_min} min {mat.type === 'text' && '• Bacaan'}
                                                </p>
                                            </div>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    </div>
  )
}

// Helper Function
function getYoutubeId(url: string) {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}
