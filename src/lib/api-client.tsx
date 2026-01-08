import axios from 'axios'
import { getToken, removeToken } from './token-handler'

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

apiClient.interceptors.request.use((config) => {
    const token = getToken()
    if (token) config.headers['Authorization'] = 'Bearer ' + token

    if (config.url && config.params) {
        const paramsCopy = { ...config.params }
        let url = config.url

        const matches = url.match(/{([^}]+)}/g)

        if (matches) {
            matches.forEach((match) => {
                const key = match.replace(/[{}]/g, '')

                if (paramsCopy[key] !== undefined) {
                    url = url.replace(match, paramsCopy[key])
                    delete paramsCopy[key]
                }
            })

            config.url = url
            config.params = paramsCopy
        }
    }
    return config
}, (err) => {
    return Promise.reject(err)
})

apiClient.interceptors.response.use(
    (res) => (res),
    (err) => {
        console.error(err)
        if (err.response?.status === 401) removeToken()
        return (Promise.reject(err))
    }
)

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