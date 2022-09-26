interface ReactionProps {
    likes: number;
    reply: number;
}

const Reaction = ({ likes, reply }: ReactionProps) => {
    return (
        <div className="flex px-4 space-x-4 mt-4 text-gray-700 py-2 border-t border-b w-full">
            <span className="flex space-x-2 items-center text-sm hover:opacity-50 transition-all cursor-pointer">
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
                <span>궁금해요 {likes}</span>
            </span>
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
                <span>댓글 {reply}</span>
            </span>
        </div>
    );
};

export default Reaction;
