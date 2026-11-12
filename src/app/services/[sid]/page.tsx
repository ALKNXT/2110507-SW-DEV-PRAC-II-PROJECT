import Link from "next/link";
import { notFound } from "next/navigation";
import getService from "@/libs/getService";
import { currentUser } from "@/libs/authSession";
import { ApiError } from "@/libs/apiRequest";
import DeleteButton from "@/components/DeleteButton";

export default async function ServiceDetails({ params }: {
    params: Promise<{ sid: string }>;
}) {
    const { sid } = await params;
    if (!/^[a-f\d]{24}$/i.test(sid)) {
        notFound();
    }

    let response;
    try {
        response = await getService(sid);
    } catch (error) {
        if (error instanceof ApiError && error.status === 404) {
            notFound();
        }
        throw error;
    }

    const service = response.data;
    const user = await currentUser();

    return (
        <section className="service-detail">
            <Link href="/">← Service packages</Link>
            <article className="panel">
                <h1>{service.name}</h1>
                <p className="service-detail-description">{service.description}</p>
                <div className="spec">
                    <strong>THB {service.serviceFee.toLocaleString("en-US")}</strong>
                    <span>{service.estimatedDuration} minutes</span>
                </div>
                {user?.role === "admin" ? (
                    <>
                        <small>ID {service._id}</small>
                        <div className="actions">
                            <Link href={`/services/edit?id=${service._id}`}>Edit package</Link>
                            <DeleteButton collection="services" id={service._id} name={service.name} />
                        </div>
                    </>
                ) : (
                    <Link className="primary"
                        href={user ? `/appointments/edit?service=${service._id}` : "/login"}>
                        {user ? "Book a service" : "Sign in to book"}
                    </Link>
                )}
            </article>
        </section>
    );
}
