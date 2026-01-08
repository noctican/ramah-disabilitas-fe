import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

export const formatDateForInput = (date: Date | null) => {
    return date ? dayjs(date).format('YYYY-MM-DD') : '';
};

export const formatDateForDisplay = (dateStr: string) => {
    return dateStr? dayjs(dateStr, 'YYYY/MM/DD') : null;
}

export const formatDateForApi = (date: Date | null) => {
    return date ? dayjs(date).format('YYYY/MM/DD') : '';
}