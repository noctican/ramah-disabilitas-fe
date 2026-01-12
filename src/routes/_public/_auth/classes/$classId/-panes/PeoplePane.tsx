import { 
  Presentation, 
  Check, 
  Mail, 
  CalendarRange, 
  Users, 
  Search, 
  Filter, 
  MoreHorizontal, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react'

export const PeoplePane = () => {
  return (
    <div className="flex flex-col gap-10">
      <section>
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-5 flex items-center gap-2">
          <Presentation className="w-5 h-5 text-[#2280c3]" />
          Instructor
        </h2>
        <div className="p-6 md:p-8 rounded-2xl border border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-800/40 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] flex flex-col md:flex-row items-start gap-8">
          <div className="relative group">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 dark:from-zinc-700 dark:to-zinc-600 flex-shrink-0 flex items-center justify-center shadow-inner overflow-hidden">
              <span className="text-4xl font-bold text-slate-400 dark:text-zinc-500">JD</span>
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 border-4 border-white dark:border-zinc-800 rounded-full flex items-center justify-center" title="Online">
              <Check className="w-4 h-4 text-white font-bold" />
            </div>
          </div>
          <div className="flex-1 w-full">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-3">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Jane Doe</h3>
                <p className="text-[#2280c3] font-semibold">Senior Frontend Developer & Educator</p>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#2280c3] text-white text-sm font-semibold shadow-[0_0_15px_rgba(34,128,195,0.15)] hover:bg-blue-600 transition-all active:scale-95">
                  <Mail className="w-4 h-4" />
                  Message
                </button>
                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-slate-200 dark:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-700 text-slate-700 dark:text-white text-sm font-semibold transition-all active:scale-95">
                  <CalendarRange className="w-4 h-4" />
                  Book Office Hours
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-zinc-700/50 text-xs font-medium text-slate-600 dark:text-slate-300">HTML5</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-zinc-700/50 text-xs font-medium text-slate-600 dark:text-slate-300">CSS3</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-zinc-700/50 text-xs font-medium text-slate-600 dark:text-slate-300">JavaScript</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-zinc-700/50 text-xs font-medium text-slate-600 dark:text-slate-300">React</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-3xl">
              Hey everyone! I'm Jane, and I've been building for the web for over 10 years. My passion is making the web accessible and beautiful. I'm here to help you understand the core concepts of web development, from the box model to complex state management. Feel free to reach out if you have any questions!
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pt-4 border-t border-slate-100 dark:border-zinc-800">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <Users className="w-5 h-5 text-[#2280c3]" />
            Classmates
            <span className="ml-2 text-xs font-bold px-2.5 py-1 bg-slate-100 dark:bg-zinc-800 text-slate-500 rounded-full">24 Students</span>
          </h2>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-[#2280c3] transition-colors" />
              <input className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900/50 text-sm focus:ring-2 focus:ring-[#2280c3]/20 focus:border-[#2280c3] outline-none transition-all placeholder:text-slate-400" placeholder="Search by name..." type="text"/>
            </div>
            <button className="p-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-500 dark:text-slate-400 transition-colors" title="Filter">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <div className="group relative p-5 rounded-2xl border border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-800/40 hover:border-[#2280c3]/30 hover:shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-100 to-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg shadow-sm">AM</div>
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-zinc-800 rounded-full"></span>
              </div>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-slate-100 dark:hover:bg-zinc-700 rounded-full text-slate-400 hover:text-[#2280c3]">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-0.5">Alex Morgan</h4>
              <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                Online now
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-50 dark:border-zinc-700/50 flex justify-between items-center">
              <span className="text-xs text-slate-400">Student</span>
              <button className="text-xs font-semibold text-[#2280c3] hover:text-blue-600 transition-colors">View Profile</button>
            </div>
          </div>
          {/* Item 2 */}
          <div className="group relative p-5 rounded-2xl border border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-800/40 hover:border-[#2280c3]/30 hover:shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-100 to-purple-50 text-purple-600 flex items-center justify-center font-bold text-lg shadow-sm">SK</div>
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-yellow-400 border-2 border-white dark:border-zinc-800 rounded-full"></span>
              </div>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-slate-100 dark:hover:bg-zinc-700 rounded-full text-slate-400 hover:text-[#2280c3]">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-0.5">Sarah Kline</h4>
              <p className="text-xs text-yellow-600 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                Away
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-50 dark:border-zinc-700/50 flex justify-between items-center">
              <span className="text-xs text-slate-400">Student</span>
              <button className="text-xs font-semibold text-[#2280c3] hover:text-blue-600 transition-colors">View Profile</button>
            </div>
          </div>
          {/* Item 3 */}
          <div className="group relative p-5 rounded-2xl border border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-800/40 hover:border-[#2280c3]/30 hover:shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-100 to-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg shadow-sm">MJ</div>
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-slate-300 border-2 border-white dark:border-zinc-800 rounded-full"></span>
              </div>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-slate-100 dark:hover:bg-zinc-700 rounded-full text-slate-400 hover:text-[#2280c3]">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-0.5">Michael Jordan</h4>
              <p className="text-xs text-slate-400 font-medium flex items-center gap-1">
                Last active 2h ago
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-50 dark:border-zinc-700/50 flex justify-between items-center">
              <span className="text-xs text-slate-400">Student</span>
              <button className="text-xs font-semibold text-[#2280c3] hover:text-blue-600 transition-colors">View Profile</button>
            </div>
          </div>
          {/* Item 4 */}
          <div className="group relative p-5 rounded-2xl border border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-800/40 hover:border-[#2280c3]/30 hover:shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-pink-100 to-pink-50 text-pink-600 flex items-center justify-center font-bold text-lg shadow-sm">EL</div>
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-zinc-800 rounded-full"></span>
              </div>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-slate-100 dark:hover:bg-zinc-700 rounded-full text-slate-400 hover:text-[#2280c3]">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-0.5">Emma Lee</h4>
              <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                Online now
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-50 dark:border-zinc-700/50 flex justify-between items-center">
              <span className="text-xs text-slate-400">TA</span>
              <button className="text-xs font-semibold text-[#2280c3] hover:text-blue-600 transition-colors">View Profile</button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mt-10 gap-2">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-zinc-700 text-slate-400 hover:bg-white dark:hover:bg-zinc-800 hover:text-[#2280c3] transition-colors disabled:opacity-50" disabled>
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#2280c3] text-white text-sm font-semibold shadow-[0_0_15px_rgba(34,128,195,0.15)]">1</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-zinc-800 hover:text-[#2280c3] transition-colors">2</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-zinc-800 hover:text-[#2280c3] transition-colors">3</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-zinc-800 hover:text-[#2280c3] transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  )
}