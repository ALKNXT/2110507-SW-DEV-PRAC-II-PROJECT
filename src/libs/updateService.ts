import apiRequest from "./apiRequest";
import type { ServiceInput, ServiceItem } from "../../interface";

export default async function updateService(token: string, id: string, data: ServiceInput) {
    return apiRequest<ServiceItem>(`/services/${id}`, "PUT", token, data);
}
