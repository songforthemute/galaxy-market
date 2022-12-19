// types
import type { InputHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
// utils
import { booleanCls, cls } from "@libs/client/util";
// css
import s from "./Input.module.css";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    register?: UseFormRegisterReturn;
    required?: boolean;
    disabled?: boolean;
    type?: "text" | "tel" | "email" | "password" | string;
    placeholder?: string;
}

const Input = ({
    className = "",
    register,
    required = false,
    disabled = false,
    type = "text",
    placeholder,
    ...rest
}: InputProps) => {
    return (
        <input
            className={cls(
                className,
                s.root,
                booleanCls(disabled, s.disabled, s.abled)
            )}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            required={required}
            disabled={disabled}
            placeholder={placeholder}
            type={type}
            {...register}
            {...rest}
        />
    );
};

export default Input;
