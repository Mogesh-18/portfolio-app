import { ImageResponse } from "next/og";
import { contact, headline, projects } from "@/data/resume";
import { geistFonts } from "@/lib/og-fonts";

export const alt = "Project case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const revalidate = 86400;

export function generateStaticParams() {
    return projects.map(p => ({ slug: p.id }));
}

export default async function ProjectOgImage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const p = projects.find(x => x.id === slug) ?? projects[0];
    if (!p) throw new Error("No projects defined");

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "72px 80px",
                    background: "#090A0C",
                    backgroundImage: `radial-gradient(circle at 90% 0%, ${p.color}66 0%, transparent 55%)`,
                    color: "#F2F3F8",
                    fontFamily: "Geist",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, color: "#AEB1BB" }}>
                    <span style={{ color: "#929EFE" }}>{`[${String(p.index).padStart(2, "0")}]`}</span>
                    Case study · {p.status}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    <div style={{ fontSize: 76, fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1.05, maxWidth: 1000 }}>
                        {p.title}
                    </div>
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                        {p.techStack.slice(0, 5).map(t => (
                            <div
                                key={t}
                                style={{
                                    display: "flex",
                                    padding: "8px 18px",
                                    borderRadius: 12,
                                    border: "1px solid rgba(255,255,255,0.14)",
                                    background: "#121216",
                                    fontSize: 24,
                                    color: "#C7D2FE",
                                }}
                            >
                                {t}
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ display: "flex", fontSize: 26, color: "#AEB1BB" }}>
                    {contact.name} — {headline}
                </div>
            </div>
        ),
        { ...size, fonts: await geistFonts() }
    );
}
