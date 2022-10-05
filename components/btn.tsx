import { cls } from "@libs/client/util";

interface BtnProps {
    _onClick?: (params?: any) => void;
    text: string;
    isLarge?: boolean;
    [key: string]: any;
}

const Btn = ({ _onClick, text, isLarge = false, properties }: BtnProps) => {
    return (
        <button
            onClick={_onClick}
            {...properties}
            className={cls(
                "w-full my-4 bg-purple-400 hover:bg-purple-700 text-white py-2 px-4 border border-transparent rounded-md shadow-md focus:ring-2 focus:ring-offset-2 focus:ring-purple-400 focus:outline-none",
                isLarge ? "text-base font-medium" : "text-sm font-medium"
            )}
        >
            {text}
        </button>
    );
};

export default Btn;
