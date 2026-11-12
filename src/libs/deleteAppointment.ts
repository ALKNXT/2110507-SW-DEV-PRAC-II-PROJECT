import apiRequest from "./apiRequest";

export default async function deleteAppointment(token: string, id: string) {
    return apiRequest<object>(`/appointments/${id}`, "DELETE", token);
}
