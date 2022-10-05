import type { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
    label: string;
    name: string;
    type?: "text" | "phone" | "price" | "email";
    placeholder?: string;
    required?: boolean;
    register?: UseFormRegisterReturn; // no undefined
    [key: string]: any;
}

const Input = ({
    label,
    name,
    type = "text",
    register,
    required,
    placeholder,
    ...properties
}: InputProps) => {
    return (
        <div className="my-4">
            <label
                htmlFor={name}
                className="text-sm font-medium text-gray-400 block mb-1"
            >
                {label}
            </label>

            {/* 타입별 && 분기 */}
            {(type === "text" || type === "email") && (
                <div className="rounded-md shadow-md relative flex items-center my-2">
                    <input
                        id={name}
                        type={type}
                        placeholder={placeholder}
                        required={required}
                        className="appearance-none w-full px-4 py-2 border border-transparent rounded-md placeholder-gray-400 focus:outline-none focus:ring-purple-400 focus:border-purple-400 hover:bg-gray-50 focus:bg-white"
                        {...register}
                        {...properties}
                    />
                </div>
            )}

            {type === "price" && (
                <div className="rounded-md  shadow-md relative flex items-center my-2">
                    <div className="absolute left-0 pl-4 flex items-center justify-center pointer-events-none">
                        <span className="text-gray-400 text-base">￦</span>
                    </div>
                    <input
                        id={name}
                        type="number"
                        placeholder={placeholder || "0"}
                        required={required}
                        className="appearance-none w-full pl-8 px-4 py-2 border border-transparent rounded-md placeholder-gray-400 focus:outline-none focus:ring-purple-400 focus:border-purple-400 hover:bg-gray-50 focus:bg-white"
                        {...register}
                        {...properties}
                    />
                    <div className="absolute right-0 pr-4 flex items-center pointer-events-none">
                        <span className="text-gray-400">KRW</span>
                    </div>
                </div>
            )}

            {type === "phone" && (
                <div className="flex rounded-md shadow-md my-2">
                    <span className="flex items-center justify-center px-4 rounded-l-md border border-r-0 border-transparent bg-gray-50 text-gray-400 select-none">
                        010
                    </span>
                    <input
                        placeholder={placeholder}
                        id={name}
                        className="appearance-none w-full px-4 py-2 border border-transparent rounded-r-md placeholder-gray-400 focus:outline-none focus:ring-purple-400 focus:border-purple-400 hover:bg-gray-50 focus:bg-white"
                        type="number"
                        {...register}
                        {...properties}
                        required={required}
                    />
                </div>
            )}
        </div>
    );
};

export default Input;
