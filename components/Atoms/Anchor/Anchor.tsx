import Link from "next/link";
import type { LinkProps } from "next/link";
import type { FC, ReactNode } from "react";

interface Props extends LinkProps {
    children?: ReactNode;
    className?: string;
    tabIndex?: number;
    onKeyDown?: (e: any) => void;
}

const Anchor: FC<Props> = ({
    href,
    children,
    className,
    tabIndex,
    onKeyDown,
    ...rest
}) => {
    return (
        <Link href={href}>
            <a
                onKeyDown={onKeyDown}
                className={className}
                tabIndex={tabIndex}
                {...rest}
            >
                {children}
            </a>
        </Link>
    );
};

export default Anchor;
