import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { getFetcher } from '@/lib/api-client'
import { COURSE } from '@/data/const/api_path'
import { 
  GraduationCap, 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  BarChart, 
  Settings, 
  Edit, 
  LayoutGrid, 
  ClipboardList, 
  TrendingUp, 
  Plus, 
  GripVertical, 
  Trash2, 
  PlayCircle, 
  FileText, 
  ChevronRight, 
  CheckCircle, 
  Clock, 
  Loader2,
  MoreHorizontal,
  Eye
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { CourseCurriculum, type Module } from '@/components/lecturer/CourseCurriculum'
import { toast } from 'sonner'
import { putFetcher } from '@/lib/api-client'


export const Route = createFileRoute('/_dashboard/lecturer/course/$courseId/')({
  component: CourseDetailPage,
})

function CourseDetailPage() {
  const { courseId } = Route.useParams()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('modules')
  const [modules, setModules] = useState<Module[]>([])
  const [isSaving, setIsSaving] = useState(false)


  // Fetch course details
  const { data: courseData, isLoading } = useQuery({
      queryKey: ['lecturer-course', courseId],
      queryFn: () => getFetcher(COURSE.DETAIL.replace('{course_id}', courseId)),
      enabled: !!courseId
  })

  // Populate state when data is fetched
  useEffect(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (courseData && (courseData as any).data) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const c = (courseData as any).data
          
          if (c.modules) {
              // Map fetched modules to state structure
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const mappedModules = c.modules.map((m: any) => ({
                  id: m.id,
                  title: m.title,
                  order: m.order,
                  isExpanded: true,
                  materials: m.materials || []
              }))
              setModules(mappedModules)
          }
      }
  }, [courseData])

  const handleSaveCurriculum = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const c = (courseData as any)?.data
    if (!c) return

    try {
        setIsSaving(true)
        const formData = new FormData()
        // Re-append existing course info to avoid clearing it
        formData.append('title', c.title)
        formData.append('description', c.description || '')
        formData.append('class_code', c.class_code)
        formData.append('status', c.status)
        // If we had thumbnail file handling here it would be complex, skipping for now as we only edit modules

        const modulesPayload = modules.map(({ ...rest }) => ({
            title: rest.title,
            order: rest.order,
            materials: rest.materials.map(mat => ({
                title: mat.title,
                type: mat.type,
                raw_content: mat.raw_content,
                source_url: mat.source_url,
                duration_min: mat.duration_min,
                has_captions: mat.has_captions || false
            }))
        }))
        
        formData.append('modules', JSON.stringify(modulesPayload))

        // Note: Actual file upload for materials would require appending files to formData with specific keys
        // or handling them in a separate endpoint. For this UI task, we assume the structure is prepared.

        await putFetcher(COURSE.UPDATE.replace('{course_id}', courseId), { arg: formData })
        toast.success('Kurikulum berhasil diperbarui!')
    } catch (error) {
        console.error(error)
        toast.error('Gagal menyimpan kurikulum')
    } finally {
        setIsSaving(false)
    }
  }


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const course = (courseData as any)?.data

  if (isLoading) {
      return (
          <div className="flex-1 flex justify-center items-center h-full min-h-[400px]">
              <Loader2 className="w-10 h-10 animate-spin text-[#661fad]" />
          </div>
      )
  }

  if (!course) {
      return (
          <div className="flex-1 flex flex-col justify-center items-center h-full min-h-[400px] text-center p-8">
             <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Kursus Tidak Ditemukan</h2>
             <p className="text-zinc-500 mb-6">Kursus yang Anda cari mungkin telah dihapus atau Anda tidak memiliki akses.</p>
             <Link to="/lecturer/course" className="text-[#661fad] hover:underline font-semibold">Kembali ke Daftar Kursus</Link>
          </div>
      )
  }

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#fafafa] dark:bg-[#020617] font-sans text-zinc-900 dark:text-zinc-200">
      
      {/* Hero Section */}
      <div className="relative w-full h-[280px] bg-zinc-900 overflow-hidden shrink-0 group">
        <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-60" 
            style={{ backgroundImage: `url("${course.thumbnail || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80'}")` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent"></div>
        
        <div className="relative h-full px-8 sm:px-12 pb-10 flex flex-col justify-end">
            <div className="flex items-center gap-2 mb-4 text-sm font-medium">
                <Link to="/lecturer/course" className="text-zinc-300 hover:text-white transition-colors">Courses</Link>
                <span className="text-zinc-500">/</span>
                <span className="text-white">{course.class_code}</span>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div className="max-w-3xl">
                    <div className="flex items-center gap-3 mb-2">
                        {course.status === 'published' ? (
                            <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-[10px] font-bold uppercase tracking-wider">Active</span>
                        ) : (
                            <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-[10px] font-bold uppercase tracking-wider">Draft</span>
                        )}
                        <span className="text-zinc-300 text-sm font-medium">Created on {new Date(course.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-2 drop-shadow-md">{course.title}</h2>
                    <p className="text-zinc-200 text-base max-w-xl line-clamp-2">{course.description || 'No course description available.'}</p>
                </div>
                
                <div className="flex gap-3">
                    <Link 
                        to="/lecturer/course/$courseId/preview" 
                        params={{ courseId: course.id.toString() }}
                        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-5 py-2.5 rounded-xl border border-white/20 font-bold text-sm transition-all shadow-lg hover:shadow-xl whitespace-nowrap"
                    >
                        <Eye className="w-5 h-5" />
                        Preview
                    </Link>
                    <Link 
                        to="/lecturer/course/$courseId/edit" 
                        params={{ courseId: course.id.toString() }}
                        className="flex items-center gap-2 bg-[#661fad] hover:bg-[#5a1aa0] text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-[#661fad]/30 whitespace-nowrap"
                    >
                        <Edit className="w-5 h-5" />
                        Edit Course
                    </Link>
                </div>
            </div>
        </div>
      </div>

      {/* Tab Navigation & Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-8 sm:px-12 py-8">
            {/* Tabs */}
            <div className="flex flex-col sm:flex-row items-center justify-between border-b border-zinc-200 dark:border-zinc-800 mb-8 gap-4 sm:gap-0">
                <div className="flex gap-8 overflow-x-auto w-full sm:w-auto pb-0.5 no-scrollbar">
                    <TabButton 
                        active={activeTab === 'modules'} 
                        onClick={() => setActiveTab('modules')} 
                        icon={<LayoutGrid size={20} />} 
                        label="Modules" 
                    />
                    <TabButton 
                        active={activeTab === 'assignments'} 
                        onClick={() => setActiveTab('assignments')} 
                        icon={<ClipboardList size={20} />} 
                        label="Assignments" 
                    />
                    <TabButton 
                        active={activeTab === 'students'} 
                        onClick={() => setActiveTab('students')} 
                        icon={<Users size={20} />} 
                        label="Students" 
                    />
                    <TabButton 
                        active={activeTab === 'grades'} 
                        onClick={() => setActiveTab('grades')} 
                        icon={<TrendingUp size={20} />} 
                        label="Grades" 
                    />
                </div>
                
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.5rem', paddingBottom: '2.5rem' }}>
                
                <div style={{ gridColumn: 'span 12' }} className="lg:col-span-8 lg:!col-span-8 col-span-12 space-y-6" css-hack-col-span-8="true">
                    
                    {/* Dynamic Modules Rendering via Editor */}
                    <div className="space-y-4">
                        <CourseCurriculum modules={modules} setModules={setModules} />
                        
                        <div className="flex justify-end">
                            <button 
                                onClick={handleSaveCurriculum}
                                disabled={isSaving}
                                className="px-6 py-2.5 bg-[#661fad] text-white rounded-xl font-bold text-sm shadow-lg shadow-[#661fad]/20 hover:bg-[#5a1aa0] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                                {isSaving ? 'Menyimpan...' : 'Simpan Perubahan Kurikulum'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN (Stats) */}
                <div style={{ gridColumn: 'span 12' }} className="lg:col-span-4 lg:!col-span-4 col-span-12 space-y-6" css-hack-col-span-4="true">
                    
                    {/* Progress Card */}
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-[0_4px_20px_rgba(0,0,0,0.04)] p-6">
                        <h4 className="font-bold text-xs text-zinc-400 uppercase tracking-widest mb-4">Course Progress</h4>
                        <div className="relative pt-1">
                            <div className="flex mb-2 items-center justify-between">
                                <div>
                                    <span className="text-xs font-bold inline-block py-1 px-2 uppercase rounded-full text-[#661fad] bg-[#661fad]/10 border border-[#661fad]/20">
                                        Content Completion
                                    </span>
                                </div>
                                <div className="text-right">
                                    <span className="text-sm font-bold inline-block text-[#661fad]">{(course.modules?.length || 0 ) * 20}%</span>
                                </div>
                            </div>
                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-zinc-100 dark:bg-zinc-800">
                                <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#661fad]" style={{ width: `${(course.modules?.length || 0) * 20}%` }}></div>
                            </div>
                        </div>
                        <p className="text-xs text-zinc-500 leading-relaxed">Status based on module content population.</p>
                    </div>

                    {/* Enrollment Card */}
                    <div className="bg-[#141217] text-white rounded-2xl shadow-lg p-6 flex flex-col h-auto relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#661fad]/20 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none"></div>
                        
                        <div className="flex justify-between items-start mb-6 relative z-10">
                            <div>
                                <h4 className="font-bold text-xs opacity-60 uppercase tracking-widest">Enrollment</h4>
                                <p className="text-4xl font-extrabold mt-2 tracking-tight">128</p>
                            </div>
                            <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                                <TrendingUp className="text-emerald-400 w-6 h-6" />
                            </div>
                        </div>
                        <div className="mt-auto flex gap-4 items-center justify-between relative z-10 pt-4 border-t border-white/10">
                            <div className="flex -space-x-3 hover:space-x-1 transition-all">
                                {[1,2,3].map(i => (
                                    <div key={i} className="size-8 rounded-full border-2 border-[#141217] bg-zinc-700 flex items-center justify-center">
                                        <Users className="w-3 h-3 text-zinc-400" />
                                    </div>
                                ))}
                                <div className="size-8 rounded-full border-2 border-[#141217] bg-[#661fad] flex items-center justify-center text-[10px] font-bold">+125</div>
                            </div>
                            <button className="text-xs font-bold text-[#a586ff] hover:text-white transition-colors flex items-center gap-1">
                                View All <ChevronRight className="w-3 h-3" />
                            </button>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-[0_4px_20px_rgba(0,0,0,0.04)] p-6">
                        <h4 className="font-bold text-xs text-zinc-400 uppercase tracking-widest mb-6 border-b border-zinc-100 pb-2">Latest Activity</h4>
                        <div className="space-y-5">
                            <ActivityItem 
                                icon={<CheckCircle className="w-4 h-4" />} 
                                colorClass="text-emerald-600 bg-emerald-50 border-emerald-100" 
                                text="Course content updated" 
                                time="Just now" 
                            />
                            <ActivityItem 
                                icon={<Clock className="w-4 h-4" />} 
                                colorClass="text-amber-600 bg-amber-50 border-amber-100" 
                                text="12 tasks pending" 
                                time="1 hour ago" 
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
      </div>
      <style>{`
        @media (min-width: 1024px) {
            div[css-hack-col-span-8="true"] {
                grid-column: span 8 / span 8 !important;
            }
            div[css-hack-col-span-4="true"] {
                grid-column: span 4 / span 4 !important;
            }
        }
      `}</style>
    </div>
  )
}

// --- SUB-COMPONENTS (With TypeScript Props) ---

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`pb-4 px-1 font-bold text-sm flex items-center gap-2 transition-all border-b-2 ${
        active 
          ? 'border-[#661fad] text-[#661fad]' 
          : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
      }`}
    >
      {icon}
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );
}

