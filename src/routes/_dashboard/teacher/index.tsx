import { createFileRoute, Link } from '@tanstack/react-router'
import {
    Users,
    BookOpen,
    GraduationCap,
    TrendingUp,
    Plus,
} from "lucide-react"
import { useQuery } from '@tanstack/react-query'
import { getFetcher } from '@/lib/api-client'
import { COURSE } from '@/data/const/api_path'
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { StatsCard } from './-components/StatsCard'
import { ActiveClassesCard } from './-components/ActiveClassesCard'
import { RecentActivityCard } from './-components/RecentActivityCard'
import { Card, CardHeader, CardContent } from "@/components/ui/card"

export const Route = createFileRoute('/_dashboard/teacher/')({
    component: TeacherDashboard,
})

function TeacherDashboard() {
    const { data: coursesData, isLoading } = useQuery({
        queryKey: ['lecturer-courses'],
        queryFn: () => getFetcher(COURSE.GET_ALL)
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const courses = (coursesData as any)?.data || []
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const activeCourses = courses.filter((c: any) => c.status === 'published')

    // Mock statistics since we don't have endpoints for aggregated data
    const totalStudents = 142 // Placeholder
    const pendingGrading = 12 // Placeholder
    const avgCompletion = 78  // Placeholder

    if (isLoading) {
        return <DashboardSkeleton />
    }

    return (
        <div className="flex-1 space-y-8 min-h-full font-sans">
            {/* Header */}
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">Dashboard</h2>
                    <p className="text-zinc-500 dark:text-zinc-400">Selamat datang kembali! Berikut ringkasan aktivitas kelas Anda.</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button asChild>
                        <Link to="/teacher/classes/create">
                            <Plus className="mr-2 h-4 w-4" /> Buat Kelas Baru
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Total Kelas"
                    value={courses.length}
                    icon={<BookOpen className="h-4 w-4 text-primary" />}
                    description="Total kelas yang Anda ampu"
                />
                <StatsCard
                    title="Total Siswa"
                    value={totalStudents}
                    icon={<Users className="h-4 w-4 text-primary" />}
                    description="Siswa terdaftar aktif"
                />
                <StatsCard
                    title="Perlu Dinilai"
                    value={pendingGrading}
                    icon={<GraduationCap className="h-4 w-4 text-primary" />}
                    description="Tugas menunggu penilaian"
                    indicator="warn"
                />
                <StatsCard
                    title="Rata-rata Penyelesaian"
                    value={`${avgCompletion}%`}
                    icon={<TrendingUp className="h-4 w-4 text-primary" />}
                    description="Progress modul siswa"
                />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                {/* Main Content - Active Classes */}
                <ActiveClassesCard courses={activeCourses} className="lg:col-span-4" />

                {/* Sidebar - Recent Activity / Assignments */}
                <RecentActivityCard className="lg:col-span-3" />
            </div>
        </div>
    )
}

function DashboardSkeleton() {
    return (
        <div className="flex-1 space-y-8">
            <div className="flex items-center justify-between space-y-2">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-72" />
                </div>
                <Skeleton className="h-10 w-36" />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="border-none shadow-md"><CardHeader><Skeleton className="h-5 w-full" /></CardHeader><CardContent><Skeleton className="h-10 w-full" /></CardContent></Card>
                ))}
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <Skeleton className="col-span-4 h-96 rounded-xl" />
                <Skeleton className="col-span-3 h-96 rounded-xl" />
            </div>
        </div>
    )
}
