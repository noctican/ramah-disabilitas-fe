import { useQueryData } from '@/hooks/api/use-global-fetch'
import { ASSIGNMENT } from '@/data/const/api_path'
import { useNavigate, useParams } from '@tanstack/react-router'
import type { ApiResponseType } from '@/data/types/api_response_types'
import type { AssignmentType } from '@/data/types/assignment_type'
import { TaskCard } from '../../-component/TaskCard'
import { Filter } from 'lucide-react'
import { useRegisterCommands } from '@/hooks/use-register-command'
import { useVoiceStore } from '@/data/store/voice_store'

export const AssignmentsPane = () => {
  const { classId } = useParams({ from: '/_public/_auth/classes/$classId/' }) // Ensure correct route ID
  const { data: assignmentsData, isLoading } = useQueryData<ApiResponseType<'multiple', AssignmentType>>(
    ASSIGNMENT.GET_COURSE_ASSIGNMENTS, 
    { course_id: classId }
  )
  const navigate = useNavigate()
  const speak = useVoiceStore(state => state.speak)

  const assignments = assignmentsData?.data || []
  
  // Group by status (Simple sorting for now: Overdue vs Upcoming)
  const now = new Date()
  const upcoming = assignments.filter(a => new Date(a.deadline) > now).sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
  const overdue = assignments.filter(a => new Date(a.deadline) <= now).sort((a, b) => new Date(b.deadline).getTime() - new Date(a.deadline).getTime()) // Most recent overdue first

  useRegisterCommands([
    {
      pattern: /^daftar tugas\s+(.+)$/i,
      description: "daftar tugas... adalah untuk membacakan daftar tugas",
      action: ([type]) => {
        const jenis = type.toLowerCase().trim()
        if (jenis.includes('terlambat')) {
          if(overdue.length == 0) {
            speak('tidak ada tugas terlambat')
            return
          }
          speak(`Anda memiliki ${overdue.length} tugas terlambat.`)
        
          const taskList = overdue.map((c, i) => `Tugas ke-${i+1}: ${c.title}`).join('. ')
          speak(`Yaitu: ${taskList}`)
        } else if(jenis.includes('mendatang')) {
          if(upcoming.length == 0) {
            speak('tidak ada tugas mendatang')
            return
          }
          speak(`Anda memiliki ${upcoming.length} tugas mendatang.`)
        
          const taskList = upcoming.map((c, i) => `Tugas ke-${i+1}: ${c.title}`).join('. ')
          speak(`Yaitu: ${taskList}`)
        } else {
          if(assignments.length == 0) {
            speak('tidak ada tugas')
            return
          }
          speak(`Anda memiliki ${assignments.length} tugas.`)
        
          const taskList = assignments.map((c, i) => `Tugas ke-${i+1}: ${c.title}`).join('. ')
          speak(`Yaitu: ${taskList}`)
        }
      }
    },
    {
      pattern: /^tugas\s+(.+)$/i,
      description: "tugas... adalah untuk menampilkan detail tugas. sertakan nama tugas setelah kata tugas.",
      action: ([target]) => {
        const targetTask = target.toLowerCase().trim()
        const assignment = assignments.find(a => a.title.toLowerCase() == targetTask)
        if(assignment) navigate({ to: `/assignments/$assignmentId`, params: { assignmentId: assignment.id.toString() } })
        else speak(`tugas ${targetTask} tidak ditemukan`)
      }
    }
  ])

  if (isLoading) {
      return <div className="text-center py-10 text-slate-500">Memuat daftar tugas...</div>
  }

  if (assignments.length === 0) {
      return (
          <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-slate-200 dark:border-zinc-700 rounded-2xl">
              <div className="w-16 h-16 bg-slate-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                  <Filter className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Belum Ada Tugas</h3>
              <p className="text-slate-500 mt-1">Hore! Tidak ada tugas yang perlu dikerjakan saat ini.</p>
          </div>
      )
  }

  return (
    <div className="flex flex-col gap-8">
      {upcoming.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                Tugas Aktif
                <span className="text-xs font-medium px-2 py-0.5 bg-[#2280c3]/10 text-[#2280c3] rounded-full">{upcoming.length}</span>
              </h2>
            </div>
            <div className="grid gap-3">
                {upcoming.map(assignment => (
                    <div key={assignment.id} className="bg-white dark:bg-zinc-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-zinc-800">
                        <TaskCard data={assignment} />
                    </div>
                ))}
            </div>
          </section>
      )}

      {overdue.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                Terlewat
                <span className="text-xs font-medium px-2 py-0.5 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 rounded-full">{overdue.length}</span>
              </h2>
            </div>
            <div className="grid gap-3">
                {overdue.map(assignment => (
                    <div key={assignment.id} className="bg-white dark:bg-zinc-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-zinc-800 opacity-75 hover:opacity-100 transition-opacity">
                        <TaskCard data={assignment} />
                    </div>
                ))}
            </div>
          </section>
      )}
    </div>
  )
}