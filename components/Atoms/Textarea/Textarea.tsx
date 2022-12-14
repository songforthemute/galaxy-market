// types
import type { FC, TextareaHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
// utils
import { booleanCls, cls } from "@libs/client";
// styles
import s from "./Textarea.module.css";

export interface TextareaProps
    extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
    placeholder?: string;
    name?: string;
    register?: UseFormRegisterReturn;
    required?: boolean;
    disabled?: boolean;
    rows?: number;
}

const Textarea: FC<TextareaProps> = ({
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
