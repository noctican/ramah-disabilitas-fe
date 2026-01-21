import type { StudentCourseDetail } from '@/data/types/course_type'
import { 
  PlayCircle, 
  FileText, 
  CheckCircle, 
  Lock
} from 'lucide-react'
import { Link, useNavigate, useParams } from '@tanstack/react-router'
import { useRegisterCommands, type CommandInput } from '@/hooks/use-register-command'
import { useVoiceStore } from '@/data/store/voice_store'
import { useEffect, useMemo, useRef } from 'react'

type Props = {
  data?: StudentCourseDetail
}

export const TimelinePane = ({ data }: Props) => {
  const { classId } = useParams({ from: '/_public/_auth/classes/$classId/' })
  const { speak } = useVoiceStore()
  const navigate = useNavigate()

  const modulesRef = useRef(data?.modules || [])
  useEffect(() => {
    modulesRef.current = data?.modules || []
  }, [data])

  useRegisterCommands([
    {
      pattern: /daftar modul/i,
      description: "daftar modul... adalah untuk membacakan daftar modul atau bab yang ada pada kelas ini",
      action: () => {
        const modules = modulesRef.current
        const text_to_speech = modules?.map((m, i) => `${i + 1}. ${m.title}`).join('. ')
        speak(text_to_speech || 'Tidak ada modul')
      }
    }, {
      pattern: /daftar semua materi/i,
      description: "daftar semua materi... adalah untuk membacakan daftar materi yang ada pada kelas ini.",
      action: () => {
        const materials = modulesRef.current?.map((m) => m.materials).flat()
        const text_to_speech = materials?.map((m, i) => `${i + 1}. ${m.title}`).join('. ')
        speak(text_to_speech || 'Tidak ada materi')
      }
    }, {
      pattern: /daftar materi\s+(.+)/i,
      description: "daftar materi... adalah untuk membacakan daftar materi yang ada pada kelas ini. perintah ini harus diikuti oleh nama modul.",
      action: ([module]) => {
        const mod = modulesRef.current?.find((m) => m.title.toLowerCase().trim() === module.toLowerCase().trim())
        const materials = mod?.materials
        const text_to_speech = materials?.map((m, i) => `${i + 1}. ${m.title}`).join('. ')
        speak(text_to_speech || 'Tidak ada materi')
      }
    }, {
      pattern: /buka materi\s+(.+)/i,
      description: "buka materi... adalah untuk membuka materi yang ada pada kelas ini. perintah ini harus diikuti oleh nama materi.",
      priority: 10,
      action: ([args]) => {
        if (!args || !modulesRef.current) {
            speak('Data materi belum siap');
            return;
        }

          const keyword = args.toLowerCase().trim();
          console.log("Mencari keyword:", keyword);

          let foundMaterial = null;
          let foundModule = null;

          for (const mod of modulesRef.current) {
              if (!mod.materials) continue;

              const mat = mod.materials.find(m => {
                  const title = m.title.toLowerCase().trim();
                  return title.includes(keyword) || keyword.includes(title); 
              });

              if (mat) {
                  foundMaterial = mat;
                  foundModule = mod;
                  break;
              }
          }

          if (!foundMaterial) {
              console.log(`Gagal menemukan: ${keyword} dalam`, modulesRef.current);
              speak(`Materi ${args} tidak ditemukan`);
              return;
          }

          speak(`Membuka ${foundMaterial.title}`);
          navigate({ to: '/learn/$classId', params: { classId }, search: { materialId: foundMaterial.id } });
      }
    }
  ])

  if (!data || !data.modules) {
    return <div className="text-center py-10 text-slate-500">Memuat materi...</div>
  }

  if (data.modules.length === 0) {
     return <div className="text-center py-10 text-slate-500">Belum ada materi.</div>
  }

  return (
    <div className="flex flex-col gap-10">
      {data.modules.map((module) => (
        <section key={module.id}>
          <div className="flex items-center justify-between mb-6 pt-4 border-t border-slate-100 dark:border-zinc-800 first:border-0 first:pt-0">
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#2280c3] rounded-full"></span>
              {module.title}
            </h2>
            <span className="text-xs font-medium px-2 py-1 bg-slate-100 dark:bg-zinc-800 text-slate-500 rounded text-center">
              {module.materials.length} Materi
            </span>
          </div>
          <div className="grid gap-4">
            {module.materials.map((material) => (
              <div 
                key={material.id}
                className={`group flex flex-col md:flex-row items-center gap-5 p-5 border border-slate-100 dark:border-zinc-800 rounded-xl transition-all duration-300 cursor-pointer ${
                  material.is_completed 
                    ? 'bg-green-50/50 dark:bg-green-900/10 border-green-100 dark:border-green-800/30' 
                    : 'bg-[#F8F8F8] dark:bg-zinc-800/40 hover:bg-white dark:hover:bg-zinc-800 hover:shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] hover:border-[#2280c3]/20'
                }`}
              >
                <div className={`relative w-16 h-16 flex-shrink-0 flex items-center justify-center rounded-lg shadow-sm transition-transform overflow-hidden ${material.is_completed ? '' : 'group-hover:scale-105'} ${material.is_completed ? 'bg-green-100 dark:bg-green-900/30' : 'bg-white dark:bg-zinc-700'}`}>
                   {material.is_completed ? (
                      <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                   ) : (
                      <>
                        {(material.type === 'video' || material.type === 'youtube') ? (
                            (() => {
                                const getYoutubeId = (url: string) => {
                                    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
                                    const match = url?.match(regExp);
                                    return (match && match[2].length === 11) ? match[2] : null;
                                }
                                const vidId = material.source_url ? getYoutubeId(material.source_url) : null;
                                
                                return vidId ? (
                                    <>
                                        <img 
                                            src={`https://img.youtube.com/vi/${vidId}/mqdefault.jpg`} 
                                            alt={material.title}
                                            className="absolute inset-0 w-full h-full object-cover opacity-80"
                                        />
                                        <div className="absolute inset-0 bg-black/20"></div>
                                        <PlayCircle className="w-8 h-8 text-white relative z-10 drop-shadow-md" />
                                    </>
                                ) : (
                                    <>
                                        <div className="absolute inset-0 bg-red-500/10 rounded-lg"></div>
                                        <PlayCircle className="w-8 h-8 text-red-500 fill-current bg-white rounded-full dark:bg-transparent" />
                                    </>
                                )
                            })()
                        ) : (
                            <>
                                <div className="absolute inset-0 bg-blue-500/10 rounded-lg"></div>
                                <FileText className="w-8 h-8 text-blue-500 fill-current bg-white dark:bg-transparent" />
                            </>
                        )}
                      </>
                   )}
                </div>
                
                <div className="flex-1 w-full text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                    <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        (material.type === 'video' || material.type === 'youtube') 
                            ? 'text-red-500 bg-red-50 dark:bg-red-900/20' 
                            : 'text-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    }`}>
                        {(material.type === 'video' || material.type === 'youtube') ? 'Video' : 'Materi'}
                    </span>
                    {material.duration_min && (
                        <span className="text-xs text-slate-400">• {material.duration_min} min</span>
                    )}
                  </div>
                  <h3 className={`text-lg font-bold group-hover:text-[#2280c3] transition-colors ${material.is_completed ? 'text-slate-700 dark:text-slate-300' : 'text-slate-900 dark:text-white'}`}>
                    {material.title}
                  </h3>
                </div>

                 {material.is_completed ? (
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full text-sm font-semibold">
                        <CheckCircle className="w-4 h-4" />
                        Selesai
                    </div>
                ) : (
                    <Link 
                        to="/learn/$classId" 
                        params={{ classId }}
                        search={{ materialId: material.id }}
                        className="flex-shrink-0 px-6 py-2.5 bg-[#2280c3] hover:bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-[0_0_15px_rgba(34,128,195,0.15)] transition-all active:scale-95 w-full md:w-auto text-center cursor-pointer"
                    >
                        Mulai Belajar
                    </Link>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}