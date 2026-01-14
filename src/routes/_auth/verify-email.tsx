import { createFileRoute, Link } from '@tanstack/react-router'
import { z } from 'zod'
import { useEffect, useState } from 'react'
import { apiClient } from '@/lib/api-client'
import { AUTH } from '@/data/const/api_path'
import { Loader2, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toaster } from '@/lib/toast'
import { useMutationAction } from '@/hooks/api/use-global-fetch'

const verifyEmailSearchSchema = z.object({
  token: z.string().optional(),
})

export const Route = createFileRoute('/_auth/verify-email')({
  component: VerifyEmailPage,
  validateSearch: verifyEmailSearchSchema,
})

function VerifyEmailPage() {
  const { token } = Route.useSearch()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const { trigger} = useMutationAction(`${AUTH.EMAIL_VERIFICATION}?token=${token}`, 'get')

  useEffect(() => {
    const verifyToken = async () => {
        if(!token) {
            setStatus('error')
            setMessage('Token verifikasi tidak ditemukan.')
            return
        }
        try {
            const data = await trigger()
            setStatus('success')
            setMessage(data?.message || 'Email berhasil diverifikasi.')
        } catch (error: any) {
            setStatus('error')
            setMessage(error.response?.data?.message || 'Gagal memverifikasi email.')
        }
    }

    verifyToken()
  }, [token])

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6 text-center p-4">
      {status === 'loading' && (
        <>
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
          <h1 className="text-2xl font-bold">Memverifikasi Email...</h1>
          <p className="text-muted-foreground">Mohon tunggu sebentar, kami sedang memproses verifikasi email Anda.</p>
        </>
      )}

      {status === 'success' && (
        <>
          <CheckCircle className="h-16 w-16 text-green-500" />
          <h1 className="text-2xl font-bold">Email Berhasil Diverifikasi!</h1>
          <p className="text-muted-foreground">{message}</p>
          <Button asChild className="mt-4">
            <Link to="/login">Login Sekarang</Link>
          </Button>
        </>
      )}

      {status === 'error' && (
        <>
          <XCircle className="h-16 w-16 text-destructive" />
          <h1 className="text-2xl font-bold">Verifikasi Gagal</h1>
          <p className="text-destructive font-medium">{message}</p>
          <Button asChild variant="outline" className="mt-4">
            <Link to="/login">Kembali ke Login</Link>
          </Button>
        </>
      )}
    </div>
  )
}
