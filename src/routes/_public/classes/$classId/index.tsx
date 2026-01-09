import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import PublicHeaderGap from '@/layout/PublicHeaderGap'
import { createFileRoute } from '@tanstack/react-router'
import { TimelinePane } from './-panes/TimelinePane'
import { AssignmentsPane } from './-panes/AssignmentsPane'
import { PeoplePane } from './-panes/PeoplePane'

export const Route = createFileRoute('/_public/classes/$classId/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
        <PublicHeaderGap />
        <div className='container mx-auto'>
            <div className="grid grid-cols-3 gap-6">
                <div className='col-span-3 lg:col-span-1 grid gap-4 mb-auto'>
                    <Card className='p-0'>
                        <div className='w-full h-40 grid place-content-center relative'>
                            <img src="https://picsum.photos/200/300" alt="" className='w-full h-40 object-cover brightness-50 contrast-50 absolute top-0 left-0' />
                            <div className='text-white relative font-bold text-3xl'>Judul Kelas</div>
                        </div>
                    </Card>
                    <Card className='p-0 ring-0 hidden lg:block'>
                        <CardContent className='p-4'>
                            <h5 className='font-semibold mb-2'>Tugas Mendatang</h5>
                            <p className='text-muted-foreground'>Hore, tidak ada tugas yang perlu diselesaikan</p>
                        </CardContent>
                    </Card>
                    <Card className='p-0 ring-0 hidden lg:block'>
                        <CardContent className='p-4'>
                            <h5 className='font-semibold mb-2'>Pengajar</h5>
                            <div className="grid gap-3">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i}>
                                        <Separator />
                                        <div className='flex items-center gap-2 mt-2'>
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

                <div className="col-span-3 lg:col-span-2 mb-auto">
                    <Tabs defaultValue='timeline' onValueChange={(e) => {console.log(e)}}>
                        <TabsList className='bg-muted text-muted-foreground mb-4'>
                            <TabsTrigger value='timeline'>Timeline</TabsTrigger>
                            <TabsTrigger value='assignments'>Tugas</TabsTrigger>
                            <TabsTrigger value='people'>Orang</TabsTrigger>
                        </TabsList>
                        <TabsContent value='timeline'>
                            <TimelinePane />
                        </TabsContent>
                        <TabsContent value='assignments'>
                            <AssignmentsPane />
                        </TabsContent>
                        <TabsContent value='people'>
                            <PeoplePane />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    </>
  )
}
