const SkeletonPostingBody = () => {
    return (
        <div className="animate-pulse">
            <div className="flex px-4 items-center">
                <div className="text-purple-400 text-xl font-medium">Q. </div>
                <div className="mx-2 rounded-md w-28 h-5 bg-slate-200" />
            </div>
            <div className="mt-2 px-4 space-y-2">
                <div className="mx-4 rounded-md w-[90%] h-24 bg-slate-200" />
            </div>

            {/* Post's Reactions */}
            <div className="flex px-4 space-x-4 mt-4 text-slate-700 text-sm py-2 border-t border-b w-full">
                <button className="flex space-x-2 items-center">
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
                    <span>궁금해요</span>
                </button>
                <span className="flex space-x-2 items-center">
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
                    <span>댓글</span>
                </span>
            </div>
        </div>
    );
};

export default SkeletonPostingBody;
