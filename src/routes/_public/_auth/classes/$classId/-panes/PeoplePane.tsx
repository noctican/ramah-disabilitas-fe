import { useRegisterCommands } from '@/hooks/use-register-command'
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
  useRegisterCommands([
    {
      pattern: /^daftar\s+(.+)$/i,
      description: "daftar nama daftar untuk membacakan daftar yang ada. bisa berupa daftar orang, pengajar, pelajar",
      action: ([type]) => {
                
      }
    }
  ])
  return (
    <div className="flex flex-col gap-10">
      <section>
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-5 flex items-center gap-2">
          <Presentation className="w-5 h-5 text-[#2280c3]" /> Pengajar
        </h2>
        <div className="p-4 rounded-2xl border border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-800/40 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] grid grid-cols-1 gap-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-200 to-slate-300 dark:from-zinc-700 dark:to-zinc-600 flex-shrink-0 flex items-center justify-center shadow-inner overflow-hidden">
              <span className="font-bold text-slate-400 dark:text-zinc-500">JD</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Jane Doe</h3>
          </div>
        </div>
      </section>

      <section>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pt-4 border-t border-slate-100 dark:border-zinc-800">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <Users className="w-5 h-5 text-[#2280c3]" />
            Teman Sekelas
            <span className="ml-2 text-xs font-bold px-2.5 py-1 bg-slate-100 dark:bg-zinc-800 text-slate-500 rounded-full">24 Pelajar</span>
          </h2>
        </div>
        <div className="p-4 rounded-2xl border border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-800/40 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] grid grid-cols-1 gap-2">
        {Array(24).fill(0).map((_, i) => (
          <>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-200 to-slate-300 dark:from-zinc-700 dark:to-zinc-600 flex-shrink-0 flex items-center justify-center shadow-inner overflow-hidden">
                <span className="font-bold text-slate-400 dark:text-zinc-500">JD</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Jane Doe</h3>
            </div>
            {i !== 23 && (
              <div className='border-b border-slate-100 dark:border-zinc-800'></div>
            )}
          </>
        ))}
        </div>

      </section>
    </div>
  )
}