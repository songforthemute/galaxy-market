import { useState } from "react";
// types
import type { InputProps } from "@components/Atoms/Input/Input";
import type { UseFormRegisterReturn } from "react-hook-form";
// utils
import { booleanCls } from "@libs/client/util";
// styles
import s from "./PasswordInput.module.css";
// components
import {
    Check,
    Close,
    Eye,
    EyeSlash,
    Input,
    Label,
    ErrorMessage,
} from "@components/Atoms";

interface Props extends InputProps {
    id: string;
    placeholder?: string;
    label?: string;
    error?: string;
    register?: UseFormRegisterReturn;
}

const PasswordInput = ({
    id,
    label,
    placeholder,
    register,
    required = false,
    disabled = false,
    error,
}: Props) => {
    const [hide, setHide] = useState(false);

    return (
        <div className={s.root}>
            <Label htmlFor={id}>{label}</Label>
            <Input
                id={id}
                className={s.input}
                register={register}
                required={required}
                disabled={disabled}
                type={hide ? "text" : "password"}
                placeholder={placeholder}
            />

            {/* pw hide & show */}
            <span onClick={() => setHide((prev) => !prev)} className={s.hide}>
                {hide ? (
                    <EyeSlash strokeWidth={1.75} />
                ) : (
                    <Eye strokeWidth={1.75} />
                )}
            </span>

            {/* error indicator */}
            <span className={booleanCls(!!error, s.error, s.check)}>
                {!!error ? (
                    <Close strokeWidth={1.75} />
                ) : (
                    <Check strokeWidth={1.75} />
                )}
            </span>

            {!!error && <ErrorMessage>{error}</ErrorMessage>}
        </div>
    );
};

export default PasswordInput;
