import { cls } from "../libs/util";

interface MessageProps {
    text: string;
    isReverse?: boolean;
    avatarUrl?: string; // 추후 이미지에 넣을 부분
}

const Message = ({ text, isReverse = false, avatarUrl }: MessageProps) => {
    return (
        <div
            className={cls(
                "flex items-start space-x-2",
                isReverse ? "flex-row-reverse space-x-reverse" : ""
            )}
        >
            <div className="rounded-full w-8 h-8 bg-gray-400" />
            <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-400 rounded-md ">
                <p>{text}</p>
            </div>
        </div>
    );
};

export default Message;
