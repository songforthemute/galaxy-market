import type { NextPage } from "next";
import Layout from "../../components/layout";

const NewAsking: NextPage = () => {
    return (
        <Layout title="질문하기" hasTabBar canGoBack>
            <form className="px-4">
                <span
                    className="inline-flex my-4 ml-4 items-center px-2 py-1 rounded-full
            text-xs font-medium bg-gray-100 text-gray-700"
                >
                    궁금해요
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
        </Layout>
    );
};

export default NewAsking;
