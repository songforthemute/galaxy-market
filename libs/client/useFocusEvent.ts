import type { KeyboardEvent } from "react";

type target = "itself" | "parent";

const useFocusEvent = (target: target = "parent") => {
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
