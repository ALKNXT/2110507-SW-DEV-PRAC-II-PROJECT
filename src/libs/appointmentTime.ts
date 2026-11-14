import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const appointmentTimezone = "Asia/Bangkok";

export function toThaiAppointmentTime(date: string, time: string) {
    const value = dayjs.utc(`${date.slice(0, 10)}T${time}:00`).tz(appointmentTimezone);

    return {
        appointmentDate: value.format("YYYY-MM-DD"),
        startTime: value.format("HH:mm"),
    };
}

export function toUtcAppointmentTime(date: string, time: string) {
    const value = dayjs.tz(`${date}T${time}:00`, appointmentTimezone).utc();

    return {
        appointmentDate: value.format("YYYY-MM-DD"),
        startTime: value.format("HH:mm"),
    };
}

export function getTodayInThailand() {
    return dayjs().tz(appointmentTimezone).format("YYYY-MM-DD");
}
