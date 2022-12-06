import type { ReactNode, FC } from "react";
import { cls } from "@libs/client/util";

interface Props {
    className?: string;
    children?: ReactNode | any;
}

const Container: FC<Props> = ({ className = "", children }) => {
    return (
        <div className={cls("mx-auto p-4 w-full", className)}>{children}</div>
    );
};

export default Container;
