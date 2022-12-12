import type { IconProps } from "./iconProps";

const Add = ({ w = 6, h = 6, className, strokeWidth = 1.5 }: IconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={`w-${w} h-${h} ${className}`}
            strokeWidth={strokeWidth}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
            />
        </svg>
    );
};

export default Add;
