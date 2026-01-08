import { createFileRoute, Link } from '@tanstack/react-router'
import { 
  Plus, 
  Search, 
  ArrowUpDown, 
  Grid, 
  CheckCircle, 
  FileEdit, 
  Archive, 
  MoreHorizontal, 
  ArrowRight, 
  Edit,
  Loader2,
  Trash2
} from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getFetcher, deleteFetcher } from '@/lib/api-client'
import { COURSE } from '@/data/const/api_path'
import { toast } from 'sonner'
import { useState } from 'react'


export const Route = createFileRoute('/_dashboard/lecturer/course/')({
    component: CourseManagementPage,
})

interface Course {
  id: number
  teacher_id: number
  title: string
  description: string
  thumbnail: string
  class_code: string
  created_at: string
  updated_at: string
}

function CourseManagementPage() {
  const queryClient = useQueryClient()
  
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all') // 'all' | 'published' | 'draft' | 'archived'
  const [sort, setSort] = useState('newest') // 'newest' | 'oldest' | 'a-z'

  const { data: coursesData, isLoading } = useQuery({
    queryKey: ['lecturer-courses', search, status, sort],
    queryFn: () => getFetcher(`${COURSE.GET_ALL}?q=${search}&status=${status === 'published' ? 'published' : status === 'draft' ? 'draft' : 'all'}&sort=${sort}`)
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteFetcher(COURSE.DELETE.replace('{course_id}', id.toString())),
    onSuccess: () => {
        toast.success('Kursus berhasil dihapus')
        queryClient.invalidateQueries({ queryKey: ['lecturer-courses'] })
    },
    onError: (error: any) => {
        const errorMessage = error.response?.data?.error || error.response?.data?.message || 'Terjadi kesalahan saat menghapus kursus'
        toast.error('Gagal menghapus kursus', {
            description: errorMessage
        })
    }
  })

  const handleDelete = (id: number) => {
      if (window.confirm('Apakah Anda yakin ingin menghapus kursus ini? Tindakan ini tidak dapat dibatalkan.')) {
          deleteMutation.mutate(id)
      }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const courses: Course[] = (coursesData as any)?.data || []

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#f7f7f8] dark:bg-[#22252a] relative font-sans text-[#121416] dark:text-white rounded-xl">
      {/* Top Header Area */}
      <header className="w-full px-8 pt-8 pb-4 shrink-0">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          {/* Title Block */}
          <div className="flex flex-col gap-1">
            <h2 className="text-[#121416] dark:text-white text-3xl font-extrabold tracking-tight">Kursus Saya</h2>
            <p className="text-[#6a7581] dark:text-gray-400 text-base font-normal">Kelola kurikulum, konten, dan kemajuan siswa Anda.</p>

          </div>

          {/* Primary Action */}
          <Link 
            to="/lecturer/course/create"
            className="flex items-center gap-2 bg-[#6699cc] hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-bold shadow-lg shadow-[#6699cc]/30 transition-all active:scale-95 group cursor-pointer"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            Buat Kursus Baru
          </Link>
        </div>
        
        {/* Filters and Search Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          <div className="flex flex-1 gap-3 w-full lg:max-w-2xl">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#6699cc] transition-colors w-5 h-5" />
              <input 
                className="w-full pl-11 pr-4 py-3 bg-white dark:bg-[#1e2126] border-none rounded-xl shadow-sm text-sm focus:ring-2 focus:ring-[#6699cc]/50 text-[#121416] dark:text-white placeholder:text-gray-400 transition-all outline-none" 
                placeholder="Cari kursus berdasarkan nama, tag, atau ID..." 
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <div className="relative w-48">
              <select 
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full pl-4 pr-10 py-3 bg-white dark:bg-[#1e2126] border-none rounded-xl shadow-sm text-sm focus:ring-2 focus:ring-[#6699cc]/50 text-[#121416] dark:text-white appearance-none cursor-pointer outline-none"
              >
                <option value="newest">Urutkan: Terbaru</option>
                <option value="oldest">Urutkan: Terlama</option>
              </select>
              <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" />
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 xl:pb-0 no-scrollbar w-full xl:w-auto">
            <button 
                onClick={() => setStatus('all')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${status === 'all' ? 'bg-[#6699cc] text-white shadow-md shadow-[#6699cc]/20 hover:-translate-y-0.5' : 'bg-white dark:bg-[#1e2126] text-gray-600 dark:text-gray-300 hover:text-[#6699cc] hover:bg-blue-50 dark:hover:bg-white/5 border border-transparent hover:border-blue-100 dark:hover:border-white/10'}`}
            >
              <Grid className="w-[18px] h-[18px]" />
              Semua Kursus
            </button>
            <button 
                onClick={() => setStatus('published')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${status === 'published' ? 'bg-white border-2 border-green-500 text-green-600 shadow-sm' : 'bg-white dark:bg-[#1e2126] text-gray-600 dark:text-gray-300 hover:text-[#6699cc] hover:bg-blue-50 dark:hover:bg-white/5 border border-transparent hover:border-blue-100 dark:hover:border-white/10'}`}
            >
              <CheckCircle className={`w-[18px] h-[18px] ${status === 'published' ? 'text-green-600' : 'text-green-500'}`} />
              Aktif
            </button>
            <button 
                onClick={() => setStatus('draft')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${status === 'draft' ? 'bg-white border-2 border-amber-500 text-amber-600 shadow-sm' : 'bg-white dark:bg-[#1e2126] text-gray-600 dark:text-gray-300 hover:text-[#6699cc] hover:bg-blue-50 dark:hover:bg-white/5 border border-transparent hover:border-blue-100 dark:hover:border-white/10'}`}
            >
              <FileEdit className={`w-[18px] h-[18px] ${status === 'draft' ? 'text-amber-600' : 'text-amber-500'}`} />
              Draf
            </button>
          </div>
        </div>
      </header>

      {/* Scrollable Grid Area */}
      <div className="flex-1 overflow-y-auto px-8 py-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          
          
          {isLoading ? (
             <div className="col-span-full flex justify-center py-20">
               <Loader2 className="w-10 h-10 animate-spin text-[#6699cc]" />
             </div>
          ) : courses.length > 0 ? (
            courses.map((course) => (
              <div key={course.id} className="group bg-white dark:bg-[#1e2126] rounded-xl overflow-hidden hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_20px_#E0E6F0] dark:shadow-[0_4px_20px_#000000] border border-transparent dark:border-gray-800 flex flex-col h-full">
                <div className="relative h-48 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                    style={{ backgroundImage: `url("${course.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60'}")` }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-sm text-green-700 dark:text-green-400 text-xs font-bold shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                      Aktif
                    </span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-[#121416] dark:text-white leading-tight group-hover:text-[#6699cc] transition-colors">{course.title}</h3>
                  </div>
                  <p className="text-sm text-[#6a7581] dark:text-gray-400 mb-4 line-clamp-2">{course.description}</p>
                  <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                       <span className="text-xs text-[#6a7581] font-medium">{course.class_code}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link 
                            to="/lecturer/course/$courseId/edit" 
                            params={{ courseId: course.id.toString() }}
                            className="p-2 rounded-lg bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-[#6a7581] dark:text-gray-300 transition-colors cursor-pointer" 
                            title="Edit Kursus"
                        >
                            <Edit className="w-4 h-4" />
                        </Link>
                        <button 
                            onClick={() => handleDelete(course.id)}
                            className="p-2 rounded-lg bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20 text-red-500 transition-colors cursor-pointer" 
                            title="Hapus Kursus"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-gray-500">
              Belum ada kursus yang dibuat.
            </div>
          )}

          {/* New Placeholder Card */}
          {!isLoading && (
              <Link to="/lecturer/course/create" className="group border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl flex flex-col items-center justify-center h-full min-h-[360px] cursor-pointer hover:border-[#6699cc]/50 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-all">
                <div className="w-16 h-16 rounded-full bg-gray-50 dark:bg-white/5 group-hover:bg-[#6699cc]/10 flex items-center justify-center mb-4 transition-colors">
                  <Plus className="w-8 h-8 text-gray-400 group-hover:text-[#6699cc] transition-colors" />
                </div>
                <p className="text-[#121416] dark:text-white font-bold text-lg">Buat Kursus Baru</p>
                <p className="text-[#6a7581] dark:text-gray-400 text-sm mt-1">Mulai dari awal atau template</p>
              </Link>
          )}

        </div>
        
        <div className="mt-12 text-center">
            {courses.length > 0 && (
                <p className="text-[#6a7581] text-sm">Menampilkan {courses.length} dari {courses.length} kursus</p>
            )}
        </div>
      </div>
    </div>
  )
}
