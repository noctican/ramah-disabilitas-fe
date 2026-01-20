import { useState, useEffect } from 'react'
import {
  X,
  Upload,
  Video,
  FileText,
  Loader2,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FileUpload } from '@/components/ui/file-upload'
import { toast } from 'sonner'

interface AddMaterialModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (material: MaterialPayload) => void
  moduleId: number | string
  initialData?: MaterialPayload | null
}

export interface MaterialPayload {
  id?: number | string
  title: string
  type: 'text' | 'youtube' | 'pdf' | 'video'
  raw_content?: string
  source_url?: string
  file?: File
  duration_min: number
}

export function AddMaterialModal({ isOpen, onClose, onSave, moduleId, initialData }: AddMaterialModalProps) {
  const [activeTab, setActiveTab] = useState<'text' | 'youtube' | 'pdf'>('pdf')
  const [title, setTitle] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [videoUrl, setVideoUrl] = useState('')
  const [textContent, setTextContent] = useState('')
  const [duration, setDuration] = useState(10) // Default duration

  // Reset state on open or when initialData changes
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
          setTitle(initialData.title)
          setDuration(initialData.duration_min)
          setActiveTab(initialData.type === 'video' ? 'youtube' : initialData.type as any)
          
          if (initialData.type === 'youtube' || initialData.type === 'video') {
              setVideoUrl(initialData.source_url || '')
          } else if (initialData.type === 'text') {
              setTextContent(initialData.raw_content || '')
          } else if (initialData.type === 'pdf') {
              // We can't set file object from URL, but we can keep source_url logic if needed?
              // For now user has to re-upload to change file, or we just keep existing if not changed.
              setFile(null) 
          }
      } else {
          setTitle('')
          setFile(null)
          setVideoUrl('')
          setTextContent('')
          setDuration(10)
          setActiveTab('pdf')
      }
    }
  }, [isOpen, initialData])

  if (!isOpen) return null

  const handleSave = () => {
    // Validation
    if (!title.trim()) {
      toast.error('Judul materi wajib diisi')
      return
    }

    let payload: MaterialPayload = {
      id: initialData?.id,
      title,
      type: activeTab === 'pdf' ? 'pdf' : activeTab === 'youtube' ? 'youtube' : 'text',
      duration_min: duration
    }

    if (activeTab === 'pdf') {
       if (!file) {
           toast.error('Silakan upload file terlebih dahulu')
           return
       }
       payload.file = file
       // For preview purposes, we might create a generic url or just leave it
       payload.source_url = URL.createObjectURL(file)
    } else if (activeTab === 'youtube') {
       if (!videoUrl) {
           toast.error('URL Video wajib diisi')
           return
       }
       // Simple validation
       if (!videoUrl.includes('youtube.com') && !videoUrl.includes('youtu.be')) {
           toast.error('URL harus dari YouTube')
           return
       }
       payload.source_url = videoUrl
       payload.type = 'youtube'
    } else if (activeTab === 'text') {
        if (!textContent) {
            toast.error('Konten materi belum diisi')
            return
        }
        payload.raw_content = textContent
        payload.type = 'text'
    }

    onSave(payload)
    onClose()
  }

  const getYoutubeId = (url: string) => {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return (match && match[2].length === 11) ? match[2] : null;
  }

  const youtubeId = getYoutubeId(videoUrl)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white dark:bg-[#0f172a] rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-white dark:bg-[#0f172a] sticky top-0 z-10">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">{initialData ? 'Edit Materi' : 'Tambah Materi Baru'}</h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                <X className="w-5 h-5 text-slate-500" />
            </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        Judul Materi <span className="text-red-500">*</span>
                    </label>
                    <input 
                        type="text" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Contoh: Pengenalan Dasar UX"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 focus:border-[#6366f1] focus:ring-[#6366f1]/20 bg-white dark:bg-[#1e293b] text-slate-900 dark:text-white placeholder-gray-400 focus:ring-2 transition-all outline-none"
                    />
                </div>

                <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
                    <TabsList className="flex w-full mb-6 border-b border-gray-200 dark:border-gray-800 bg-transparent p-0">
                        <TabsTrigger 
                            value="pdf" 
                            className="flex-1 pb-3 text-sm font-medium rounded-none shadow-none bg-transparent border-0 border-b-2 border-transparent data-[state=active]:border-[#6366f1] data-[state=active]:text-[#6366f1] data-[state=active]:bg-transparent data-[state=active]:shadow-none text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 transition-all"
                        >
                            <div className="flex items-center justify-center gap-2">
                                <Upload className="w-4 h-4" /> 
                                <span>Upload File</span>
                            </div>
                        </TabsTrigger>
                        <TabsTrigger 
                            value="youtube" 
                            className="flex-1 pb-3 text-sm font-medium rounded-none shadow-none bg-transparent border-0 border-b-2 border-transparent data-[state=active]:border-[#6366f1] data-[state=active]:text-[#6366f1] data-[state=active]:bg-transparent data-[state=active]:shadow-none text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 transition-all"
                        >
                            <div className="flex items-center justify-center gap-2">
                                <Video className="w-4 h-4" /> 
                                <span>Video URL</span>
                            </div>
                        </TabsTrigger>
                        <TabsTrigger 
                            value="text" 
                            className="flex-1 pb-3 text-sm font-medium rounded-none shadow-none bg-transparent border-0 border-b-2 border-transparent data-[state=active]:border-[#6366f1] data-[state=active]:text-[#6366f1] data-[state=active]:bg-transparent data-[state=active]:shadow-none text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 transition-all"
                        >
                            <div className="flex items-center justify-center gap-2">
                                <FileText className="w-4 h-4" /> 
                                <span>Artikel / Teks</span>
                            </div>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="pdf" className="space-y-4 outline-none">
                        <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-[#1e293b]/50 p-6">
                             <FileUpload onChange={(files) => setFile(files[0])} accept=".pdf" />
                             {file ? (
                                 <div className="mt-4 flex items-center p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                                     <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                                     <span className="text-sm font-medium text-green-700 dark:text-green-300 truncate">{file.name}</span>
                                 </div>
                             ) : initialData && initialData.type === 'pdf' && initialData.source_url ? (
                                <div className="mt-4 flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-blue-700 dark:text-blue-300 truncate">File saat ini terlampir</p>
                                        <p className="text-xs text-blue-500 truncate">{initialData.source_url}</p>
                                    </div>
                                </div>
                             ) : null}
                        </div>
                        <p className="text-xs text-slate-500">Mendukung format PDF. Maksimal 10MB.</p>
                    </TabsContent>

                    <TabsContent value="youtube" className="space-y-4 outline-none">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">URL YouTube</label>
                            <input 
                                type="text" 
                                value={videoUrl}
                                onChange={(e) => setVideoUrl(e.target.value)}
                                placeholder="https://www.youtube.com/watch?v=..."
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 focus:border-[#6366f1] focus:ring-[#6366f1]/20 bg-white dark:bg-[#1e293b] text-slate-900 dark:text-white placeholder-gray-400 focus:ring-2 transition-all outline-none"
                            />
                        </div>
                        
                        {youtubeId ? (
                            <div className="relative pt-[56.25%] rounded-xl overflow-hidden bg-black shadow-lg">
                                <iframe 
                                    className="absolute inset-0 w-full h-full"
                                    src={`https://www.youtube.com/embed/${youtubeId}`}
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ) : videoUrl && (
                             <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-xl flex items-center gap-3">
                                 <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-500" />
                                 <p className="text-sm text-yellow-700 dark:text-yellow-400">Masukkan URL YouTube yang valid untuk melihat pratinjau.</p>
                             </div>
                        )}
                    </TabsContent>

                    <TabsContent value="text" className="space-y-4 outline-none">
                         <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Konten Materi</label>
                            <textarea
                                value={textContent}
                                onChange={(e) => setTextContent(e.target.value)}
                                rows={10}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:border-[#6366f1] focus:ring-[#6366f1]/20 bg-white dark:bg-[#1e293b] text-slate-900 dark:text-white placeholder-gray-400 focus:ring-2 transition-all outline-none resize-none font-mono text-sm leading-relaxed"
                                placeholder="Tulis materi Anda di sini... (Mendukung Markdown sederhana)"
                            ></textarea>
                            <p className="text-xs text-slate-500 text-right">Gunakan format Markdown untuk styling teks.</p>
                        </div>
                    </TabsContent>
                </Tabs>
                
                <div>
                     <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        Estimasi Durasi (Menit)
                    </label>
                    <input 
                        type="number" 
                        min="1"
                        value={duration}
                        onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
                        className="w-32 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 focus:border-[#6366f1] focus:ring-[#6366f1]/20 bg-white dark:bg-[#1e293b] text-slate-900 dark:text-white placeholder-gray-400 focus:ring-2 transition-all outline-none"
                    />
                </div>
            </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-[#0f172a] flex justify-end gap-3">
            <button 
                onClick={onClose}
                className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 rounded-xl transition-all"
            >
                Batal
            </button>
            <button 
                onClick={handleSave}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-[#6366f1] hover:bg-[#4f46e5] rounded-xl shadow-lg shadow-[#6366f1]/30 transition-all flex items-center gap-2"
            >
                {initialData ? 'Perbarui Materi' : 'Simpan Materi'}
            </button>
        </div>
      </div>
    </div>
  )
}
