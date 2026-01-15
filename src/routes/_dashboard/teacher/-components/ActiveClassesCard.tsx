import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { cn } from "@/lib/utils"

interface ActiveClassesCardProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    courses: any[]
    className?: string
}

export function ActiveClassesCard({ courses, className }: ActiveClassesCardProps) {
    return (
        <Card className={cn("col-span-4 border-none shadow-md bg-white dark:bg-zinc-900", className)}>
            <CardHeader>
                <CardTitle className="text-lg font-bold text-zinc-800 dark:text-white">Kelas Aktif</CardTitle>
                <CardDescription className="text-zinc-500 dark:text-zinc-400">
                    Daftar kelas yang sedang berlangsung semester ini.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {courses.slice(0, 5).map((course) => (
                        <div key={course.id} className="flex items-center group">
                            <div className="h-12 w-12 rounded-xl bg-cover bg-center shrink-0 shadow-sm transition-transform group-hover:scale-105" 
                                 style={{ backgroundImage: `url("${course.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60'}")` }}>
                            </div>
                            <div className="ml-4 space-y-1 flex-1">
                                <p className="text-sm font-bold leading-none hover:text-primary cursor-pointer transition-colors text-zinc-900 dark:text-zinc-100">
                                    <Link to="/teacher/classes/$classId" params={{ classId: course.id.toString() }}>
                                        {course.title}
                                    </Link>
                                </p>
                                <div className="flex items-center text-xs text-zinc-500 relative">
                                    <span className="font-medium mr-2 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-600 dark:text-zinc-400">{course.class_code}</span>
                                    <span>• {(course.id * 5) % 30 + 15} Siswa</span>
                                </div>
                            </div>
                            <div className="w-24 hidden sm:block mr-4">
                                <div className="flex justify-between text-[10px] mb-1 text-zinc-500 font-medium">
                                    <span>Progress</span>
                                    <span>{(course.id * 7) % 40 + 60}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary rounded-full" style={{ width: `${(course.id * 7) % 40 + 60}%` }} />
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" asChild className="h-8 w-8 text-zinc-400 hover:text-primary hover:bg-primary/10 rounded-full">
                                <Link to="/teacher/classes/$classId" params={{ classId: course.id.toString() }}>
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    ))}
                    {courses.length === 0 && (
                        <div className="text-center py-8 text-zinc-400 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-700">
                            <p>Belum ada kelas aktif.</p>
                            <Button variant="link" asChild className="text-primary mt-2">
                                <Link to="/teacher/classes/create">Mulai Buat Kelas</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
