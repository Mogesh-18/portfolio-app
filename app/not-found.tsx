import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Accent } from "@/components/ui/Accent";

export const metadata: Metadata = {
    title: "Page not found",
    robots: { index: false },
};

export default function NotFound() {
    return (
        <main id="main" className="min-h-screen flex items-center">
            <div className="wrap">
                <p className="t-label text-accent mb-4">Error 404</p>
                <h1 className="t-h1 text-fg max-w-2xl text-balance">
                    This page doesn&apos;t exist.{" "}
                    <Accent>The portfolio does.</Accent>
                </h1>
                <Link
                    href="/"
                    className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 bg-accent-solid hover:bg-accent-solid-2 text-white font-semibold text-sm rounded-xl transition-colors duration-200"
                >
                    <ArrowLeft size={15} strokeWidth={2.2} aria-hidden />
                    Back to home
                </Link>
            </div>
        </main>
    );
}
