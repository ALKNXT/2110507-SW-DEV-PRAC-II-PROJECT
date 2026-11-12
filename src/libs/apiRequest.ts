import type { ApiResponse } from "../../interface";

export class ApiError extends Error {
    constructor(public status: number, message: string) {
        super(message);
    }
}

export default async function apiRequest<T>(
    path: string,
    method = "GET",
    token?: string,
    body?: object
): Promise<ApiResponse<T>> {
    const baseUrl = process.env.NEXT_PUBLIC_CAR_SERVICE_API_URL || "http://localhost:5000/api/v1";
    let response: Response;

    try {
        response = await fetch(baseUrl.replace(/\/$/, "") + path, {
            method,
            cache: "no-store",
            signal: AbortSignal.timeout(12000),
            headers: {
                ...(body && { "Content-Type": "application/json" }),
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: body && JSON.stringify(body),
        });
    } catch {
        throw new Error("Unable to connect to the service center. Please try again.");
    }

    const result = await response.json();
    if (!response.ok) {
        throw new ApiError(response.status, result.error || "Unable to complete the request.");
    }

    return result;
}
