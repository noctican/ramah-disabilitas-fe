import { SLOW_LEARNER } from "@/data/const/disability"
import { useAuthStore } from "@/data/store/auth_store"
import type { JoinedCourse } from "@/data/types/course_type"
import { Link } from "@tanstack/react-router"
import { School } from "lucide-react"

type Props = {
    data: JoinedCourse
}

export const ClassCard = ({ data }: Props) => {
    const {hasDisability} = useAuthStore()
    return (
        <Link 
            to="/classes/$classId" 
            params={{ classId: data.id.toString() }} 
            className="bg-white dark:bg-[#1e2d3b] rounded-2xl border border-[#f1f3f3] dark:border-gray-800 p-4 shadow-sm hover:shadow-md transition-shadow group flex flex-col cursor-pointer h-full"
        >
            <div
                className="aspect-video w-full rounded-xl bg-gray-100 bg-cover bg-center relative overflow-hidden"
                style={{ backgroundImage: `url("${data.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60'}")` }}
            >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                {
                    !hasDisability(SLOW_LEARNER) &&
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-primary-700 shadow-sm">
                        {data.class_code}
                    </div>
                }
            </div>
            <div className="pt-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2 gap-3">
                    <h4 className="text-[#131616] dark:text-white text-lg font-bold leading-tight group-hover:text-primary-700 transition-colors line-clamp-2">
                        {data.title}
                    </h4>
                    {/* Circular Progress */}
                    <div className="relative w-10 h-10 shrink-0">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                            <path className="text-[#f1f3f3] dark:text-gray-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"></path>
                            <path className="text-primary-700 drop-shadow-sm transition-all duration-1000 ease-out" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray={`${data.progress || 0}, 100`} strokeLinecap="round" strokeWidth="3"></path>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-primary-700">
                            {Math.round(data.progress || 0)}%
                        </div>
                    </div>
                </div>
                {data.description && (
                    <p className="text-[#6b7c80] dark:text-gray-400 text-sm mb-4 line-clamp-2">
                        {data.description}
                    </p>
                )}
                
                <div className="mt-auto pt-2">
                     <button className="w-full py-2.5 rounded-xl bg-[#f1f3f3] dark:bg-gray-700 text-[#131616] dark:text-white text-sm font-bold hover:bg-primary-700 hover:text-white transition-all">
                        Lanjutkan Belajar
                    </button>
                </div>
            </div>
        </Link>
    )
}