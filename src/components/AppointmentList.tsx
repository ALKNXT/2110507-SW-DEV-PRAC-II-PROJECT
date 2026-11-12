import Link from "next/link";
import DeleteButton from "./DeleteButton";
import type { AppointmentItem } from "../../interface";

export default function AppointmentList({ appointments, admin }: {
    appointments: AppointmentItem[];
    admin: boolean;
}) {
    return (
        <div className="cards">
            {appointments.map(appointment => (
                <article key={appointment._id} className="panel">
                    <span className="date">
                        {appointment.appointmentDate.slice(0, 10)} · {appointment.startTime} UTC
                    </span>
                    <h2>{appointment.service.name}</h2>
                    <p>{appointment.brand} {appointment.model} · {appointment.registrationNumber}</p>
                    <p>Duration {appointment.durationMinutes} minutes</p>
                    {admin && <p>Booked by {appointment.user.name} · {appointment.user.email}</p>}
                    <div className="actions">
                        <Link href={`/appointments/edit?id=${appointment._id}`}>Edit appointment</Link>
                        <DeleteButton collection="appointments" id={appointment._id}
                            name={`appointment ${appointment.registrationNumber} ${appointment.startTime} UTC`} />
                    </div>
                </article>
            ))}
        </div>
    );
}
