import { Avatar } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { IconList } from "@tabler/icons-react"
import { Link } from "@tanstack/react-router"

export const TaskCard = () => {
    return (
        <Link to="." className="group">
            <Card className="gap-0 p-0 rounded-full group-hover:drop-shadow-[6px_6px_0px] group-hover:drop-shadow-primary-700/15 transition-all duration-300">
                <CardContent className="p-2 flex gap-4 items-center">
                    <Avatar className="p-5 grid place-content-center bg-primary text-white"><IconList /></Avatar>
                    <div>
                        <div>Judul Task</div>
                        <div className="text-sm text-muted-foreground">24 Jan 2025 - 15:00</div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}