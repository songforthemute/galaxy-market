import { cls } from "@libs/client/util";

interface BadgeProps {
    text: string;
    isLarge?: boolean;
}

const Badge = ({ text, isLarge = false }: BadgeProps) => {
    return (
        <span
            className={cls(
                "my-2.5",
                "inline-flex ml-4 items-center px-2 py-1 rounded-full font-medium bg-slate-100 text-slate-700",
                isLarge ? "text-sm" : "text-xs"
            )}
        >
            {text}
        </span>
    );
};

export default Badge;
