"use client";

import { useState, type FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);

    async function logIn(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");
        setBusy(true);

        try {
            const result = await signIn("credentials", {
                email: email.trim().toLowerCase(),
                password,
                redirect: false,
            });

            if (!result?.ok) {
                setError(result?.error === "CredentialsSignin"
                    ? "Incorrect email or password."
                    : "Unable to sign in. Please try again.");
                return;
            }

            router.replace("/");
            router.refresh();
        } catch {
            setError("Unable to sign in. Please try again.");
        } finally {
            setBusy(false);
        }
    }

    return (
        <form onSubmit={logIn} className="rounded-xl border border-line bg-white p-[clamp(1.25rem,3vw,2rem)] [overflow-wrap:anywhere] mb-4 grid gap-4">
            <TextField label="Email" name="email" type="email" autoComplete="username"
                value={email} onChange={event => setEmail(event.target.value)} required fullWidth />
            <TextField label="Password" name="password" type="password" autoComplete="current-password"
                value={password} onChange={event => setPassword(event.target.value)} required fullWidth />
            {error && <Alert severity="error">{error}</Alert>}
            <Button type="submit" variant="contained" disabled={busy}>
                {busy ? "Signing in…" : "Sign in"}
            </Button>
        </form>
    );
}
