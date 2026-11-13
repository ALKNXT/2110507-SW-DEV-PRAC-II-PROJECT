import Link from "next/link";
import getServices from "@/libs/getServices";
import { currentUser } from "@/libs/authSession";
import ServiceCatalog from "@/components/ServiceCatalog";

export default async function Catalog({ searchParams }: PageProps<"/">) {
    const [response, user, params] = await Promise.all([
        getServices(),
        currentUser(),
        searchParams,
    ]);
    const query = typeof params.q === "string" ? params.q.trim() : "";
    const services = response.data.filter(service =>
        (service.name + " " + service.description).toLowerCase().includes(query.toLowerCase())
    );

    return (
        <>
            <section className="rounded-2xl bg-[linear-gradient(115deg,#14373b_55%,#18564f_55%,#18564f_67%,#1e655b_67%,#1e655b_78%,#267668_78%)] p-[clamp(1.7rem,5vw,4.4rem)] text-white [&_p]:mb-0">
                <div>
                    <h1 className="mb-4 font-bold text-[clamp(1.85rem,4vw,3.15rem)] leading-[1.25]">Car service packages</h1>
                    <p className="mb-4">Choose a service for your car and book a convenient date and time.</p>
                </div>
            </section>
            <div className="flex flex-wrap items-center gap-4 my-[1.6rem] justify-between [&>h1]:mb-0">
                <form className="flex w-[min(100%,28rem)] items-center gap-[.4rem] [&_button]:whitespace-nowrap">
                    <input className="w-full rounded-md border border-[#97aaa5] bg-white p-[.68rem] text-ink" aria-label="Search services" name="q" defaultValue={query}
                        placeholder="Search by service name or description" />
                    <button className="inline-block cursor-pointer rounded-[7px] px-4 py-[.52rem] font-[650] no-underline disabled:cursor-wait disabled:opacity-60 border-0 bg-teal text-white hover:bg-teal-600 transition duration-200" type="submit">Search</button>
                </form>
                {user?.role === "admin" && (
                    <Link className="inline-block cursor-pointer rounded-[7px] px-4 py-[.52rem] font-[650] no-underline disabled:cursor-wait disabled:opacity-60 border-0 bg-teal text-white hover:bg-teal-600 transition duration-200" href="/services/edit">Add package</Link>
                )}
            </div>
            <ServiceCatalog services={services} />
            {!services.length && (
                <p className="mb-4 rounded-xl border border-line bg-white p-[clamp(1.25rem,3vw,2rem)] [overflow-wrap:anywhere]">
                    {query ? "No packages match your search." : "No service packages are currently available."}
                </p>
            )}
        </>
    );
}
