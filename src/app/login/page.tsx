import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export default async function Login({ searchParams }: PageProps<"/login">) {
    const { registered } = await searchParams;

    return (
        <section className="mx-auto max-w-[550px] [&>h1]:mt-3 [&>h1]:mb-5">
            <h1 className="mb-4 font-bold text-[clamp(1.85rem,4vw,3.15rem)] leading-[1.25]">Sign in</h1>
            {registered && <p className="mb-4" role="status">Registration successful. Sign in with your email.</p>}
            <LoginForm />
            <p className="mb-4">New here? <Link className="text-teal underline underline-offset-[.2em]" href="/register">Register</Link></p>
        </section>
    );
}
