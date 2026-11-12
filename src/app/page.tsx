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
            <section className="hero">
                <div>
                    <h1>Car service packages</h1>
                    <p>Choose a service for your car and book a convenient date and time.</p>
                </div>
            </section>
            <div className="bar">
                <form className="search">
                    <input aria-label="Search services" name="q" defaultValue={query}
                        placeholder="Search by service name or description" />
                    <button type="submit">Search</button>
                </form>
                {user?.role === "admin" && (
                    <Link className="primary" href="/services/edit">Add package</Link>
                )}
            </div>
            <ServiceCatalog services={services} />
            {!services.length && (
                <p className="panel">
                    {query ? "No packages match your search." : "No service packages are currently available."}
                </p>
            )}
        </>
    );
}
