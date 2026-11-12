import apiRequest from "./apiRequest";
import type { ServiceItem } from "../../interface";

export default async function getService(id: string) {
    return apiRequest<ServiceItem>(`/services/${id}`);
}
