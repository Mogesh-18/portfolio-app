import { ImageResponse } from "next/og";
import { geistFonts } from "@/lib/og-fonts";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon: "M." monogram on the accent colour */
export default async function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#4F46E5",
                    borderRadius: 14,
                    color: "#FFFFFF",
                    fontFamily: "Geist",
                    fontSize: 42,
                    fontWeight: 600,
                    letterSpacing: "-0.05em",
                }}
            >
                M<span style={{ color: "#C7D2FE" }}>.</span>
            </div>
        ),
        { ...size, fonts: await geistFonts() }
    );
}