function ActionButton({ icon, isDanger = false }: { icon: React.ReactNode, isDanger?: boolean }) {
  return (
    <button className={`p-2 rounded-lg transition-colors cursor-pointer ${
      isDanger 
        ? 'hover:bg-red-50 dark:hover:bg-red-900/20 text-zinc-400 hover:text-red-500' 
        : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-[#661fad]'
    }`}>
      {icon}
    </button>
  );
}

function MaterialItem({ icon, bgClass, title, meta }: { icon: React.ReactNode, bgClass: string, title: string, meta: string }) {
  return (
    <div className="group flex items-center justify-between p-3.5 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:border-[#661fad]/20 transition-all cursor-pointer">
      <div className="flex items-center gap-4">
        <div className={`size-11 rounded-xl ${bgClass} flex items-center justify-center shrink-0`}>
          {icon}
        </div>
        <div>
          <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-[#661fad] transition-colors">{title}</p>
          <p className="text-[11px] text-zinc-500 font-medium mt-0.5">{meta}</p>
        </div>
      </div>
      <ChevronRight className="text-zinc-300 group-hover:text-[#661fad] transition-colors opacity-0 group-hover:opacity-100" size={20} />
    </div>
  );
}

function ActivityItem({ icon, colorClass, text, time }: { icon: React.ReactNode, colorClass: string, text: string, time: string }) {
  return (
    <div className="flex gap-4">
      <div className={`mt-0.5 size-9 rounded-xl flex items-center justify-center shrink-0 border ${colorClass}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-bold text-zinc-900 dark:text-zinc-200 leading-tight hover:text-[#661fad] cursor-pointer transition-colors">{text}</p>
        <p className="text-xs text-zinc-400 mt-1 font-medium">{time}</p>
      </div>
    </div>
  );
}