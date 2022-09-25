import Link from "next/link";

interface MessageProps {
    key: number;
    badge: string;
    text: string;
    author: string;
    createdAt: string;
    interested: number;
    reply: number;
    link: string;
}

const Ask = ({
    key,
    badge,
    text,
    author,
    createdAt,
    interested,
    reply,
    link,
}: MessageProps) => {
    return (
        <Link href={link}>
            <a
                key={key}
                className="flex flex-col items-start cursor-pointer hover:opacity-50 transition-all"
            >
                <span
                    className="flex items-center ml-4 px-2 py-1 rounded-full
            text-xs font-medium bg-gray-100 text-gray-700"
                >
                    {badge}
                </span>
                <div className="mt-2 px-4 text-gray-700">
                    <span className="text-purple-400 font-medium">Q. </span>
                    {text}
                </div>
                <div className="mt-4 px-4 flex items-center justify-between w-full text-gray-400 text-xs font-medium">
                    <span>{author}</span>
                    <span>{createdAt}</span>
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
                        <span>Interested {interested}</span>
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
                        <span>Reply {reply}</span>
                    </span>
                </div>
            </a>
        </Link>
    );
};

export default Ask;
