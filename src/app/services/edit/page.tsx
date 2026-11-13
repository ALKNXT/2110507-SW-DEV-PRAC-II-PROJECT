import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/libs/authSession";
import getService from "@/libs/getService";
import { ApiError } from "@/libs/apiRequest";
import ServiceForm from "@/components/ServiceForm";
import type { ServiceItem } from "../../../../interface";

export default async function ServiceEditor({ searchParams }: PageProps<"/services/edit">) {
    await requireUser("admin");
    const { id } = await searchParams;
    let service: ServiceItem | null = null;

    if (typeof id === "string") {
        if (!/^[a-f\d]{24}$/i.test(id)) {
            notFound();
        }

        try {
            service = (await getService(id)).data;
        } catch (error) {
            if (error instanceof ApiError && error.status === 404) {
                notFound();
            }
            throw error;
        }
    }

    return (
        <section className="mx-auto max-w-[550px] [&>h1]:mt-3 [&>h1]:mb-5">
            <Link className="text-teal underline underline-offset-[.2em]" href="/">← Service packages</Link>
            <h1 className="mb-4 font-bold text-[clamp(1.85rem,4vw,3.15rem)] leading-[1.25]">{service ? "Edit package" : "Add package"}</h1>
            <ServiceForm service={service} />
        </section>
    );
}
