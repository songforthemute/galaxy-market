import { cls, dateConverter } from "@libs/client/util";

interface PostingBodyProps {
    title: string;
    description: string;
    created: Date;
    interest: number;
    replies: number;
    isInterested: boolean;
    _onClickInterest: () => void;
}

const PostingBody = ({
    title,
    description,
    created,
    interest,
    replies,
    isInterested,
    _onClickInterest,
}: PostingBodyProps) => {
    return (
        <>
            <div className="px-4">
                <span className="text-purple-400 text-xl font-medium">Q. </span>
                <span className="text-slate-700 text-xl font-medium">
                    {title}
                </span>
            </div>
            <div className="mt-2 px-4 space-y-2">
                <p className="text-slate-700">{description}</p>

                <div className="text-xs text-slate-400">
                    {dateConverter(created, "Full")}
                </div>
            </div>

            {/* Post's Reactions */}
            <div className="flex px-4 space-x-4 mt-4 text-slate-700 py-2 border-t border-b w-full">
                <button
                    onClick={_onClickInterest}
                    className={cls(
                        "flex space-x-2 items-center text-sm transition-all cursor-pointer hover:animate-bounce",
                        isInterested
                            ? "font-semibold text-emerald-400 text- hover:text-slate-400 hover:font-normal"
                            : "font-normal hover:text-emerald-400 hover:font-semibold"
                    )}
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                    </svg>
                    <span>궁금해요 {interest}</span>
                </button>
                <span className="flex space-x-2 items-center text-sm">
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        ></path>
                    </svg>
                    <span>댓글 {replies}</span>
                </span>
            </div>
        </>
    );
};

export default PostingBody;
