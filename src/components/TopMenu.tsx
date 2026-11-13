import Link from "next/link";
import SignOutButton from "./SignOutButton";
import type { UserProfile } from "../../interface";

export default function TopMenu({ user }: { user: UserProfile | null }) {
    return (
        <header className="border-b border-line bg-white">
            <nav className="mx-auto flex min-h-[76px] w-[min(1120px,92vw)] flex-wrap items-center gap-4 py-[.8rem] max-[600px]:gap-[.65rem] [&_a]:no-underline">
                <Link className="mr-auto font-[family-name:Arial,sans-serif] text-[1.6rem] font-black italic tracking-[-.06em] text-ink no-underline max-[600px]:w-full [&_i]:text-teal" href="/" aria-label="Pitlane home">
                    <i aria-hidden="true">{"///"}</i> PITLANE
                </Link>
                <Link className="font-semibold text-teal underline underline-offset-[.2em]" href="/">Service packages</Link>
                {user ? (
                    <>
                        <Link className="font-semibold text-teal underline underline-offset-[.2em]" href="/appointments">
                            {user.role === "admin" ? "All appointments" : "My appointments"}
                        </Link>
                        <span className="text-[#45615a] max-[600px]:hidden">{user.name} · {user.role}</span>
                        <SignOutButton />
                    </>
                ) : (
                    <Link className="inline-block cursor-pointer rounded-[7px] px-4 py-[.52rem] font-[650] no-underline disabled:cursor-wait disabled:opacity-60 border border-line bg-white text-ink" href="/login">Sign in</Link>
                )}
            </nav>
        </header>
    );
}
