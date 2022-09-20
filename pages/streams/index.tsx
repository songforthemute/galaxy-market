import type { NextPage } from "next";

const Stream: NextPage = () => {
    return (
        <div className="py-10 px-4 space-y-4 divide-y-2">
            {[1, 2, 3, 4].map((v, i) => (
                <div key={i} className="py-4 px-4">
                    <div className="w-full bg-gray-400 aspect-video rounded-md shadow-md" />
                    <h3 className="text-gray-700 text-xl mt-2">
                        Let's cook pizza
                    </h3>
                </div>
            ))}

            <button className="fixed bottom-20 right-4 shadow-xl bg-purple-400 rounded-full p-4 text-white hover:bg-purple-700 transition-colors border-transparent">
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
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    ></path>
                </svg>
            </button>
        </div>
    );
};

export default Stream;
