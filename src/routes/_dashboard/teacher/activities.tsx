import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Calendar, CheckCircle2, AlertCircle } from "lucide-react"
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '@/lib/api-client'
import { ACTIVITY } from '@/data/const/api_path'
import { useState } from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

export const Route = createFileRoute('/_dashboard/teacher/activities')({
  component: ActivitiesPage,
})

interface Activity {
  id: number
  type: string
  title: string
  description: string
  course_name: string
  student_name: string
  created_at: string
}

interface ActivityResponse {
  meta: {
    message: string
    code: number
    status: string
  }
  data: {
    activities: Activity[]
    pagination: {
      current_page: number
      total_page: number
      total_items: number
      limit: number
    }
  }
}

function timeAgo(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return "Baru saja";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} menit yang lalu`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} jam yang lalu`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} hari yang lalu`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} bulan yang lalu`;
    const years = Math.floor(months / 12);
    return `${years} tahun yang lalu`;
}

function ActivitiesPage() {
  const [page, setPage] = useState(1)
  const limit = 10

  const { data, isLoading, isError } = useQuery<ActivityResponse>({
    queryKey: ['lecturer-activities', page, limit],
    queryFn: () => fetcher.get(ACTIVITY.GET_ACTIVITIES, { page, limit }),
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const activities = (data as any)?.data?.activities || []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pagination = (data as any)?.data?.pagination

  return (
    <div className="flex-1 space-y-8 min-h-full font-sans p-2 md:p-4">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">Daftar Aktivitas</h2>
          <p className="text-zinc-500 dark:text-zinc-400">Pantau semua aktivitas terkini di kelas Anda.</p>
        </div>
      </div>

      <Card className="border-none shadow-md bg-white dark:bg-zinc-900">
        <CardHeader>
            <CardTitle>Semua Aktivitas</CardTitle>
            <CardDescription>Daftar lengkap aktivitas mahasiswa dan sistem.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {isLoading ? (
               Array.from({ length: 5 }).map((_, i) => (
                 <div key={i} className="flex items-center space-x-4">
                    <Skeleton className="h-9 w-9 rounded-xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[200px]" />
                      <Skeleton className="h-4 w-[150px]" />
                    </div>
                 </div>
               ))
            ) : isError ? (
                <div className="text-center text-red-500">Gagal memuat aktivitas. Silakan coba lagi.</div>
            ) : activities.length === 0 ? (
                <div className="text-center text-zinc-500">Tidak ada aktivitas ditemukan.</div>
            ) : (
                <>
                {activities.map((activity: Activity, index: number) => (
                <div key={activity.id} className="flex relative pl-4">
                    {/* Timeline line */}
                    {index !== activities.length - 1 && (
                    <div className="absolute left-6.5 top-9 bottom-[-2rem] w-0.5 bg-zinc-100 dark:bg-zinc-800"></div>
                    )}
                    
                    <div className={`mt-0.5 p-2 rounded-xl h-9 w-9 flex items-center justify-center shrink-0 z-10 shadow-sm ring-4 ring-white dark:ring-zinc-900 ${
                        activity.type === 'ASSIGNMENT_SUBMISSION' ? 'bg-primary/10 text-primary' :
                        activity.type === 'ASSIGNMENT_CREATED' ? 'bg-blue-500/10 text-blue-500' :
                        activity.type === 'STUDENT_JOINED' ? 'bg-green-500/10 text-green-500' :
                        'bg-orange-500/10 text-orange-500'
                    }`}>
                    {activity.type === 'ASSIGNMENT_SUBMISSION' ? <Calendar className="h-4 w-4" /> :
                    activity.type === 'ASSIGNMENT_CREATED' ? <CheckCircle2 className="h-4 w-4" /> :
                    activity.type === 'STUDENT_JOINED' ? <CheckCircle2 className="h-4 w-4" /> :
                    <AlertCircle className="h-4 w-4" />
                    }
                    </div>
                    <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none text-zinc-800 dark:text-zinc-200">{activity.title}</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-1">
                        <span className="font-bold text-zinc-900 dark:text-zinc-100">{activity.student_name || 'System'}</span>{' '}
                        {activity.type === 'ASSIGNMENT_SUBMISSION' ? 'mengumpulkan tugas' : 
                         activity.type === 'ASSIGNMENT_CREATED' ? 'tugas baru dibuat' :
                         activity.type === 'STUDENT_JOINED' ? 'bergabung ke kelas' :
                         'melakukan aktivitas'}
                        {' '}di <span className="font-medium text-zinc-600 dark:text-zinc-300">{activity.course_name}</span>
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-medium">{timeAgo(activity.created_at)}</p>
                    </div>
                </div>
                ))}

                {pagination && pagination.total_page > 1 && (
                    <div className="flex justify-center items-center space-x-2 mt-8 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                        <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                        >
                            Previous
                        </Button>
                        <span className="text-sm text-zinc-500">Page {page} of {pagination.total_page}</span>
                        <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setPage(p => Math.min(pagination.total_page, p + 1))}
                            disabled={page === pagination.total_page}
                        >
                            Next
                        </Button>
                    </div>
                )}
                </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
