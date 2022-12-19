import Link from "next/link";
import type { LinkProps } from "next/link";
import type { FC, ReactNode } from "react";

interface Props extends LinkProps {
    children?: ReactNode;
    className?: string;
    tabIndex?: number;
}

const Anchor: FC<Props> = ({
    href,
    children,
    className,
    tabIndex,
    ...rest
}) => {
    return (
        <Link href={href}>
            <a className={className} tabIndex={tabIndex} {...rest}>
                {children}
            </a>
        </Link>
    );
};

export default Anchor;
