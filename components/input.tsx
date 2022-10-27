import { cls } from "@libs/client/util";
import React, { useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
    label: string;
    name: string;
    type?: "text" | "phone" | "price" | "email" | "password";
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    register?: UseFormRegisterReturn; // no undefined
    [key: string]: any;
}

const Input = ({
    label,
    name,
    type = "text",
    register,
    disabled = false,
    required,
    placeholder,
    ...properties
}: InputProps) => {
    const [isShow, setIsShow] = useState(false);
    const _onClickIsShow = () => setIsShow((prev) => !prev);

    return (
        <div className="my-4">
            <label
                htmlFor={name}
                className="text-sm font-medium text-slate-400 block mb-1"
            >
                {label}
            </label>

            {/* 타입별 && 분기 */}
            {type === "text" && (
                <div className="rounded-md shadow-md relative flex items-center my-2">
                    <input
                        id={name}
                        type={type}
                        placeholder={placeholder}
                        required={required}
                        className="appearance-none w-full px-4 py-2 border border-transparent rounded-md placeholder-slate-400 focus:outline-none focus:ring-purple-400 focus:border-purple-400 hover:bg-slate-50 focus:bg-white"
                        {...register}
                        {...properties}
                    />
                </div>
            )}

            {type === "email" && (
                <div className="rounded-md shadow-md relative flex items-center my-2">
                    <input
                        disabled={disabled}
                        id={name}
                        type={type}
                        placeholder={placeholder}
                        required={required}
                        className={cls(
                            "appearance-none w-full px-4 py-2 border border-transparent rounded-md placeholder-slate-400",
                            disabled
                                ? "bg-slate-100"
                                : "focus:outline-none focus:ring-purple-400 focus:border-purple-400 hover:bg-slate-50 focus:bg-white"
                        )}
                        {...register}
                        {...properties}
                    />
                </div>
            )}

            {type === "password" && (
                <div className="rounded-md shadow-md relative flex items-center my-2">
                    <input
                        id={name}
                        type={isShow ? "text" : "password"}
                        placeholder={placeholder}
                        required={required}
                        className="appearance-none w-full px-4 py-2 border border-transparent rounded-md placeholder-slate-400 focus:outline-none focus:ring-purple-400 focus:border-purple-400 hover:bg-slate-50 focus:bg-white"
                        minLength={4}
                        maxLength={16}
                        {...register}
                        {...properties}
                    />
                    <div
                        onClick={_onClickIsShow}
                        className="absolute right-0 pr-4 flex items-center justify-center cursor-pointer text-slate-400 hover:text-purple-400"
                    >
                        {isShow ? (
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                            </svg>
                        )}
                    </div>
                </div>
            )}

            {type === "price" && (
                <div className="rounded-md  shadow-md relative flex items-center my-2">
                    <div className="absolute left-0 pl-4 flex items-center justify-center pointer-events-none">
                        <span className="text-slate-400 text-base">￦</span>
                    </div>
                    <input
                        id={name}
                        type="number"
                        placeholder={placeholder || "0"}
                        required={required}
                        className="appearance-none w-full pl-8 px-4 py-2 border border-transparent rounded-md placeholder-slate-400 focus:outline-none focus:ring-purple-400 focus:border-purple-400 hover:bg-slate-50 focus:bg-white"
                        {...register}
                        {...properties}
                    />
                    <div className="absolute right-0 pr-4 flex items-center pointer-events-none">
                        <span className="text-slate-400">KRW</span>
                    </div>
                </div>
            )}

            {type === "phone" && (
                <div className="flex rounded-md shadow-md my-2">
                    <span className="flex items-center justify-center px-4 rounded-l-md border border-r-0 border-transparent bg-slate-50 text-slate-400 select-none">
                        010
                    </span>
                    <input
                        placeholder={placeholder}
                        id={name}
                        className="appearance-none w-full px-4 py-2 border border-transparent rounded-r-md placeholder-slate-400 focus:outline-none focus:ring-purple-400 focus:border-purple-400 hover:bg-slate-50 focus:bg-white"
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
