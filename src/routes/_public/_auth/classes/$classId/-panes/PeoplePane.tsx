import { useRegisterCommands } from '@/hooks/use-register-command'
import { 
  Presentation, 
  Users
} from 'lucide-react'
import { useVoiceStore } from '@/data/store/voice_store'
import { useEffect, useRef } from 'react'
import { useQueryData } from '@/hooks/api/use-global-fetch'
import { COURSE } from '@/data/const/api_path'
import { useParams } from '@tanstack/react-router'
import { type ApiResponseType } from '@/data/types/api_response_types'

interface MemberType {
  id: number
  name: string
  role: string
  accessibility_profile?: any
}

interface MembersData {
  lecturer: MemberType
  students: MemberType[]
}

export const PeoplePane = () => {
  const speak = useVoiceStore((state) => state.speak)
  const { classId } = useParams({ from: '/_public/_auth/classes/$classId/' })

  const { data: membersData } = useQueryData<ApiResponseType<'single', MembersData>>(COURSE.MEMBERS, { course_id: classId })
  
  const lecturer = membersData?.data?.lecturer
  const students = membersData?.data?.students || []
  const teacherName = lecturer?.name || "Pengajar Kelas"

  const studentsRef = useRef(students)
  useEffect(() => {
    studentsRef.current = students
  }, [students])

  const teacherRef = useRef(teacherName)
  useEffect(() => {
    teacherRef.current = teacherName
  }, [teacherName])

  useRegisterCommands([
    {
      pattern: /^daftar\s+(.+)$/i,
      description: "daftar... adalah untuk membacakan daftar yang ada. bisa berupa: orang, pengajar, pelajar",
      action: ([type]) => {
        const target = type.toLowerCase()
        if (target.includes('pengajar') || target.includes('guru') || target.includes('dosen')) {
            speak(`Pengajar di kelas ini adalah ${teacherRef.current}`)
        } else if (target.includes('pelajar') || target.includes('siswa') || target.includes('teman') || target.includes('murid')) {
            if (studentsRef.current.length === 0) {
              speak("Belum ada teman sekelas yang terdaftar.")
              return
            }
            const names = studentsRef.current.slice(0, 3).map(s => s.name).join(', ')
            const suffix = studentsRef.current.length > 3 ? "dan lain-lain." : "."
            speak(`Terdapat ${studentsRef.current.length} teman sekelas, diantaranya: ${names} ${suffix}`)
        } else if (target.includes('orang') || target.includes('anggota') || target.includes('semua')) {
            speak(`Daftar anggota kelas: Pengajar adalah ${teacherRef.current}. Dan terdapat ${studentsRef.current.length} teman sekelas.`)
        } else {
            speak("Maaf, saya tidak mengerti siapa yang dimaksud. Coba katakan 'daftar pengajar' atau 'daftar teman sekelas'")
        }
      }
    }
  ])

  useEffect(() => {
    speak("Ini adalah panel anggota. Katakan 'daftar pengajar' atau 'daftar teman' untuk mengetahui anggota kelas.")
  }, [])
  
  return (
    <div className="flex flex-col gap-10">
      <section>
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-5 flex items-center gap-2">
          <Presentation className="w-5 h-5 text-[#2280c3]" /> Pengajar
        </h2>
        <div className="p-4 rounded-2xl border border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-800/40 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] grid grid-cols-1 gap-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-200 to-slate-300 dark:from-zinc-700 dark:to-zinc-600 flex-shrink-0 flex items-center justify-center shadow-inner overflow-hidden">
              <span className="font-bold text-slate-400 dark:text-zinc-500">
                {teacherName.substring(0, 2).toUpperCase()}
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{teacherName}</h3>
          </div>
        </div>
      </section>

      <section>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pt-4 border-t border-slate-100 dark:border-zinc-800">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <Users className="w-5 h-5 text-[#2280c3]" />
            Teman Sekelas
            <span className="ml-2 text-xs font-bold px-2.5 py-1 bg-slate-100 dark:bg-zinc-800 text-slate-500 rounded-full">{students.length} Pelajar</span>
          </h2>
        </div>
        <div className="p-4 rounded-2xl border border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-800/40 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] grid grid-cols-1 gap-2">
        {students.length === 0 ? (
           <p className="text-center text-slate-500 py-4">Belum ada siswa.</p>
        ) : (
          students.map((student, i) => (
            <div key={student.id || i}>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-200 to-slate-300 dark:from-zinc-700 dark:to-zinc-600 flex-shrink-0 flex items-center justify-center shadow-inner overflow-hidden">
                  <span className="font-bold text-slate-400 dark:text-zinc-500">{student.name.substring(0, 2).toUpperCase()}</span>
                </div>
                <div className='flex flex-col'>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{student.name}</h3>
                    {student.accessibility_profile && (
                        <span className='text-xs text-slate-500'>Profil aksesibilitas tersedia</span>
                    )}
                </div>
              </div>
              {i !== students.length - 1 && (
                <div className='border-b border-slate-100 dark:border-zinc-800 my-2'></div>
              )}
            </div>
          ))
        )}
        </div>

      </section>
    </div>
  )
}