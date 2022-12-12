// types
import type { TextareaProps } from "@components/Atoms/Textarea/Textarea";
import type { UseFormRegisterReturn } from "react-hook-form";
// utils
import { booleanCls } from "@libs/client/util";
// styles
import s from "./TextareaWithLabel.module.css";
// components
import { Check, Close, Textarea, Label, ErrorMessage } from "@components/Atoms";

interface Props extends TextareaProps {
    id: string;
    placeholder?: string;
    label?: string;
    error?: string;
    register?: UseFormRegisterReturn;
}

const TextareaWithLabel = ({
    id,
    label,
    placeholder,
    register,
    required = false,
    disabled = false,
    error,
}: Props) => {
    return (
        <div className={s.root}>
            <Label htmlFor={id}>{label}</Label>
            <Textarea
                id={id}
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

export default TextareaWithLabel;
