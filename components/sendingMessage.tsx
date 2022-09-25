import React from "react";

interface SendingProps {
    placeholder?: string;
    icon?: React.ReactNode | "→";
}

const Sending = ({
    placeholder = "Write here sending message...",
    icon = "→",
}: SendingProps) => {
    return (
        <div className="fixed w-full mx-auto max-w-md bottom-4 inset-x-0">
            <div className="flex items-center relative">
                <input
                    type="text"
                    placeholder={placeholder}
                    className="shadow-md rounded-full w-full border-gray-400 pr-12
                    focus:ring-purple-400 focus:outline-none focus:border-purple-400
                    hover:border-purple-400 hover:bg-purple-50 transition-colors"
                />
                <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
                    <button
                        className="flex items-center bg-purple-400 rounded-full p-2 text-sm text-white transition-all 
                    hover:bg-purple-700 cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-purple-700 focus:bg-purple-700"
                    >
                        {icon}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sending;
