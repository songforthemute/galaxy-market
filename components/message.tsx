import { cls, dateConverter, getImgSource } from "@libs/client/util";

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
                <img
                    src={avatarUrl}
                    alt="avatar"
                    className="rounded-full w-8 h-8 bg-slate-400"
                />
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
