import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ASSIGNMENT, MEDIA } from "@/data/const/api_path";
import { assignmentSubmissionSchema, type AssignmentSubmissionType } from "@/data/validations/assignment_schema";
import { useMutationAction } from "@/hooks/api/use-global-fetch";
import { apiClient } from "@/lib/api-client";
import { toaster } from "@/lib/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Upload, X } from "lucide-react";
import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { useRegisterCommands } from "@/hooks/use-register-command";

type Props = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    assignmentId: string;
    allowText: boolean;
    allowFile: boolean;
}

export const SubmitAssignmentDialog = ({ isOpen, setIsOpen, assignmentId, allowText, allowFile }: Props) => {
    const { trigger, isMutating } = useMutationAction(ASSIGNMENT.SUBMIT_ANSWER, 'post', {
        refreshKey: ASSIGNMENT.GET_DETAIL,
        onSuccess: () => {
            setIsOpen(false)
            form.reset()
            setFile(null)
        }
    })

    const [file, setFile] = useState<File | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const form = useForm<AssignmentSubmissionType>({
        resolver: zodResolver(assignmentSubmissionSchema),
        defaultValues: {
            text_answer: "",
            file_url: ""
        }
    })

    const onSubmit = async (data: AssignmentSubmissionType) => {
        try {
            if (!data.text_answer && !file) {
                 form.setError("text_answer", { message: "Harap sertakan jawaban teks atau file" })
                 return
            }

            let fileUrl = ""
            if (file) {
                setIsUploading(true)
                const formData = new FormData()
                formData.append('file', file)
                
                const res = await apiClient.post(MEDIA.UPLOAD, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
                
                fileUrl = res.data?.data?.url || res.data?.url || res.data?.file_url
                
                if (!fileUrl) {
                    throw new Error("Gagal mengupload file")
                }
                setIsUploading(false)
            }

            // Submit assignment
            await trigger({
                assignment_id: assignmentId,
                text_answer: data.text_answer,
                file_url: fileUrl || undefined
            })
            
        } catch (error) {
            console.error(error)
            setIsUploading(false)
            toaster(error instanceof Error ? error.message : "Terjadi kesalahan saat mengupload", 'error')
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
            form.clearErrors("root")
        }
    }

    useRegisterCommands([
        {
            pattern: /^batal$/i,
            description: "batal adalah untuk menutup form mengirimkan jawaban anda",
            action: () => {
                setIsOpen(false)
            }
        }, {
            pattern: /^pilih file$/i,
            description: "pilih file adalah untuk memilih file yang akan diunggah",
            action: () => {
                fileInputRef.current?.click()
            }
        }, {
            pattern: /^isi teks dengan +(.+)$/i,
            description: "isi teks dengan adalah untuk mengisi teks jawaban anda",
            action: ([match]) => {
                form.setValue("text_answer", match, {shouldValidate: true, shouldDirty: true})
            }
        },{
            pattern: /^kirim$/i,
            description: "kirim adalah untuk mengirimkan jawaban anda",
            action: () => {
                form.handleSubmit(onSubmit)()
            }
        }
    ])

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-slate-900 dark:text-white">Kirim Jawaban</DialogTitle>
                    <DialogDescription>
                        Silakan unggah jawaban anda sesuai dengan instruksi tugas.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
                        
                        {allowText && (
                            <FormField
                                control={form.control}
                                name="text_answer"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-700 dark:text-slate-300 font-semibold">Jawaban Teks</FormLabel>
                                        <FormControl>
                                            <Textarea 
                                                placeholder="Tuliskan jawaban anda di sini..." 
                                                className="min-h-[150px] resize-none focus-visible:ring-primary"
                                                {...field} 
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        {allowFile && (
                            <div className="space-y-3">
                                <FormLabel className="text-slate-700 dark:text-slate-300 font-semibold block">Lampiran File</FormLabel>
                                <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer relative group">
                                    <Input 
                                        type="file" 
                                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                                        onChange={handleFileChange}
                                        ref={fileInputRef}
                                    />
                                    
                                    {file ? (
                                        <div className="flex items-center gap-3 text-primary z-0">
                                            <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                                                <Upload className="w-5 h-5" />
                                            </div>
                                            <div className="text-left">
                                                <p className="font-semibold text-sm line-clamp-1 break-all">{file.name}</p>
                                                <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                            </div>
                                            <button 
                                                type="button"
                                                onClick={(e) => {
                                                    e.preventDefault(); 
                                                    setFile(null);
                                                    // Reset input value if needed manually ref
                                                }}
                                                className="ml-2 p-1 hover:bg-red-100 text-red-500 rounded-full z-20 relative"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="p-3 bg-white dark:bg-slate-700 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                                                <Upload className="w-6 h-6 text-primary" />
                                            </div>
                                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Klik atau geser file ke sini</p>
                                            <p className="text-xs text-slate-500 mt-1">Mendukung berbagai format file</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

                        <DialogFooter className="pt-4 border-t border-slate-100 dark:border-slate-700">
                            <Button type="button" variant="ghost" onClick={() => setIsOpen(false)} disabled={isUploading || isMutating}>
                                Batal
                            </Button>
                            <Button type="submit" className="bg-primary hover:bg-primary-600 text-white min-w-[120px]" disabled={isUploading || isMutating || !form.formState.isValid}>
                                {isUploading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Mengunggah...
                                    </>
                                ) : isMutating ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Mengirim...
                                    </>
                                ) : (
                                    "Kirim Tugas"
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
