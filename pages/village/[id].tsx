import type { NextPage } from "next";

const CommunityPosting: NextPage = () => {
    return (
        <div>
            <span
                className="inline-flex my-4 ml-4 items-center px-2 py-1 rounded-full
                text-xs font-medium bg-gray-100 text-gray-700"
            >
                Galaxies Question
            </span>
            <div className="flex mb-2 p-4 items-center space-x-4 border-b">
                <div className="w-12 h-12 rounded-full bg-slate-400" />
                <div>
                    <p className="text-sm font-medium text-gray-700">
                        Lee Joey
                    </p>
                    <p className="text-xs font-medium text-gray-400">
                        View profile &rarr;
                    </p>
                </div>
            </div>

            <div>
                <div className="mt-2 px-4 text-gray-700">
                    <span className="text-purple-400 font-medium">Q.</span> What
                    is the best burger restaurant?
                </div>
                <div className="flex px-4 space-x-4 mt-4 text-gray-700 py-2 border-t border-b w-full">
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
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                        </svg>
                        <span>Interested 1</span>
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
                        <span>Reply 1</span>
                    </span>
                </div>
            </div>

            <div className="px-4 my-4 space-y-4">
                <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-neutral-200 rounded-full" />
                    <div>
                        <div className="text-sm font-medium text-gray-700">
                            Steve Jebs
                        </div>
                        <div className="text-xs text-gray-400">2 hours ago</div>
                        <p className="text-gray-700 mt-2">
                            The best burger restaurant is the one next to my
                            house.
                        </p>
                    </div>
                </div>
                <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-neutral-200 rounded-full" />
                    <div>
                        <div className="text-sm font-medium text-gray-700">
                            Steve Jebs
                        </div>
                        <div className="text-xs text-gray-400">2 hours ago</div>
                        <p className="text-gray-700 mt-2">
                            The best burger restaurant is the one next to my
                            house.
                        </p>
                    </div>
                </div>
            </div>

            <div className="px-4">
                <textarea
                    rows={4}
                    placeholder="Answer this question!"
                    className="mt-1 shadow-md w-full rounded-md border border-transparent
                    focus:ring-purple-400 focus:border-purple-400"
                />
                <button className="w-full my-4 text-sm font-medium bg-purple-400 hover:bg-purple-700 text-white py-2 px-4 border border-transparent rounded-md shadow-md focus:ring-2 focus:ring-offset-2 focus:ring-purple-400 focus:outline-none">
                    Reply
                </button>
            </div>
        </div>
    );
};

export default CommunityPosting;