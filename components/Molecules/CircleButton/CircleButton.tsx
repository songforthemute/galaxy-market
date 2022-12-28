// types
import type { FC, ReactNode } from "react";
// utils
import { cls } from "@libs/client";
// styles
import s from "./CircleButton.module.css";

interface Props {
    children?: ReactNode | any;
    className?: string;
    onClick?: () => void;
}

const CircleButton: FC<Props> = ({ children, className = "", onClick }) => {
    return (
        <button onClick={onClick} className={cls(s.root, className)}>
            {children}
        </button>
    );
};

export default CircleButton;
