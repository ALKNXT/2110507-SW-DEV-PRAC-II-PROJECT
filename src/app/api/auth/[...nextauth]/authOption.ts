import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userLogIn from "@/libs/userLogIn";
import apiRequest, { ApiError } from "@/libs/apiRequest";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    return null;
                }

                try {
                    const result = await userLogIn(credentials.email, credentials.password);
                    const user = result.data;
                    const payload = JSON.parse(Buffer.from(user.token.split(".")[1], "base64url").toString());

                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        token: user.token,
                        tokenExpires: Number(payload.exp) * 1000,
                    };
                } catch (error) {
                    if (error instanceof ApiError && error.status === 401) {
                        return null;
                    }
                    throw new Error("Unable to sign in. Please try again.");
                }
            },
        }),
    ],
    session: { strategy: "jwt" },
    pages: { signIn: "/login" },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.accessToken = user.token;
                token.accessTokenExpires = user.tokenExpires;
            }

            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.role = token.role;
            session.user.token = Date.now() < token.accessTokenExpires ? token.accessToken : "";
            return session;
        },
    },
    events: {
        async signOut({ token }) {
            await apiRequest("/auth/logout", "GET", token.accessToken).catch(() => undefined);
        },
    },
}
