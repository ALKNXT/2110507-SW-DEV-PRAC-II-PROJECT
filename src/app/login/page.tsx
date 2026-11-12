import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export default async function Login({ searchParams }: PageProps<"/login">) {
    const { registered } = await searchParams;

    return (
        <section className="narrow">
            <h1>Sign in</h1>
            {registered && <p role="status">Registration successful. Sign in with your email.</p>}
            <LoginForm />
            <p>New here? <Link href="/register">Register</Link></p>
        </section>
    );
}
