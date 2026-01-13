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
    my_submission?: AssignmentSubmissionType;
}

export type AssignmentSubmissionType = {
    id: number;
    assignment_id: number;
    student_id: number;
    text_answer?: string;
    file_url?: string;
    grade: number;
    feedback?: string;
    submitted_at: string;
}
