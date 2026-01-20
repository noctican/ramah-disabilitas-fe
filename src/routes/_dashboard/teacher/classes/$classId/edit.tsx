import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import {
  Rocket,
  FileEdit,
  Image,
  CloudUpload,
  ChevronDown,
  Key,
  RefreshCw,
  Copy,
  CheckCircle,
  ChevronRight,
  Loader2,
  Eye,
  ArrowLeft
} from 'lucide-react'
import { getFetcher, putFetcher, deleteFetcher } from '@/lib/api-client'
import { toast } from 'sonner'
import { useNavigate, Link } from '@tanstack/react-router'
import { COURSE, MODULE, MATERIAL } from '@/data/const/api_path'
import { useQuery } from '@tanstack/react-query'
import { CourseCurriculum, type Module } from '@/routes/_dashboard/teacher/classes/-components/CourseCurriculum'
export const Route = createFileRoute('/_dashboard/teacher/classes/$classId/edit')({
  component: EditCoursePage,
})

function EditCoursePage() {
  const { classId } = Route.useParams()
  const [copyFeedback, setCopyFeedback] = useState(false)

  const [modules, setModules] = useState<Module[]>([])
  
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [accessCode, setAccessCode] = useState('')
  const [status, setStatus] = useState<'published' | 'draft'>('published')
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  // Fetch course details
  const { data: courseData, isLoading: isLoadingCourse } = useQuery({
      queryKey: ['lecturer-course', classId],
      queryFn: () => getFetcher(COURSE.DETAIL.replace('{course_id}', classId)),
      enabled: !!classId
  })

  // Populate state when data is fetched
  useEffect(() => {
      if (courseData && courseData.data) {
          const c = courseData.data
          setTitle(c.title)
          setDescription(c.description)
          setThumbnail(c.thumbnail)
          setAccessCode(c.class_code)
          setStatus(c.status || 'published')
          
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

  const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let part1 = ''
    let part2 = ''
    for (let i = 0; i < 3; i++) part1 += chars.charAt(Math.floor(Math.random() * chars.length))
    for (let i = 0; i < 3; i++) part2 += chars.charAt(Math.floor(Math.random() * chars.length))
    setAccessCode(`${part1}${part2}`)
  }



  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleUpdate = async () => {
      try {
        setIsSubmitting(true)
        setValidationErrors({}) // Clear previous errors
        
        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('class_code', accessCode)
        formData.append('status', status)
        
        if (thumbnailFile) {
            formData.append('thumbnail', thumbnailFile)
        }

        const modulesPayload = modules.map((module) => {
            // Check if ID is a temporary timestamp (newly created)
            const isTempModuleId = typeof module.id === 'number' && module.id > 1000000000000;
            
            return {
                id: isTempModuleId ? undefined : module.id,
                title: module.title,
                order: module.order,
                materials: module.materials.map(mat => {
                    const isTempMatId = typeof mat.id === 'number' && mat.id > 1000000000000;
                    return {
                        id: isTempMatId ? undefined : mat.id,
                        title: mat.title,
                        type: mat.type,
                        raw_content: mat.raw_content,
                        source_url: mat.source_url,
                        duration_min: mat.duration_min,
                        has_captions: mat.has_captions || false
                    }
                })
            }
        })
        
        formData.append('modules', JSON.stringify(modulesPayload))

        // Use putFetcher for update
        await putFetcher(COURSE.UPDATE.replace('{course_id}', classId), { arg: formData })
        
        toast.success('Kelas berhasil diperbarui!')
        navigate({ to: '/teacher/classes' })
      } catch (error: any) {
        console.error(error)
        
        if (error.response?.data?.status === 'error' && error.response?.data?.errors) {
            setValidationErrors(error.response.data.errors)
            toast.error('Validasi gagal', {
                description: 'Mohon periksa input Anda kembali.'
            })
        } else {
            toast.error('Gagal memperbarui kelas', {
              description: error.response?.data?.message || 'Terjadi kesalahan sistem'
            })
        }
      } finally {
        setIsSubmitting(false)
      }
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(accessCode)
    setCopyFeedback(true)
    setTimeout(() => setCopyFeedback(false), 2000)
  }

  if (isLoadingCourse) {
      return (
          <div className="flex-1 flex justify-center items-center">
              <Loader2 className="w-10 h-10 animate-spin text-[#6366f1]" />
          </div>
      )
  }

  return (
    <>

      {/* Scrollable Content */}
        <div className="container mx-auto">
          
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Edit Kelas</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Perbarui konten dan informasi kelas Anda.</p>
          </div>

          <div className="space-y-6">

              {/* Card: Basic Info */}
              <div className="bg-white dark:bg-[#0f172a] rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-gray-800 p-6 sm:p-8">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <div className="p-1.5 bg-[#e0e7ff] dark:bg-[#1e293b] text-primary rounded-lg">
                    <FileEdit className="w-5 h-5" />
                  </div>
                  Detail Kelas
                </h3>
                
                <div className="space-y-5">
                  <div>
                    <label htmlFor="course-title" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        Judul Kelas <span className="text-red-500">*</span>
                    </label>
                    <input 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        type="text" 
                        id="course-title" 
                        className={`w-full px-4 py-2.5 rounded-xl border ${validationErrors.title ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-300 dark:border-gray-700 focus:border-[#6366f1] focus:ring-[#6366f1]/20'} bg-white dark:bg-[#1e293b] text-slate-900 dark:text-white placeholder-gray-400 focus:ring-2 transition-all outline-none`} 
                        placeholder="misal: Masterclass Desain UX" 
                    />
                    {validationErrors.title && <p className="text-red-500 text-xs mt-1">{validationErrors.title}</p>}

                  </div>
                  <div>
                    <label htmlFor="course-desc" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        Deskripsi <span className="text-slate-400 font-normal">(Opsional)</span>
                    </label>
                    <textarea 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        id="course-desc" 
                        rows={4} 
                        className={`w-full px-4 py-2.5 rounded-xl border ${validationErrors.description ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-300 dark:border-gray-700 focus:border-[#6366f1] focus:ring-[#6366f1]/20'} bg-white dark:bg-[#1e293b] text-slate-900 dark:text-white placeholder-gray-400 focus:ring-2 transition-all outline-none resize-none`}
                        placeholder="Apa yang akan dipelajari siswa dalam kelas ini?"
                    ></textarea>
                     {validationErrors.description && <p className="text-red-500 text-xs mt-1">{validationErrors.description}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="course-status" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        Status Kelas
                    </label>
                    <div className="relative">
                        <select
                            id="course-status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value as 'published' | 'draft')}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 focus:border-[#6366f1] focus:ring-[#6366f1]/20 bg-white dark:bg-[#1e293b] text-slate-900 dark:text-white appearance-none focus:ring-2 transition-all outline-none cursor-pointer"
                        >
                            <option value="published">Publikasi (Aktif)</option>
                            <option value="draft">Draf (Disembunyikan)</option>
                        </select>
                         <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none w-5 h-5" />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                        {status === 'published' ? 'Kelas akan terlihat oleh siswa.' : 'Kelas hanya terlihat oleh Anda.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card: Media */}
              <div className="bg-white dark:bg-[#0f172a] rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-gray-800 p-6 sm:p-8">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <div className="p-1.5 bg-pink-100 dark:bg-pink-900/30 text-pink-600 rounded-lg">
                    <Image className="w-5 h-5" />
                  </div>
                  Media Sampul
                </h3>
                
                <div className="relative group cursor-pointer" onClick={() => document.getElementById('dropzone-file')?.click()}>
                  <div className="flex flex-col items-center justify-center w-full aspect-video border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-[#1e293b]/50 hover:bg-[#eef2ff] dark:hover:bg-[#0f172a]/10 hover:border-[#6366f1] dark:hover:border-[#6366f1] transition-all overflow-hidden">
                    {thumbnail && !thumbnail.includes('example.com') ? (
                        <div className="relative w-full h-full"> 
                            <img src={thumbnail} alt="Thumbnail" className="w-full h-full object-cover rounded-2xl" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
                                <p className="text-white font-medium">Ganti Gambar</p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <div className="p-3 bg-white dark:bg-[#1e293b] rounded-full shadow-sm mb-3 group-hover:scale-110 transition-all">
                                <CloudUpload className="w-8 h-8 text-[#6366f1]" />
                            </div>
                            <p className="mb-1 text-sm text-slate-600 dark:text-slate-300 font-medium">Klik untuk mengunggah atau seret dan lepas</p>
                            <p className="text-xs text-slate-400">SVG, PNG, JPG atau GIF (MAKS. 10MB)</p>
                        </div>
                    )}
                    <input 
                        id="dropzone-file" 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                const file = e.target.files[0];
                                const imageUrl = URL.createObjectURL(file);
                                setThumbnail(imageUrl);
                                setThumbnailFile(file);
                            }
                        }}
                    />
                  </div>
                </div>
              </div>

              <CourseCurriculum 
                modules={modules} 
                setModules={setModules} 
                onDeleteModule={async (id) => {
                    // Check if temp ID (timestamp)
                    const isTemp = typeof id === 'number' && id > 1000000000000
                    if (isTemp) return

                    try {
                        await deleteFetcher(MODULE.DELETE.replace('{module_id}', String(id)))
                        toast.success('Modul berhasil dihapus')
                    } catch (error: any) {
                        if (error.response?.status === 404) return
                        toast.error(error.response?.data?.message || 'Gagal menghapus modul')
                        throw error
                    }
                }}
                onDeleteMaterial={async (_moduleId, materialId) => {
                     const isTemp = typeof materialId === 'number' && materialId > 1000000000000
                     if (isTemp) return
 
                     try {
                         await deleteFetcher(MATERIAL.DELETE.replace('{material_id}', String(materialId)))
                         toast.success('Materi berhasil dihapus')
                     } catch (error: any) {
                         if (error.response?.status === 404) return
                         toast.error(error.response?.data?.message || 'Gagal menghapus materi')
                         throw error
                     }
                }}
              />
          </div>
        </div>
      
      {/* Sticky Bottom Action Bar */}
      <div className="rounded-2xl p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f172a] sticky bottom-0 z-40 flex justify-between gap-3 shadow-[0_-4px_20px_-2px_rgba(0,0,0,0.05)]">
        <Link to="/teacher/classes/$classId" params={{ classId }} className="px-6 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-slate-100 dark:bg-[#1e293b] hover:bg-slate-200 dark:hover:bg-[#2e3b4e] rounded-xl transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
        </Link>
          <button 
            onClick={handleUpdate}
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-8 py-2.5 text-sm font-semibold text-white bg-primary hover:bg-primary-600 rounded-xl shadow-lg shadow-[#6366f1]/30 transition-all active:scale-95 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? <Loader2 className="w-[18px] h-[18px] animate-spin" /> : <Rocket className="w-[18px] h-[18px]" />}
            {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
      </div>
      
      {/* Toast Notification (Conditional Render) */}
      {copyFeedback && (
        <div className="fixed bottom-5 right-5 bg-[#0f172a] dark:bg-white text-white dark:text-[#0f172a] px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
            <CheckCircle className="text-green-400 dark:text-green-600 w-5 h-5" />
            <span className="font-medium text-sm">Kode disalin ke papan klip!</span>
        </div>
      )}
    </>
  )
}
