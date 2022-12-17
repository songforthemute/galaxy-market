import type { IconProps } from "./iconProps";

const HorizontalDots = ({
    w = 6,
    h = 6,
    className,
    strokeWidth = 1.5,
}: IconProps) => {
    return (
        <svg
            className={`w-${w} h-${h} ${className}`}
            strokeWidth={strokeWidth}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
        </svg>
    );
};

export default HorizontalDots;
