import { useVoiceStore } from "@/data/store/voice_store"
import type { ObjectType } from "@/data/types/object_types"
import { fetcher } from "@/lib/api-client"
import { toaster } from "@/lib/toast"
import useSWR, { mutate } from "swr"
import useSWRMutation from "swr/mutation"

export const useQueryData = <T>(url: string, params?: ObjectType<any>) => {
    const new_url = params ? [url, params] : url

    const fetcherWrapper = (keyData: string | [string, any]) => {
        if (Array.isArray(keyData)) {
            return fetcher.get(keyData[0], keyData[1])
        }
        return fetcher.get(keyData)
    }

    return useSWR<T>(new_url, fetcherWrapper, {
        revalidateOnFocus: false,
        dedupingInterval: 30000
    })
}

export const useMutationAction = (
    url: string,
    method: 'post' | 'put' | 'patch' | 'delete' | 'get',
    config?: {
        refreshKey?: string,
        onSuccess?: () => void,
        onError?: (err: any) => void,
    }
) => (useSWRMutation(
    url,
    fetcher[method],
    {
        onError: (err) => {
            const msg = err?.response?.data?.error || err?.response?.data?.message || 'Terjadi kesalahan'
            const { speak } = useVoiceStore.getState()
            speak(msg)

            if (config?.onError) {
                config.onError(err)
            } else {
                toaster(msg, 'error')
            }
        },
        onSuccess: (data: any) => {
            toaster(data?.message || 'Berhasil', 'success')
            const { speak } = useVoiceStore.getState()
            speak(data?.message || 'Berhasil')
            if (config?.refreshKey) mutate(
                (key) => {
                    if (Array.isArray(key) && key[0] === config.refreshKey) return true
                    if (key === config.refreshKey) return true
                    return false
                },
                undefined,
                { revalidate: true }
            )
            config?.onSuccess?.()
        }
    }
))