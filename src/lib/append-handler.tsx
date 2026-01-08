export const appendFd = (formData: FormData, key: string, value: any) => {
    if(!value) return;
    if(value instanceof Date) formData.append(key, value.toISOString())
    else formData.append(key, value)
}