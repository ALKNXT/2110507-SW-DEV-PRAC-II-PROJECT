import apiRequest from "./apiRequest";
import type { ServiceItem } from "../../interface";

export default async function getServices() {
    return apiRequest<ServiceItem[]>("/services");
}
