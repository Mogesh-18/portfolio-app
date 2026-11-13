import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Accent } from "@/components/ui/Accent";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
    title: "Page not found",
    robots: { index: false },
};

export default function NotFound() {
    return (
        <main id="main" tabIndex={-1} className="min-h-screen flex items-center">
            <div className="wrap">
                <p className="t-label text-accent mb-4">Error 404</p>
                <h1 className="t-h1 text-fg max-w-2xl text-balance">
                    This page doesn&apos;t exist.{" "}
                    <Accent>The portfolio does.</Accent>
                </h1>
                <ButtonLink href="/" className="mt-8">
                    <ArrowLeft size={15} strokeWidth={2.2} aria-hidden />
                    Back to home
                </ButtonLink>
            </div>
        </main>
    );
}
