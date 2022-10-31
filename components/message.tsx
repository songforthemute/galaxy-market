import { cls } from "@libs/client/util";

interface MessagesProps {
    text?: string;
    isReverse?: boolean;
    avatarUrl?: string; // 추후 이미지에 넣을 부분
}

const Messages = ({ text, isReverse = false, avatarUrl }: MessagesProps) => {
    return (
        <div
            className={cls(
                "flex items-start space-x-2",
                isReverse ? "flex-row-reverse space-x-reverse" : ""
            )}
        >
            <div className="rounded-full w-8 h-8 bg-slate-400" />
            <div className="w-1/2 text-sm text-slate-700 p-2 border border-slate-400 rounded-md ">
                <p>{text}</p>
            </div>
        </div>
    );
};

export default Messages;
