import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { IconBook, IconList } from "@tabler/icons-react"

export const TimelinePane = () => {
  return (
    <div className="grid gap-4">
        <Card className='p-0 ring-0'>
            <CardContent className='p-4'>
                <div className='flex items-center gap-2 mb-3'>
                    <Avatar>
                        <AvatarImage src="https://picsum.photos/200/300" alt="" />
                    </Avatar>
                    <div>
                        <div>Nama Pengajar</div>
                        <div className='text-muted-foreground font-light'>02 Jul 2025</div>
                    </div>
                </div>
                <p className='text-muted-foreground'>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo officia aperiam magnam aspernatur at recusandae, necessitatibus esse! Quidem, similique animi!
                    <br />
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, tempore! Aliquam fuga impedit enim iste.
                </p>
            </CardContent>
        </Card>
        <Card className='p-0 ring-0'>
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
        <Card className='p-0 ring-0'>
            <CardContent className='p-4'>
                <div className='flex items-center gap-2'>
                    <Avatar className="p-5 grid place-content-center bg-primary text-white"><IconBook /></Avatar>
                    <div>
                        <div>Materi - Lorem ipsum dolor sit amet.</div>
                        <div className='text-muted-foreground font-light'>02 Jul 2025</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
  )
}