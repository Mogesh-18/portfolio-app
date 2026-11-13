import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// The action reads the client IP from request headers
let ip = "203.0.113.1";
vi.mock("next/headers", () => ({
    headers: async () => new Headers({ "x-forwarded-for": `${ip}, 10.0.0.1` }),
}));

const { sendContact, revealPhone } = await import("@/components/features/contact/actions");
const { contact } = await import("@/data/resume");

const idle = { status: "idle" as const };
let ipCounter = 0;

function form(fields: Record<string, string>) {
    const fd = new FormData();
    for (const [k, v] of Object.entries(fields)) fd.set(k, v);
    return fd;
}

const valid = () => ({
    name: "Jane Doe",
    email: "jane@example.com",
    message: "Hello! I'd like to talk about a project.",
    started: String(Date.now() - 10_000),
});

describe("sendContact (Server Action)", () => {
    let fetchMock: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        ip = `203.0.113.${++ipCounter}`; // fresh IP per test, so the rate limit doesn't leak between tests
        vi.stubEnv("RESEND_API_KEY", "re_test");
        fetchMock = vi.fn(async () => new Response("{}", { status: 200 }));
        vi.stubGlobal("fetch", fetchMock);
    });

    afterEach(() => {
        vi.unstubAllEnvs();
        vi.unstubAllGlobals();
    });

    it("sends a valid message via Resend", async () => {
        const res = await sendContact(idle, form(valid()));
        expect(res.status).toBe("success");
        expect(fetchMock).toHaveBeenCalledOnce();
        const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
        expect(url).toBe("https://api.resend.com/emails");
        const body = JSON.parse(String(init.body));
        expect(body.reply_to).toBe("jane@example.com");
        expect(body.subject).toBe("Portfolio enquiry from Jane Doe");
    });

    it("silently 'succeeds' for bots that fill the honeypot, without sending", async () => {
        const res = await sendContact(idle, form({ ...valid(), cf_trap: "spam" }));
        expect(res.status).toBe("success");
        expect(fetchMock).not.toHaveBeenCalled();
    });

    it("rejects forms submitted too quickly, keeping the typed values", async () => {
        const res = await sendContact(idle, form({ ...valid(), started: String(Date.now()) }));
        expect(res.status).toBe("error");
        expect(res.values?.message).toContain("Hello");
        expect(fetchMock).not.toHaveBeenCalled();
    });

    it("validates every field and echoes the values back", async () => {
        const res = await sendContact(idle, form({ ...valid(), name: "", email: "not-an-email", message: "hi" }));
        expect(res.status).toBe("error");
        expect(Object.keys(res.errors ?? {}).sort()).toEqual(["email", "message", "name"]);
        expect(res.values?.email).toBe("not-an-email");
        expect(fetchMock).not.toHaveBeenCalled();
    });

    it("strips line breaks from the name before it reaches the subject", async () => {
        await sendContact(idle, form({ ...valid(), name: "Jane\r\nBcc: victim@example.com" }));
        const body = JSON.parse(String((fetchMock.mock.calls[0] as [string, RequestInit])[1].body));
        expect(body.subject).not.toMatch(/[\r\n]/);
    });

    it("rate-limits an IP after 5 messages", async () => {
        for (let i = 0; i < 5; i++) expect((await sendContact(idle, form(valid()))).status).toBe("success");
        const res = await sendContact(idle, form(valid()));
        expect(res.status).toBe("error");
        expect(res.message).toMatch(/too many/i);
        expect(fetchMock).toHaveBeenCalledTimes(5);
    });

    it("reports a failure when Resend errors, keeping the values", async () => {
        vi.spyOn(console, "error").mockImplementation(() => {});
        fetchMock.mockResolvedValueOnce(new Response("bad key", { status: 401 }));
        const res = await sendContact(idle, form(valid()));
        expect(res.status).toBe("error");
        expect(res.values?.name).toBe("Jane Doe");
    });

    it("explains when the form isn't configured", async () => {
        vi.stubEnv("RESEND_API_KEY", "");
        const res = await sendContact(idle, form(valid()));
        expect(res.status).toBe("error");
        expect(fetchMock).not.toHaveBeenCalled();
    });
});

describe("revealPhone (Server Action)", () => {
    beforeEach(() => { ip = `198.51.100.${++ipCounter}`; });

    it("returns the number plus a dialable tel: value", async () => {
        const res = await revealPhone();
        expect(res).toEqual({ ok: true, display: contact.phone, tel: contact.phone.replace(/[^\d+]/g, "") });
    });

    it("rate-limits per IP, separately from the contact form", async () => {
        for (let i = 0; i < 5; i++) expect((await revealPhone()).ok).toBe(true);
        expect((await revealPhone()).ok).toBe(false);
    });
});
