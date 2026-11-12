"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";

export default function SignOutButton() {
    const [busy, setBusy] = useState(false);

    return (
        <button className="navButton" disabled={busy} onClick={async () => {
            setBusy(true);
            try {
                await signOut({ callbackUrl: "/" });
            } finally {
                setBusy(false);
            }
        }}>
            {busy ? "Signing out…" : "Sign out"}
        </button>
    );
}
