import { ImageResponse } from "next/og";
import { geistFonts } from "@/lib/og-fonts";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
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
                    color: "#FFFFFF",
                    fontFamily: "Geist",
                    fontSize: 116,
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
