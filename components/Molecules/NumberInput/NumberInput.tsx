import { Input, Label } from "@components/Atoms";
// types
import type { ReactNode, FC } from "react";
import type { InputProps } from "@components/Atoms/Input/Input";
// styles
import s from "./NumberInput.module.css";

interface Props extends InputProps {
    type?: "number" | "tel";
    id: string;
    children?: ReactNode | string | any;
    placeholder?: string;
    heading: string;
}

const NumberInput: FC<Props> = ({
    id,
    heading,
    type = "number",
    placeholder,
    children,
    register,
    required = false,
    disabled = false,
    ...rest
}) => {
    return (
        <div className={s.root}>
            <Label htmlFor={id}>{children}</Label>
            <Input
                id={id}
                className={s.input}
                register={register}
                required={required}
                disabled={disabled}
                type={type}
                placeholder={placeholder}
                {...rest}
            />
            <span className={s.heading}>{heading}</span>
            {children}
        </div>
    );
};

export default NumberInput;
