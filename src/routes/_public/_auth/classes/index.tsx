import { TitleSection } from '@/components/custom/Title'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import PublicHeaderGap from '@/layout/PublicHeaderGap'
import { createFileRoute } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { ClassCard } from './-component/ClassCard'
import { TaskCard } from './-component/TaskCard'
import { useState } from 'react'
import { JoinClassDialog } from './-component/JoinClassDialog'
import { useQueryData } from '@/hooks/api/use-global-fetch'
import { COURSE } from '@/data/const/api_path'
import type { ApiResponseType } from '@/data/types/api_response_types'

export const Route = createFileRoute('/_public/_auth/classes/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false)
  const { data } = useQueryData<ApiResponseType<'multiple'>>(COURSE.JOINED)

  return (
    <>
      <JoinClassDialog isOpen={isJoinDialogOpen} setIsOpen={setIsJoinDialogOpen} />
      <PublicHeaderGap />
      <div className='container mx-auto'>
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-3 lg:col-span-2">
            <Card className='ring-0'>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <TitleSection>Daftar Kelas</TitleSection>
                  <Button onClick={() => setIsJoinDialogOpen(true)}><Plus /> Join</Button>
                </div>
                {(data?.data?.length ?? 0) > 0
                  ? <div className="grid grid-cols-3 gap-4">
                    {data?.data?.map((_, index) => (
                      <ClassCard key={index} />
                    ))}
                  </div>
                  : <div className='py-6 bg-slate-100 rounded'>
                    <p className='text-center text-muted-foreground'>Belum ada kelas yang diikuti</p>
                  </div>
                }
              </CardContent>
            </Card>
          </div>
          <div className="hidden lg:block col-span-1">
            <Card className='ring-0'>
              <CardContent>
                <TitleSection className='mb-4'>Tugas Tersedia</TitleSection>
                <div className="grid gap-4">
                  {Array(2).fill(0).map((_, index) => (
                    <TaskCard key={index} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
