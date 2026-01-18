import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { COURSE } from "@/data/const/api_path";
import { BLIND_DISABILITY } from "@/data/const/disability";
import { useAuthStore } from "@/data/store/auth_store";
import { useVoiceStore } from "@/data/store/voice_store";
import { joinClassSchema, type JoinClassType } from "@/data/validations/classes_schema";
import { useMutationAction } from "@/hooks/api/use-global-fetch";
import { useRegisterCommands, type CommandInput } from "@/hooks/use-register-command";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Dispatch, type SetStateAction, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";

type Props = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const JoinClassDialog = ({ isOpen, setIsOpen }: Props) => {

    const { disability } = useAuthStore()
    const { trigger, isMutating } = useMutationAction(COURSE.JOIN, 'post', {refreshKey: COURSE.JOINED})
    const defaultValues: JoinClassType = {class_code: ''}
    const { speak } = useVoiceStore()

    const form = useForm({
        mode: 'onChange',
        resolver: zodResolver(joinClassSchema),
        defaultValues
    })

    const fieldMapping: {[key: string]: keyof JoinClassType} = {
        "kode kelas": "class_code"
    }

    const onSubmit = async (data: JoinClassType) => {
        try {
            await trigger(data)
            form.reset(defaultValues)
            setIsOpen(false)
        } catch (error) {
            console.error(error)
        }
    }

    const dynamicCommands = useMemo(() => {
        const cmds: CommandInput[] = []
        if(disability?.some(v => v == BLIND_DISABILITY) && isOpen) {
            cmds.push({
                pattern: /^daftar masukan$/i,
                description: "Daftar masukan... adalah untuk membacakan seluruh kolom yang bisa diisi",
                action: () => speak("Terdapat kolom " + Object.keys(fieldMapping).join(", ") + " yang bisa diisi")
            })
            cmds.push({
                pattern: /^isi\s+kolom\s+(.+)\s+dengan\s+(.+)$/i,
                description: "Isi kolom.. dengan... adalah untuk mengisi kolom dengan nilai. nama kolom dapat berupa: " + Object.keys(fieldMapping).join(", ") + "... contoh: isi kolom nama dengan budi",
                action: ([kolom, nilai]) => {
                    const targetKey = kolom.toLowerCase().trim();
                    const actualFieldName = fieldMapping[targetKey];
                    if (actualFieldName) {
                        form.setValue(actualFieldName, nilai.replaceAll(' ', ''), { shouldValidate: true, shouldDirty: true });
                        speak(`Mengisi ${targetKey} dengan ${nilai}`);
                    } else {
                        speak(`maaf, kolom ${targetKey} tidak dikenali. Coba katakan ${Object.keys(fieldMapping).join(', ')}.`);
                    }
                }
            })
            cmds.push({
                pattern: /^batal$/i,
                description: "Batal... adalah untuk menutup form",
                action: () => setIsOpen(false)
            })
            cmds.push({
                pattern: /^kirim$/i,
                description: "Kirim... adalah untuk mengirim form",
                action: () => form.handleSubmit(onSubmit)()
            })
        }
        return cmds
    }, [disability, isOpen])

    useRegisterCommands(dynamicCommands)

    useEffect(() => {
        if(isOpen && disability?.some(v => v == BLIND_DISABILITY)) speak('Form telah terbuka, anda dapat mengisi kolom "' + Object.keys(fieldMapping).join('", "') + '" dengan menggunakan perintah "isi kolom nama kolom dengan nilai"')
    }, [isOpen])

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-lg" >Gabung Kelas</DialogTitle>
                </DialogHeader>
                <DialogDescription className="text-justify">Kode kelas bersifat unik. Pastikan anda memasukan kode kelas dengan sesuai, dan benar milik pengajar anda.</DialogDescription>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="class_code"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Masukkan Kode Kelas" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="mt-5">
                            <Button type="button" onClick={() => setIsOpen(false)} variant="outline">Batal</Button>
                            <Button type="submit" disabled={!form.formState.isValid || isMutating}>Join Kelas</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}