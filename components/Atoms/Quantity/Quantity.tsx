// types
import type { FC, ReactNode } from "react";
// utils
import { cls } from "@libs/client/util";

interface Props {
    children?: ReactNode | any;
    className?: string;
    onClick?: () => void;
}

const Quantity: FC<Props> = ({ children, className = "", onClick }) => {
    return (
        <div
            className={cls("flex gap-x-1.5 items-center", className)}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default Quantity;
