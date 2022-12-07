import { Input, Label } from "@components/Atoms";
// types
import type { FC, ReactNode } from "react";
import type { InputProps } from "@components/Atoms/Input/Input";

interface Props extends InputProps {
    id: string;
    children?: ReactNode | string | any;
    placeholder?: string;
}

const Textinput: FC<Props> = ({
    id,
    placeholder,
    children,
    register,
    required = false,
    disabled = false,
    ...rest
}) => {
    return (
        <div className="relative">
            <Label htmlFor={id}>{children}</Label>
            <Input
                id={id}
                className="px-4"
                register={register}
                required={required}
                disabled={disabled}
                placeholder={placeholder}
                {...rest}
            />
        </div>
    );
};

export default Textinput;
