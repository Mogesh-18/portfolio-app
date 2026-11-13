import { Briefcase, FileText, Handshake, type LucideIcon } from "lucide-react";
import type { OpenToKind } from "@/types";

/** Icon for each `openTo` kind in data/resume.ts (About and Contact) */
export const OPEN_TO_ICON: Record<OpenToKind, LucideIcon> = {
    "full-time": Briefcase,
    contract: FileText,
    consulting: Handshake,
};
