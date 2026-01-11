import { 
  PlayCircle, 
  FileText, 
  CheckCircle, 
  Lock
} from 'lucide-react'

export const TimelinePane = () => {
  return (
    <div className="flex flex-col gap-10">
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#2280c3] rounded-full"></span>
            Part 1: Box Model & Layout
          </h2>
          <span className="text-xs font-medium px-2 py-1 bg-slate-100 dark:bg-zinc-800 text-slate-500 rounded text-center">3 Items</span>
        </div>
        <div className="grid gap-4">
          <div className="group flex flex-col md:flex-row items-center gap-5 p-5 bg-[#F8F8F8] dark:bg-zinc-800/40 border border-slate-100 dark:border-zinc-800 rounded-xl hover:shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] hover:border-[#2280c3]/20 hover:bg-white dark:hover:bg-zinc-800 transition-all duration-300">
            <div className="relative w-16 h-16 flex-shrink-0 flex items-center justify-center bg-white dark:bg-zinc-700 rounded-lg shadow-sm group-hover:scale-105 transition-transform">
              <div className="absolute inset-0 bg-red-500/10 rounded-lg"></div>
              <PlayCircle className="w-8 h-8 text-red-500 fill-current bg-white rounded-full dark:bg-transparent" />
            </div>
            <div className="flex-1 w-full text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <span className="text-xs font-bold text-red-500 uppercase tracking-wider bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded">Video Lesson</span>
                <span className="text-xs text-slate-400">• 12:45 min</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#2280c3] transition-colors">The Box Model Explained</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">Understanding margins, borders, padding, and content areas.</p>
            </div>
            <button className="flex-shrink-0 px-6 py-2.5 bg-[#2280c3] hover:bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-[0_0_15px_rgba(34,128,195,0.15)] transition-all active:scale-95 w-full md:w-auto">
              Start Lesson
            </button>
          </div>
          
          <div className="group flex flex-col md:flex-row items-center gap-5 p-5 bg-[#F8F8F8] dark:bg-zinc-800/40 border border-slate-100 dark:border-zinc-800 rounded-xl hover:shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] hover:border-[#2280c3]/20 hover:bg-white dark:hover:bg-zinc-800 transition-all duration-300">
            <div className="relative w-16 h-16 flex-shrink-0 flex items-center justify-center bg-white dark:bg-zinc-700 rounded-lg shadow-sm group-hover:scale-105 transition-transform">
              <div className="absolute inset-0 bg-blue-500/10 rounded-lg"></div>
              <FileText className="w-8 h-8 text-blue-500 fill-current bg-white dark:bg-transparent" />
            </div>
            <div className="flex-1 w-full text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <span className="text-xs font-bold text-blue-500 uppercase tracking-wider bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded">Reading</span>
                <span className="text-xs text-slate-400">• 2.4 MB PDF</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#2280c3] transition-colors">CSS Selectors Cheat Sheet</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">A comprehensive guide to all CSS selectors and combinators.</p>
            </div>
            <button className="flex-shrink-0 px-6 py-2.5 bg-white dark:bg-zinc-700 border border-slate-200 dark:border-zinc-600 text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-zinc-600 text-sm font-semibold rounded-lg transition-all active:scale-95 w-full md:w-auto">
              Download
            </button>
          </div>

          <div className="group flex flex-col md:flex-row items-center gap-5 p-5 bg-white/50 dark:bg-zinc-900/20 border border-slate-100 dark:border-zinc-800 rounded-xl opacity-80 hover:opacity-100 transition-all duration-300">
            <div className="relative w-16 h-16 flex-shrink-0 flex items-center justify-center bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800/30">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div className="flex-1 w-full text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Quiz</span>
                <span className="text-xs text-slate-400">• 10 Questions</span>
              </div>
              <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 line-through decoration-slate-400/50">Basic Selectors Quiz</h3>
              <p className="text-sm text-slate-400 mt-1">Score: 90/100</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full text-sm font-semibold">
              <CheckCircle className="w-4 h-4" />
              Completed
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6 pt-4 border-t border-slate-100 dark:border-zinc-800">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-slate-300 dark:bg-zinc-600 rounded-full"></span>
            Part 2: Modern Layouts
          </h2>
          <span className="text-xs font-medium px-2 py-1 bg-slate-100 dark:bg-zinc-800 text-slate-500 rounded text-center">2 Items</span>
        </div>
        <div className="grid gap-4">
          <div className="group flex flex-col md:flex-row items-center gap-5 p-5 bg-[#F8F8F8] dark:bg-zinc-800/40 border border-slate-100 dark:border-zinc-800 rounded-xl hover:shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] hover:border-[#2280c3]/20 hover:bg-white dark:hover:bg-zinc-800 transition-all duration-300">
            <div className="relative w-16 h-16 flex-shrink-0 flex items-center justify-center bg-white dark:bg-zinc-700 rounded-lg shadow-sm group-hover:scale-105 transition-transform">
              <div className="absolute inset-0 bg-red-500/10 rounded-lg"></div>
              <PlayCircle className="w-8 h-8 text-red-500 fill-current bg-white rounded-full dark:bg-transparent" />
            </div>
            <div className="flex-1 w-full text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <span className="text-xs font-bold text-red-500 uppercase tracking-wider bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded">Video Lesson</span>
                <span className="text-xs text-slate-400">• 18:30 min</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#2280c3] transition-colors">Flexbox Deep Dive</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">Mastering flex containers, axes, and alignment.</p>
            </div>
            <button className="flex-shrink-0 px-6 py-2.5 bg-[#2280c3]/10 hover:bg-[#2280c3] hover:text-white text-[#2280c3] text-sm font-semibold rounded-lg transition-all active:scale-95 w-full md:w-auto border border-[#2280c3]/10">
              Start Lesson
            </button>
          </div>

          <div className="group flex flex-col md:flex-row items-center gap-5 p-5 bg-slate-50 dark:bg-zinc-900/50 border border-slate-100 dark:border-zinc-800 rounded-xl opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-not-allowed">
            <div className="relative w-16 h-16 flex-shrink-0 flex items-center justify-center bg-slate-200 dark:bg-zinc-800 rounded-lg">
              <Lock className="w-8 h-8 text-slate-400" />
            </div>
            <div className="flex-1 w-full text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Quiz</span>
                <span className="text-xs text-slate-400">• Locked</span>
              </div>
              <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">Layouts Challenge</h3>
              <p className="text-sm text-slate-400 mt-1">Complete previous lessons to unlock.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}