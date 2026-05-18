"use client";
import { useReveal } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import type { ReactNode, ElementType } from "react";

interface FadeInProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    as?: ElementType;
}

export function FadeIn({ children, className, delay = 0, as: Tag = "div" }: FadeInProps) {
    const { ref, visible } = useReveal();
    return (
        <Tag ref={ref} className={cn("reveal", visible && "in", className)} style={{ transitionDelay: `${delay}ms` }}>
            {children}
        </Tag>
    );
}
