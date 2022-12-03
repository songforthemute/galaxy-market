// types
import type { FC, TextareaHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
// utils
import { booleanCls, cls } from "@libs/client/util";
// css
import s from "./Textarea.module.css";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
    placeholder?: string;
    name?: string;
    register?: UseFormRegisterReturn;
    required?: boolean;
    disabled?: boolean;
    rows?: number;
}

const Textarea: FC<Props> = ({
    className = "",
    placeholder,
    name,
    register,
    required = false,
    disabled = false,
    rows = 4,
    ...rest
}) => {
    return (
        <textarea
            className={cls(className, s.root, booleanCls(disabled, s.disabled))}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            name={name}
            rows={rows}
            {...register}
            {...rest}
        />
    );
};

export default Textarea;
