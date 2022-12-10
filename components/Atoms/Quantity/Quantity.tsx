// types
import type { FC, ReactNode } from "react";
// utils
import { cls } from "@libs/client/util";
// styles
import s from "./Quantity.module.css";

interface Props {
    children?: ReactNode | any;
    className?: string;
}

const Quantity: FC<Props> = ({ children, className = "" }) => {
    return <div className={cls(s.root, className)}>{children}</div>;
};

export default Quantity;
