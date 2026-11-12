import apiRequest from "./apiRequest";
import type { UserProfile } from "../../interface";

export default async function getUserProfile(token: string) {
    return apiRequest<UserProfile>("/auth/me", "GET", token);
}
