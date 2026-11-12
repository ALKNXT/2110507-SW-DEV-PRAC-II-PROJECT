import apiRequest from "./apiRequest";
import type { AppointmentItem } from "../../interface";

export default async function getAppointment(token: string, id: string) {
    return apiRequest<AppointmentItem>(`/appointments/${id}`, "GET", token);
}
