// types
import type { FC, ReactNode } from "react";
// utils
import { cls } from "@libs/client";
// styles
import s from "./FloatingAnchor.module.css";
// components
import { Anchor } from "@components/Atoms";

interface Props {
    children?: ReactNode | any;
    className?: string;
    href: string;
    tabIndex?: number;
    ariaLabel?: string;
}

const FloatingAnchor: FC<Props> = ({
    children,
    className = "",
    href,
    tabIndex = 0,
    ariaLabel = "Floating Anchor Button",
}) => {
    return (
        <Anchor
            aria-label={ariaLabel}
            tabIndex={tabIndex}
            className={cls(className, s.root)}
            href={href}
        >
            {children}
        </Anchor>
    );
};

export default FloatingAnchor;
