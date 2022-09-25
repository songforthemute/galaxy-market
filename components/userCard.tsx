import Link from "next/link";
import { cls } from "../libs/util";

interface UserCardProps {
    text: string;
    username: string;
    avatarUrl?: string;
    link: string;
    type?: "message" | "profile"; // default: "profile"
    key?: number;
    hasBorder?: boolean;
    [key: string]: any;
}

const UserCard = ({
    text = "",
    username,
    avatarUrl, // 차후에 이미지 링킹
    link,
    type = "profile",
    key,
    hasBorder,
    ...properties
}: UserCardProps) => {
    return (
        <div
            className={cls(
                type === "message"
                    ? "cursor-pointer transition-all hover:opacity-50 p-4"
                    : "flex py-4 items-center space-x-4 mt-2",
                hasBorder ? "border-y" : ""
            )}
            key={type === "message" ? key : undefined}
        >
            <Link href={link}>
                <a className="flex items-center space-x-4 cursor-pointer hover:opacity-50 transition-all">
                    <div className="w-12 h-12 rounded-full bg-slate-400" />
                    <div>
                        <p
                            className={cls(
                                type === "message"
                                    ? "text-xs text-gray-400"
                                    : "text-sm font-medium text-gray-700"
                            )}
                        >
                            {username}
                        </p>
                        <p
                            className={cls(
                                type === "message"
                                    ? "text-sm font-medium text-gray-700"
                                    : "text-xs font-medium text-gray-400"
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
