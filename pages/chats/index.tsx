import type { NextPage } from "next";

const Chats: NextPage = () => {
    return (
        <div className="py-10 divide-y-[1px] divide-gray-100">
            {[1, 2, 3, 4, 5].map((v, i) => (
                <div
                    key={i}
                    className="flex p-4 items-center space-x-4 cursor-pointer"
                >
                    <div className="w-12 h-12 rounded-full bg-slate-400" />
                    <div>
                        <p className="text-xs font-medium text-gray-400">
                            Joey Lee
                        </p>
                        <p className="text-sm text-gray-700">
                            See you tomorrow in the corner at {14 + i}:00!
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Chats;
