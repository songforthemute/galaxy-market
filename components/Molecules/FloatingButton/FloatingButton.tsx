import { Anchor } from "@components/Atoms";
// types
import type { FC, ReactNode } from "react";
// utils
import { cls } from "@libs/client/util";
// styles
import s from "./FloatingButton.module.css";

interface Props {
    children?: ReactNode | any;
    className?: string;
    onClick?: () => void;
}

const FloatingButton: FC<Props> = ({ children, className = "", onClick }) => {
    return (
        <button onClick={onClick}>
            <div className={cls(className, s.root)}>{children}</div>
        </button>
    );
};

export default FloatingButton;
