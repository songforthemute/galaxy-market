// types
import type { FC } from "react";
// utils
import { cls } from "@libs/client/util";
// css
import s from "./ErrorMessage.module.css";

interface Props {
    payload: string;
    className?: string;
}

const ErrorMessage: FC<Props> = ({ payload, className = "" }) => {
    return <span className={cls(s.root, className)}>{payload}</span>;
};

export default ErrorMessage;
