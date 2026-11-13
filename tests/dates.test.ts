import { afterEach, describe, expect, it, vi } from "vitest";
import { formatRange, formatTenure, monthsBetween, yearsSince } from "@/lib/dates";

describe("dates", () => {
    afterEach(() => vi.useRealTimers());

    it("counts whole months between two YYYY-MM dates", () => {
        expect(monthsBetween("2022-06", "2022-06")).toBe(0);
        expect(monthsBetween("2022-06", "2023-05")).toBe(11);
        expect(monthsBetween("2022-06", "2026-11")).toBe(53);
        // Never negative, even if the end is before the start
        expect(monthsBetween("2024-01", "2023-01")).toBe(0);
    });

    it("measures open-ended ranges up to the current month", () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2026-11-15T12:00:00Z"));
        expect(monthsBetween("2022-06")).toBe(53);
        expect(yearsSince("2022-06")).toBe(4);
        expect(yearsSince("2022-12")).toBe(3);
    });

    it("formats tenure with correct singular/plural forms", () => {
        expect(formatTenure("2022-06", "2022-06")).toBe("0 mos");
        expect(formatTenure("2022-06", "2022-07")).toBe("1 mo");
        expect(formatTenure("2022-06", "2023-06")).toBe("1 yr");
        expect(formatTenure("2022-06", "2026-11")).toBe("4 yrs 5 mos");
    });

    it("formats date ranges, with Present for current roles", () => {
        expect(formatRange("2022-06", "2024-01")).toBe("June 2022 – January 2024");
        expect(formatRange("2022-06")).toBe("June 2022 – Present");
    });

    it("rejects malformed dates instead of rendering 'undefined'", () => {
        expect(() => formatRange("2022-13")).toThrow(/YYYY-MM/);
        expect(() => monthsBetween("2022-00", "2023-01")).toThrow(/YYYY-MM/);
        expect(() => monthsBetween("June 2022", "2023-01")).toThrow(/YYYY-MM/);
    });
});
