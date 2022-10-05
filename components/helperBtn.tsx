import Link from "next/link";
import React from "react";
import { cls } from "../libs/client/util";

interface HelperBtnProps {
    href: string;
    children: React.ReactNode;
    [key: string]: any;
}

const HelperBtn = ({ href, children, ...properties }: HelperBtnProps) => {
    return (
        <Link href={href}>
            <a
                {...properties}
                className={cls(
                    "fixed bottom-28 right-4 shadow-xl border-transparent bg-purple-400 rounded-full p-4 text-white hover:bg-purple-700 transition-colors"
                )}
            >
                {children}
            </a>
        </Link>
    );
};

export default HelperBtn;
