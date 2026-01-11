import { Avatar } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { IconList } from "@tabler/icons-react"

export const AssignmentsPane = () => {
    return (
        <div className="grid gap-4">
            {[...Array(5)].map((_, index) => (
                <Card key={index} className='p-0 ring-0'>
                    <CardContent className='p-4'>
                        <div className='flex items-center gap-2'>
                            <Avatar className="p-5 grid place-content-center bg-primary text-white"><IconList /></Avatar>
                            <div>
                                <div>Tugas - Lorem ipsum dolor sit amet.</div>
                                <div className='text-muted-foreground font-light'>02 Jul 2025</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}