import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import {
  Rocket,
  FileEdit,
  Image,
  CloudUpload,
  LayoutGrid,
  GripVertical,
  Edit,
  Trash2,
  PlayCircle,
  FileText,
  Plus,
  ChevronDown,
  PlusCircle,
  Key,
  RefreshCw,
  Copy,
  CheckCircle,
  ChevronRight,
  Loader2,
  ArrowLeft
} from 'lucide-react'
import { postFetcher } from '@/lib/api-client'
import { toast } from 'sonner'
import { useNavigate } from '@tanstack/react-router'
import { COURSE } from '@/data/const/api_path'
import { CourseCurriculum, type Module } from '@/routes/_dashboard/teacher/classes/-components/CourseCurriculum'

export const Route = createFileRoute('/_dashboard/teacher/classes/create')({
  component: CreateCoursePage,
})

function CreateCoursePage() {
  const [isModuleExpanded, setIsModuleExpanded] = useState(true)
  const [accessCode, setAccessCode] = useState('')

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [thumbnail, setThumbnail] = useState('https://example.com/thumbnails/golang-course.jpg')
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  const [modules, setModules] = useState<Module[]>([])


  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (status: 'published' | 'draft') => {
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

        const modulesPayload = modules.map(({ ...rest }) => ({
            title: rest.title,
            order: rest.order,
            materials: rest.materials.map(mat => ({
                title: mat.title,
                type: mat.type,
                raw_content: mat.raw_content,
                source_url: mat.source_url,
                duration_min: mat.duration_min,
                has_captions: false
            }))
        }))
        
        formData.append('modules', JSON.stringify(modulesPayload))

        await postFetcher(COURSE.CREATE, { arg: formData })
        toast.success(status === 'published' ? 'Kelas berhasil diterbitkan!' : 'Draf kelas berhasil disimpan!')
        navigate({ to: '/teacher/classes' })
      } catch (error: any) {
        console.error(error)
        
        if (error.response?.data?.status === 'error' && error.response?.data?.errors) {
            setValidationErrors(error.response.data.errors)
            toast.error('Validasi gagal', {
                description: 'Mohon periksa input Anda kembali.'
            })
        } else {
            toast.error(status === 'published' ? 'Gagal menerbitkan kelas' : 'Gagal menyimpan draf', {
              description: error.response?.data?.message || 'Terjadi kesalahan sistem'
            })
        }
      } finally {
        setIsSubmitting(false)
      }
  }

  return (
    <>
      
      <div className="container mx-auto">
        
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Buat Kelas Baru</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Rancang kurikulum Anda, unggah aset, dan bersiaplah untuk mengajar.</p>
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

            {/* Card: Curriculum */}
              <CourseCurriculum modules={modules} setModules={setModules} />
        </div>
      </div>
      
      {/* Sticky Bottom Action Bar */}
      <div className="rounded-2xl p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f172a] sticky bottom-0 z-40 flex justify-between gap-3 shadow-[0_-4px_20px_-2px_rgba(0,0,0,0.05)]">
        <Link to="/teacher/classes" className="px-6 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-slate-100 dark:bg-[#1e293b] hover:bg-slate-200 dark:hover:bg-[#2e3b4e] rounded-xl transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
        </Link>
        <div className='flex gap-2'>
          <button 
              onClick={() => handleSubmit('draft')}
              disabled={isSubmitting} // Disable while submitting
              className="px-6 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-slate-100 dark:bg-[#1e293b] hover:bg-slate-200 dark:hover:bg-[#2e3b4e] rounded-xl transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
          >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Simpan Draf
            </button>
            <button 
              onClick={() => handleSubmit('published')}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-8 py-2.5 text-sm font-semibold text-white bg-primary hover:bg-primary-600 rounded-xl shadow-lg shadow-[#6366f1]/30 transition-all active:scale-95 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? <Loader2 className="w-[18px] h-[18px] animate-spin" /> : <Rocket className="w-[18px] h-[18px]" />}
              {isSubmitting ? 'Menerbitkan...' : 'Terbitkan Kelas'}
            </button>
        </div>
      </div>
    </>
  )
}
