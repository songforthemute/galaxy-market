import { cls } from "@libs/client/util";

interface BadgeProps {
    text: string;
    isLarge?: boolean;
    _onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
    isSelected?: boolean;
}

const Badge = ({ _onClick, isSelected, text, isLarge = false }: BadgeProps) => {
    return (
        <span
            onClick={_onClick ? _onClick : undefined}
            className={cls(
                "my-2.5",
                "inline-flex ml-4 text-center px-2.5 py-1 rounded-full font-medium",
                isLarge ? "text-sm" : "text-xs",
                _onClick
                    ? "hover:cursor-pointer hover:bg-purple-400 transition-all hover:text-white"
                    : "",
                isSelected
                    ? "bg-purple-400 text-white"
                    : "bg-slate-200 text-slate-700"
            )}
        >
            {text}
        </span>
    );
};

export default Badge;
