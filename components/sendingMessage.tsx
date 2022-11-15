import { UseFormRegisterReturn } from "react-hook-form";
import { cls } from "@libs/client/util";
import React from "react";

interface SendingProps {
    placeholder?: string;
    register?: UseFormRegisterReturn;
    children: React.ReactNode;
    required?: boolean;
    isLoading?: boolean;
}

const Sending = ({
    placeholder = "메시지를 입력해주세요.",
    required = false,
    register,
    children,
    isLoading = false,
}: SendingProps) => {
    return (
        <div className="fixed w-full mx-auto max-w-md bottom-4 inset-x-0">
            <div className="flex mx-2.5 items-center relative">
                <input
                    required={required}
                    {...register}
                    type="text"
                    placeholder={placeholder}
                    className="shadow-md rounded-full w-full border-slate-400 pr-12
                    focus:ring-purple-400 focus:outline-none focus:border-purple-400
                    hover:border-purple-400 hover:bg-purple-50 transition-colors"
                />
                <div className="absolute inset-y-0 flex py-1.5 px-1.5 right-0">
                    <button
                        className={cls(
                            "aspect-square flex items-center bg-purple-400 rounded-full p-2 text-sm text-white transition-all hover:bg-purple-700 cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-purple-700 focus:bg-purple-700",
                            isLoading ? "animate-spin" : ""
                        )}
                    >
                        {children}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sending;
