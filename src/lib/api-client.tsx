import axios from 'axios'
import { getToken } from './token-handler'
import { useAuthStore } from '@/data/store/auth_store'

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

apiClient.interceptors.request.use((config) => {
    const token = getToken()
    if (token) config.headers['Authorization'] = 'Bearer ' + token
    config.headers['Accept'] = 'multipart/form-data'

    const replaceUrl = (sourceData: any) => {
        if (!config.url || !sourceData) return

        const matches = config.url.match(/{([^}]+)}/g)
        if (matches) {
            matches.forEach((match) => {
                const key = match.replace(/[{}]/g, '')

                if (sourceData[key] !== undefined) {
                    config.url = config.url!.replace(match, sourceData[key])
                    delete sourceData[key] 
                }
            })
        }
    }

    if (config.params) replaceUrl(config.params)
    if (config.data) replaceUrl(config.data)
    return config
}, (err) => {
    return Promise.reject(err)
})

apiClient.interceptors.response.use(
    (res) => (res),
    (err) => {
        console.error(err)
        const logout = useAuthStore.getState().logout
        if (err.response?.status === 401) logout()
        return (Promise.reject(err))
    }
)

export const fetcher = {
    get: async (url: string, params?: any) => {
        const res = await apiClient.get(url, {params})
        return res.data
    },
    post: async (url: string, {arg}: {arg:any} ) => {
        const res = await apiClient.post(url, arg)
        return res.data
    },
    put: async (url: string, {arg}: {arg:any} ) => {
        const res = await apiClient.put(url, arg)
        return res.data
    },
    patch: async (url: string, {arg}: {arg:any} ) => {
        const res = await apiClient.patch(url, arg)
        return res.data
    },
    delete: async (url: string, {arg}: {arg:any}) => {
        const res = await apiClient.delete(url, {params: arg})
        return res.data
    },
}

export const postFetcher = async (url: string, {arg}: {arg:any} ) => {
    const res = await apiClient.post(url, arg)
    return res.data
}

export const putFetcher = async (url: string, {arg}: {arg:any} ) => {
    const res = await apiClient.put(url, arg)
    return res.data
}

export const getFetcher = async (url: string) => {
    const res = await apiClient.get(url)
    return res.data
}

export const deleteFetcher = async (url: string) => {
    const res = await apiClient.delete(url)
    return res.data
}