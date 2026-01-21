import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2, Save } from "lucide-react"
import { useMutationAction } from "@/hooks/api/use-global-fetch"
import { COURSE, STUDENT } from "@/data/const/api_path"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const formSchema = z.object({
  email: z.string().email("Email tidak valid"),
  name: z.string().min(3, "nama minimal 3 karakter"),
  password: z.string().optional(),
}).refine((data) => {
    if (data.password && data.password.length > 0 && data.password.length < 8) {
        return false;
    }
    return true;
}, {
    message: "Password minimal 8 karakter",
    path: ["password"],
})

interface EditStudentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  student: any
  classId: string
}

export function EditStudentModal({
  open,
  onOpenChange,
  student,
  classId,
}: EditStudentModalProps) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  })

  useEffect(() => {
    if (student) {
        form.reset({
            email: student.email,
            name: student.name,
            password: "",
        })
    }
  }, [student, form])

  const editStudent = useMutationAction(
    STUDENT.UPDATE,
    "put",
    {
      onSuccess: () => {
        onOpenChange(false)
        form.reset()
      },
      refreshKey: COURSE.LIST_STUDENT.replace('{course_id}', classId)
    }
  )

  const isMutating = editStudent.isMutating

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
      if (!student) return

      await editStudent.trigger({
        ...values,
        student_id: student.id,
        password: values.password || undefined // Only send if not empty
      })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Siswa</DialogTitle>
          <DialogDescription>
            Perbarui data siswa
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Email Siswa</FormLabel>
                    <FormControl>
                    <Input placeholder="contoh@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                    <Input placeholder="Nama Siswa" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Password Baru (Opsional)</FormLabel>
                    <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            <div className="flex justify-end gap-3 pt-4">
                <Button
                type="button"
                variant="ghost"
                onClick={() => onOpenChange(false)}
                disabled={isMutating}
                >
                Batal
                </Button>
                <Button 
                type="submit" 
                className="bg-primary hover:bg-primary-700 min-w-24"
                disabled={isMutating}
                >
                {isMutating ? (
                    <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Menyimpan...
                    </>
                ) : (
                    <>
                        <Save className="w-4 h-4 mr-2" />
                        Simpan
                    </>
                )}
                </Button>
            </div>
            </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
