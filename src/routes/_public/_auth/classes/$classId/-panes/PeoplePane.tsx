import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const PeoplePane = () => {
    return (
        <div className="grid gap-4">
            <Card className='p-0 ring-0 hidden lg:block'>
                <CardContent className='px-0 py-4'>
                    <h4 className='mb-2 text-xl px-6'>Pengajar</h4>
                    <div className="grid">
                        {[...Array(3)].map((_, i) => (
                            <div key={i}>
                                <Separator className="m-0" />
                                <div className='flex items-center gap-2 px-6 py-3'>
                                    <Avatar>
                                        <AvatarImage src="https://picsum.photos/200/300" alt="" />
                                    </Avatar>
                                    <div>Nama Pengajar {i+1}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
            <Card className='p-0 ring-0 hidden lg:block'>
                <CardContent className='px-0 py-4'>
                    <h4 className='mb-2 text-xl px-6'>Peserta</h4>
                    <div className="grid">
                        {[...Array(10)].map((_, i) => (
                            <div key={i}>
                                <Separator className="m-0" />
                                <div className='flex items-center gap-2 px-6 py-3'>
                                    <Avatar>
                                        <AvatarImage src="https://picsum.photos/200/300" alt="" />
                                    </Avatar>
                                    <div>Nama Pengajar {i+1}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}