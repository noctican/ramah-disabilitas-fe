import z from "zod";
import { id } from "zod/v4/locales";

z.config(id());

export const assignmentSubmissionSchema = z.object({
    text_answer: z.string().optional(),
    file_url: z.string().optional(),
}).refine(data => data.text_answer || data.file_url, {
    message: "Harap sertakan jawaban teks atau file",
    path: ["text_answer"]
});

export type AssignmentSubmissionType = z.infer<typeof assignmentSubmissionSchema>;
