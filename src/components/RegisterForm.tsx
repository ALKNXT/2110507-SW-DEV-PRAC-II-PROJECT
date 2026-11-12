"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import userRegister from "@/libs/userRegister";
import getErrorMessage from "@/libs/getErrorMessage";

export default function RegisterForm() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);

    async function register(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");
        setBusy(true);

        try {
            await userRegister({ name, email, tel, password });
            router.push("/login?registered=1");
        } catch (error) {
            setError(getErrorMessage(error));
        } finally {
            setBusy(false);
        }
    }

    return (
        <form onSubmit={register} className="panel form">
            <TextField label="Name" name="name" autoComplete="name"
                value={name} onChange={event => setName(event.target.value)} required fullWidth />
            <TextField label="Email" name="email" type="email" autoComplete="email"
                value={email} onChange={event => setEmail(event.target.value)} required fullWidth />
            <TextField label="Phone number" name="tel" type="tel" autoComplete="tel"
                value={tel} onChange={event => setTel(event.target.value)} required fullWidth />
            <TextField label="Password" name="password" type="password" autoComplete="new-password"
                helperText="At least 6 characters" slotProps={{ htmlInput: { minLength: 6 } }}
                value={password} onChange={event => setPassword(event.target.value)} required fullWidth />
            {error && <Alert severity="error">{error}</Alert>}
            <Button type="submit" variant="contained" disabled={busy}>
                {busy ? "Creating account…" : "Create account"}
            </Button>
        </form>
    );
}
