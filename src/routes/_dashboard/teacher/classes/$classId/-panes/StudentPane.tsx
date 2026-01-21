import { Button } from "@/components/ui/button"
import { useParams } from "@tanstack/react-router"
import { MoreHorizontal, Pencil, Trash } from "lucide-react"
import { useState } from "react"
import { ImportStudentModal } from "../../-components/ImportStudentModal"
import { AddStudentModal } from "../../-components/AddStudentModal"
import { EditStudentModal } from "../../-components/EditStudentModal"
import { useMutationAction, useQueryData } from "@/hooks/api/use-global-fetch"
import type { ApiResponseType } from "@/data/types/api_response_types"
import { COURSE, STUDENT } from "@/data/const/api_path"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner" // Assuming sonner is used for toasts based on file list

export const StudentPane = () => {
    const { classId } = useParams({ from: '/_dashboard/teacher/classes/$classId/' })

    const [isImportModalOpen, setIsImportModalOpen] = useState(false)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [studentToEdit, setStudentToEdit] = useState<any>(null)

    // Fix: Perform URL replacement correctly
    const { data: studentData, isLoading } = useQueryData<any>(COURSE.LIST_STUDENT.replace('{course_id}', classId))
    const students = studentData?.data || []

    const deleteStudent = useMutationAction(
        STUDENT.DELETE,
        "delete",
        {
            onSuccess: () => {
                toast.success("Siswa berhasil dihapus")
            },
            onError: (err: any) => {
                toast.error("Gagal menghapus siswa: " + (err.response?.data?.message || err.message))
            },
            refreshKey: COURSE.LIST_STUDENT.replace('{course_id}', classId)
        }
    )

    const handleDelete = async (student: any) => {
        if (confirm(`Apakah Anda yakin ingin menghapus siswa ${student.name}?`)) {
            await deleteStudent.trigger({
                student_id: student.id
            })
        }
    }

    const handleEdit = (student: any) => {
        setStudentToEdit(student)
        setIsEditModalOpen(true)
    }

    return (
        <>
            <ImportStudentModal
                open={isImportModalOpen}
                onOpenChange={setIsImportModalOpen}
                classId={classId}
            />
            <AddStudentModal
                open={isAddModalOpen}
                onOpenChange={setIsAddModalOpen}
                classId={classId}
            />
            <EditStudentModal
                open={isEditModalOpen}
                onOpenChange={setIsEditModalOpen}
                student={studentToEdit}
                classId={classId}
            />
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg text-zinc-900 dark:text-white">Siswa Terdaftar ({students.length})</h3>
                    <div className='flex items-center gap-1'>
                        <Button onClick={() => setIsAddModalOpen(true)}>Tambah</Button>
                        <Button variant="outline" onClick={() => setIsImportModalOpen(true)} className="text-sm font-semibold text-primary hover:underline">Impor</Button>

                    </div>
                </div>
                
                <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-zinc-500 uppercase text-xs font-bold border-b border-zinc-100 dark:border-zinc-800">
                            <tr>
                                <th className="px-6 py-4">Nama Siswa</th>
                                <th className="px-6 py-4">Tanggal Bergabung</th>
                                <th className="px-6 py-4">Poin</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={4} className="text-center py-8 text-zinc-500">
                                        Memuat data siswa...
                                    </td>
                                </tr>
                            ) : students.length > 0 ? (
                                students.map((student: any) => (
                                    <tr key={student.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/20 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {student.avatar ? (
                                                     <img src={student.avatar} alt={student.name} className="w-8 h-8 rounded-full object-cover" />
                                                ) : (
                                                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                                                        {student.name.charAt(0).toUpperCase()}
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="font-bold text-zinc-900 dark:text-zinc-100">{student.name}</p>
                                                    <p className="text-xs text-zinc-400">{student.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-zinc-500">
                                            {new Date(student.created_at).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                                                {student.points} XP
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <button className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1">
                                                        <MoreHorizontal className="w-4 h-4" />
                                                    </button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => handleEdit(student)}>
                                                        <Pencil className="w-4 h-4 mr-2" />
                                                        Edit Siswa
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem 
                                                        className="text-red-600 focus:text-red-600"
                                                        onClick={() => handleDelete(student)}
                                                    >
                                                        <Trash className="w-4 h-4 mr-2" />
                                                        Hapus Siswa
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="text-center py-8 text-zinc-500">
                                        Belum ada siswa yang terdaftar di kelas ini.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
