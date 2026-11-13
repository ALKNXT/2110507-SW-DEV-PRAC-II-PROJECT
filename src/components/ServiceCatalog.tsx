import Link from "next/link";
import ServiceImage from "./ServiceImage";
import type { ServiceItem } from "../../interface";

export default function ServiceCatalog({ services }: {
    services: ServiceItem[];
}) {
    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,290px),1fr))] gap-4 auto-rows-fr">
            {services.map(service => (
                <article className="flex flex-col overflow-hidden rounded-xl border border-line bg-white shadow-md transition-[background-color,box-shadow,translate] duration-200 ease-out hover:-translate-y-1.5 hover:bg-[#e8f0ed] hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:translate-y-0" key={service._id}>
                    <ServiceImage service={service} />
                    <div className="flex flex-1 flex-col p-[clamp(1.25rem,3vw,2rem)]">
                        <h2 className="mb-4 font-bold text-[1.35rem] leading-[1.4]">{service.name}</h2>
                        <p className="mb-4 min-h-[3.2em] line-clamp-2">{service.description}</p>
                        <div className="mt-auto">
                            <Link className="inline-block cursor-pointer rounded-[7px] px-4 py-[.52rem] font-[650] no-underline disabled:cursor-wait disabled:opacity-60 border-0 bg-teal text-white hover:bg-teal-600 transition duration-200" href={`/services/${service._id}`}
                                aria-label={`View ${service.name}`}>
                                View
                            </Link>
                        </div>
                    </div>
                </article>
            ))}
        </div>
    );
}
