/*
 * Content Security Policy.
 * - Pages are static, so nonces aren't possible (they'd force dynamic rendering);
 *   inline scripts (Next.js bootstrap, the no-flash theme script) need 'unsafe-inline'.
 *   Everything else is locked to this origin.
 * - Vercel Analytics / Speed Insights load from this origin (/_vercel/*).
 * - vercel.live + Pusher: the Vercel toolbar on preview deployments.
 * - Production only: `next dev` needs 'unsafe-eval' for React's debugging tools.
 */
const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://vercel.live",
    "style-src 'self' 'unsafe-inline' https://vercel.live",
    "img-src 'self' data: blob: https://vercel.live https://vercel.com",
    "font-src 'self' https://vercel.live https://assets.vercel.com",
    "connect-src 'self' https://vercel.live wss://ws-us3.pusher.com",
    "frame-src https://vercel.live",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
].join("; ");

const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
    poweredByHeader: false,
    async headers() {
        return [
            {
                source: "/:path*",
                headers: [
                    { key: "X-Content-Type-Options", value: "nosniff" },
                    { key: "X-Frame-Options", value: "DENY" },
                    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
                    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
                    // Browsers ignore HSTS on plain-http localhost, so this is safe locally
                    { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
                    ...(isProd ? [{ key: "Content-Security-Policy", value: csp }] : []),
                ],
            },
        ];
    },
};

export default nextConfig;
