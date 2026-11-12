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
        <section className="narrow">
            <Link href={editing ? "/appointments" : "/"}>← Back</Link>
            <h1>{editing ? "Edit appointment" : "Book an appointment"}</h1>
            {services.length ? (
                <AppointmentForm services={services} appointment={appointment}
                    initialService={typeof service === "string" ? service : ""}
                    today={new Date().toISOString().slice(0, 10)} />
            ) : (
                <p className="panel">No service packages are currently available.</p>
            )}
        </section>
    );
}
