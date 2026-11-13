import Link from "next/link";
import { notFound } from "next/navigation";
import getService from "@/libs/getService";
import { currentUser } from "@/libs/authSession";
import { ApiError } from "@/libs/apiRequest";
import DeleteButton from "@/components/DeleteButton";
import ServiceImage from "@/components/ServiceImage";

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
        <section className="mx-auto max-w-[760px] [&>a]:mb-4 [&>a]:inline-block">
            <Link className="text-teal underline underline-offset-[.2em]" href="/">← Service packages</Link>
            <article className="overflow-hidden rounded-xl border border-line bg-white [overflow-wrap:anywhere]">
                <ServiceImage service={service} detail />
                <div className="p-[clamp(1.25rem,3vw,2rem)]">
                    <h1 className="mb-4 font-bold text-[clamp(1.85rem,4vw,3.15rem)] leading-[1.25]">{service.name}</h1>
                    <p className="mb-4 whitespace-pre-wrap">{service.description}</p>
                    <div className="flex flex-wrap items-center gap-4 justify-between border-t border-line py-4 [&>strong]:text-[1.4rem]">
                        <strong>THB {service.serviceFee.toLocaleString("en-US")}</strong>
                        <span>{service.estimatedDuration} minutes</span>
                    </div>
                    {user?.role === "admin" ? (
                        <>
                            <small className="text-[#45615a]">ID {service._id}</small>
                            <div className="flex flex-wrap items-center gap-4 mt-4">
                                <Link className="text-teal underline underline-offset-[.2em]" href={`/services/edit?id=${service._id}`}>Edit package</Link>
                                <DeleteButton collection="services" id={service._id} name={service.name} />
                            </div>
                        </>
                    ) : (
                        <Link className="inline-block cursor-pointer rounded-[7px] px-4 py-[.52rem] font-[650] no-underline disabled:cursor-wait disabled:opacity-60 border-0 bg-teal text-white"
                            href={user ? `/appointments/edit?service=${service._id}` : "/login"}>
                            {user ? "Book a service" : "Sign in to book"}
                        </Link>
                    )}
                </div>
            </article>
        </section>
    );
}
