import Link from "next/link";
import { cls, getImgSource } from "@libs/client/util";
import dynamic from "next/dynamic";

const Image = dynamic(() => import("next/image"), {
    ssr: false,
});

interface UserCardProps {
    text: string;
    username: string;
    avatarUrl?: string | null;
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
                    {avatarUrl && avatarUrl.length > 0 ? (
                        <div
                            className={cls(
                                "relative rounded-full",
                                isLarge ? "p-8" : "p-6"
                            )}
                        >
                            <Image
                                src={getImgSource(avatarUrl, "avatar")}
                                alt="avatar"
                                className="rounded-full"
                                layout="fill"
                                objectFit="scale-down"
                                quality={100}
                                priority
                            />
                        </div>
                    ) : (
                        <div
                            className={cls(
                                "aspect-square rounded-full bg-slate-400",
                                isLarge ? "w-16 h-16" : "w-12 h-12"
                            )}
                        />
                    )}
                    <div className="space-y-1">
                        <p
                            className={cls(
                                type === "message"
                                    ? "text-sm text-slate-400"
                                    : isLarge
                                    ? "text-md font-semibold text-slate-700"
                                    : "font-medium text-slate-700"
                            )}
                        >
                            {username}
                        </p>
                        <p
                            className={cls(
                                "font-medium",
                                type === "message"
                                    ? "text-sm text-slate-700"
                                    : isLarge
                                    ? "text-sm text-slate-400"
                                    : "text-xs text-slate-400"
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
