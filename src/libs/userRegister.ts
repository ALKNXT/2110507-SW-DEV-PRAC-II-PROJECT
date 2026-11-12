import type { RegistrationInput } from "../../interface";

export default async function userRegister(data: RegistrationInput) {
    const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.error || "Unable to create your account.");
    }

    return result;
}
