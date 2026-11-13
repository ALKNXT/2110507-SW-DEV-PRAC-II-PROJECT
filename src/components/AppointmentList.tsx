import Link from "next/link";
import DeleteButton from "./DeleteButton";
import type { AppointmentItem } from "../../interface";

export default function AppointmentList({ appointments, admin }: {
    appointments: AppointmentItem[];
    admin: boolean;
}) {
    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,290px),1fr))] gap-4">
            {appointments.map(appointment => (
                <article key={appointment._id} className="rounded-xl border border-line bg-white p-[clamp(1.25rem,3vw,2rem)] [overflow-wrap:anywhere]">
                    <span className="font-semibold text-teal">
                        {appointment.appointmentDate.slice(0, 10)} · {appointment.startTime} UTC
                    </span>
                    <h2 className="mb-4 font-bold text-[1.35rem] leading-[1.4]">{appointment.service.name}</h2>
                    <p className="mb-4">{appointment.brand} {appointment.model} · {appointment.registrationNumber}</p>
                    <p className="mb-4">Duration {appointment.durationMinutes} minutes</p>
                    {admin && <p className="mb-4">Booked by {appointment.user.name} · {appointment.user.email}</p>}
                    <div className="flex flex-wrap items-center gap-4 mt-4">
                        <Link className="text-teal underline underline-offset-[.2em]" href={`/appointments/edit?id=${appointment._id}`}>Edit appointment</Link>
                        <DeleteButton collection="appointments" id={appointment._id}
                            name={`appointment ${appointment.registrationNumber} ${appointment.startTime} UTC`} />
                    </div>
                </article>
            ))}
        </div>
    );
}
