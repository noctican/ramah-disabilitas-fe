import { createFileRoute, Link } from '@tanstack/react-router'
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginType } from '@/data/validations/auth_schema'
import { useLogin, useRegister } from '@/hooks/api/use-auth'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'
import { useEffect, useState } from 'react'
import { Eye, EyeClosed } from 'lucide-react'
import { useRegisterCommands } from '@/hooks/use-register-command'
import { useVoiceStore } from '@/data/store/voice_store'

export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
})

function RouteComponent() {

  const { trigger, isMutating } = useLogin()
  const form = useForm<LoginType>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  })

  const [showPass, setShowPass] = useState(false)
  const speak = useVoiceStore((state) => state.speak)

  useRegisterCommands([
    {
      pattern: /(?:isi|masukkan|tulis)+(.+)+dengan+(.+)/i,
      description: "isi email atau kata sandi dengan data anda adalah untuk mengisi kolom email atau kata sandi. contoh: isi email dengan email@gmail.com",
      action: ([field, value]) => {
        console.log({field, value})
        const normalize_field = ['kata sandi', 'password', 'sandi'].includes(field.toLowerCase().trim()) ? 'password' : field.toLowerCase().trim()
        form.setValue(normalize_field as "email" | "password", value.trim(), {shouldValidate: true})
        speak(`${field} diisi: ${value}`)
      }
    },
    {
      pattern: /(?:baca|sebutkan)+(.+)/i,
      description: "baca email atau kata sandi adalah untuk membaca nilai dari kolom email atau kata sandi. contoh: baca email",
      action: ([field]) => {
        const normalize_field = ['kata sandi', 'password', 'sandi'].includes(field.toLowerCase().trim()) ? 'password' : field.toLowerCase().trim()
        const value = form.getValues(normalize_field as "email" | "password")
        speak(value ? `${normalize_field} saat ini: ${value}` : `${normalize_field} masih kosong`)
      }
    },
    {
      pattern: /(?:login|masuk|kirim|submit)/i,
      description: "kirim adalah untuk mengirim form login",
      action: () => {
        speak('mengirim data')
        form.handleSubmit((d) => trigger(d))()
      }
    }
  ])



  useEffect(() => {
    speak("Terdapat 2 masukan yang harus anda isi, yaitu email dan kata sandi; kata sandi hanya bisa diisi oleh angka. katakan 'isi email atau kata sandi dengan data anda' untuk mengisinya.")
  }, [])


  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit((d) => trigger(d))}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Login</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Masukkan email dan password akun anda 
            </p>
          </div>
          <Field>
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <FormControl>
                    <Input id="email" placeholder="Masukkan Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Field>
          <Field>
            <FormField
              control={form.control}
              name="password"
              render={({field}) => (
                <FormItem>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <FormControl>
                    <InputGroup>
                      <InputGroupInput id="password" type={showPass ? "text" : "password"} placeholder='password' {...field} />
                      <InputGroupAddon align="inline-end">
                        <InputGroupButton variant="secondary" onClick={() => setShowPass(!showPass)}>{showPass ? <Eye /> : <EyeClosed />}</InputGroupButton>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Field>
          <Field>
            <Button type="submit" id="btn-login" disabled={isMutating}>Login</Button>
          </Field>
          {/* <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
            Atau masuk dengan
          </FieldSeparator>
          <Field className="grid grid-cols-1 gap-4">
            <Button variant="outline" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              <span className="sr-only">Masuk dengan Google</span>
            </Button>
          </Field> */}
          <FieldDescription className="text-center">
            Belum punya akun? <Link to="/register">Daftar</Link>
          </FieldDescription>
        </FieldGroup>
      </form>
    </FormProvider>
  )
}
