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

export const Route = createFileRoute('/_public/_auth/classes/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false)
  const { data } = useQueryData<ApiResponseType<'multiple'>>(COURSE.JOINED)

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
              <h2 className="text-[#131616] dark:text-white text-3xl font-black leading-tight tracking-[-0.03em]">Welcome back, Jane! 👋</h2>
              <p className="text-[#6b7c80] dark:text-gray-400 text-base font-normal">You have <span className="font-bold text-[#2d6a76]">3 assignments</span> due this week.</p>
            </div>
            <button 
              onClick={() => setIsJoinDialogOpen(true)}
              className="flex items-center justify-center gap-2 bg-[#2d6a76] hover:bg-[#245660] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-[0_4px_10px_rgba(45,106,118,0.3)] hover:shadow-[0_6px_15px_rgba(45,106,118,0.4)] transition-all transform hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5" />
              <span>Join Class</span>
            </button>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* My Classes (Left - 8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-[#131616] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">My Classes</h3>
                <Link to="/classes" className="text-sm font-bold text-[#2d6a76] hover:text-[#1e4a52] transition-colors">View All</Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* 
                    Note: Currently displaying hardcoded rich cards. 
                    Once API data is fully ready to be mapped to this rich layout, 
                    we can iterate over `data.data`.
                 */}
                {/* Class Card 1 */}
                <Link to='/classes/$classId' params={{ classId: '1' }} className="bg-white dark:bg-[#1e2d3b] rounded-2xl border border-[#f1f3f3] dark:border-gray-800 p-4 shadow-sm hover:shadow-md transition-shadow group flex flex-col cursor-pointer">
                  <div
                    className="aspect-video w-full rounded-xl bg-gray-100 bg-cover bg-center relative overflow-hidden"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB0GqLCdiSZTdepp5saQIiv7PYp7rcQRxtrROGMAoFV_9upqPM74ew4JWTV1Jofkg--IxT0vKh1GCJ8Hv69uyBQI98eWMJYrAYEIJXeXxiNMnx1bVwc__oQM4mOWoD8vOnNyKM-GT54zTgvMQ4R1TjlmeUsqe_aLWQb8Z9jUwtyP2ZJ4dPtHO7a1elW5MynXU_2WZwIwh8wSivIJkH5pJwDay9fvFa4FQenqn1s_xzj6E2zqAzvXTc5BrJSUonxvMRdRDnepACiDrpm")' }}
                  >
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-[#2d6a76] shadow-sm">BIO-101</div>
                  </div>
                  <div className="pt-4 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-[#131616] dark:text-white text-lg font-bold leading-tight group-hover:text-[#2d6a76] transition-colors">Introduction to Biology</h4>
                      {/* Circular Progress */}
                      <div className="relative w-10 h-10 shrink-0">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                          <path className="text-[#f1f3f3] dark:text-gray-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"></path>
                          <path className="text-[#2d6a76] drop-shadow-sm" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="75, 100" strokeLinecap="round" strokeWidth="3"></path>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-[#2d6a76]">75%</div>
                      </div>
                    </div>
                    <p className="text-[#6b7c80] dark:text-gray-400 text-sm mb-4">Dr. Sarah Smith</p>
                    <button className="mt-auto w-full py-2.5 rounded-xl bg-[#f1f3f3] dark:bg-gray-700 text-[#131616] dark:text-white text-sm font-bold hover:bg-[#2d6a76] hover:text-white transition-all">Continue Learning</button>
                  </div>
                </Link>
                {/* Class Card 2 */}
                <Link to='/classes/$classId' params={{ classId: '2' }} className="bg-white dark:bg-[#1e2d3b] rounded-2xl border border-[#f1f3f3] dark:border-gray-800 p-4 shadow-sm hover:shadow-md transition-shadow group flex flex-col cursor-pointer">
                  <div
                    className="aspect-video w-full rounded-xl bg-gray-100 bg-cover bg-center relative overflow-hidden"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDCp3eOYjEOMOHVLdh9qAtInmrGdeE7xbY3yJRjp3_xK2Nb4QBYWOF33hyZUnm4V9f7EGO01AjLivmqqkDxq8PgoeCE9nFVqcKiqhKvN8crMysuaIcy5NTxEujtZXCxEmj4eyv-I5ITyOvAnuDko1KhRb8fjYyU4IuSpk4PXcGK1GYgyj0NyvUGUaXzvVj1xqgC6Pt5mex2Ktjum8kqz0kSE5Ftad3Ih6jHbkuaekz2wL-Pt-NwMG55qrSxNrzbwhhY-GroWmeJZSdf")' }}
                  >
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-[#2d6a76] shadow-sm">HIS-202</div>
                  </div>
                  <div className="pt-4 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-[#131616] dark:text-white text-lg font-bold leading-tight group-hover:text-[#2d6a76] transition-colors">Modern History</h4>
                      {/* Circular Progress */}
                      <div className="relative w-10 h-10 shrink-0">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                          <path className="text-[#f1f3f3] dark:text-gray-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"></path>
                          <path className="text-[#2d6a76] drop-shadow-sm" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="30, 100" strokeLinecap="round" strokeWidth="3"></path>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-[#2d6a76]">30%</div>
                      </div>
                    </div>
                    <p className="text-[#6b7c80] dark:text-gray-400 text-sm mb-4">Prof. Alan Grant</p>
                    <button className="mt-auto w-full py-2.5 rounded-xl bg-[#f1f3f3] dark:bg-gray-700 text-[#131616] dark:text-white text-sm font-bold hover:bg-[#2d6a76] hover:text-white transition-all">Continue Learning</button>
                  </div>
                </Link>
                {/* Class Card 3 */}
                <Link to='/classes/$classId' params={{ classId: '3' }} className="bg-white dark:bg-[#1e2d3b] rounded-2xl border border-[#f1f3f3] dark:border-gray-800 p-4 shadow-sm hover:shadow-md transition-shadow group flex flex-col cursor-pointer">
                  <div
                    className="aspect-video w-full rounded-xl bg-gray-100 bg-cover bg-center relative overflow-hidden"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAj68pH5M98wkvoMBKiKCxuSrdad9E9wEbMCEKeXzsER_8yWjkBNBPTxD3ctuRutGuAY3H_USNJxhjyVE3YX-U3TYoEIDXEIm346PbHBbchuVnqsR6-V88QUR516ClHr9KU2UF5uGsPDSdmzvnixLcZ4i9MTNW817I2j9JB8cyxaV5xUxQCoATFG5H6NJN_tZPk-KShXuM0N0lZPqFUlrhbxiwpHINsdV1pWKK9WQEUoDo0q9Q9lKlbyYaFiJbgCfZAG21LI2AECt5g")' }}
                  >
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-[#2d6a76] shadow-sm">CS-101</div>
                  </div>
                  <div className="pt-4 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-[#131616] dark:text-white text-lg font-bold leading-tight group-hover:text-[#2d6a76] transition-colors">Intro to Python</h4>
                      {/* Circular Progress */}
                      <div className="relative w-10 h-10 shrink-0">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                          <path className="text-[#f1f3f3] dark:text-gray-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"></path>
                          <path className="text-[#2d6a76] drop-shadow-sm" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="10, 100" strokeLinecap="round" strokeWidth="3"></path>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-[#2d6a76]">10%</div>
                      </div>
                    </div>
                    <p className="text-[#6b7c80] dark:text-gray-400 text-sm mb-4">Dr. Emily Chen</p>
                    <button className="mt-auto w-full py-2.5 rounded-xl bg-[#f1f3f3] dark:bg-gray-700 text-[#131616] dark:text-white text-sm font-bold hover:bg-[#2d6a76] hover:text-white transition-all">Continue Learning</button>
                  </div>
                </Link>
                {/* Empty State / Join New Class Hint */}
                <div 
                    onClick={() => setIsJoinDialogOpen(true)}
                    className="bg-[#f1f3f3] dark:bg-white/5 rounded-2xl border-2 border-dashed border-[#d1d5db] dark:border-gray-700 p-4 flex flex-col items-center justify-center min-h-[250px] group cursor-pointer hover:border-[#2d6a76]/50 transition-colors"
                >
                  <div className="bg-white dark:bg-white/10 p-4 rounded-full mb-3 group-hover:scale-110 transition-transform">
                    <Plus className="text-gray-400 w-8 h-8" />
                  </div>
                  <p className="text-[#131616] dark:text-white font-bold text-base">Add New Course</p>
                  <p className="text-[#6b7c80] dark:text-gray-400 text-sm text-center px-4 mt-1">Browse the catalog to find your next topic.</p>
                </div>
              </div>
            </div>
            {/* Assignments Panel (Right - 4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <h3 className="text-[#131616] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">Latest Assignments</h3>
              <div className="bg-white dark:bg-[#1e2d3b] rounded-2xl shadow-sm border border-[#f1f3f3] dark:border-gray-800 p-6">
                <div className="flex flex-col gap-5">
                  {/* Assignment 1: Urgent */}
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center justify-center bg-red-50 dark:bg-red-500/10 h-14 w-14 rounded-xl text-red-600 dark:text-red-400 shrink-0">
                      <span className="text-xs font-bold uppercase">Oct</span>
                      <span className="text-lg font-black leading-none">24</span>
                    </div>
                    <div className="flex flex-col flex-1">
                      <div className="flex justify-between items-start">
                        <p className="text-[#131616] dark:text-white font-bold text-sm">Biology Lab Report</p>
                        <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Urgent</span>
                      </div>
                      <p className="text-[#6b7c80] dark:text-gray-400 text-xs mt-1">Due Tomorrow, 11:59 PM</p>
                      <div className="flex items-center gap-1 mt-2">
                        <School className="text-gray-400 w-3.5 h-3.5" />
                        <p className="text-xs text-gray-500 font-medium">BIO-101</p>
                      </div>
                    </div>
                  </div>
                  <div className="h-px bg-gray-100 dark:bg-gray-700 w-full"></div>
                  {/* Assignment 2: To Do */}
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center justify-center bg-[#f1f3f3] dark:bg-gray-700 h-14 w-14 rounded-xl text-gray-600 dark:text-gray-300 shrink-0">
                      <span className="text-xs font-bold uppercase">Oct</span>
                      <span className="text-lg font-black leading-none">28</span>
                    </div>
                    <div className="flex flex-col flex-1">
                      <div className="flex justify-between items-start">
                        <p className="text-[#131616] dark:text-white font-bold text-sm">Calculus Quiz #4</p>
                        <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">To Do</span>
                      </div>
                      <p className="text-[#6b7c80] dark:text-gray-400 text-xs mt-1">Due Friday, 10:00 AM</p>
                      <div className="flex items-center gap-1 mt-2">
                        <Calculator className="text-gray-400 w-3.5 h-3.5" />
                        <p className="text-xs text-gray-500 font-medium">MAT-201</p>
                      </div>
                    </div>
                  </div>
                  <div className="h-px bg-gray-100 dark:bg-gray-700 w-full"></div>
                  {/* Assignment 3: Submitted */}
                  <div className="flex gap-4 opacity-75 hover:opacity-100 transition-opacity">
                    <div className="flex flex-col items-center justify-center bg-green-50 dark:bg-green-500/10 h-14 w-14 rounded-xl text-green-600 dark:text-green-400 shrink-0">
                      <Check className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col flex-1">
                      <div className="flex justify-between items-start">
                        <p className="text-[#131616] dark:text-white font-bold text-sm line-through decoration-gray-400">History Essay</p>
                        <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Done</span>
                      </div>
                      <p className="text-[#6b7c80] dark:text-gray-400 text-xs mt-1">Submitted Oct 22</p>
                      <div className="flex items-center gap-1 mt-2">
                        <History className="text-gray-400 w-3.5 h-3.5" />
                        <p className="text-xs text-gray-500 font-medium">HIS-202</p>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-5 py-3 rounded-xl border border-[#f1f3f3] dark:border-gray-700 text-[#6b7c80] dark:text-gray-300 font-bold text-sm hover:bg-[#f9fafb] dark:hover:bg-gray-800 flex items-center justify-center gap-2 group transition-all">
                  <span>View All Assignments</span>
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
                  <h4 className="font-bold text-lg mb-1">Study Tip of the Day</h4>
                  <p className="text-blue-50 text-sm leading-relaxed mb-4">Break your study sessions into 25-minute chunks with 5-minute breaks to maintain focus.</p>
                  <button className="bg-white text-[#2d6a76] px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-50 transition-colors">Read More</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
