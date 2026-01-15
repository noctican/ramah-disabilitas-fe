import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatsCardProps {
    title: string
    value: string | number
    icon: React.ReactNode
    description: string
    indicator?: 'warn' | 'success'
    className?: string
}

export function StatsCard({ title, value, icon, description, className }: StatsCardProps) {
    return (
        <Card className={cn(
            "border-none shadow-md hover:shadow-lg transition-all duration-200 bg-white dark:bg-zinc-900",
            className
        )}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    {title}
                </CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">{value}</div>
                <p className="text-xs text-zinc-500 dark:text-zinc-500">
                    {description}
                </p>
            </CardContent>
        </Card>
    )
}
