import z from "zod";
import { id } from "zod/v4/locales";

z.config(id());

export const joinClassSchema = z.object({
    class_code: z.string().min(1, "Kode kelas harus diisi"),
})

export type JoinClassType = z.infer<typeof joinClassSchema>