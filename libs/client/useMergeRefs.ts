import type { ForwardedRef, RefCallback } from "react";

const useMergeRefs = <T extends any>(
    ...refs: ForwardedRef<T>[]
): RefCallback<T> => {
    return (node: T) => {
        for (const ref of refs) {
            if (ref) {
                if (typeof ref === "function") ref(node);
                if ("current" in ref) ref.current = node;
            }
        }
    };
};

export default useMergeRefs;
