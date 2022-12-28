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
}

const FloatingAnchor: FC<Props> = ({
    children,
    className = "",
    href,
    tabIndex = 0,
}) => {
    return (
        <Anchor
            tabIndex={tabIndex}
            className={cls(className, s.root)}
            href={href}
        >
            {children}
        </Anchor>
    );
};

export default FloatingAnchor;
