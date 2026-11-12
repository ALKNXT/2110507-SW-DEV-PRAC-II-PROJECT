import Link from "next/link";
import SignOutButton from "./SignOutButton";
import type { UserProfile } from "../../interface";

export default function TopMenu({ user }: { user: UserProfile | null }) {
    return (
        <header>
            <nav>
                <Link className="brand" href="/" aria-label="Pitlane home">
                    <i aria-hidden="true">{"///"}</i> PITLANE
                </Link>
                <Link href="/">Service packages</Link>
                {user ? (
                    <>
                        <Link href="/appointments">
                            {user.role === "admin" ? "All appointments" : "My appointments"}
                        </Link>
                        <span className="identity">{user.name} · {user.role}</span>
                        <SignOutButton />
                    </>
                ) : (
                    <Link className="navButton" href="/login">Sign in</Link>
                )}
            </nav>
        </header>
    );
}
