export type AssignmentType = {
    id: number;
    course_id: number;
    module_id: number;
    title: string;
    instruction: string;
    max_points: number;
    deadline: string;
    allow_file: boolean;
    allow_text: boolean;
    allow_late: boolean;
    created_at: string;
    updated_at: string;
}
