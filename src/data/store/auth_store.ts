import { getToken, removeToken, setToken } from "@/lib/token-handler";
import { type RoleType } from "../types/role_types";
import { create } from "zustand";
import type { DisabilityType } from "../types/disability_types";
import { ALL_DISABILITY } from "../const/disability";

type AuthState = {
    isAuthenticated: boolean;
    role: RoleType | null;
    user: any;
    login: (data: any, isValidate?: boolean) => void;
    logout: () => void;
    disability: DisabilityType[] | null;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    role: null,
    user: null,
    disability: null,
    login: (data: any, isValidate: boolean = true) => {
        if (isValidate) set({
            isAuthenticated: true,
            role: data.data.role,
            user: data.data,
            disability: (
                typeof data.data.accessibility === 'object'
                    ? Object.entries(data.data.accessibility).filter(([key, value]) => value === true && ALL_DISABILITY.includes(key as DisabilityType)).map(([key]) => (key))
                    : null
            ) as DisabilityType[] | null
        })
        else set({ isAuthenticated: true, role: data.user.role, user: data.user })
        setToken(isValidate ? getToken() : data.token)
    },
    logout: () => {
        set({ isAuthenticated: false, role: null, user: null })
        removeToken()
    },
}))