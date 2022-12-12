// types
import type { FC, ReactNode } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface Props {
    id?: string;
    children?: ReactNode | string | any;
    register: UseFormRegisterReturn;
    className?: string;
}

const ImageInput: FC<Props> = ({ id, children, register, className }) => {
    return (
        <label htmlFor={id} className={className}>
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
