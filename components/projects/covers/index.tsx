import type { ReactNode } from "react";
import type { Project } from "@/types";
import type { ProjectId } from "@/data/resume";
import type { CoverProps } from "./primitives";
import { RealEstateCover } from "./RealEstateCover";
import { IndustrialErpCover } from "./IndustrialErpCover";
import { GarmentCover } from "./GarmentCover";
import { BoatRentalCover } from "./BoatRentalCover";
import { DashboardCover } from "./DashboardCover";

/* Add a project illustration: create <Name>Cover.tsx here (use the primitives) and register it below. */

const COVERS: Partial<Record<ProjectId, (props: CoverProps) => ReactNode>> = {
    "real-estate-crm": RealEstateCover,
    "industrial-erp": IndustrialErpCover,
    "garment-crm": GarmentCover,
    "boat-rental": BoatRentalCover,
};

/** The illustration for a project, falling back to a generic dashboard. */
export function CoverArt({ p, large }: { p: Project; large: boolean }) {
    const Cover = (COVERS as Partial<Record<string, (props: CoverProps) => ReactNode>>)[p.id];
    return Cover ? <Cover large={large} /> : <DashboardCover large={large} stack={p.techStack} />;
}
