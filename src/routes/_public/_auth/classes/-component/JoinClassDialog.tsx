import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { COURSE } from "@/data/const/api_path";
import { joinClassSchema, type JoinClassType } from "@/data/validations/classes_schema";
import { useMutationAction } from "@/hooks/api/use-global-fetch";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

type Props = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const JoinClassDialog = ({ isOpen, setIsOpen }: Props) => {

    const { trigger, isMutating } = useMutationAction(COURSE.JOIN, 'post', {refreshKey: COURSE.JOINED})
    const defaultValues: JoinClassType = {class_code: ''}

    const form = useForm({
        mode: 'onChange',
        resolver: zodResolver(joinClassSchema),
        defaultValues
    })

    const onSubmit = (data: JoinClassType) => {
        console.log("a")
        trigger(data)
        form.reset(defaultValues)
        setIsOpen(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-lg" >Join Kelas</DialogTitle>
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