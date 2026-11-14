import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { toThaiAppointmentTime } from "@/libs/appointmentTime";
import type { AppointmentItem } from "../../interface";

export default function AppointmentList({ appointments, admin }: {
    appointments: AppointmentItem[];
    admin: boolean;
}) {
    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,290px),1fr))] gap-4">
            {appointments.map(appointment => {
                const localTime = toThaiAppointmentTime(appointment.appointmentDate, appointment.startTime);

                return (
                    <article key={appointment._id} className="rounded-xl border border-line bg-white p-[clamp(1.25rem,3vw,2rem)] [overflow-wrap:anywhere]">
                        <span className="font-semibold text-teal">
                            {localTime.appointmentDate} · {localTime.startTime}
                        </span>
                        <h2 className="mb-4 font-bold text-[1.35rem] leading-[1.4]">{appointment.service.name}</h2>
                        <p className="mb-4">{appointment.brand} {appointment.model} · {appointment.registrationNumber}</p>
                        <p className="mb-4">Duration {appointment.durationMinutes} minutes</p>
                        {admin && <p className="mb-4">Booked by {appointment.user.name} · {appointment.user.email}</p>}
                        <div className="flex flex-wrap items-center gap-4 mt-4">
                            <Link className="text-teal underline underline-offset-[.2em]" href={`/appointments/edit?id=${appointment._id}`}>Edit appointment</Link>
                            <DeleteButton collection="appointments" id={appointment._id}
                                name={`appointment ${appointment.registrationNumber} ${localTime.appointmentDate} ${localTime.startTime}`} />
                        </div>
                    </article>
                );
            })}
        </div>
    );
}
