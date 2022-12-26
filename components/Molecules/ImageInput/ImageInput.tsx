// types
import type { FC, KeyboardEvent, ReactNode } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface Props {
    id?: string;
    children?: ReactNode | string | any;
    register: UseFormRegisterReturn;
    className?: string;
    tabIndex?: number;
    onKeyDown?: (event: KeyboardEvent) => void;
}

const ImageInput: FC<Props> = ({
    id,
    children,
    register,
    className,
    tabIndex,
    onKeyDown,
}) => {
    return (
        <label
            onKeyDown={onKeyDown}
            tabIndex={tabIndex}
            htmlFor={id}
            className={className}
        >
            {children}
            <input
                id={id}
                className="hidden"
                type={"file"}
                accept="image/*"
                {...register}
            />
        </label>
    );
};

export default ImageInput;
