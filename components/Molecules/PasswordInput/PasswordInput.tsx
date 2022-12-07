import { Eye, EyeSlash, Input, Label } from "@components/Atoms";
// types
import type { FC, ReactNode } from "react";
import type { InputProps } from "@components/Atoms/Input/Input";
// styles
import s from "./PasswordInput.module.css";

interface Props extends InputProps {
    id: string;
    children?: ReactNode | string | any;
    inputClassName?: string;
    placeholder?: string;
    hide: boolean;
    onClick: () => void;
}

const PasswordInput: FC<Props> = ({
    className = "",
    inputClassName = "",
    id,
    placeholder,
    children,
    hide,
    register,
    required = false,
    disabled = false,
    onClick,
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
                type={hide ? "text" : "password"}
                placeholder={placeholder}
                {...rest}
            />
            <button onClick={onClick} className={s.hide}>
                {hide ? (
                    <EyeSlash strokeWidth={1.75} />
                ) : (
                    <Eye strokeWidth={1.75} />
                )}
            </button>
        </div>
    );
};

export default PasswordInput;
