import type { AssignmentType } from "@/data/types/assignment_type"
import { Calculator, School, History, CalendarClock } from "lucide-react"

type Props = {
    data: AssignmentType
}

import { Link } from "@tanstack/react-router"
import { IconSchool } from "@tabler/icons-react"

export const TaskCard = ({ data }: Props) => {
    const deadlineDate = new Date(data.deadline)
    const now = new Date()
    const isOverdue = deadlineDate < now
    const isUrgent = !isOverdue && (deadlineDate.getTime() - now.getTime() < 24 * 60 * 60 * 1000) // < 24 hours

    const month = deadlineDate.toLocaleString('id-ID', { month: 'short' })
    const date = deadlineDate.getDate()
    
    // Determine styles based on status
    let statusConfig = {
        bg: "bg-[#f1f3f3] dark:bg-gray-700",
        text: "text-gray-600 dark:text-gray-300",
        badgeBg: "bg-gray-100 dark:bg-gray-700",
        badgeText: "text-gray-600 dark:text-gray-300",
        label: "Kerjakan"
    }

    if (isOverdue) {
        statusConfig = {
            bg: "bg-yellow-50 dark:bg-yellow-500/10",
            text: "text-yellow-600 dark:text-yellow-400",
            badgeBg: "bg-yellow-100 dark:bg-yellow-900/30",
            badgeText: "text-yellow-700 dark:text-yellow-300",
            label: "Terlewat"
        }
    } else if (isUrgent) {
         statusConfig = {
            bg: "bg-purple-50 dark:bg-purple-500/10",
            text: "text-purple-600 dark:text-purple-400",
            badgeBg: "bg-purple-100 dark:bg-purple-900/30",
            badgeText: "text-purple-700 dark:text-purple-300",
            label: "Penting"
        }
    }

    const formattedDeadline = deadlineDate.toLocaleString('id-ID', { 
        weekday: 'long', 
        hour: '2-digit', 
        minute: '2-digit' 
    })

    return (
        <Link 
            to="/assignments/$assignmentId" 
            params={{ assignmentId: data.id.toString() }}
            className="flex gap-4 group cursor-pointer block"
        >
            <div className={`flex flex-col items-center justify-center h-14 w-14 rounded-xl shrink-0 ${statusConfig.bg} ${statusConfig.text}`}>
                <span className="text-xs font-bold uppercase">{month}</span>
                <span className="text-lg font-black leading-none">{date}</span>
            </div>
            <div className="flex flex-col flex-1">
                <div className="flex justify-between items-start">
                    <p className="text-[#131616] dark:text-white font-bold text-sm line-clamp-1 group-hover:text-[#2d6a76] transition-colors">
                        {data.title}
                    </p>
                    <span className={`${statusConfig.badgeBg} ${statusConfig.badgeText} text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap`}>
                        {statusConfig.label}
                    </span>
                </div>
                <p className="text-[#6b7c80] dark:text-gray-400 text-xs mt-1 flex gap-2">
                    <CalendarClock className="text-gray-400 w-3.5 h-3.5" />
                    Tenggat: {formattedDeadline}
                </p>
                <div className="flex items-center gap-2 mt-1">
                    <IconSchool className="text-gray-400 w-3.5 h-3.5" />
                    <p className="text-xs text-gray-500 font-medium">Kelas {data.course_id}</p>
                </div>
            </div>
        </Link>
    )
}