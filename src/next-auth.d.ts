import type { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: DefaultSession["user"] & {
            id: string;
            role: "admin" | "member";
            token: string;
        };
    }

    interface User {
        role: "admin" | "member";
        token: string;
        tokenExpires: number;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        role: "admin" | "member";
        accessToken: string;
        accessTokenExpires: number;
    }
}
