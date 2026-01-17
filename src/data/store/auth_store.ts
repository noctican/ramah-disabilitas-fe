import { getToken, removeToken, setToken } from "@/lib/token-handler";
import { type RoleType } from "../types/role_types";
import { create } from "zustand";
import type { DisabilityType } from "../types/disability_types";
import { ALL_DISABILITY } from "../const/disability";

type AuthState = {
    firstRender: boolean;
    setFirstRender: (value: boolean) => void;
    isAuthenticated: boolean;
    role: RoleType | null;
    user: any;
    login: (data: any, isValidate?: boolean) => void;
    logout: () => void;
    disability: DisabilityType[] | null;
    hasDisability: (disability: DisabilityType | DisabilityType[]) => boolean;
}

const formatDisability = (data?: null | { [key: string]: boolean }) => {
    if (!data) return null
    return Object.entries(data).filter(([key, value]) => value === true && ALL_DISABILITY.includes(key as DisabilityType)).map(([key]) => (key)) as DisabilityType[] | null
}

export const useAuthStore = create<AuthState>((set, get) => ({
    firstRender: true,
    setFirstRender: (value: boolean) => set({ firstRender: value }),
    isAuthenticated: false,
    role: null,
    user: null,
    disability: null,
    login: (data: any, isValidate: boolean = true) => {
        if (isValidate) set({ isAuthenticated: true, role: data.data.role, user: data.data, disability: formatDisability(data.data.accessibility) })
        else set({ isAuthenticated: true, role: data.user.role, user: data.user, disability: formatDisability(data.user.accessibility) })
        setToken(isValidate ? getToken() : data.token)
    },
    logout: () => {
        set({ isAuthenticated: false, role: null, user: null, disability: null })
        removeToken()
    },
    hasDisability: (disability: DisabilityType | DisabilityType[]) => {
        if (Array.isArray(disability)) return get().disability?.some((d) => disability.includes(d)) || false
        return get().disability?.includes(disability) || false
    }
}))