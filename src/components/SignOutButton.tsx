"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";

export default function SignOutButton() {
    const [busy, setBusy] = useState(false);

    return (
        <button className="inline-block cursor-pointer rounded-[7px] px-4 py-[.52rem] font-[650] no-underline disabled:cursor-wait disabled:opacity-60 border border-line bg-white text-ink" disabled={busy} onClick={async () => {
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
