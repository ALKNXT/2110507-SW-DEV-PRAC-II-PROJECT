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
        <html lang="en" className="scheme-light">
            <body className="m-0 bg-[#f4f7f5] font-sans text-base leading-[1.6] text-ink [&_:focus-visible]:outline-3 [&_:focus-visible]:outline-offset-3 [&_:focus-visible]:outline-[#008f82]">
                <NextAuthProvider session={session}>
                    <TopMenu user={user} />
                    <main className="mx-auto w-[min(1120px,92vw)] pt-[clamp(1.2rem,4vw,3rem)] pb-20">{children}</main>
                </NextAuthProvider>
            </body>
        </html>
    );
}
