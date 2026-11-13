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
            <div className="flex flex-wrap items-center gap-4 my-[1.6rem] justify-between [&>h1]:mb-0">
                <h1 className="mb-4 font-bold text-[clamp(1.85rem,4vw,3.15rem)] leading-[1.25]">{admin ? "All appointments" : "My appointments"}</h1>
                {!admin && <Link className="inline-block cursor-pointer rounded-[7px] px-4 py-[.52rem] font-[650] no-underline disabled:cursor-wait disabled:opacity-60 border-0 bg-teal text-white" href="/">Book a service</Link>}
            </div>
            {!response.data.length && <p className="mb-4 rounded-xl border border-line bg-white p-[clamp(1.25rem,3vw,2rem)] [overflow-wrap:anywhere]">No appointments yet.</p>}
            <AppointmentList appointments={response.data} admin={admin} />
        </>
    );
}
