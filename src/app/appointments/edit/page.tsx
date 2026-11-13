import Link from "next/link";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOption";
import { requireUser } from "@/libs/authSession";
import getServices from "@/libs/getServices";
import getAppointment from "@/libs/getAppointment";
import { ApiError } from "@/libs/apiRequest";
import AppointmentForm from "@/components/AppointmentForm";
import type { AppointmentItem } from "../../../../interface";

export default async function AppointmentEditor({ searchParams }: PageProps<"/appointments/edit">) {
    const { id, service } = await searchParams;
    const editing = typeof id === "string";
    await requireUser(editing ? undefined : "member");
    const session = await getServerSession(authOptions);
    const services = (await getServices()).data;
    let appointment: AppointmentItem | null = null;

    if (editing) {
        if (!/^[a-f\d]{24}$/i.test(id)) {
            notFound();
        }

        try {
            appointment = (await getAppointment(session!.user.token, id)).data;
        } catch (error) {
            if (error instanceof ApiError && [403, 404].includes(error.status)) {
                notFound();
            }
            throw error;
        }
    }

    return (
        <section className="mx-auto max-w-[550px] [&>h1]:mt-3 [&>h1]:mb-5">
            <Link className="text-teal underline underline-offset-[.2em]" href={editing ? "/appointments" : "/"}>← Back</Link>
            <h1 className="mb-4 font-bold text-[clamp(1.85rem,4vw,3.15rem)] leading-[1.25]">{editing ? "Edit appointment" : "Book an appointment"}</h1>
            {services.length ? (
                <AppointmentForm services={services} appointment={appointment}
                    initialService={typeof service === "string" ? service : ""}
                    today={new Date().toISOString().slice(0, 10)} />
            ) : (
                <p className="mb-4 rounded-xl border border-line bg-white p-[clamp(1.25rem,3vw,2rem)] [overflow-wrap:anywhere]">No service packages are currently available.</p>
            )}
        </section>
    );
}
