import { createFileRoute, Link } from '@tanstack/react-router'
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRegister } from '@/hooks/api/use-auth'
import { registerSchema, type RegisterType } from '@/data/validations/auth_schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ROLE_STUDENT, ROLE_TEACHER } from '@/data/enums/roles'

import { useVoiceStore } from '@/data/store/voice_store'
import { useRegisterCommands } from '@/hooks/use-register-command'
import { useEffect } from 'react'


export const Route = createFileRoute('/_auth/register')({
  component: RouteComponent,
})

function RouteComponent() {
    const { trigger, isMutating } = useRegister()
    const { speak } = useVoiceStore()
    const form = useForm<RegisterType>({
        mode: "onChange",
        resolver: zodResolver(registerSchema),
        defaultValues: {
          role: ROLE_TEACHER
        }
    })

    const mapField = (field: string): keyof RegisterType | null => {
      const f = field.toLowerCase().trim()
      if (f === 'email') return 'email'
      if (['nama', 'name'].includes(f)) return 'name'
      if (['password', 'kata sandi', 'sandi'].includes(f)) return 'password'
      if (['konfirmasi', 'ulangi', 'konfirmasi kata sandi', 'konfirmasi password', 'konfirmasi sandi'].includes(f)) return 'confirm_password'
      return null
    }

    useRegisterCommands([
      {
        pattern: /(?:isi|masukkan|tulis)+(.+)+dengan+(.+)/i,
        description: "isi [field] dengan [nilai] untuk mengisi form. contoh: isi nama dengan budi",
        action: ([field, value]) => {
          const key = mapField(field)
          if (!key) {
             speak(`Field ${field} tidak ditemukan`)
             return
          }

          let val = value.trim()
          
          // if (key === 'role') {
          //   if (['pelajar', 'murid', 'siswa', 'mahasiswa'].includes(val.toLowerCase())) val = ROLE_STUDENT
          //   else if (['pengajar', 'guru', 'dosen', 'tendik'].includes(val.toLowerCase())) val = ROLE_TEACHER
          //   else {
          //      speak("Role harus pelajar atau pengajar")
          //      return
          //   }
          // }

          form.setValue(key, val, { shouldValidate: true })
          speak(`${field} diisi dengan ${value}`)
        }
      },
      {
        pattern: /(?:baca|sebutkan)+(.+)/i,
        description: "baca [field] untuk mengetahui nilai saat ini",
        action: ([field]) => {
          const key = mapField(field)
          if (!key) {
             speak(`Field ${field} tidak ditemukan`)
             return
          }
          const val = form.getValues(key)
          speak(val ? `${field} saat ini adalah ${val}` : `${field} masih kosong`)
        }
      },
      {
        pattern: /(?:daftar|register|kirim|submit)/i,
        description: "daftar atau kirim untuk memproses pendaftaran",
        action: () => {
          form.handleSubmit((d) => trigger(d))()
        }
      }
    ])

    useEffect(() => {
        speak("Anda berada di halaman pendaftaran. Silahkan isi nama, email, password, dan konfirmasi password. Katakan 'isi [nama field] dengan [nilai]' untuk mengisi.")
    }, [])
    
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit((d) => trigger(d))}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Buat Akun Pengajar</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Masukkan data berikut untuk membuat akun pengajar
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
                    <Input id="email" placeholder="email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Field>
          <Field>
            <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FieldLabel htmlFor="name">Nama</FieldLabel>
                  <FormControl>
                    <Input id="name" placeholder="Masukkan Nama" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Field>
          <Field className='grid grid-cols-2 gap-4'>
            <Field>
                <FormField
                control={form.control}
                name="password"
                render={({field}) => (
                    <FormItem>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <FormControl>
                            <Input id="password" type="password" placeholder='Password' {...field}  />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
            </Field>
            <Field>
                <FormField
                control={form.control}
                name="confirm_password"
                render={({field}) => (
                    <FormItem>
                        <FieldLabel htmlFor="confirm_password">Konfirmasi Password</FieldLabel>
                        <FormControl>
                            <Input id="confirm_password" type="password" placeholder='Konfirmasi password' {...field}  />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
            </Field>
          </Field>
          {/* <Field>
              <FormField
              control={form.control}
              name="role"
              render={({field}) => (
                  <FormItem>
                      <FieldLabel htmlFor="role">Sebagai</FieldLabel>
                      <Select onValueChange={(v) => field.onChange(v)} name='role'>
                          <SelectTrigger className='w-full' id='role'>
                              <SelectValue placeholder="Pilih role" />
                          </SelectTrigger>
                          <SelectContent>
                              <SelectItem value={ROLE_STUDENT}>Pelajar</SelectItem>
                              <SelectItem value={ROLE_TEACHER}>Pengajar</SelectItem>
                          </SelectContent>
                      </Select>
                      <FormMessage />
                  </FormItem>
              )}
              />
          </Field> */}
          <Field>
            <Button type="submit" disabled={isMutating}>Daftar</Button>
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
            Sudah punya akun? <Link to="/login">Masuk</Link>
          </FieldDescription>
        </FieldGroup>
      </form>
    </FormProvider>
  )
}
