import dayjs from "dayjs";

export function formatUtcISODateToLocalDate(utcISODate: string): string | null {
    const utcDate = dayjs.utc(utcISODate);
    return utcDate.isValid() ? utcDate.local().format("YYYY-MM-DD HH:mm:ss.SSS") : null;
}
