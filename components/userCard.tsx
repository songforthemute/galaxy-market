import Link from "next/link";
import { cls } from "../libs/util";

interface UserCardProps {
    text: string;
    username: string;
    avatarUrl?: string;
    href: string;
    type?: "message" | "profile"; // default: "profile"

    isLarge?: boolean;
    hasBorder?: boolean;
    [key: string]: any;
}

const UserCard = ({
    text = "",
    username,
    avatarUrl, // 차후에 이미지 링킹
    href,
    type = "profile",
    isLarge = false,

    hasBorder,
    ...properties
}: UserCardProps) => {
    return (
        <div
            className={cls(
                "px-4",
                type === "message"
                    ? "cursor-pointer transition-all hover:opacity-50 p-4"
                    : "flex py-4 items-center space-x-4 mt-2",
                hasBorder ? "border-y" : ""
            )}
        >
            <Link href={href}>
                <a className="flex items-center space-x-4 cursor-pointer hover:opacity-50 transition-all">
                    <div
                        className={cls(
                            "rounded-full bg-slate-400",
                            isLarge ? "w-16 h-16" : "w-12 h-12"
                        )}
                    />
                    <div>
                        <p
                            className={cls(
                                type === "message"
                                    ? "text-xs text-gray-400"
                                    : isLarge
                                    ? "text-md font-semibold text-gray-700"
                                    : "text-sm font-medium text-gray-700"
                            )}
                        >
                            {username}
                        </p>
                        <p
                            className={cls(
                                "font-medium",
                                type === "message"
                                    ? "text-sm text-gray-700"
                                    : isLarge
                                    ? "text-sm text-gray-400"
                                    : "text-xs text-gray-400"
                            )}
                        >
                            {text}
                        </p>
                    </div>
                </a>
            </Link>
        </div>
    );
};

export default UserCard;
