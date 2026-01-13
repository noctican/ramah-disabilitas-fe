import { Link, createFileRoute } from '@tanstack/react-router'
import PublicHeaderGap from '@/layout/PublicHeaderGap'
import { 
  Plus, 
  School, 
  Calculator, 
  History, 
  ArrowRight, 
  Lightbulb, 
  Check,
} from 'lucide-react'
import { useState } from 'react'
import { JoinClassDialog } from './-component/JoinClassDialog'
import { useQueryData } from '@/hooks/api/use-global-fetch'
import { COURSE } from '@/data/const/api_path'
import type { ApiResponseType } from '@/data/types/api_response_types'
import { ClassCard } from './-component/ClassCard'
import type { JoinedCourse } from '@/data/types/course_type'
import { TaskCard } from './-component/TaskCard'
import { ASSIGNMENT } from '@/data/const/api_path'
import type { AssignmentType } from '@/data/types/assignment_type'

export const Route = createFileRoute('/_public/_auth/classes/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false)
  const [assignmentFilter, setAssignmentFilter] = useState<'upcoming' | 'overdue' | ''>('')
  
  const { data } = useQueryData<ApiResponseType<'multiple', JoinedCourse>>(COURSE.JOINED)
  const { data: assignmentsData } = useQueryData<ApiResponseType<'multiple', AssignmentType>>(ASSIGNMENT.MY_ASSIGNMENTS, { filter: assignmentFilter })

  return (
    <div className="flex flex-col min-h-screen bg-[#f9fafb] dark:bg-[#2a3d50] font-sans text-[#131616] dark:text-white">
      <JoinClassDialog isOpen={isJoinDialogOpen} setIsOpen={setIsJoinDialogOpen} />
      <PublicHeaderGap />
      
      {/* Main Content Area - Full width container matching public layout */}
      <main className="flex-1 w-full p-4 lg:p-8">
        <div className="container mx-auto max-w-7xl space-y-8 pb-10">
          
          {/* Hero Section */}
          <section className="bg-white dark:bg-[#1e2d3b] rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#f1f3f3] dark:border-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-[#131616] dark:text-white text-3xl font-black leading-tight tracking-[-0.03em]">Selamat datang kembali, Jane! 👋</h2>
              <p className="text-[#6b7c80] dark:text-gray-400 text-base font-normal">Anda memiliki <span className="font-bold text-[#2d6a76]">3 tugas</span> yang harus dikumpulkan minggu ini.</p>
            </div>
            <button 
              onClick={() => setIsJoinDialogOpen(true)}
              className="flex items-center justify-center gap-2 bg-[#2d6a76] hover:bg-[#245660] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-[0_4px_10px_rgba(45,106,118,0.3)] hover:shadow-[0_6px_15px_rgba(45,106,118,0.4)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Plus className="w-5 h-5" />
              <span>Gabung Kelas</span>
            </button>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* My Classes (Left - 8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-[#131616] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">Kelas Saya</h3>
                <Link to="/classes" className="text-sm font-bold text-[#2d6a76] hover:text-[#1e4a52] transition-colors">Lihat Semua</Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* 
                    Note: Currently displaying hardcoded rich cards. 
                    Once API data is fully ready to be mapped to this rich layout, 
                    we can iterate over `data.data`.
                 */}
                {data?.data?.map((course) => (
                  <ClassCard key={course.id} data={course} />
                ))}
                
                {/* Empty State / Join New Class Hint */}
                <div 
                    onClick={() => setIsJoinDialogOpen(true)}
                    className="bg-[#f1f3f3] dark:bg-white/5 rounded-2xl border-2 border-dashed border-[#d1d5db] dark:border-gray-700 p-4 flex flex-col items-center justify-center min-h-[250px] group cursor-pointer hover:border-[#2d6a76]/50 transition-colors"
                >
                  <div className="bg-white dark:bg-white/10 p-4 rounded-full mb-3 group-hover:scale-110 transition-transform">
                    <Plus className="text-gray-400 w-8 h-8" />
                  </div>
                  <p className="text-[#131616] dark:text-white font-bold text-base">Bergabung dengan Kelas</p>
                  <p className="text-[#6b7c80] dark:text-gray-400 text-sm text-center px-4 mt-1">Cari kelas baru untuk bergabung.</p>
                </div>
              </div>
            </div>
            {/* Assignments Panel (Right - 4 cols) */}
            {/* Assignments Panel (Right - 4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center justify-between">
                 <h3 className="text-[#131616] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">Tugas Terbaru</h3>
                 <div className="flex gap-2 text-xs">
                    <button onClick={() => setAssignmentFilter('')} className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${assignmentFilter === '' ? 'bg-[#2d6a76] text-white' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>Semua</button>
                    <button onClick={() => setAssignmentFilter('upcoming')} className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${assignmentFilter === 'upcoming' ? 'bg-[#2d6a76] text-white' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>Aktif</button>
                    <button onClick={() => setAssignmentFilter('overdue')} className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${assignmentFilter === 'overdue' ? 'bg-red-500 text-white' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>Terlewat</button>
                 </div>
              </div>

              <div className="bg-white dark:bg-[#1e2d3b] rounded-2xl shadow-sm border border-[#f1f3f3] dark:border-gray-800 p-6">
                <div className="flex flex-col gap-5">
                  {assignmentsData?.data?.length === 0 ? (
                      <p className="text-center text-gray-500 text-sm py-4">Tidak ada tugas.</p>
                  ) : (
                      assignmentsData?.data?.map((assignment, index) => (
                          <div key={assignment.id}>
                              <TaskCard data={assignment} />
                              {index < (assignmentsData.data!.length - 1) && <div className="h-px bg-gray-100 dark:bg-gray-700 w-full mt-5"></div>}
                          </div>
                      ))
                  )}
                </div>
                <button className="w-full mt-5 py-3 rounded-xl border border-[#f1f3f3] dark:border-gray-700 text-[#6b7c80] dark:text-gray-300 font-bold text-sm hover:bg-[#f9fafb] dark:hover:bg-gray-800 flex items-center justify-center gap-2 group transition-all cursor-pointer">
                  <span>Lihat Semua Tugas</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Study Tip Card */}
              <div className="bg-gradient-to-br from-[#2d6a76] to-[#245660] rounded-2xl p-6 text-white relative overflow-hidden shadow-lg">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Lightbulb className="w-24 h-24 rotate-12" />
                </div>
                <div className="relative z-10">
                  <div className="bg-white/20 w-fit p-2 rounded-lg mb-3">
                    <Lightbulb className="w-5 h-5 text-yellow-300" />
                  </div>
                  <h4 className="font-bold text-lg mb-1">Tips Belajar Hari Ini</h4>
                  <p className="text-blue-50 text-sm leading-relaxed mb-4">Bagilah sesi belajar Anda menjadi sesi 25 menit dengan istirahat 5 menit untuk menjaga fokus.</p>
                  <button className="bg-white text-[#2d6a76] px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-50 transition-colors cursor-pointer">Baca Selengkapnya</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
