import dynamic from "next/dynamic";
// types
import type { InputProps } from "@components/Atoms/Input/Input";
import type { UseFormRegisterReturn } from "react-hook-form";
// utils
import { booleanCls } from "@libs/client/util";
// styles
import s from "./TextInput.module.css";
// components
import { Check, Close, Input, Label, ErrorMessage } from "@components/Atoms";

interface Props extends InputProps {
    id: string;
    placeholder?: string;
    type?: "email" | "text" | string;
    label?: string;
    error?: string;
    register?: UseFormRegisterReturn;
}

const TextInput = ({
    id,
    label,
    placeholder,
    type = "text",
    register,
    required = false,
    disabled = false,
    error,
}: Props) => {
    return (
        <div className={s.root}>
            <Label htmlFor={id}>{label}</Label>
            <Input
                id={id}
                type={type}
                className={s.input}
                register={register}
                required={required}
                disabled={disabled}
                placeholder={placeholder}
            />

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

export default TextInput;
