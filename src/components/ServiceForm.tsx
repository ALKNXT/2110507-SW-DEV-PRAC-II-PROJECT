"use client";

import { useState, type FormEvent } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import createService from "@/libs/createService";
import updateService from "@/libs/updateService";
import getErrorMessage from "@/libs/getErrorMessage";
import type { ServiceItem } from "../../interface";

export default function ServiceForm({ service }: { service: ServiceItem | null }) {
    const router = useRouter();
    const { data: session } = useSession();
    const [name, setName] = useState(service?.name || "");
    const [description, setDescription] = useState(service?.description || "");
    const [duration, setDuration] = useState(service ? String(service.estimatedDuration) : "");
    const [fee, setFee] = useState(service ? String(service.serviceFee) : "");
    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);

    async function saveService(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");
        setBusy(true);

        try {
            if (!session?.user.token) {
                throw new Error("Your session has expired. Please sign in again.");
            }

            const values = {
                name: name.trim(),
                description: description.trim(),
                estimatedDuration: Number(duration),
                serviceFee: Number(fee),
            };

            if (service) {
                await updateService(session.user.token, service._id, values);
            } else {
                await createService(session.user.token, values);
            }

            router.push("/");
            router.refresh();
        } catch (error) {
            setError(getErrorMessage(error));
        } finally {
            setBusy(false);
        }
    }

    return (
        <form onSubmit={saveService} className="rounded-xl border border-line bg-white p-[clamp(1.25rem,3vw,2rem)] [overflow-wrap:anywhere] mb-4 grid gap-4">
            <TextField label="Service name" name="name" value={name}
                onChange={event => setName(event.target.value)} required fullWidth />
            <TextField label="Description" name="description" value={description}
                onChange={event => setDescription(event.target.value)} multiline rows={3} required fullWidth />
            <TextField label="Duration (minutes)" name="estimatedDuration" type="number"
                slotProps={{ htmlInput: { min: 1, step: 1 } }} value={duration}
                onChange={event => setDuration(event.target.value)} required fullWidth />
            <TextField label="Service fee (THB)" name="serviceFee" type="number"
                slotProps={{ htmlInput: { min: 0, step: "any" } }} value={fee}
                onChange={event => setFee(event.target.value)} required fullWidth />
            {error && <Alert severity="error">{error}</Alert>}
            <Button type="submit" variant="contained" disabled={busy}>
                {busy ? "Saving…" : "Save package"}
            </Button>
        </form>
    );
}
