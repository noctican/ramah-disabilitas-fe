import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Calendar, CheckCircle2, AlertCircle } from "lucide-react"

export const Route = createFileRoute('/_dashboard/teacher/activities')({
  component: ActivitiesPage,
})

function ActivitiesPage() {
  // Mock data for activities
  const activities = [
    {
      id: 1,
      title: "Pengumpulan Tugas: Basis UI/UX",
      user: "Budi Santoso",
      action: "mengumpulkan tugas",
      time: "2 jam yang lalu",
      type: "submission",
    },
    {
      id: 2,
      title: "Tugas Baru: Prototyping",
      user: "Anda",
      action: "membuat tugas baru",
      time: "5 jam yang lalu",
      type: "creation",
    },
    {
      id: 3,
      title: "Pendaftaran Mahasiswa",
      user: "Siti Aminah",
      action: "mendaftar ke kelas",
      time: "1 hari yang lalu",
      type: "enrollment",
    },
    {
      id: 4,
      title: "Pengingat Penilaian",
      user: "Sistem",
      action: "mengingatkan tugas belum dinilai",
      time: "1 hari yang lalu",
      type: "system",
    },
     {
      id: 5,
      title: "Pengumpulan Tugas: Basis Data",
      user: "Ahmad Dani",
      action: "mengumpulkan tugas",
      time: "2 hari yang lalu",
      type: "submission",
    },
  ]

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
            {activities.map((activity, index) => (
              <div key={activity.id} className="flex relative pl-4">
                {/* Timeline line */}
                {index !== activities.length - 1 && (
                  <div className="absolute left-6.5 top-9 bottom-[-2rem] w-0.5 bg-zinc-100 dark:bg-zinc-800"></div>
                )}
                
                <div className={`mt-0.5 p-2 rounded-xl h-9 w-9 flex items-center justify-center shrink-0 z-10 shadow-sm ring-4 ring-white dark:ring-zinc-900 ${
                    activity.type === 'submission' ? 'bg-primary/10 text-primary' :
                    activity.type === 'creation' ? 'bg-blue-500/10 text-blue-500' :
                    activity.type === 'enrollment' ? 'bg-green-500/10 text-green-500' :
                    'bg-orange-500/10 text-orange-500'
                }`}>
                  {activity.type === 'submission' ? <Calendar className="h-4 w-4" /> :
                   activity.type === 'creation' ? <CheckCircle2 className="h-4 w-4" /> :
                   activity.type === 'enrollment' ? <CheckCircle2 className="h-4 w-4" /> :
                   <AlertCircle className="h-4 w-4" />
                  }
                </div>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none text-zinc-800 dark:text-zinc-200">{activity.title}</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-1">
                    <span className="font-bold text-zinc-900 dark:text-zinc-100">{activity.user}</span> {activity.action}.
                  </p>
                  <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-medium">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
