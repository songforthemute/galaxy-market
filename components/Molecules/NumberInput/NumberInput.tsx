// types
import type { InputProps } from "@components/Atoms/Input/Input";
// utils
import { booleanCls } from "@libs/client";
// styles
import s from "./NumberInput.module.css";
// components
import { Check, Close, Input, Label, ErrorMessage } from "@components/Atoms";

interface Props extends InputProps {
    type?: "number" | "tel";
    id: string;
    placeholder?: string;
    label?: string;
    heading: string;
    error?: string;
}

const NumberInput = ({
    id,
    label,
    heading,
    type = "number",
    placeholder,
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
                className={s.input}
                register={register}
                required={required}
                disabled={disabled}
                type={type}
                placeholder={placeholder}
            />
            <span className={s.heading}>{heading}</span>

            {/* error indicator */}
            {disabled === false && (
                <span className={booleanCls(!!error, s.error, s.check)}>
                    {!!error ? (
                        <Close strokeWidth={1.75} />
                    ) : (
                        <Check strokeWidth={1.75} />
                    )}
                </span>
            )}

            {!!error && <ErrorMessage>{error}</ErrorMessage>}
        </div>
    );
};

export default NumberInput;
