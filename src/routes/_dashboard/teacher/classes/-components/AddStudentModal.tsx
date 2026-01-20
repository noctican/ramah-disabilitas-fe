import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2, Plus, UserPlus } from "lucide-react"
import { useMutationAction } from "@/hooks/api/use-global-fetch"
import { COURSE, STUDENT } from "@/data/const/api_path"
import { ALL_DISABILITY, BLIND_DISABILITY, HEARING_DISABILITY, INTELECTUAL_DISABILITY, MOBILITY_DISABLE, SLOW_LEARNER } from "@/data/const/disability"
import { Checkbox } from "@/components/ui/checkbox"

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const formSchema = z.object({
  mode: z.enum(["existing", "new"]),
  email: z.string().email("Email tidak valid"),
  name: z.string().min(3, "nama minimal 3 karakter").optional(),
  password: z.string().min(8, 'Password minimal 8 karakter').regex(/^[0-9]+$/, { message: "kata sandi hanya dapat berisi angka" }).optional(),
}).superRefine((data, ctx) => {
  if (data.mode === "new") {
    if (!data.name || data.name.length < 3) {
      ctx.addIssue({
        code: "custom",
        message: "Nama minimal 3 karakter",
        path: ["name"],
      })
    }
    if (!data.password || data.password.length < 8) {
      ctx.addIssue({
        code: "custom",
        message: "Password minimal 8 karakter",
        path: ["password"],
      })
    }
  }
})

interface AddStudentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  classId: string
}

export function AddStudentModal({
  open,
  onOpenChange,
  classId,
}: AddStudentModalProps) {
  const [activeTab, setActiveTab] = useState<"existing" | "new">("existing")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mode: "existing",
      email: "",
      name: "",
      password: "",
      disabilities: [],
    } as any,
  })

  const addNewStudent = useMutationAction(
    STUDENT.ADD_TO_COURSE,
    "post",
    {
      onSuccess: () => {
        onOpenChange(false)
        form.reset()
      },
      refreshKey: COURSE.DETAIL
    }
  )

  const isMutating = addNewStudent.isMutating

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
      await addNewStudent.trigger({
        email: values.email,
        name: values.mode == 'new' ? values.name : undefined,
        password: values.mode == 'new' ? values.password : undefined,
        course_id: classId,
      })
  }

  const handleTabChange = (value: string) => {
    const mode = value as "existing" | "new"
    setActiveTab(mode)
    form.setValue("mode", mode)
    form.clearErrors()
  }

  const getDisabilityLabel = (type: string) => {
    switch(type) {
        case HEARING_DISABILITY: return "Tuna Rungu"
        case BLIND_DISABILITY: return "Tuna Netra"
        case MOBILITY_DISABLE: return "Tuna Daksa"
        case INTELECTUAL_DISABILITY: return "Tuna Grahita"
        // case SLOW_LEARNER: return "Kesulitan Kognitif"
        default: return "Tidak Ada"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Tambah Siswa</DialogTitle>
          <DialogDescription>
            Tambahkan siswa ke dalam kelas ini
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4 bg-primary-50">
            <TabsTrigger 
                value="existing"
                className="data-[state=active]:bg-white data-[state=active]:text-primary-700 data-[state=active]:shadow-sm"
            >
                Akun Sudah Ada
            </TabsTrigger>
            <TabsTrigger 
                value="new"
                className="data-[state=active]:bg-white data-[state=active]:text-primary-700 data-[state=active]:shadow-sm"
            >
                Buat Akun Baru
            </TabsTrigger>
          </TabsList>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <input type="hidden" {...form.register("mode")} />
              
              <TabsContent value="existing" className="space-y-4">
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
              </TabsContent>

              <TabsContent value="new" className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="******" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <FormField
                  control={form.control}
                  name="disabilities"
                  render={() => (
                    <FormItem>
                      <FormLabel>Jenis Disabilitas</FormLabel>
                      <div className="grid grid-cols-2 gap-2 border rounded-md p-3">
                        {ALL_DISABILITY.map((type) => (
                           <FormField
                             key={type}
                             control={form.control}
                             name="disabilities"
                             render={({ field }) => {
                               return (
                                 <FormItem
                                   key={type}
                                   className="flex flex-row items-start space-x-3 space-y-0"
                                 >
                                   <FormControl>
                                     <Checkbox
                                       checked={field.value?.includes(type)}
                                       onCheckedChange={(checked) => {
                                         return checked
                                           ? field.onChange([...field.value, type])
                                           : field.onChange(
                                               field.value?.filter(
                                                 (value) => value !== type
                                               )
                                             )
                                       }}
                                     />
                                   </FormControl>
                                   <FormLabel className="font-normal cursor-pointer">
                                     {getDisabilityLabel(type)}
                                   </FormLabel>
                                 </FormItem>
                               )
                             }}
                           />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
              </TabsContent>

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
                      Proses...
                    </>
                  ) : (
                    <>
                        {activeTab === 'existing' ? <UserPlus className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                        {activeTab === 'existing' ? 'Tambah' : 'Buat & Tambah'}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
