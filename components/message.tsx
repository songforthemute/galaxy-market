import { cls, dateConverter, getImgSource } from "@libs/client/util";
import dynamic from "next/dynamic";

const Image = dynamic(() => import("next/image"), {
    ssr: false,
});

interface MessagesProps {
    text?: string;
    isReverse?: boolean;
    avatarUrl?: string | null; // 추후 이미지에 넣을 부분
    createdAt: Date;
}

const Messages = ({
    text = " ",
    isReverse = false,
    avatarUrl,
    createdAt,
}: MessagesProps) => {
    return (
        <div
            className={cls(
                "flex space-x-2 items-center",
                isReverse ? "flex-row-reverse space-x-reverse" : ""
            )}
        >
            {avatarUrl ? (
                <div className="relative rounded-full p-4">
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
                <div className="rounded-full w-8 h-8 bg-slate-400" />
            )}
            <div className="w-1/3 max-w-max text-sm text-slate-700 p-2 border border-slate-400 rounded-md ">
                <p>{text}</p>
            </div>
            <div className="text-xs text-slate-400">
                {dateConverter(createdAt, "Time")}
            </div>
        </div>
    );
};

export default Messages;
