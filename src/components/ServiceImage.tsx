import Image from "next/image";
import getServiceImage from "@/libs/serviceImages";
import type { ServiceItem } from "../../interface";

export default function ServiceImage({ service, detail = false }: {
    service: Pick<ServiceItem, "_id" | "name">;
    detail?: boolean;
}) {
    const photo = getServiceImage(service);

    return (
        <div className={`service-photo${detail ? " service-photo-detail" : ""}`}>
            <Image src={photo.src} alt={photo.alt} fill placeholder="blur"
                sizes={detail
                    ? "(max-width: 825px) 92vw, 760px"
                    : "(max-width: 647px) 92vw, (max-width: 980px) 46vw, 374px"} />
        </div>
    );
}
