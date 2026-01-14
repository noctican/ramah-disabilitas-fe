import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { 
    Check, 
    AlertCircle, 
    Loader2, 
    Bold, 
    Italic, 
    List, 
    Link as LinkIcon, 
    Image as ImageIcon,
    Clock
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { getFetcher, postFetcher } from '@/lib/api-client'
import { ASSIGNMENT, COURSE } from '@/data/const/api_path'

export const Route = createFileRoute('/_dashboard/teacher/classes/$classId/assignment/create')({
  component: CreateAssignmentPage,
})

function CreateAssignmentPage() {
  const { classId } = Route.useParams()
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    points: 100,
    dueDate: '',
    dueTime: '23:59',
    moduleId: '' as string | number, // Add module selection
    allowLate: true,
    allowFile: true,
    allowText: false
  })

  // Fetch course modules for the dropdown
  const { data: courseData } = useQuery({
      queryKey: ['lecturer-course', classId],
      queryFn: () => getFetcher(COURSE.DETAIL.replace('{course_id}', classId)),
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const modules = (courseData as any)?.data?.modules || []

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      if (!formData.title || !formData.dueDate) {
          toast.error('Mohon lengkapi judul dan tanggal tenggat tugas')
          return
      }

      if (!formData.description) {
        toast.error('Mohon isi instruksi tugas')
        return
      }

      try {
          setLoading(true)

          const deadlineISO = new Date(`${formData.dueDate}T${formData.dueTime}:00`).toISOString()

          const payload = {
            title: formData.title,
            instruction: formData.description, // API expects 'instruction', state is 'description'
            module_id: formData.moduleId ? Number(formData.moduleId) : null,
            max_points: Number(formData.points),
            deadline: deadlineISO,
            allow_file: formData.allowFile,
            allow_text: formData.allowText,
            allow_late: formData.allowLate
          }
          
          await postFetcher(ASSIGNMENT.CREATE.replace('{course_id}', classId), { arg: payload })
          
          toast.success('Tugas berhasil dibuat')
          history.back()
      } catch (error) {
          console.error(error)
          toast.error('Gagal membuat tugas. Silakan coba lagi.')
      } finally {
          setLoading(false)
      }
  }

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#ffffff] dark:bg-[#22262a] font-sans text-[#121617] dark:text-white">
        
        {/* Header */}
        <header className="h-16 border-b border-[#f1f3f4] dark:border-gray-700 bg-white dark:bg-[#22262a] px-4 sm:px-8 flex items-center justify-between sticky top-0 z-10 shrink-0">
            <div className="flex items-center gap-2 text-sm">
                <Link to="/teacher/classes" className="text-[#677c83] hover:text-[#2e95b8] transition-colors">Kelas</Link>
                <span className="text-[#677c83]">/</span>
                <Link to="/teacher/classes/$classId" params={{ classId }} className="text-[#677c83] hover:text-[#2e95b8] transition-colors">{classId}</Link>
                <span className="text-[#677c83]">/</span>
                <span className="font-semibold text-[#121617] dark:text-white">Buat Tugas Baru</span>
            </div>
            <div className="flex items-center gap-3">
                <button 
                    onClick={() => history.back()}
                    className="px-4 py-2 text-sm font-bold text-[#BF4F4F] hover:bg-[#BF4F4F]/10 rounded-lg transition-all"
                >
                    Batalkan
                </button>
                <button className="hidden sm:block px-4 py-2 text-sm font-bold text-[#3D8C5A] border border-[#3D8C5A]/30 hover:bg-[#3D8C5A]/5 rounded-lg transition-all">
                    Simpan Draft
                </button>
                <button 
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-6 py-2 text-sm font-bold text-white bg-[#2e95b8] hover:bg-[#2e95b8]/90 rounded-lg shadow-sm transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                    Buat Tugas
                </button>
            </div>
        </header>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="p-4 sm:p-8 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Main Form Column */}
                <div className="lg:col-span-2 space-y-8">
                    <div>
                        <h2 className="text-3xl font-black tracking-tight mb-6">Buat Tugas</h2>
                        <div className="space-y-6">
                            
                            {/* Title Field */}
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-[#677c83]">Judul Tugas <span className="text-red-500">*</span></label>
                                <input 
                                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-[#dde2e4] dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#2e95b8]/20 focus:border-[#2e95b8] outline-none transition-all text-lg font-medium" 
                                    placeholder="Contoh: Makalah Penelitian Tengah Semester: Jaringan Saraf Tiruan" 
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                />
                            </div>

                            {/* Instructions Field */}
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-[#677c83]">Instruksi <span className="text-red-500">*</span></label>
                                <div className="border border-[#dde2e4] dark:border-gray-600 rounded-xl overflow-hidden focus-within:border-[#2e95b8] transition-all bg-white dark:bg-gray-800">
                                    <div className="bg-[#F5F8FA] dark:bg-gray-800/50 border-b border-[#dde2e4] dark:border-gray-600 px-4 py-2 flex gap-4">
                                        <button className="text-gray-500 hover:text-[#2e95b8] p-1"><Bold className="w-4 h-4" /></button>
                                        <button className="text-gray-500 hover:text-[#2e95b8] p-1"><Italic className="w-4 h-4" /></button>
                                        <button className="text-gray-500 hover:text-[#2e95b8] p-1"><List className="w-4 h-4" /></button>
                                        <button className="text-gray-500 hover:text-[#2e95b8] p-1"><LinkIcon className="w-4 h-4" /></button>
                                        <button className="text-gray-500 hover:text-[#2e95b8] p-1"><ImageIcon className="w-4 h-4" /></button>
                                    </div>
                                    <textarea 
                                        className="w-full p-4 h-64 bg-white dark:bg-gray-800 border-none focus:ring-0 text-base resize-none outline-none" 
                                        placeholder="Berikan instruksi rinci untuk siswa Anda..."
                                        value={formData.description}
                                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    ></textarea>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Sidebar Context Column */}
                <div className="lg:col-span-1 space-y-6">
                    
                    {/* Module Section */}
                    <div className="bg-[#F5F8FA] dark:bg-gray-800/40 p-6 rounded-xl border border-[#f1f3f4] dark:border-gray-700 shadow-sm">
                        <label className="text-xs font-bold uppercase tracking-widest text-[#677c83] mb-4 block">Metadata Tugas</label>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-semibold mb-2">Modul</p>
                                <select 
                                    className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-[#dde2e4] dark:border-gray-600 rounded-lg text-sm focus:ring-[#2e95b8] focus:border-[#2e95b8] outline-none"
                                    value={formData.moduleId}
                                    onChange={(e) => setFormData({...formData, moduleId: e.target.value})}
                                >
                                    <option value="">Pilih modul... (Opsional)</option>
                                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                    {modules.map((m: any) => (
                                        <option key={m.id} value={m.id}>{m.title}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <p className="text-sm font-semibold mb-2">Total Poin <span className="text-red-500">*</span></p>
                                <div className="relative">
                                    <input 
                                        className="w-full bg-white dark:bg-gray-800 border border-[#dde2e4] dark:border-gray-600 rounded-lg text-sm pl-4 pr-10 py-2 focus:ring-[#2e95b8] focus:border-[#2e95b8] outline-none" 
                                        type="number" 
                                        value={formData.points}
                                        onChange={(e) => setFormData({...formData, points: parseInt(e.target.value) || 0})}
                                    />
                                    <span className="absolute right-3 top-2 text-[#677c83] text-xs font-bold uppercase">poin</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Scheduling Section */}
                    <div className="bg-[#F5F8FA] dark:bg-gray-800/40 p-6 rounded-xl border border-[#f1f3f4] dark:border-gray-700 shadow-sm">
                        <label className="text-xs font-bold uppercase tracking-widest text-[#677c83] mb-4 block">Jadwal</label>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-semibold mb-2">Tanggal Tenggat <span className="text-red-500">*</span></p>
                                <div className="relative">
                                    <input 
                                        className="w-full bg-white dark:bg-gray-800 border border-[#dde2e4] dark:border-gray-600 rounded-lg text-sm px-4 py-2 focus:ring-[#2e95b8] focus:border-[#2e95b8] outline-none" 
                                        type="date"
                                        value={formData.dueDate}
                                        onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-semibold mb-2">Waktu Tenggat</p>
                                <div className="relative">
                                    <input 
                                        className="w-full bg-white dark:bg-gray-800 border border-[#dde2e4] dark:border-gray-600 rounded-lg text-sm px-4 py-2 focus:ring-[#2e95b8] focus:border-[#2e95b8] outline-none" 
                                        type="time" 
                                        value={formData.dueTime}
                                        onChange={(e) => setFormData({...formData, dueTime: e.target.value})}
                                    />
                                </div>
                            </div>
                            <p className="text-[10px] text-[#677c83] italic flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                Zona Waktu: Asia/Jakarta
                            </p>
                        </div>
                    </div>

                    {/* Submission Settings */}
                    <div className="bg-[#F5F8FA] dark:bg-gray-800/40 p-6 rounded-xl border border-[#f1f3f4] dark:border-gray-700 shadow-sm">
                        <label className="text-xs font-bold uppercase tracking-widest text-[#677c83] mb-4 block">Pengaturan Pengumpulan</label>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-semibold mb-3">Tipe Pengumpulan <span className="text-red-500">*</span></p>
                                <div className="flex flex-wrap gap-2">
                                    <button 
                                        onClick={() => setFormData({...formData, allowFile: !formData.allowFile})}
                                        className={cn(
                                            "px-3 py-1.5 rounded-full text-xs font-bold border transition-all flex items-center gap-1",
                                            formData.allowFile
                                                ? "bg-[#2e95b8] text-white border-[#2e95b8]" 
                                                : "border-[#dde2e4] hover:border-[#2e95b8] hover:text-[#2e95b8]"
                                        )}
                                    >
                                        {formData.allowFile && <Check className="w-3 h-3" />} Unggah File
                                    </button>
                                    <button 
                                        onClick={() => setFormData({...formData, allowText: !formData.allowText})}
                                        className={cn(
                                            "px-3 py-1.5 rounded-full text-xs font-bold border transition-all flex items-center gap-1",
                                            formData.allowText 
                                                ? "bg-[#2e95b8] text-white border-[#2e95b8]" 
                                                : "border-[#dde2e4] hover:border-[#2e95b8] hover:text-[#2e95b8]"
                                        )}
                                    >
                                        {formData.allowText && <Check className="w-3 h-3" />} Teks Online
                                    </button>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-sm font-semibold">Pengumpulan Terlambat</p>
                                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                        <input 
                                            checked={formData.allowLate}
                                            onChange={(e) => setFormData({...formData, allowLate: e.target.checked})}
                                            type="checkbox" 
                                            id="toggle" 
                                            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-[#dde2e4] checked:right-0 checked:border-[#2e95b8] transition-all"
                                        />
                                        <label htmlFor="toggle" className={cn(
                                            "toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-colors",
                                            formData.allowLate ? "bg-[#2e95b8]" : "bg-gray-300"
                                        )}></label>
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-[#dde2e4] dark:border-gray-700">
                                    <p className="text-[11px] text-[#677c83] leading-relaxed">Potong 10% untuk setiap hari keterlambatan. Tidak menerima pengumpulan setelah 5 hari.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Helpful Tips */}
                    <div className="p-4 bg-[#2e95b8]/5 rounded-xl border border-[#2e95b8]/20">
                        <div className="flex gap-3">
                            <AlertCircle className="text-[#2e95b8] w-6 h-6 shrink-0" />
                            <div>
                                <p className="text-xs font-bold text-[#2e95b8] uppercase mb-1">Tips Cepat</p>
                                <p className="text-xs text-[#677c83] leading-relaxed">Siswa dapat melihat rubrik penilaian Anda segera setelah tugas diterbitkan.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        
        <style>{`
            .toggle-checkbox:checked {
                right: 0;
                border-color: #2e95b8;
            }
            .toggle-checkbox {
                right: 1rem;
                transition: all 0.3s;
            }
        `}</style>
    </div>
  )
}
