import { createFileRoute, Link } from '@tanstack/react-router'
import { Plus, PlayCircle, MoreVertical, ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react'
import PublicHeaderGap from '@/layout/PublicHeaderGap'

export const Route = createFileRoute('/_public/')({
  component: Dashboard,
})

function Dashboard() {
  return (
    <div className="min-h-screen bg-[#f6f6f8] dark:bg-[#14141e] font-sans text-[#303338] dark:text-gray-200">
      <PublicHeaderGap />
      
      <main className="container mx-auto max-w-6xl px-4 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
                <h1 className="text-3xl font-extrabold text-[#131316] dark:text-white mb-1">Halo,  👋</h1>
                <p className="text-gray-500 dark:text-gray-400">Selamat datang kembali! Berikut aktifitas belajarmu hari ini.</p>
            </div>
            <div className="flex gap-3">
                <Link to="/classes" className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1c1c27] border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-bold shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] hover:bg-gray-50 dark:hover:bg-gray-800 transition-all cursor-pointer">
                    <Plus className="w-5 h-5" />
                    Gabung Kelas
                </Link>
                <Link to="/assignments" className="px-6 py-2 bg-[#9696d9] text-white rounded-lg text-sm font-bold shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] hover:opacity-90 transition-all cursor-pointer flex items-center">
                    Lihat Semua Tugas
                </Link>
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-[#1c1c27] p-6 rounded-xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-transparent dark:border-gray-800">
                <p className="text-gray-400 text-sm font-medium mb-1 uppercase tracking-wider">Total Kelas</p>
                <div className="flex items-end justify-between">
                    <h3 className="text-3xl font-extrabold dark:text-white">8</h3>
                    <span className="text-[#5CA683] text-sm font-bold bg-[#5CA683]/10 px-2 py-0.5 rounded">+1 semester ini</span>
                </div>
            </div>
            <div className="bg-white dark:bg-[#1c1c27] p-6 rounded-xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-transparent dark:border-gray-800">
                <p className="text-gray-400 text-sm font-medium mb-1 uppercase tracking-wider">Tugas Pending</p>
                <div className="flex items-end justify-between">
                    <h3 className="text-3xl font-extrabold dark:text-white">4</h3>
                    <span className="text-[#F28D7B] text-sm font-bold bg-[#F28D7B]/10 px-2 py-0.5 rounded">2 mendesak</span>
                </div>
            </div>
            <div className="bg-white dark:bg-[#1c1c27] p-6 rounded-xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-transparent dark:border-gray-800">
                <p className="text-gray-400 text-sm font-medium mb-1 uppercase tracking-wider">Tenggat Berikutnya</p>
                <div className="flex items-end justify-between">
                    <h3 className="text-xl font-extrabold dark:text-white">Besok</h3>
                    <span className="text-gray-400 text-xs mb-1">23:59 WIB</span>
                </div>
            </div>
            <div className="bg-white dark:bg-[#1c1c27] p-6 rounded-xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-transparent dark:border-gray-800">
                <p className="text-gray-400 text-sm font-medium mb-1 uppercase tracking-wider">Progres Keseluruhan</p>
                <div className="flex items-end justify-between">
                    <h3 className="text-3xl font-extrabold dark:text-white">92%</h3>
                    <span className="text-[#5CA683] text-sm font-bold bg-[#5CA683]/10 px-2 py-0.5 rounded">IPK 3.8</span>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <div>
                    <h2 className="text-xl font-bold mb-4 dark:text-white flex items-center gap-2">
                        <PlayCircle className="w-6 h-6 text-[#9696d9] fill-current" />
                        Lanjutkan Belajar
                    </h2>
                    <div className="bg-white dark:bg-[#1c1c27] rounded-xl overflow-hidden shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-transparent dark:border-gray-800 flex flex-col md:flex-row">
                        <div className="md:w-1/3 aspect-video md:aspect-auto bg-cover bg-center bg-slate-200 dark:bg-slate-800" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDLV0POjgA3qNxcXrw7m-h-mA0E_cdMjtPl7ornFl7lOOI8w1O5SGOR490ppqKAoCZXCyjqQ8VUOY-zmHR7G6MLm9X1iXh4yJ0rnPTSA7jGPH5pRvqsFAepYSqoKxjz_MTguPIc7vkMhOTZlrF1jm_rSvYc2cQc_Xo6FZcT7Hl9zZ0Q1M3WyjXSlWTsINUBX8OFvxJRE2TM_zR40la3Xmcic_a5Nx9la983dXStAF2yxGcbLQOUYW6Q4LnYQsiD5oYRAVuR7xqvUChA")' }}></div>
                        <div className="p-6 flex-1">
                            <div className="flex justify-between items-start mb-2">
                                <span className="px-2 py-1 bg-[#9696d9]/10 text-[#9696d9] text-[10px] font-bold uppercase rounded">Menengah</span>
                                <span className="text-xs text-gray-400">Terakhir akses: 2 jam lalu</span>
                            </div>
                            <h3 className="text-xl font-bold mb-1 dark:text-white">Web Development Bootcamp</h3>
                            <p className="text-gray-500 text-sm mb-4">Module 4: Advanced Responsive Design and CSS Grid layouts.</p>
                            <div className="flex items-center gap-4">
                                <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#9696d9]" style={{ width: '45%' }}></div>
                                </div>
                                <span className="text-xs font-bold text-gray-500">45%</span>
                                <button className="bg-[#9696d9] text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-opacity-90 transition-all cursor-pointer">Lanjut</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold dark:text-white">Kelas Saya</h2>
                        <Link to="/classes" className="text-[#9696d9] text-sm font-bold hover:underline cursor-pointer">Lihat Semua</Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-[#1c1c27] p-5 rounded-xl border border-transparent dark:border-gray-800 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] hover:translate-y-[-2px] transition-transform cursor-pointer">
                            <div className="flex justify-between mb-3">
                                <div className="size-10 bg-[#5CA683]/10 text-[#5CA683] rounded-lg flex items-center justify-center">
                                    <div className="w-6 h-6 text-center leading-6 font-bold">{}</div>
                                </div>
                                <button className="text-gray-300 hover:text-gray-500 transition-colors">
                                    <MoreVertical className="w-5 h-5" />
                                </button>
                            </div>
                            <h4 className="font-bold dark:text-white mb-1">Logika & Algoritma</h4>
                            <p className="text-xs text-gray-400 mb-4">Pengajar: Dr. Sarah Jane</p>
                            <div className="space-y-1">
                                <div className="flex justify-between text-[10px] font-bold text-gray-400">
                                    <span>PROGRES</span>
                                    <span>80%</span>
                                </div>
                                <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#5CA683]" style={{ width: '80%' }}></div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white dark:bg-[#1c1c27] p-5 rounded-xl border border-transparent dark:border-gray-800 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] hover:translate-y-[-2px] transition-transform cursor-pointer">
                            <div className="flex justify-between mb-3">
                                <div className="size-10 bg-[#9696d9]/10 text-[#9696d9] rounded-lg flex items-center justify-center">
                                     <div className="w-6 h-6 text-center leading-6 font-bold">{}</div>
                                </div>
                                <button className="text-gray-300 hover:text-gray-500 transition-colors">
                                    <MoreVertical className="w-5 h-5" />
                                </button>
                            </div>
                            <h4 className="font-bold dark:text-white mb-1">UI/UX Design</h4>
                            <p className="text-xs text-gray-400 mb-4">Pengajar: Prof. Marcus</p>
                            <div className="space-y-1">
                                <div className="flex justify-between text-[10px] font-bold text-gray-400">
                                    <span>PROGRES</span>
                                    <span>10%</span>
                                </div>
                                <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#9696d9]" style={{ width: '10%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                <div className="bg-white dark:bg-[#1c1c27] p-6 rounded-xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-transparent dark:border-gray-800">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold dark:text-white">Oktober 2023</h3>
                        <div className="flex gap-2">
                            <button className="size-8 flex items-center justify-center rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button className="size-8 flex items-center justify-center rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-7 gap-y-4 text-center text-xs">
                        <div className="text-gray-400 font-bold">SN</div><div className="text-gray-400 font-bold">SL</div><div className="text-gray-400 font-bold">RB</div><div className="text-gray-400 font-bold">KM</div><div className="text-gray-400 font-bold">JM</div><div className="text-gray-400 font-bold">SB</div><div className="text-gray-400 font-bold">MG</div>
                        <div className="py-1 text-gray-300">28</div><div className="py-1 text-gray-300">29</div><div className="py-1 text-gray-300">30</div>
                        <div className="py-1 dark:text-gray-200">1</div><div className="py-1 dark:text-gray-200">2</div><div className="py-1 dark:text-gray-200">3</div><div className="py-1 dark:text-gray-200">4</div>
                        <div className="py-1 dark:text-gray-200">5</div><div className="py-1 dark:text-gray-200">6</div><div className="py-1 dark:text-gray-200 relative">7<div className="absolute bottom-0 left-1/2 -translate-x-1/2 size-1 bg-[#F28D7B] rounded-full"></div></div>
                        <div className="py-1 dark:text-gray-200">8</div><div className="py-1 dark:text-gray-200">9</div><div className="py-1 dark:text-gray-200">10</div><div className="py-1 dark:text-gray-200">11</div>
                        <div className="py-1 bg-[#9696d9] text-white rounded-lg font-bold">12</div><div className="py-1 dark:text-gray-200">13</div>
                        <div className="py-1 dark:text-gray-200 relative">14<div className="absolute bottom-0 left-1/2 -translate-x-1/2 size-1 bg-[#9696d9] rounded-full"></div></div>
                        <div className="py-1 dark:text-gray-200">15</div><div className="py-1 dark:text-gray-200">16</div>
                    </div>
                </div>

                <div>
                    <h3 className="font-bold mb-4 dark:text-white flex items-center justify-between">
                        Tugas Mendatang
                        <span className="text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-500 px-2 py-0.5 rounded-full">4 TOTAL</span>
                    </h3>
                    <div className="space-y-3">
                        <div className="p-4 bg-white dark:bg-[#1c1c27] rounded-xl border-l-[4px] border-l-[#F28D7B] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border-y border-r border-gray-50 dark:border-y-gray-800 dark:border-r-gray-800">
                             <div className="flex justify-between items-start mb-1">
                                <h4 className="text-sm font-bold dark:text-white">Responsive Design Mockup</h4>
                                <span className="text-[10px] font-bold text-[#F28D7B] bg-[#F28D7B]/10 px-2 py-0.5 rounded">2 HARI LAGI</span>
                            </div>
                            <p className="text-xs text-gray-400">Web Development Bootcamp</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-[#1c1c27] rounded-xl border-l-[4px] border-l-[#9696d9] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border-y border-r border-gray-50 dark:border-y-gray-800 dark:border-r-gray-800">
                             <div className="flex justify-between items-start mb-1">
                                <h4 className="text-sm font-bold dark:text-white">SQL Database Schema</h4>
                                <span className="text-[10px] font-bold text-[#9696d9] bg-[#9696d9]/10 px-2 py-0.5 rounded">5 HARI LAGI</span>
                            </div>
                            <p className="text-xs text-gray-400">Database Management</p>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="font-bold mb-4 dark:text-white">Pengumuman Terbaru</h3>
                    <div className="bg-white dark:bg-[#1c1c27] rounded-xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-transparent dark:border-gray-800 divide-y dark:divide-gray-800">
                        <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer rounded-t-xl">
                            <p className="text-xs text-[#9696d9] font-bold mb-1">Bagian Akademik • 1 jam lalu</p>
                            <h4 className="text-sm font-bold dark:text-white mb-1">Jadwal UTS Dirilis</h4>
                            <p className="text-xs text-gray-500 line-clamp-1">Jadwal ujian tengah semester untuk Musim Gugur 2023 sudah tersedia.</p>
                        </div>
                        <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer rounded-b-xl">
                            <p className="text-xs text-[#9696d9] font-bold mb-1">Prof. Marcus • 4 jam lalu</p>
                            <h4 className="text-sm font-bold dark:text-white mb-1">Materi baru ditambahkan ke UI/UX</h4>
                            <p className="text-xs text-gray-500 line-clamp-1">Saya telah mengunggah sumber daya komunitas Figma untuk lokakarya berikutnya.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </main>

      <div className="fixed bottom-8 right-8 flex flex-col items-end gap-3 z-30">
        <button className="flex items-center gap-3 px-6 py-4 bg-[#131316] text-white rounded-full shadow-2xl hover:scale-105 transition-transform cursor-pointer">
            <HelpCircle className="w-6 h-6" />
            <span className="font-bold text-sm">Tanya Tutor</span>
        </button>
      </div>
    </div>
  )
}
