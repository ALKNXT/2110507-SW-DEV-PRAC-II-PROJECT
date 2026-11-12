import { cache } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOption";
import getUserProfile from "./getUserProfile";
import { ApiError } from "./apiRequest";
import type { UserProfile } from "../../interface";

export const currentUser = cache(async () => {
    const session = await getServerSession(authOptions);
    if (!session?.user.token) {
        return null;
    }

    try {
        const profile = await getUserProfile(session.user.token);
        return profile.data;
    } catch (error) {
        if (error instanceof ApiError && error.status === 401) {
            return null;
        }
        throw error;
    }
});

export async function requireUser(role?: UserProfile["role"]) {
    const user = await currentUser();
    if (!user) {
        redirect("/login");
    }
    if (role && user.role !== role) {
        redirect("/");
    }
    return user;
}
