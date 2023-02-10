import type { KeyboardEvent } from "react";

type target = "itself" | "parent";

/**
 * @description Return keydown event handler function for transferring href when accessnig focused element
 * @param {"itself" | "parent"} target A target to access.
 * @returns {{ onKeyDownEnter: (e: KeyboardEvent) => void }}
 */
const useFocusEvent = (
    target: target = "parent"
): { onKeyDownEnter: (e: KeyboardEvent) => void } => {
    let onKeyDownEnter: (e: KeyboardEvent) => void;

    if (target === "itself") {
        onKeyDownEnter = (e: KeyboardEvent) => {
            if (e.code === "Enter") {
                e.currentTarget.firstElementChild?.parentElement?.click();
            }
        };
    } else {
        onKeyDownEnter = (e: KeyboardEvent) => {
            if (e.code === "Enter") {
                e.currentTarget.parentElement?.click();
            }
        };
    }

    return { onKeyDownEnter };
};

export default useFocusEvent;
