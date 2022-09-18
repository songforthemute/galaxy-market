import type { NextPage } from "next";

const NewAsking: NextPage = () => {
    return (
        <form className="px-4 py-10">
            <span
                className="inline-flex my-4 ml-4 items-center px-2 py-1 rounded-full
                text-xs font-medium bg-gray-100 text-gray-700"
            >
                Galaxies Question
            </span>
            <textarea
                rows={4}
                placeholder="Ask a question."
                className="mt-1 shadow-md w-full rounded-md border border-transparent
                    focus:ring-purple-400 focus:border-purple-400"
            />
            <button className="w-full my-4 text-sm font-medium bg-purple-400 hover:bg-purple-700 text-white py-2 px-4 border border-transparent rounded-md shadow-md focus:ring-2 focus:ring-offset-2 focus:ring-purple-400 focus:outline-none">
                Ask now
            </button>
        </form>
    );
};

export default NewAsking;
