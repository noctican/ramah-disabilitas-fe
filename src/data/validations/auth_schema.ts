import z from "zod";
import { id } from "zod/v4/locales";
import { ALL_ROLES } from "../enums/roles";

z.config(id());

export const loginSchema = z.object({
    email: z.string().email().nonempty(),
    password: z.string().nonempty(),
})

export type LoginType = z.infer<typeof loginSchema>

export const registerSchema = z.object({
    name: z.string().min(1),
    email: z.string().email().min(1),
    password: z.string().min(1),
    confirm_password: z.string().min(1),
    role: z.enum(ALL_ROLES).nonoptional()
}).refine((data) => data.password === data.confirm_password, {
    message: "konfirmasi password tidak sesuai",
    path: ["confirm_password"],
})

export type RegisterType = z.infer<typeof registerSchema>