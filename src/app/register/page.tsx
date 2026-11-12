import Link from "next/link";
import RegisterForm from "@/components/RegisterForm";

export default function Register() {
    return (
        <section className="narrow">
            <h1>Register</h1>
            <RegisterForm />
            <p>Already have an account? <Link href="/login">Sign in</Link></p>
        </section>
    );
}
