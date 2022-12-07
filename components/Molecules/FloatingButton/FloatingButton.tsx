import { Anchor } from "@components/Atoms";
// types
import type { FC, ReactNode } from "react";
// utils
import { cls } from "@libs/client/util";
// styles
import s from "./FloatingButton.module.css";

interface Props {
    href: string;
    children?: ReactNode | any;
    className?: string;
}

const FloatingButton: FC<Props> = ({ children, className = "", href }) => {
    return (
        <Anchor href={href}>
            <div className={cls(className, s.root)}>{children}</div>
        </Anchor>
    );
};

export default FloatingButton;
