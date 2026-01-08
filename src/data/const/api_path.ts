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

