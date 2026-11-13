import Link from "next/link";
import RegisterForm from "@/components/RegisterForm";

export default function Register() {
    return (
        <section className="mx-auto max-w-[550px] [&>h1]:mt-3 [&>h1]:mb-5">
            <h1 className="mb-4 font-bold text-[clamp(1.85rem,4vw,3.15rem)] leading-[1.25]">Register</h1>
            <RegisterForm />
            <p className="mb-4">Already have an account? <Link className="text-teal underline underline-offset-[.2em]" href="/login">Sign in</Link></p>
        </section>
    );
}
