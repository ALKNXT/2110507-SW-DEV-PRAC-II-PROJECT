import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOption";
import { requireUser } from "@/libs/authSession";
import getAppointments from "@/libs/getAppointments";
import AppointmentList from "@/components/AppointmentList";

export default async function Appointments() {
    const user = await requireUser();
    const session = await getServerSession(authOptions);
    const response = await getAppointments(session!.user.token);
    const admin = user.role === "admin";

    return (
        <>
            <div className="bar">
                <h1>{admin ? "All appointments" : "My appointments"}</h1>
                {!admin && <Link className="primary" href="/">Book a service</Link>}
            </div>
            {!response.data.length && <p className="panel">No appointments yet.</p>}
            <AppointmentList appointments={response.data} admin={admin} />
        </>
    );
}
