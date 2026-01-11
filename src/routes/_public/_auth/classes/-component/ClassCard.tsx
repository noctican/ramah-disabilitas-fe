import { Card, CardContent } from "@/components/ui/card"
import { Link } from "@tanstack/react-router"

export const ClassCard = () => {
    return (
        <Link to="/classes/$classId" params={{ classId: '1' }} className="group">
            <Card className="p-0 gap-0 group-hover:drop-shadow-[10px_10px_0px] group-hover:drop-shadow-primary-700/15 transition-all duration-300">
                <img src="https://picsum.photos/200/300" className="w-full object-cover aspect-4/3" />
                <CardContent className="p-4">
                    <h5 className="mb-1 font-semibold">Pemrograman Dasar</h5>
                    <p className="text-sm text-muted-foreground">oleh <span className="text-black">Dr. John Doe</span></p>
                    <p className="text-sm text-muted-foreground">0 tugas aktif</p>
                </CardContent>
            </Card>
        </Link>
    )
}