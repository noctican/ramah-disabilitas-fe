import { 
  Clock, 
  Calendar, 
  Upload, 
  CalendarDays, 
  Lock, 
  CheckCircle, 
  MessageSquare,
} from 'lucide-react'

export const AssignmentsPane = () => {
  return (
    <div className="flex flex-col gap-12">
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <Clock className="w-6 h-6 text-amber-500" />
            To Do
          </h2>
          <span className="text-xs font-medium px-2 py-1 bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 rounded-full">2 Pending</span>
        </div>
        <div className="grid gap-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-5 p-5 bg-white dark:bg-zinc-800 border border-red-200 dark:border-red-900/30 rounded-xl shadow-[0_0_15px_rgba(239,68,68,0.1)] relative overflow-hidden group">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-500"></div>
            <div className="flex-1 w-full pl-2">
              <div className="flex items-start justify-between mb-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">CSS Layout Challenge</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 uppercase tracking-wide border border-red-200 dark:border-red-800">Urgent</span>
                </div>
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">50 pts</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm">
                <div className="flex items-center gap-1.5 text-red-600 dark:text-red-400 font-medium">
                  <Clock className="w-4 h-4" />
                  <span>Due in 04h 23m</span>
                </div>
                <span className="hidden sm:block w-1 h-1 bg-slate-300 dark:bg-zinc-600 rounded-full"></span>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Calendar className="w-4 h-4" />
                  <span>Today, 11:59 PM</span>
                </div>
              </div>
            </div>
            <button className="flex-shrink-0 px-6 py-2.5 bg-[#2280c3] hover:bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-[0_0_15px_rgba(34,128,195,0.15)] transition-all active:scale-95 w-full md:w-auto flex items-center justify-center gap-2">
              <span>Submit Work</span>
              <Upload className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-5 p-5 bg-white dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700/50 rounded-xl hover:shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] transition-all duration-300 group">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-slate-200 dark:bg-zinc-700 group-hover:bg-[#2280c3] transition-colors rounded-l-xl"></div>
            <div className="flex-1 w-full pl-2">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Flexbox Froggy Writeup</h3>
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">25 pts</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm">
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                  <CalendarDays className="w-4 h-4" />
                  <span>Due Oct 25, 2023</span>
                </div>
              </div>
            </div>
            <button className="flex-shrink-0 px-6 py-2.5 bg-white dark:bg-zinc-700 border border-slate-200 dark:border-zinc-600 text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-zinc-600 text-sm font-semibold rounded-lg transition-all active:scale-95 w-full md:w-auto">
              Start Assignment
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-[#2280c3]" />
            Upcoming
          </h2>
        </div>
        <div className="grid gap-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-5 p-5 bg-[#F8F8F8] dark:bg-zinc-800/40 border border-slate-100 dark:border-zinc-800 rounded-xl hover:bg-white dark:hover:bg-zinc-800 transition-all duration-300">
            <div className="flex-1 w-full">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">Responsive Portfolio Project</h3>
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-500">100 pts</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm">
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-500">
                  <CalendarDays className="w-4 h-4" />
                  <span>Due Nov 01, 2023</span>
                </div>
                <span className="hidden sm:block w-1 h-1 bg-slate-300 dark:bg-zinc-600 rounded-full"></span>
                <div className="flex items-center gap-1.5 text-slate-400 italic">
                  <Lock className="w-4 h-4" />
                  <span>Opens in 3 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6 pt-4 border-t border-slate-100 dark:border-zinc-800">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-500" />
            Completed
          </h2>
        </div>
        <div className="grid gap-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-5 p-5 bg-white dark:bg-zinc-900/20 border border-slate-100 dark:border-zinc-800 rounded-xl opacity-90 hover:opacity-100 transition-all">
            <div className="flex-1 w-full">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">HTML Basics Quiz</h3>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <span className="text-sm font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded">95/100</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <span>Submitted Oct 10, 2023</span>
                </div>
                <span className="hidden sm:block w-1 h-1 bg-slate-300 dark:bg-zinc-600 rounded-full"></span>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <MessageSquare className="w-4 h-4" />
                  <span>Instructor Feedback Available</span>
                </div>
              </div>
            </div>
            <button className="flex-shrink-0 px-4 py-2 bg-transparent text-slate-500 hover:text-[#2280c3] text-sm font-medium rounded-lg transition-colors w-full md:w-auto border border-transparent hover:border-slate-100 dark:hover:border-zinc-700">
              View Feedback
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-5 p-5 bg-white dark:bg-zinc-900/20 border border-slate-100 dark:border-zinc-800 rounded-xl opacity-90 hover:opacity-100 transition-all">
            <div className="flex-1 w-full">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Setup Environment</h3>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <span className="text-sm font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded">10/10</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <span>Submitted Oct 05, 2023</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}