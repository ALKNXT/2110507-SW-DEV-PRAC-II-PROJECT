import apiRequest from "./apiRequest";
import type { AppointmentInput, AppointmentItem } from "../../interface";

export default async function createAppointment(token: string, data: AppointmentInput) {
    return apiRequest<AppointmentItem>("/appointments", "POST", token, data);
}
