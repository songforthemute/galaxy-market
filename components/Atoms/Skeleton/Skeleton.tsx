// types
import type { FC, ReactNode } from "react";
// utils
import { booleanCls, cls } from "@libs/client";
// styles
import s from "./Skeleton.module.css";

interface Props {
    children?: ReactNode;
    className?: string;
    show?: boolean;
    width?: number;
    height?: number;
}

const Skeleton: FC<Props> = ({
    className = "",
    show = true,
    width,
    height,
    children,
}) => {
    const shouldAutosizing = !!children && !(width || height);

    return (
        <div
            className={cls(
                className,
                booleanCls(show, s.show, s.disappeared),
                booleanCls(shouldAutosizing, s.wrapper)
            )}
        >
            {children}
        </div>
    );
};

export default Skeleton;
