import type { IconProps } from "./iconProps";

const Close = ({ w = 6, h = 6, className, strokeWidth = 1.5 }: IconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className={`w-${w} h-${h} ${className}`}
            strokeWidth={strokeWidth}
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
            />
        </svg>
    );
};

export default Close;
