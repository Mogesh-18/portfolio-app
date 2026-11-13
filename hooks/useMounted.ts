import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * false during SSR and hydration, true afterwards. Use it to render values that
 * only exist in the browser (e.g. the resolved theme) without hydration mismatches.
 */
export function useMounted() {
    return useSyncExternalStore(subscribe, () => true, () => false);
}
