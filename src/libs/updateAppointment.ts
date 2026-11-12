import apiRequest from "./apiRequest";
import type { AppointmentInput, AppointmentItem } from "../../interface";

export default async function updateAppointment(token: string, id: string, data: AppointmentInput) {
    return apiRequest<AppointmentItem>(`/appointments/${id}`, "PUT", token, data);
}
