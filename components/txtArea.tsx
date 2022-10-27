import { UseFormRegisterReturn } from "react-hook-form";

interface TxtAreaProps {
    placeholder?: string;
    name: string;
    label?: string;
    rows?: number;
    required?: boolean;
    register?: UseFormRegisterReturn; // no undefined
    [key: string]: any;
}

const TxtArea = ({
    placeholder,
    name,
    label,
    rows = 4,
    required = false,
    register,
    ...properties
}: TxtAreaProps) => {
    return (
        <div className="my-4">
            <label
                className="text-sm font-medium text-slate-400 block mb-1"
                htmlFor={name}
            >
                {label}
            </label>
            <textarea
                required={required}
                rows={rows}
                id={name}
                name={name}
                placeholder={placeholder}
                {...properties}
                {...register}
                className="mt-1 shadow-md w-full rounded-md border border-transparent
                focus:ring-purple-400 focus:border-purple-400 placeholder:text-slate-400"
            />
        </div>
    );
};

export default TxtArea;
