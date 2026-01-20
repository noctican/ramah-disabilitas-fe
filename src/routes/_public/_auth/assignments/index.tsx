import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Plus, Filter, SortAsc, Search } from 'lucide-react'
import { useQueryData } from '@/hooks/api/use-global-fetch'
import { ASSIGNMENT } from '@/data/const/api_path'
import type { ApiResponseType } from '@/data/types/api_response_types'
import type { AssignmentType } from '@/data/types/assignment_type'
import { TaskCard } from '../classes/-component/TaskCard'
import PublicHeaderGap from '@/layout/PublicHeaderGap'
import { useRegisterCommands, type CommandInput } from '@/hooks/use-register-command'
import { useVoiceStore } from '@/data/store/voice_store'

export const Route = createFileRoute('/_public/_auth/assignments/')({
    component: RouteComponent,
})

function RouteComponent() {
    const [filter, setFilter] = useState<'upcoming' | 'overdue' | ''>('')
    const [search, setSearch] = useState('')
    const speak = useVoiceStore(s => s.speak)
    const navigate = useNavigate()

    const { data: assignmentsData, isLoading } = useQueryData<ApiResponseType<'multiple', AssignmentType>>(
        ASSIGNMENT.MY_ASSIGNMENTS,
        { filter }
    )

    const filteredAssignmentsRef = useRef<AssignmentType[]>([])

    const filteredAssignments = useMemo(() => {
        return assignmentsData?.data?.filter(assignment =>
            assignment.title.toLowerCase().includes(search.toLowerCase()) ||
            assignment.course_id.toString().includes(search.toLowerCase())
        ) || []
    }, [assignmentsData, search])

    useEffect(() => {
        filteredAssignmentsRef.current = filteredAssignments
    }, [filteredAssignments])

    useRegisterCommands(
        [
            {
                pattern: /^daftar tugas/i,
                description: "daftar tugas adalah untuk membacakan daftar tugas",
                action: () => {
                    let text_to_speech = `Anda memiliki ${filteredAssignmentsRef?.current?.length} tugas.`
                    if (filteredAssignmentsRef?.current?.length == 0) text_to_speech += ' Tidak ada tugas yang ditemukan'
                    else {
                        text_to_speech += ' Yaitu: '
                        text_to_speech += filteredAssignmentsRef?.current?.map((c, i) => `Tugas ke-${i + 1}: ${c.title}`).join('. ')
                    }

                    speak(text_to_speech)
                }
            },
            {
                pattern: /^buka tugas\s+(.+)$/i,
                priority: 10,
                description: "buka tugas... adalah untuk menampilkan detail tugas. sertakan nama tugas setelah kata tugas.",
                action: ([target]) => {
                    const targetTask = target.toLowerCase().trim()
                    const assignment = filteredAssignmentsRef?.current?.find(a => a.title.toLowerCase().trim() == targetTask)
                    if (assignment) navigate({ to: `/assignments/$assignmentId`, params: { assignmentId: assignment.id.toString() } })
                    else speak(`tugas ${targetTask} tidak ditemukan`)
                }
            },
            {
                pattern: /^filter\s+(.+)$/i,
                description: "Mengganti filter tugas. Contoh: 'filter aktif', 'filter terlewat', 'filter semua'",
                action: ([target]) => {
                    const t = target.toLowerCase().trim();
                    if (t.includes('aktif')) {
                        setFilter('upcoming');
                        speak("Menampilkan tugas aktif");
                    } else if (t.includes('terlewat')) {
                        setFilter('overdue');
                        speak("Menampilkan tugas terlewat");
                    } else {
                        setFilter('');
                        speak("Menampilkan semua tugas");
                    }
                }
            },
            {
                pattern: /^cari\s+(.+)$/i,
                description: "Mencari tugas berdasarkan kata kunci. Contoh: 'cari matematika'",
                action: ([keyword]) => {
                    const k = keyword.trim();
                    setSearch(k);
                    speak(`Mencari tugas dengan kata kunci ${k}`);
                }
            }
        ]

    )

    return (
        <>
            <PublicHeaderGap />

            <div className="container mx-auto max-w-6xl px-4 space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Daftar Tugas</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Kelola dan kerjakan tugas-tugas Anda tepat waktu.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari tugas..."
                                className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Sidebar Filters */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="bg-white dark:bg-[#1e2d3b] rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 sticky top-24">
                            <h3 className="font-bold mb-4 flex items-center gap-2">
                                <Filter className="w-4 h-4" />
                                Filter Status
                            </h3>
                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={() => setFilter('')}
                                    className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex justify-between items-center cursor-pointer ${filter === '' ? 'bg-primary text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                                >
                                    Semua Tugas
                                </button>
                                <button
                                    onClick={() => setFilter('upcoming')}
                                    className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex justify-between items-center cursor-pointer ${filter === 'upcoming' ? 'bg-primary text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                                >
                                    Aktif (Belum Dikerjakan)
                                </button>
                                <button
                                    onClick={() => setFilter('overdue')}
                                    className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex justify-between items-center cursor-pointer ${filter === 'overdue' ? 'bg-orange-500 text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                                >
                                    Terlewat
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Assignments List */}
                    <div className="lg:col-span-9">
                        {isLoading ? (
                            <div className="text-center py-20 text-gray-500">Memuat tugas...</div>
                        ) : (
                            <div className="space-y-4">
                                {filteredAssignments && filteredAssignments.length > 0 ? (
                                    filteredAssignments.map((assignment) => (
                                        <div key={assignment.id} className="bg-white dark:bg-[#1e2d3b] rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
                                            <TaskCard data={assignment} />
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-20 bg-white dark:bg-[#1e2d3b] rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
                                        <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Filter className="w-8 h-8 text-gray-300" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Tidak ada tugas ditemukan</h3>
                                        <p className="text-gray-500 text-sm mt-1">Coba ubah filter atau kata kunci pencarian Anda.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
