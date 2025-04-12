import dayjs from "dayjs";

export function generateAccessTokenExpire() {
    return dayjs().add(1, "day").utc().format();
}
