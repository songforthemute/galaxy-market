import Link from "next/link";
import type { LinkProps } from "next/link";
import type { FC, ReactNode } from "react";

interface Props extends LinkProps {
    children?: ReactNode;
    className?: string;
    [key: string]: any;
}

const Anchor: FC<Props> = ({ href, children, className, ...props }) => {
    return (
        <Link href={href}>
            <a className={className} {...props}>
                {children}
            </a>
        </Link>
    );
};

export default Anchor;
