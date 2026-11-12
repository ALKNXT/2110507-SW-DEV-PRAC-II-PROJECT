import apiRequest, { ApiError } from "@/libs/apiRequest";

export async function POST(request: Request) {
    let data;
    try {
        data = await request.json();
    } catch {
        return Response.json({ error: "Invalid registration details." }, { status: 400 });
    }

    if (!data || typeof data !== "object" ||
        ["name", "email", "tel", "password"].some(field => typeof data[field] !== "string")) {
        return Response.json({ error: "Please complete all registration fields." }, { status: 400 });
    }

    try {
        await apiRequest("/auth/register", "POST", undefined, {
            name: data.name.trim(),
            email: data.email.trim().toLowerCase(),
            tel: data.tel.trim(),
            password: data.password,
            role: "member",
        });
        return Response.json({ success: true }, { status: 201 });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unable to create your account.";
        return Response.json({
            error: message.includes("E11000") ? "This email address is already registered." : message,
        }, { status: error instanceof ApiError ? error.status : 503 });
    }
}
