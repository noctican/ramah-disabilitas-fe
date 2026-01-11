export type ApiResponseType<T = 'single' | 'multiple', D = any> = {
    message?: string;
    data?: T extends 'single' ? D : D[]
}

export type ApiResponsePaginationType<T> = {
    message?: string;
    data: T[];
    pagination: PaginationType;
}

export type PaginationType = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export type DefaultDataType = {
    id: string;
    created_at: string;
    updated_at: string;
}