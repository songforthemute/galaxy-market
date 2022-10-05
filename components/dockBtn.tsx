import Link from "next/link";
import { cls } from "../libs/client/util";

interface DockBtnProps {
    children: React.ReactNode;
    text: string;
    href: string;
    isActive?: boolean;
}

const DockBtn = ({ children, text, href, isActive = false }: DockBtnProps) => {
    return (
        <Link href={href}>
            <a
                className={cls(
                    isActive ? "text-purple-400" : "",
                    "flex flex-col items-center space-y-2 cursor-pointer hover:opacity-50 transition-all"
                )}
            >
                {children}
                <span>{text}</span>
            </a>
        </Link>
    );
};

export default DockBtn;
