"use client";

import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import type { ReactNode } from "react";

const theme = createTheme({
    palette: { primary: { main: "#00695d" } },
    typography: { fontFamily: '"Segoe UI", Tahoma, sans-serif' },
});

export default function NextAuthProvider({ children, session }: {
    children: ReactNode;
    session: Session | null;
}) {
    return (
        <SessionProvider session={session}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </SessionProvider>
    );
}
