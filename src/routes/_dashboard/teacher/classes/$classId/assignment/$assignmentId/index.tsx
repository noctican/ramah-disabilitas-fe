import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { getFetcher, postFetcher } from '@/lib/api-client'
import { toast } from 'sonner' 
import { useQueryClient } from '@tanstack/react-query'
import { ASSIGNMENT } from '@/data/const/api_path'
import { ArrowLeft, Calendar, Clock, FileText, CheckCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from 'react'

export const Route = createFileRoute('/_dashboard/teacher/classes/$classId/assignment/$assignmentId/')({
  component: AssignmentDetailPage,
})

function AssignmentDetailPage() {
  const { classId, assignmentId } = Route.useParams()
  const queryClient = useQueryClient()
  const [isGradingOpen, setIsGradingOpen] = useState(false)
  const [isAnswerOpen, setIsAnswerOpen] = useState(false)
  const [currentSubmission, setCurrentSubmission] = useState<any>(null)
  const [gradeForm, setGradeForm] = useState({ grade: '', feedback: '' })
  const [isSubmittingGrade, setIsSubmittingGrade] = useState(false)

  const handleOpenGrading = (submission: any) => {
    setCurrentSubmission(submission)
    setGradeForm({
        grade: submission.grade ? String(submission.grade) : '',
        feedback: submission.feedback || ''
    })
    setIsGradingOpen(true)
  }
  const handleOpenAnswer = (submission: any) => {
    setCurrentSubmission(submission)
    setIsAnswerOpen(true)
  }

  const handleSubmitGrade = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentSubmission) return

    const gradeValue = parseFloat(gradeForm.grade)
    if (isNaN(gradeValue) || gradeValue < 0 || gradeValue > (assignment?.max_points || 100)) {
        toast.error(`Nilai harus antara 0 - ${assignment?.max_points || 100}`)
        return
    }

    try {
        setIsSubmittingGrade(true)
        await postFetcher(ASSIGNMENT.GRADE_SUBMISSION.replace('{submission_id}', currentSubmission.id), {
            arg: {
                grade: gradeValue,
                feedback: gradeForm.feedback
            }
        })
        
        toast.success('Nilai berhasil disimpan')
        setIsGradingOpen(false)
        await queryClient.invalidateQueries({ queryKey: ['assignment-submissions', assignmentId] })
    } catch (error) {
        console.error(error)
        toast.error('Gagal menyimpan nilai')
    } finally {
        setIsSubmittingGrade(false)
    }
  }
  
  const { data: assignmentData, isLoading: isLoadingAssignment } = useQuery({
    queryKey: ['assignment-detail', assignmentId],
    queryFn: () => getFetcher(ASSIGNMENT.GET_DETAIL.replace('{assignment_id}', assignmentId))
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const assignment = (assignmentData as any)?.data

  const { data: submissionData, isLoading: isLoadingSubmissions } = useQuery({
    queryKey: ['assignment-submissions', assignmentId],
    queryFn: () => getFetcher(ASSIGNMENT.GET_SUBMISSIONS.replace('{assignment_id}', assignmentId))
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submissions = (submissionData as any)?.data || []

  const [activeTab, setActiveTab] = useState('submissions')

  if (isLoadingAssignment) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <Loader2 className="w-10 h-10 animate-spin text-primary mb-2" />
            <p className="text-slate-500">Memuat detail tugas...</p>
        </div>
      )
  }

  return (
    <div className="container mx-auto p-4 md:py-8 max-w-6xl">
      <Link 
        to="/teacher/classes/$classId" 
        params={{ classId }} 
        search={{ tab: 'assignment' } as any}
        className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Daftar Tugas
      </Link>

      {/* Header Section */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                        Tugas
                    </span>
                    {assignment?.allow_late && (
                        <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-500 text-xs font-bold uppercase tracking-wider">
                            Terlambat Diizinkan
                        </span>
                    )}
                </div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white leading-tight">{assignment?.title}</h1>
                
                <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span>Deadline: <span className="font-semibold text-slate-700 dark:text-slate-300">{new Date(assignment?.deadline).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span></span>
                    </div>
                        <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span>Pukul: <span className="font-semibold text-slate-700 dark:text-slate-300">{new Date(assignment?.deadline).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-slate-400" />
                        <span>Poin Maksimal: <span className="font-semibold text-slate-700 dark:text-slate-300">{assignment?.max_points}</span></span>
                    </div>
                </div>
            </div>
            
            <div className="flex gap-3">
            </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
         <TabsList className="bg-transparent border-b border-zinc-200 dark:border-zinc-800 w-full justify-start h-auto p-0 gap-6 rounded-none">
            <TabsTrigger 
                value="submissions"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent px-0 py-3 font-semibold text-slate-500 hover:text-slate-800 transition-all text-base focus-visible:ring-0 focus-visible:ring-offset-0 data-[state=active]:shadow-none"
            >
                Pengumpulan Siswa
            </TabsTrigger>
            <TabsTrigger 
                value="instructions"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent px-0 py-3 font-semibold text-slate-500 hover:text-slate-800 transition-all text-base focus-visible:ring-0 focus-visible:ring-offset-0 data-[state=active]:shadow-none"
            >
                Instruksi & Soal
            </TabsTrigger>
         </TabsList>

         {/* Tab: Instructions */}
         <TabsContent value="instructions" className="outline-none animate-in fade-in slide-in-from-bottom-2 duration-300">
             <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 shadow-sm">
                 <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-6">Deskripsi Tugas</h3>
                 <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed">
                     {(assignment?.description || assignment?.instruction) ? (
                        <div dangerouslySetInnerHTML={{ __html: (assignment.description || assignment.instruction).replace(/\n/g, '<br />') }} />
                     ) : (
                        <p className="italic text-slate-400">Tidak ada deskripsi tambahan untuk tugas ini.</p>
                     )}
                 </div>
                 
                 {/* Future: Attachment List */}
             </div>
         </TabsContent>

         {/* Tab: Submissions */}
         <TabsContent value="submissions" className="outline-none animate-in fade-in slide-in-from-bottom-2 duration-300">
             <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
                 <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-zinc-50/30">
                    <div>
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">Daftar Pengumpulan</h3>
                        <p className="text-sm text-slate-500">Kelola dan nilai hasil pekerjaan siswa.</p>
                    </div>
                    <div className="px-4 py-2 bg-slate-100 dark:bg-zinc-800 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300">
                        Total: <span className="font-bold text-slate-900 dark:text-white">{submissions.length}</span> Siswa
                    </div>
                 </div>
                 
                 <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-slate-500 font-semibold border-b border-zinc-200 dark:border-zinc-700">
                            <tr>
                                <th className="px-6 py-4 whitespace-nowrap">Nama Siswa</th>
                                <th className="px-6 py-4 whitespace-nowrap">Status</th>
                                <th className="px-6 py-4 whitespace-nowrap">Waktu Pengumpulan</th>
                                <th className="px-6 py-4 whitespace-nowrap">Nilai</th>
                                <th className="px-6 py-4 text-right whitespace-nowrap">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                            {isLoadingSubmissions ? (
                                <tr><td colSpan={5} className="p-12 text-center text-slate-500">
                                    <div className="flex flex-col items-center justify-center">
                                        <Loader2 className="w-6 h-6 animate-spin mb-2" />
                                        <span>Memuat data pengumpulan...</span>
                                    </div>
                                </td></tr>
                            ) : submissions.length === 0 ? (
                                <tr><td colSpan={5} className="p-12 text-center text-slate-500">
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                                            <FileText className="w-6 h-6 text-slate-400" />
                                        </div>
                                        <p className="font-medium text-slate-900">Belum ada data pengumpulan</p>
                                        <p className="text-xs mt-1">Siswa belum mengumpulkan tugas ini.</p>
                                    </div>
                                </td></tr>
                            ) : (
                                submissions.map((sub: any) => (
                                    <tr key={sub.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="hidden w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 lg-flex items-center justify-center font-bold text-xs shrink-0">
                                                    {(sub.student_name || sub.student?.name || 'S')[0]?.toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900 dark:text-white">{sub.student_name || sub.student?.name || 'Unknown Student'}</p>
                                                    <p className="text-xs text-slate-400">{sub.student_email || sub.student?.email || '-'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {sub.submitted_at ? (
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800/50">
                                                    <CheckCircle className="w-3 h-3 mr-1.5" /> Diserahkan
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                                                    Belum menyerahkan
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                                            {sub.submitted_at ? new Date(sub.submitted_at).toLocaleString('id-ID', {
                                                day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                                            }) : '-'}
                                        </td>
                                        <td className="px-6 py-4 flex">
                                            {sub.grade !== null && sub.grade !== undefined ? (
                                                <span className="font-bold text-slate-900 dark:text-white bg-slate-100 px-2 py-1 rounded-md border border-slate-200">
                                                    {sub.grade} <span className="text-slate-400 font-normal text-xs">/ {assignment?.max_points}</span>
                                                </span>
                                            ) : (
                                                <span className="text-slate-400 italic text-xs">Belum dinilai</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className='d-flex gap-1'>
                                                <Button 
                                                    size="sm" 
                                                    variant="outline" 
                                                    className="h-8 text-xs font-semibold shadow-sm"
                                                    onClick={() => handleOpenGrading(sub)}
                                                >
                                                    {sub.grade ? "Ubah Nilai" : "Beri Nilai"}
                                                </Button>
                                                <Button 
                                                    size="sm" 
                                                    variant="outline" 
                                                    className="h-8 text-xs font-semibold shadow-sm"
                                                    onClick={() => handleOpenAnswer(sub)}
                                                >
                                                    Lihat Jawaban
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                 </div>
             </div>
         </TabsContent>
      </Tabs>

      <Dialog open={isGradingOpen} onOpenChange={setIsGradingOpen}>
        <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
            <DialogTitle>Beri Nilai</DialogTitle>
            <DialogDescription>
                Masukkan nilai dan feedback untuk {currentSubmission?.student_name || 'siswa ini'}.
            </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmitGrade}>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="grade">Nilai (Maks: {assignment?.max_points})</Label>
                        <Input
                        id="grade"
                        type="number"
                        placeholder="0"
                        value={gradeForm.grade}
                        onChange={(e) => setGradeForm({ ...gradeForm, grade: e.target.value })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="feedback">Feedback (Opsional)</Label>
                        <Textarea
                        id="feedback"
                        placeholder="Berikan masukan untuk siswa..."
                        value={gradeForm.feedback}
                        onChange={(e) => setGradeForm({ ...gradeForm, feedback: e.target.value })}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsGradingOpen(false)}>Batal</Button>
                    <Button type="submit" disabled={isSubmittingGrade}>
                        {isSubmittingGrade && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        Simpan Nilai
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isAnswerOpen} onOpenChange={setIsAnswerOpen}>
        <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
            <DialogTitle>Jawaban {currentSubmission?.student?.name || 'siswa'}</DialogTitle>
            </DialogHeader>
            <DialogDescription>
                {currentSubmission?.text_answer}
            </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  )
}
