import { dateConverter, getImgSource } from "@libs/client/util";

interface replyProps {
    avatarUrl?: string | null;
    text: string;
    username: string;
    created: Date;
}

const Reply = ({ avatarUrl, text, username, created }: replyProps) => {
    return (
        <div className="flex items-start space-x-4">
            {avatarUrl ? (
                <img
                    src={getImgSource(avatarUrl, "avatar")}
                    alt="avatar"
                    className="w-8 h-8 bg-slate-400 rounded-full"
                />
            ) : (
                <div className="w-8 h-8 bg-slate-400 rounded-full" />
            )}

            <div>
                <div className="text-sm font-medium text-slate-700">
                    {username}
                </div>
                <div className="text-xs text-slate-400">
                    {dateConverter(created, "Full")}
                </div>
                <p className="text-slate-700 mt-2">{text}</p>
            </div>
        </div>
    );
};

export default Reply;
