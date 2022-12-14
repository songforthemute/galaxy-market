import type { FC, ReactNode } from "react";
import { booleanCls, cls } from "@libs/client/util";
import s from "./Badge.module.css";

interface Props {
    children?: ReactNode | string | any;
    onClick?: () => void;
    className?: string;
    active?: boolean;
    disabled?: boolean;
}

const Badge: FC<Props> = ({
    children,
    onClick,
    className = "",
    active = false,
    disabled = false,
}) => {
    return (
        <span
            className={cls(
                s.root,
                className,
                booleanCls(active, s.active, s.nonactive),
                booleanCls(!disabled, s.abled)
            )}
            onClick={onClick}
        >
            {children}
        </span>
    );
};

export default Badge;
