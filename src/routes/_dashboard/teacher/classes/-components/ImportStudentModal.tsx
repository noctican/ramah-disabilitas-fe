import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Download, Loader2, Upload, FileSpreadsheet } from "lucide-react"
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
  file: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "File wajib diunggah")
    .refine(
      (files) =>
        [
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.ms-excel",
          "text/csv",
        ].includes(files[0]?.type) ||
        files[0]?.name.endsWith(".csv") ||
        files[0]?.name.endsWith(".xls") ||
        files[0]?.name.endsWith(".xlsx"),
      "Format file harus CSV, XLS, atau XLSX"
    ),
})

interface ImportStudentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  classId: string
}

export function ImportStudentModal({
  open,
  onOpenChange,
  classId,
}: ImportStudentModalProps) {
  const [fileName, setFileName] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const { trigger, isMutating } = useMutationAction(
    STUDENT.IMPORT_TO_COURSE.replace("{course_id}", classId),
    "post",
    {
      onSuccess: () => {
        onOpenChange(false)
        form.reset()
        setFileName(null)
      },
      refreshKey: COURSE.DETAIL
    }
  )

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData()
    formData.append("file", values.file[0])

    await trigger(formData)
  }

  const handleDownloadTemplate = () => {
    const link = document.createElement("a")
    link.href = "/template/template_akun_pelajar.xlsx"
    link.setAttribute("download", "template_akun_pelajar.xlsx")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Import Data Pelajar</DialogTitle>
          <DialogDescription>
            Unggah file CSV, XLS, atau XLSX berisi data pelajar untuk ditambahkan ke kelas ini.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-between p-4 mb-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100/50 dark:bg-green-900/20 rounded-lg">
              <FileSpreadsheet className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm font-medium">Template Import</p>
              <p className="text-xs text-zinc-500">Gunakan format ini</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDownloadTemplate}
            className="flex items-center gap-2 h-8"
          >
            <Download className="w-3.5 h-3.5" />
            Download
          </Button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="file"
              render={({ field: { onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>File Import</FormLabel>
                  <FormControl>
                    <div className="grid w-full items-center gap-1.5">
                      <div className="relative">
                        <Input
                          {...field}
                          type="file"
                          accept=".csv, .xls, .xlsx"
                          className="hidden"
                          id="file-upload"
                          value={undefined} 
                          onChange={(e) => {
                            onChange(e.target.files)
                            setFileName(e.target.files?.[0]?.name || null)
                          }}
                        />
                        <label
                          htmlFor="file-upload"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 transition-colors"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-3 text-zinc-400" />
                            <p className="mb-1 text-sm text-zinc-500 dark:text-zinc-400">
                              <span className="font-semibold text-primary">Klik untuk upload</span> atau drag and drop
                            </p>
                            <p className="text-xs text-zinc-400 dark:text-zinc-500">
                              CSV, XLS, atau XLSX (Maks. 5MB)
                            </p>
                          </div>
                        </label>
                      </div>
                      {fileName && (
                         <div className="flex items-center gap-2 text-sm text-primary font-medium px-1">
                            <FileSpreadsheet className="w-4 h-4" />
                            {fileName}
                         </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-2">
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
                className="bg-primary hover:bg-[#5a1aa0] min-w-25"
                disabled={isMutating}
              >
                {isMutating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  "Import Data"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
