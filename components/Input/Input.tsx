// types
import type { FC, InputHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
// utils
import { booleanCls, cls } from "@libs/client/util";
// css
import s from "./Input.module.css";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    register?: UseFormRegisterReturn;
    required?: boolean;
    disabled?: boolean;
    type?: "text" | "phone" | "price" | "email" | "password" | string;
}

const Input: FC<Props> = ({
    className = "",
    register,
    required = false,
    disabled = false,
    type = "text",
    ...rest
}) => {
    return (
        <input
            className={cls(className, s.root, booleanCls(disabled, s.disabled))}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            required={required}
            disabled={disabled}
            type={type}
            {...register}
            {...rest}
        />
    );
};

export default Input;
