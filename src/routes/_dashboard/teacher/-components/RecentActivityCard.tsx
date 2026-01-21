import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { cn } from "@/lib/utils"

interface RecentActivityCardProps {
    className?: string
}

export function RecentActivityCard({ className }: RecentActivityCardProps) {
    return (
        <Card className={cn("col-span-3 border-none shadow-md bg-white dark:bg-zinc-900", className)}>
            <CardHeader>
                <CardTitle className="text-lg font-bold text-zinc-800 dark:text-white">Aktivitas Terbaru</CardTitle>
                <CardDescription className="text-zinc-500 dark:text-zinc-400">
                    Pengumpulan tugas dan notifikasi.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex relative pl-4">
                            {/* Timeline line */}
                            {i !== 3 && <div className="absolute left-6.5 top-9 h-12 w-0.5 bg-zinc-100 dark:bg-zinc-800"></div>}
                            
                            <div className="mt-0.5 bg-primary/10 p-2 rounded-xl h-9 w-9 flex items-center justify-center shrink-0 z-10 shadow-sm ring-4 ring-white dark:ring-zinc-900">
                                <Calendar className="h-4 w-4 text-primary" />
                            </div>
                            <div className="ml-4 space-y-1">
                                <p className="text-sm font-medium leading-none text-zinc-800 dark:text-zinc-200">Pengumpulan Tugas: Basis UI/UX</p>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-1">
                                    <span className="font-bold text-zinc-900 dark:text-zinc-100">Budi Santoso</span> mengumpulkan tugas.
                                </p>
                                <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-medium">2 jam yang lalu</p>
                            </div>
                        </div>
                    ))}
                </div>
                <Button variant="ghost" className="w-full mt-6 text-xs text-primary hover:text-primary hover:bg-primary/5 h-8 font-medium" asChild>
                    <Link to="/teacher/activities">Lihat Semua Aktivitas</Link>
                </Button>
            </CardContent>
        </Card>
    )
}
