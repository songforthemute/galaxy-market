import type { NextPage } from "next";

// /community
// /community/[id]
const Community: NextPage = () => {
    return (
        <div className="py-16 px-4 space-y-8">
            {[1, 2, 3, 4, 5].map((v, i) => (
                <div
                    key={i}
                    className="flex flex-col items-start cursor-pointer"
                >
                    <span
                        className="flex items-center px-2 py-1 rounded-full
                text-xs font-medium bg-gray-100 text-gray-700"
                    >
                        Galaxies Question
                    </span>
                    <div className="mt-2 text-gray-700">
                        <span className="text-purple-400 font-medium">Q.</span>{" "}
                        What is the best burger restaurant?
                    </div>
                    <div className="mt-4 flex items-center justify-between w-full text-gray-400 text-xs font-medium">
                        <span>Lee</span>
                        <span>18 hours ago</span>
                    </div>
                    <div className="flex space-x-4 mt-4 text-gray-700 py-2 border-t border-b w-full">
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
                            <span>Interested {i + 1}</span>
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
                            <span>Reply {i + 2}</span>
                        </span>
                    </div>
                </div>
            ))}
            <button className="fixed bottom-20 right-4 shadow-xl bg-purple-400 rounded-full p-4 text-white hover:bg-purple-700 transition-colors">
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    ></path>
                </svg>
            </button>
        </div>
    );
};

export default Community;
