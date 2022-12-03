import type { FC, LabelHTMLAttributes } from "react";
import { cls } from "@libs/client/util";
import s from "./Label.module.css";

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
    className?: string;
}

const Label: FC<Props> = ({ children, className = "", ...rest }) => {
    return (
        <label className={cls(className, s.root)} {...rest}>
            {children}
        </label>
    );
};

export default Label;
