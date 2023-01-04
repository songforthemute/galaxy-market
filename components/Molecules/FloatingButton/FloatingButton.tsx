// types
import type { FC, ReactNode } from "react";
// utils
import { cls } from "@libs/client";
// styles
import s from "./FloatingButton.module.css";

interface Props {
    children?: ReactNode | any;
    className?: string;
    onClick?: () => void;
    ariaLabel?: string;
}

const FloatingButton: FC<Props> = ({
    children,
    className = "",
    onClick,
    ariaLabel = "Floating Interact Button",
}) => {
    return (
        <button
            aria-label={ariaLabel}
            className={cls(className, s.root)}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default FloatingButton;
