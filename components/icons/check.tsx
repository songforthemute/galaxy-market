import type { IconProps } from "./iconProps";

const Check = ({ w = 6, h = 6, className, strokeWidth = 1.5 }: IconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            className={`w-${w} h-${h} ${className}`}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
            />
        </svg>
    );
};

export default Check;
