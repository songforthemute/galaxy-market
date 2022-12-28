// types
import type { FC, ReactNode } from "react";
// utils
import { cls } from "@libs/client";
// css
import s from "./ErrorMessage.module.css";

interface Props {
    className?: string;
    children?: ReactNode;
}

const ErrorMessage: FC<Props> = ({ children, className = "" }) => {
    return <span className={cls(s.root, className)}>{children}</span>;
};

export default ErrorMessage;
