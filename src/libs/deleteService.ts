import apiRequest from "./apiRequest";

export default async function deleteService(token: string, id: string) {
    return apiRequest<object>(`/services/${id}`, "DELETE", token);
}
