import type { StaticImageData } from "next/image";
import type { ServiceItem } from "../../interface";
import brakeInspection from "../../public/services/brake-inspection.webp";
import generalMaintenance from "../../public/services/general-maintenance.webp";
import oilChange from "../../public/services/oil-change.webp";
import tireRotation from "../../public/services/tire-rotation.webp";

type ServicePhoto = { src: StaticImageData; alt: string };

const photos = {
    brakes: { src: brakeInspection, alt: "Mechanic inspecting a car brake disc and caliper" },
    maintenance: { src: generalMaintenance, alt: "Mechanic inspecting a car engine in a workshop" },
    oil: { src: oilChange, alt: "Mechanic adding engine oil through a funnel" },
    tires: { src: tireRotation, alt: "Mechanic fitting a wheel during tire rotation" },
} satisfies Record<string, ServicePhoto>;

// IDs keep the assigned photo stable when an existing service is renamed.
const photosById: Record<string, ServicePhoto> = {
    "6af470005ee73ce216efe4fb": photos.brakes,
    "6af4703a5ee73ce216efe511": photos.maintenance,
    "6af46fe95ee73ce216efe4f0": photos.oil,
    "6af4701e5ee73ce216efe506": photos.tires,
};

// Name matching also supports these packages when seeded in another database.
const photosByName: Record<string, ServicePhoto> = {
    "brake inspection": photos.brakes,
    "general maintenance": photos.maintenance,
    "oil change": photos.oil,
    "tire rotation": photos.tires,
};

export default function getServiceImage(service: Pick<ServiceItem, "_id" | "name">): ServicePhoto {
    const name = service.name.trim().toLowerCase().replace(/\s+/g, " ");
    if (Object.hasOwn(photosById, service._id)) {
        return photosById[service._id];
    }
    return Object.hasOwn(photosByName, name) ? photosByName[name] : photos.maintenance;
}
