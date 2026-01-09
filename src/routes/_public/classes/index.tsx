import { TitleSection } from '@/components/custom/Title'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import PublicHeaderGap from '@/layout/PublicHeaderGap'
import { createFileRoute } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { ClassCard } from './-component/ClassCard'
import { TaskCard } from './-component/TaskCard'

export const Route = createFileRoute('/_public/classes/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <PublicHeaderGap />
      <div className='container mx-auto'>
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-3 lg:col-span-2">
            <Card className='ring-0'>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <TitleSection>Daftar Kelas</TitleSection>
                  <Button><Plus /> Join</Button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {Array(6).fill(0).map((_, index) => (
                    <ClassCard key={index} />
                  ))}
                </div>
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
