import apiRequest from "./apiRequest";
import type { AppointmentItem } from "../../interface";

export default async function getAppointments(token: string) {
    return apiRequest<AppointmentItem[]>("/appointments", "GET", token);
}
