import { type RoleType } from "../types/role_types";

export const ROLE_ADMIN = 'admin';
export const ROLE_TEACHER = 'lecturer';
export const ROLE_STUDENT = 'student';


export const ALL_ROLES = [
    ROLE_ADMIN,
    ROLE_TEACHER,
    ROLE_STUDENT,
] as const;

export const CAN_REGISTER_ROLE = [
    ROLE_TEACHER,
    ROLE_STUDENT,
] as const;

export const CURRENT_ROLE:RoleType = ROLE_ADMIN;4
