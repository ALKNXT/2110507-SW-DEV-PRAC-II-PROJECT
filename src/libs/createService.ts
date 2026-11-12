import apiRequest from "./apiRequest";
import type { ServiceInput, ServiceItem } from "../../interface";

export default async function createService(token: string, data: ServiceInput) {
    return apiRequest<ServiceItem>("/services", "POST", token, data);
}
