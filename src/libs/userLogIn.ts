import apiRequest from "./apiRequest";
import type { LoginUser } from "../../interface";

export default async function userLogIn(email: string, password: string) {
    return apiRequest<LoginUser>("/auth/login", "POST", undefined, {
        email: email.trim().toLowerCase(),
        password,
    });
}
