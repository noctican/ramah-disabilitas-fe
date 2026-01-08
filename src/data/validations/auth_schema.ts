import z from "zod";
import { id } from "zod/v4/locales";
import { CAN_REGISTER_ROLE } from "../enums/roles";

z.config(id());

export const loginSchema = z.object({
    email: z.string().email().nonempty(),
    password: z.string().nonempty(),
})

export type LoginType = z.infer<typeof loginSchema>

export const registerSchema = z.object({
    name: z.string().min(1),
    email: z.string().email().min(1),
    password: z.string().min(8),
    confirm_password: z.string().min(8),
    role: z.enum(CAN_REGISTER_ROLE).nonoptional()
}).refine((data) => data.password === data.confirm_password, {
    message: "konfirmasi password tidak sesuai",
    path: ["confirm_password"],
})

export type RegisterType = z.infer<typeof registerSchema>