import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOption";
import NextAuthProvider from "@/providers/NextAuthProvider";
import TopMenu from "@/components/TopMenu";
import { currentUser } from "@/libs/authSession";
import "./globals.css";

export const metadata: Metadata = {
    title: "Pitlane | Car Service Booking",
    description: "Car service packages and appointments",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const [session, user] = await Promise.all([
        getServerSession(authOptions),
        currentUser(),
    ]);

    return (
        <html lang="en">
            <body>
                <NextAuthProvider session={session}>
                    <TopMenu user={user} />
                    <main>{children}</main>
                </NextAuthProvider>
            </body>
        </html>
    );
}
