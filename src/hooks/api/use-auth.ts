import { AUTH } from "@/data/const/api_path";
import { useAuthStore } from "@/data/store/auth_store";
import { postFetcher } from "@/lib/api-client";
import { toaster } from "@/lib/toast";
import useSWRMutation from 'swr/mutation'
import { useNavigate } from '@tanstack/react-router'
import { ROLE_TEACHER } from "@/data/enums/roles";

export const useLogin = () => {
    const navigate = useNavigate()
    const { login } = useAuthStore.getState()

    return useSWRMutation(AUTH.LOGIN, postFetcher, {
        onError: (err) => {
            console.error("Login failed:", err)
            toaster(err.response.data.error, 'error')
        }, onSuccess: (data) => {
            login(data, false)
            toaster(data.message, 'success')
            if (data.user.role === ROLE_TEACHER) navigate({ to: '/teacher' })
            else navigate({ to: '/classes' })
        }
    })
}

export const useRegister = () => {
    const navigate = useNavigate()

    return useSWRMutation(AUTH.REGISTER, postFetcher, {
        onError: (err) => {
            console.error("Register failed:", err)
            toaster(err.response.data.error, 'error')
        }, onSuccess: (data) => {
            toaster(`${data.message}`, 'success', 15000)
            navigate({ to: '/login' })
        }
    })
}

export const useLogout = () => {
    const navigate = useNavigate()
    const { logout } = useAuthStore.getState()

    return useSWRMutation(AUTH.LOGOUT, postFetcher, {
        onError: (err) => {
            console.error("Logout failed:", err)
            toaster(err.response.data.error, 'error')
            navigate({ to: '/' })
        }, onSuccess: (data) => {
            logout()
            toaster(data.message, 'success')
            navigate({ to: '/' })
        }
    })
}