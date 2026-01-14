import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AUTH, USER } from "@/data/const/api_path";
import { disabilityCheckSchema, disabilityOptions, type DisabilityCheckType } from "@/data/validations/disability_schema";
import { useMutationAction } from "@/hooks/api/use-global-fetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, type Dispatch, type SetStateAction } from "react";
import { useForm } from "react-hook-form";

type Props = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const DisabilityCheckModal = ({ isOpen, setIsOpen }: Props) => {
    const [step, setStep] = useState(1)

    const form = useForm({
        resolver: zodResolver(disabilityCheckSchema),
        mode: "onChange",
        defaultValues: {
            is_disability: undefined,
            categories: []
        }
    })

    const { trigger, isMutating } = useMutationAction(USER.UPDATE_DISABILITY, 'post', {
        onSuccess: () => setIsOpen(false),
        refreshKey: AUTH.ME
    })

    const onSubmit = (data: DisabilityCheckType) => trigger(data)

    return (
        <>
            <Dialog open={isOpen}>
                <DialogContent showCloseButton={false} className="sm:max-w-xl">
                    <DialogTitle className="text-center text-xl">Halo! Kami ingin memastikan website ini nyaman untukmu.</DialogTitle>
                    <Form {...form}>
                        <form>
                            {step === 1 && (
                                <>
                                    <DialogDescription className="text-center">
                                        Apakah kamu memiliki kondisi disabilitas atau kebutuhan khusus yang memerlukan penyesuaian tampilan & cara belajar?
                                    </DialogDescription>
                                    <FormField
                                        control={form.control}
                                        name="is_disability"
                                        render={({ field }) => (
                                            <FormItem className="space-y-2">
                                                <FormControl>
                                                    <RadioGroup
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                        className="grid grid-cols-2 gap-4"
                                                    >

                                                        <div>
                                                            <FormControl>
                                                                <RadioGroupItem value="yes" id="yes" className="peer sr-only" />
                                                            </FormControl>
                                                            <Label
                                                                htmlFor="yes"
                                                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:bg-primary peer-data-[state=checked]:hover:bg-primary-600 peer-data-[state=checked]:hover:text-primary-foreground peer-data-[state=checked]:text-primary-foreground peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-primary peer-data-[state=checked]:ring-offset-2 cursor-pointer transition-all w-full text-center"
                                                            >
                                                                Ya, saya seorang disabilitas atau berkebutuhan khusus
                                                            </Label>
                                                        </div>

                                                        <div>
                                                            <FormControl>
                                                                <RadioGroupItem value="no" id="no" className="peer sr-only" />
                                                            </FormControl>
                                                            <Label
                                                                htmlFor="no"
                                                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:bg-primary peer-data-[state=checked]:hover:bg-primary-600 peer-data-[state=checked]:hover:text-primary-foreground peer-data-[state=checked]:text-primary-foreground peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-primary peer-data-[state=checked]:ring-offset-2 cursor-pointer transition-all w-full text-center"
                                                            >
                                                                Tidak, saya bukan disabilitas atau berkebutuhan khusus
                                                            </Label>
                                                        </div>

                                                    </RadioGroup>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </>
                            )}
                            {step === 2 && (
                                <>
                                    <DialogDescription className="text-center">
                                        Kondisi disabilitas atau kebutuhan khusus apa yang anda miliki?
                                    </DialogDescription>
                                    <FormField
                                        control={form.control}
                                        name="categories"
                                        render={() => (
                                            <FormItem>
                                                <div className="grid grid-cols-2 gap-4">
                                                    {disabilityOptions.map((item) => (
                                                        <FormField
                                                            key={item.id}
                                                            control={form.control}
                                                            name="categories"
                                                            render={({ field }) => {
                                                                return (
                                                                    <FormItem
                                                                        key={item.id}
                                                                        className="space-y-0"
                                                                    >
                                                                        <FormControl>
                                                                            <div className="relative">
                                                                                <Checkbox
                                                                                    className="peer sr-only"
                                                                                    id={item.id}
                                                                                    checked={field.value?.includes(item.id)}
                                                                                    onCheckedChange={(checked) => {
                                                                                        return checked
                                                                                            ? field.onChange([...field.value, item.id])
                                                                                            : field.onChange(
                                                                                                field.value?.filter(
                                                                                                    (value) => value !== item.id
                                                                                                )
                                                                                            )
                                                                                    }}
                                                                                />

                                                                                <Label
                                                                                    htmlFor={item.id}
                                                                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:bg-primary peer-data-[state=checked]:hover:bg-primary-600 peer-data-[state=checked]:hover:text-primary-foreground peer-data-[state=checked]:text-primary-foreground peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-primary peer-data-[state=checked]:ring-offset-2 cursor-pointer transition-all w-full text-center"
                                                                                >
                                                                                    {item.label}
                                                                                </Label>
                                                                            </div>
                                                                        </FormControl>
                                                                    </FormItem>
                                                                )
                                                            }}
                                                        />
                                                    ))}
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                </>
                            )}

                        </form>
                    </Form>
                    <DialogFooter>
                        {step === 1 && <Button onClick={() => {
                            if(form.watch('is_disability') === 'yes') setStep(2)
                            else form.handleSubmit(onSubmit)()
                        }} disabled={form.watch('is_disability') === undefined || isMutating}>Lanjut</Button>}
                        {step === 2 && (<>
                            <Button onClick={() => setStep(1)} variant="outline">Kembali</Button>
                            <Button onClick={() => form.handleSubmit(onSubmit)()} disabled={!form.formState.isValid || isMutating}>Kirim</Button>
                        </>)}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}