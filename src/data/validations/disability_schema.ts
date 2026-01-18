import z from "zod";
import { ALL_DISABILITY } from "../const/disability";
import type { DisabilityType } from "../types/disability_types";

export const disabilityCheckSchema = z.object({
    is_disability: z.enum(['yes', 'no']),
    categories: z.array(z.enum(ALL_DISABILITY)),
}).refine(data => {
    if (data.is_disability === 'yes') return data.categories.length > 0
    return true
}, {
    message: "Pilih minimal 1 jenis disabilitas",
    path: ['categories']
})

export type DisabilityCheckType = z.infer<typeof disabilityCheckSchema>

export const disabilityOptions = [
    { id: "tuna_rungu", label: "Saya sulit mendengar audio/video" },
    { id: "tuna_netra", label: "Saya sulit melihat layar atau butuh pembaca layar" },
    { id: "tuna_daksa", label: "Saya kesulitan menggunakan mouse atau keyboard biasa" },
    // { id: "tuna_grahita", label: "Saya mudah terdistraksi atau sulit membaca teks panjang" },
    // { id: "kesulitan_kognitif", label: "Saya mudah terdistraksi atau sulit membaca teks panjang" },
] satisfies { id: DisabilityType, label: string }[]