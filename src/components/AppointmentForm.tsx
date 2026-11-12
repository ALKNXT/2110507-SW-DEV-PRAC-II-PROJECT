"use client";

import { useState, type FormEvent } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { type Dayjs } from "dayjs";
import createAppointment from "@/libs/createAppointment";
import updateAppointment from "@/libs/updateAppointment";
import getErrorMessage from "@/libs/getErrorMessage";
import type { ServiceItem, AppointmentItem } from "../../interface";

export default function AppointmentForm({ services, appointment, initialService, today }: {
    services: ServiceItem[];
    appointment: AppointmentItem | null;
    initialService: string;
    today: string;
}) {
    const router = useRouter();
    const { data: session } = useSession();
    const selectedService = appointment?.service._id || initialService;
    const activeService = services.some(item => item._id === selectedService);
    const [service, setService] = useState(activeService ? selectedService : "");
    const [registrationNumber, setRegistrationNumber] = useState(appointment?.registrationNumber || "");
    const [brand, setBrand] = useState(appointment?.brand || "");
    const [model, setModel] = useState(appointment?.model || "");
    const [date, setDate] = useState<Dayjs | null>(
        appointment ? dayjs(appointment.appointmentDate.slice(0, 10)) : null
    );
    const [time, setTime] = useState(appointment?.startTime || "");
    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);

    async function saveAppointment(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");

        if (!date?.isValid() || date.format("YYYY-MM-DD") < today) {
            setError("Please select today or a future date.");
            return;
        }

        setBusy(true);
        try {
            if (!session?.user.token) {
                throw new Error("Your session has expired. Please sign in again.");
            }

            const values = {
                service,
                registrationNumber: registrationNumber.trim(),
                brand: brand.trim(),
                model: model.trim(),
                appointmentDate: date.format("YYYY-MM-DD"),
                startTime: time,
            };

            if (appointment) {
                await updateAppointment(session.user.token, appointment._id, values);
            } else {
                await createAppointment(session.user.token, values);
            }

            router.push("/appointments");
            router.refresh();
        } catch (error) {
            setError(getErrorMessage(error));
        } finally {
            setBusy(false);
        }
    }

    return (
        <form onSubmit={saveAppointment} className="panel form">
            <FormControl fullWidth required>
                <InputLabel id="service-label">Service package</InputLabel>
                <Select name="service" labelId="service-label" label="Service package"
                    value={service} onChange={event => setService(event.target.value)}>
                    {services.map(item => (
                        <MenuItem key={item._id} value={item._id}>
                            {item.name} · {item.estimatedDuration} minutes · THB {item.serviceFee}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {appointment && !activeService && (
                <Alert severity="info">The original package is no longer available. Please choose another package.</Alert>
            )}
            <TextField label="Registration number" name="registrationNumber" value={registrationNumber}
                onChange={event => setRegistrationNumber(event.target.value)} required fullWidth />
            <div className="pair">
                <TextField label="Brand" name="brand" value={brand}
                    onChange={event => setBrand(event.target.value)} required fullWidth />
                <TextField label="Model" name="model" value={model}
                    onChange={event => setModel(event.target.value)} required fullWidth />
            </div>
            <div className="pair">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="Date (UTC)" value={date} minDate={dayjs(today)}
                        onChange={value => setDate(value)}
                        slotProps={{ textField: { required: true, fullWidth: true } }} />
                </LocalizationProvider>
                <TextField label="Start time (UTC)" name="startTime" type="time" value={time}
                    slotProps={{ inputLabel: { shrink: true } }}
                    onChange={event => setTime(event.target.value)} required fullWidth />
            </div>
            <small>Thailand is 7 hours ahead of UTC. For example, 03:00 UTC is 10:00 in Thailand.</small>
            <small>One appointment per vehicle per day. Vehicle appointments cannot overlap. Members can have up to 3 future appointments.</small>
            {error && <Alert severity="error">{error}</Alert>}
            <Button type="submit" variant="contained" disabled={busy}>
                {busy ? "Saving…" : appointment ? "Save changes" : "Confirm booking"}
            </Button>
        </form>
    );
}
