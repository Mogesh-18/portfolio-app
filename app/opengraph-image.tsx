import { ImageResponse } from "next/og";
import { contact, primaryStack, yearsOfExperience } from "@/data/resume";
import { geistFonts } from "@/lib/og-fonts";

export const alt = `${contact.name} — ${contact.title} & Technical Lead`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
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
                    backgroundImage: "radial-gradient(circle at 85% 0%, rgba(99,102,241,0.32) 0%, transparent 55%)",
                    color: "#F2F3F8",
                    fontFamily: "Geist",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "#AEB1BB" }}>
                    <div style={{ width: 14, height: 14, borderRadius: 99, background: "#10B981" }} />
                    {contact.availability}
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ fontSize: 120, fontWeight: 600, letterSpacing: "-0.05em", lineHeight: 1 }}>
                        {contact.firstName}
                    </div>
                    <div style={{ fontSize: 120, fontWeight: 600, letterSpacing: "-0.05em", lineHeight: 1, color: "#929EFE" }}>
                        {contact.lastName}
                    </div>
                    <div style={{ marginTop: 28, fontSize: 38, fontWeight: 400, color: "#D4D6DE" }}>
                        {`${contact.title} & Technical Lead · ${yearsOfExperience}+ years`}
                    </div>
                </div>

                <div style={{ display: "flex", gap: 14 }}>
                    {primaryStack.map(s => (
                        <div
                            key={s}
                            style={{
                                display: "flex",
                                padding: "10px 22px",
                                borderRadius: 12,
                                border: "1px solid rgba(255,255,255,0.14)",
                                background: "#121216",
                                fontSize: 26,
                                color: "#C7D2FE",
                            }}
                        >
                            {s}
                        </div>
                    ))}
                </div>
            </div>
        ),
        { ...size, fonts: await geistFonts() }
    );
}
