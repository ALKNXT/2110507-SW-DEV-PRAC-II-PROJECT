"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import deleteService from "@/libs/deleteService";
import deleteAppointment from "@/libs/deleteAppointment";
import getErrorMessage from "@/libs/getErrorMessage";

export default function DeleteButton({ collection, id, name }: {
    collection: "services" | "appointments";
    id: string;
    name: string;
}) {
    const router = useRouter();
    const { data: session } = useSession();
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");

    async function removeItem() {
        if (!window.confirm(`Delete ${name}?`)) {
            return;
        }

        setError("");
        setBusy(true);
        try {
            if (!session?.user.token) {
                throw new Error("Your session has expired. Please sign in again.");
            }

            if (collection === "services") {
                await deleteService(session.user.token, id);
                router.replace("/");
            } else {
                await deleteAppointment(session.user.token, id);
            }

            router.refresh();
        } catch (error) {
            setError(getErrorMessage(error));
        } finally {
            setBusy(false);
        }
    }

    return (
        <div>
            <Button type="button" color="error" onClick={removeItem} disabled={busy}>
                {busy ? "Deleting…" : "Delete"}
            </Button>
            {error && <Alert severity="error">{error}</Alert>}
        </div>
    );
}
