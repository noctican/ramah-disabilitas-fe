export type JoinedCourse = {
    id: number;
    teacher_id: number;
    title: string;
    description: string;
    thumbnail: string;
    class_code: string;
    status: string;
    progress: number;
    created_at: string;
    updated_at: string;
}

export type CourseMaterial = {
    id: number;
    title: string;
    type: string;
    source_url?: string;
    duration_min?: number;
    has_captions?: boolean;
    is_completed: boolean;
}

export type CourseModule = {
    id: number;
    title: string;
    order: number;
    materials: CourseMaterial[];
}

export type StudentCourseDetail = {
    id: number;
    teacher_id: number;
    title: string;
    description: string;
    thumbnail: string;
    class_code: string;
    status: string;
    created_at: string;
    updated_at: string;
    modules: CourseModule[];
}

export type MaterialDetailType = {
    id: number;
    module_id: number;
    title: string;
    type: string;
    source_url?: string;
    raw_content?: string;
    duration_min: number;
    has_captions: boolean;
    is_completed: boolean;
    smart_feature?: {
        id: number;
        summary: string;
        quiz_data?: any;
    };
}
