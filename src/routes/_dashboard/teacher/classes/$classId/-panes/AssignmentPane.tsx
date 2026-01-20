import { ASSIGNMENT } from "@/data/const/api_path"
import { useQueryData } from "@/hooks/api/use-global-fetch"
import { Link, useParams } from "@tanstack/react-router"
import { AlertCircle, Calendar, ClipboardList, Clock, FileText, Loader2, Plus } from "lucide-react"

export const AssignmentPane = () => {
    const { classId } = useParams({from: '/_dashboard/teacher/classes/$classId/'})
    const { data: assignmentData, isLoading: isAssignmentsLoading } = useQueryData<any>(ASSIGNMENT.GET_ALL.replace('{course_id}', classId))
    const assignments = assignmentData?.data

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                        <ClipboardList className="w-5 h-5 text-primary" />
                        Daftar Tugas
                    </h3>
                    <p className="text-sm text-zinc-500 mt-1">Kelola tugas dan latihan untuk siswa Anda.</p>
                </div>
                
                <Link
                    to="/teacher/classes/$classId/assignment/create"
                    params={{ classId }}
                    className="px-4 py-2 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary-600 transition-all flex items-center gap-2 self-start sm:self-auto"
                >
                    <Plus className="w-4 h-4" />
                    Buat Tugas Baru
                </Link>
            </div>

            {/* Assignment List */}
            <div className="space-y-3">
                {isAssignmentsLoading ? (
                    <div className="flex flex-col items-center justify-center py-12 text-zinc-400 animate-pulse">
                        <Loader2 className="w-8 h-8 animate-spin mb-2" />
                        <p>Memuat daftar tugas...</p>
                    </div>
                ) : assignments?.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50">
                        <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-3">
                            <FileText className="w-6 h-6 text-zinc-400" />
                        </div>
                        <h3 className="text-zinc-900 dark:text-white font-bold mb-1">Belum ada tugas</h3>
                        <p className="text-zinc-500 text-sm max-w-xs mx-auto mb-4">Buat tugas pertama Anda untuk mulai menguji pemahaman siswa.</p>
                        <Link
                            to="/teacher/classes/$classId/assignment/create"
                            params={{ classId }}
                            className="text-primary text-sm font-semibold hover:underline"
                        >
                            Buat Tugas Sekarang &rarr;
                        </Link>
                    </div>
                ) : (
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    assignments?.map((assignment: any) => (
                        <div key={assignment.id} className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl hover:border-primary hover:ring-1 hover:ring-primary transition-all cursor-pointer">
                            <div className="flex items-start justify-between">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                                        <FileText className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-zinc-900 dark:text-white group-hover:text-primary transition-colors">
                                            {assignment.title}
                                        </h4>
                                    
                                        <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-zinc-500">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5" />
                                                <span>
                                                    Tenggat: {new Date(assignment.deadline).toLocaleDateString('id-ID', { 
                                                        weekday: 'long', 
                                                        day: 'numeric', 
                                                        month: 'long', 
                                                        year: 'numeric' 
                                                    })}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="w-3.5 h-3.5" />
                                                <span>
                                                    {new Date(assignment.deadline).toLocaleTimeString('id-ID', { 
                                                        hour: '2-digit', 
                                                        minute: '2-digit' 
                                                    })}
                                                    {' '}(WIB)
                                                </span>
                                            </div>
                                            {assignment.allow_late && (
                                                <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded-full">
                                                    <AlertCircle className="w-3 h-3" />
                                                    <span>Terlambat Diizinkan</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-bold rounded-lg border border-zinc-200 dark:border-zinc-700">
                                        {assignment.max_points} Poin
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            </div>
    )
}