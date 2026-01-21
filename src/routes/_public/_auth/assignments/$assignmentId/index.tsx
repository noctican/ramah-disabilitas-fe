import { createFileRoute, Link } from '@tanstack/react-router'
import { 
    Clock, 
    Calendar, 
    Upload, 
    FileText, 
    AlertCircle, 
    CheckCircle,
    ArrowLeft,
    Download
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { SubmitAssignmentDialog } from './-components/SubmitAssignmentDialog'
import { useQueryData } from '@/hooks/api/use-global-fetch'
import { ASSIGNMENT } from '@/data/const/api_path'
import type { ApiResponseType } from '@/data/types/api_response_types'
import type { AssignmentType } from '@/data/types/assignment_type'
import PublicHeaderGap from '@/layout/PublicHeaderGap'
import { useRegisterCommands } from '@/hooks/use-register-command'
import { useVoiceStore } from '@/data/store/voice_store'
import dayjs from 'dayjs'

export const Route = createFileRoute('/_public/_auth/assignments/$assignmentId/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { assignmentId } = Route.useParams()
  const [isSubmitOpen, setIsSubmitOpen] = useState(false)
  const { data: assignmentData, isLoading } = useQueryData<ApiResponseType<'single', AssignmentType>>(
    ASSIGNMENT.GET_DETAIL, 
    { assignment_id: assignmentId }
  )
  const speak = useVoiceStore(state => state.speak)

  const assignment = assignmentData?.data

  const assignmentRef = useRef(assignment)
  useEffect(() => {
    assignmentRef.current = assignment
  }, [assignment])

  useRegisterCommands([
    {
        pattern: /^bacakan\s(.+)$/i,
        description: "bacakan... adalah untuk membacakan bagian tugas. Contoh, bacakan judul, bacakan instruksi, bacakan tenggat",
        action: ([type]) => {
            const cleanType = type.toLowerCase().trim()
            if (cleanType === 'judul') speak(assignmentRef.current?.title || '')
            if (cleanType === 'instruksi') speak(assignmentRef.current?.instruction || '')
            if (cleanType === 'tenggat') speak(dayjs(assignmentRef.current?.deadline).format('DD MMMM YYYY, HH:mm') || '')
            if(cleanType === 'jenis pengumpulan') speak(`diizinkan untuk menjawab dengan ${assignmentRef.current?.allow_file ? 'file' : ''}, ${assignmentRef.current?.allow_text ? 'teks' : ''}`)
        }
    }, {
        pattern: /^jawab$/i,
        description: "jawab adalah membuka form untuk mengirimkan jawaban anda",
        action: () => {
            setIsSubmitOpen(true)
        }
    }
  ])

  if (isLoading) {
      return (
          <div className="flex flex-col min-h-screen bg-[#f9fafb] dark:bg-[#1a202c]">
              <PublicHeaderGap />
              <div className="container mx-auto px-4 py-8 max-w-4xl flex items-center justify-center">
                  <p className="text-slate-500">Memuat detail tugas...</p>
              </div>
          </div>
      )
  }

  if (!assignment) {
      return (
          <div className="flex flex-col min-h-screen bg-[#f9fafb] dark:bg-[#1a202c]">
              <PublicHeaderGap />
              <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
                  <p className="text-slate-500">Tugas tidak ditemukan.</p>
              </div>
          </div>
      )
  }

  const deadline = new Date(assignment.deadline)
  const isOverdue = new Date() > deadline
  const submission = assignment.my_submission
  const isSubmitted = !!submission

  return (
    <>
        <PublicHeaderGap />
      
        <div className="container mx-auto max-w-6xl px-4">
            {/* Breadcrumb / Back Navigation */}
                <Link to="/assignments" className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary transition-colors group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Kembali ke Daftar Tugas
                </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content: Assignment Details */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-[#2d3748] rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                        <div className="flex justify-between items-start mb-4">
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">{assignment.title}</h1>
                            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-full uppercase tracking-wider">
                                {assignment.max_points} Poin
                            </span>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6 pb-6 border-b border-slate-100 dark:border-slate-700">
                            <div className={`flex items-center gap-2 ${isOverdue ? 'text-red-500' : 'text-slate-500'}`}>
                                <Clock className="w-4 h-4" />
                                <span>Tenggat: {deadline.toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' })}</span>
                            </div>
                            <div className="w-1 h-1 bg-slate-300 rounded-full hidden sm:block"></div>
                            <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                <span>Modul {assignment.module_id || '-'}</span>
                            </div>
                        </div>

                        <div className="prose dark:prose-invert max-w-none">
                            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Instruksi</h3>
                            <div className="text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                                {assignment.instruction}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar: Submission Status */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white dark:bg-[#2d3748] rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 sticky top-24">
                        <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-white">Status Pengumpulan</h3>
                        
                        {isSubmitted ? (
                             <div className="space-y-4">
                                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-bold text-green-700 dark:text-green-300">Sudah Dikumpulkan</p>
                                        <p className="text-xs text-green-600 dark:text-green-400 mt-0.5">
                                            {new Date(submission.submitted_at).toLocaleString('id-ID')}
                                        </p>
                                    </div>
                                </div>

                                {submission.grade > 0 ? (
                                    <div className="bg-primary/10 dark:bg-primary/20 border border-primary/20 rounded-xl p-4 text-center">
                                        <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Nilai Anda</p>
                                        <p className="text-3xl font-black text-primary dark:text-white">{submission.grade}<span className="text-base font-medium text-slate-400">/100</span></p>
                                    </div>
                                ) : (
                                    <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800 rounded-xl p-4">
                                        <p className="text-xs text-amber-600 dark:text-amber-400 font-medium text-center">Menunggu penilaian instruktur</p>
                                    </div>
                                )}

                                {submission.text_answer && (
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Jawaban Teks</p>
                                        <div className="p-3 bg-slate-50 dark:bg-black/20 rounded-lg text-sm text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-700 max-h-32 overflow-y-auto">
                                            {submission.text_answer}
                                        </div>
                                    </div>
                                )}
                                
                                {submission.file_url && (
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">File Terlampir</p>
                                        <a href={submission.file_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-black/20 rounded-lg text-sm text-primary hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors border border-slate-100 dark:border-slate-700">
                                            <Download className="w-4 h-4" />
                                            <span>Lihat File Submission</span>
                                        </a>
                                    </div>
                                )}
                             </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="bg-slate-50 dark:bg-black/20 border border-slate-100 dark:border-slate-700 rounded-xl p-4 flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-slate-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Belum Ada Pengumpulan</p>
                                        <p className="text-xs text-slate-500 mt-0.5">Silakan kirim tugas sebelum tenggat waktu.</p>
                                    </div>
                                </div>
                                
                                {isOverdue && !assignment.allow_late ? (
                                    <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl text-center">
                                        <p className="text-sm font-bold text-red-600 dark:text-red-400">Maaf, waktu pengumpulan sudah habis.</p>
                                    </div>
                                ) : (
                                    <button 
                                        onClick={() => setIsSubmitOpen(true)}
                                        className="w-full py-2.5 bg-primary hover:bg-primary-600 text-white font-bold rounded-xl shadow-[0_0_15px] shadow-primary/25 transition-all active:scale-95 cursor-pointer"
                                    >
                                        Kirim Jawaban
                                    </button>
                                )}
                            </div>
                        )}
                        
                        <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Jenis Pengumpulan</p>
                            <div className="flex gap-2">
                                {assignment.allow_text && <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-bold rounded uppercase">Teks</span>}
                                {assignment.allow_file && <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-bold rounded uppercase">File</span>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {assignment && (
            <SubmitAssignmentDialog 
                isOpen={isSubmitOpen} 
                setIsOpen={setIsSubmitOpen} 
                assignmentId={assignmentId}
                allowText={assignment.allow_text}
                allowFile={assignment.allow_file}
            />
        )}
    </>
  )
}
