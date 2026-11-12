export default function getErrorMessage(error: unknown) {
    const message = error instanceof Error ? error.message : "Unable to complete the request.";

    if (message.includes("E11000")) {
        return "A record with these details already exists.";
    }

    return message;
}
