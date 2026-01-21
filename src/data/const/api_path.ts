import type { ObjectType } from "../types/object_types"

type UrlGroupType = ObjectType<string>

export const AUTH = {
    LOGIN: "/v1/auth/login",
    REGISTER: "/v1/auth/register",
    LOGOUT: "/v1/auth/logout",
    DISABILITY: "/v1/user/accessibility",
    EMAIL_VERIFICATION: "/v1/auth/verify-email",
    ME: "/v1/auth/me",
} as const satisfies UrlGroupType

export const USER = {
    UPDATE_DISABILITY: "/v1/user/accessibility",
}

export const COURSE = {
    GET_ALL: "/v1/lecturer/courses",
    CREATE: "/v1/lecturer/courses",
    DETAIL: "/v1/lecturer/courses/{course_id}",
    UPDATE: "/v1/lecturer/courses/{course_id}",
    DELETE: "/v1/lecturer/courses/{course_id}",

    JOIN: "/v1/courses/join",
    JOINED: "/v1/courses/joined",
    STUDENT_DETAIL: "/v1/courses/{course_id}",
    LIST_STUDENT: "/v1/lecturer/courses/{course_id}/students",
    MEMBERS: "/v1/courses/{course_id}/members",
} as const satisfies UrlGroupType

export const STUDENT = {
    ADD_TO_COURSE: "/v1/lecturer/courses/{course_id}/students",
    IMPORT_TO_COURSE: "/v1/lecturer/courses/{course_id}/students/import",
    UPDATE: "/v1/lecturer/students/{student_id}",
    DELETE: "/v1/lecturer/students/{student_id}",
} as const satisfies UrlGroupType

export const MODULE = {
    CREATE_MATERIAL: "/v1/lecturer/modules/{module_id}/materials", // New Endpoint
    DELETE: "/v1/lecturer/modules/{module_id}",
} as const satisfies UrlGroupType

export const MATERIAL = {
    GET_DETAIL: "/v1/materials/{material_id}",
    UPDATE: "/v1/lecturer/materials/{material_id}",
    DELETE: "/v1/lecturer/materials/{material_id}",
    GENERATE_SUMMARY: "/v1/materials/{material_id}/summary",
    SAVE_SUMMARY: "/v1/materials/{material_id}/summary/save",
    CHAT: "/v1/materials/{material_id}/chat",
    QUIZ: "/v1/materials/{material_id}/quiz",
    FLASHCARDS: "/v1/materials/{material_id}/flashcards",
    MARK_AS_DONE: "/v1/materials/{material_id}/complete",
} as const satisfies UrlGroupType

export const MEDIA = {
    UPLOAD: "/v1/media",
} as const satisfies UrlGroupType

export const ASSIGNMENT = {
    CREATE: "/v1/lecturer/courses/{course_id}/assignments",
    GET_ALL: "/v1/lecturer/courses/{course_id}/assignments",
    MY_ASSIGNMENTS: "/v1/courses/assignments",
    GET_COURSE_ASSIGNMENTS: "/v1/courses/{course_id}/assignments",
    GET_DETAIL: "/v1/assignments/{assignment_id}",
    GET_SUBMISSIONS: "/v1/lecturer/assignments/{assignment_id}/submissions",
    UPDATE: "/v1/lecturer/assignments/{assignment_id}",
    DELETE: "/v1/lecturer/assignments/{assignment_id}",
    GRADE_SUBMISSION: "/v1/lecturer/submissions/{submission_id}/grade",
    SUBMIT_ANSWER: "/v1/assignments/{assignment_id}/submit",
} as const satisfies UrlGroupType

export const ACTIVITY = {
    GET_ACTIVITIES: "/v1/lecturer/activities/list",
} as const satisfies UrlGroupType
