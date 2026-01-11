import type { ObjectType } from "../types/object_types"

type UrlGroupType = ObjectType<string>

export const AUTH = {
    LOGIN: "/v1/auth/login",
    REGISTER: "/v1/auth/register",
    LOGOUT: "/v1/auth/logout",
    DISABILITY: "/v1/user/accessibility",
    ME: "/v1/auth/me",
} as const satisfies UrlGroupType

export const COURSE = {
    GET_ALL: "/v1/lecturer/courses",
    CREATE: "/v1/lecturer/courses",
    DETAIL: "/v1/lecturer/courses/{course_id}",
    UPDATE: "/v1/lecturer/courses/{course_id}",
    DELETE: "/v1/lecturer/courses/{course_id}",

    JOIN: "/v1/courses/join",
    JOINED: "/v1/courses/joined",
} as const satisfies UrlGroupType

export const MODULE = {
    CREATE_MATERIAL : "/v1/lecturer/modules/{module_id}/materials", // New Endpoint
    DELETE: "/v1/lecturer/modules/{module_id}",
} as const satisfies UrlGroupType

export const MATERIAL = {
    UPDATE: "/v1/lecturer/materials/{material_id}",
    DELETE: "/v1/lecturer/materials/{material_id}",
} as const satisfies UrlGroupType

export const MEDIA = {
    UPLOAD: "/v1/media",
} as const satisfies UrlGroupType
