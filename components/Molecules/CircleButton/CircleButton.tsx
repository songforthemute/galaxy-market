// types
import type { FC, ReactNode } from "react";
// styles
import s from "./CircleButton.module.css";
// utils
import { cls } from "@libs/client/util";

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
