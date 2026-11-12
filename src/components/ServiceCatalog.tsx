import Link from "next/link";
import type { ServiceItem } from "../../interface";

export default function ServiceCatalog({ services }: {
    services: ServiceItem[];
}) {
    return (
        <div className="cards service-cards">
            {services.map(service => (
                <article className="panel service-card" key={service._id}>
                    <h2>{service.name}</h2>
                    <p className="service-description">{service.description}</p>
                    <div className="service-card-footer">
                        <Link className="primary" href={`/services/${service._id}`}
                            aria-label={`View ${service.name}`}>
                            View
                        </Link>
                    </div>
                </article>
            ))}
        </div>
    );
}
