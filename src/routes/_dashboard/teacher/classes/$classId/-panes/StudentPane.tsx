import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"

export const StudentPane = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg text-zinc-900 dark:text-white">Siswa Terdaftar (128)</h3>
                <div className='flex items-center gap-1'>
                    <Button>Tambah</Button>
                    <Button variant="outline" className="text-sm font-semibold text-primary hover:underline">Impor</Button>

                </div>
            </div>
            
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-zinc-500 uppercase text-xs font-bold border-b border-zinc-100 dark:border-zinc-800">
                        <tr>
                            <th className="px-6 py-4">Nama Siswa</th>
                            <th className="px-6 py-4">Tanggal Bergabung</th>
                            <th className="px-6 py-4">Progress</th>
                            <th className="px-6 py-4 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <tr key={i} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/20 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center font-bold text-zinc-500 text-xs">U{i}</div>
                                        <div>
                                            <p className="font-bold text-zinc-900 dark:text-zinc-100">User Siswa {i}</p>
                                            <p className="text-xs text-zinc-400">siswa{i}@email.com</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-zinc-500">10 Jan 2024</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-20 bg-zinc-100 dark:bg-zinc-700 h-1.5 rounded-full overflow-hidden">
                                            <div className="bg-green-500 h-full" style={{ width: `${i * 15}%` }}></div>
                                        </div>
                                        <span className="text-xs font-medium text-zinc-500">{i * 15}%</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}