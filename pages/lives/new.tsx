import type { NextPage } from "next";
import Layout from "../../components/layout";

const NewStream: NextPage = () => {
    return (
        <Layout title="새 라이브 커머스" hasTabBar>
            <div className="space-y-4 py-10 px-4">
                <div className="my-4">
                    <label
                        htmlFor="name"
                        className="text-sm font-medium text-gray-400 block mb-1"
                    >
                        Name
                    </label>
                    <div className="rounded-md relative flex items-center">
                        <input
                            id="name"
                            type="text"
                            placeholder="0.00"
                            className="appearance-none w-full px-4 py-2 my-2 border border-transparent rounded-md shadow-md placeholder-gray-400 focus:outline-none focus:ring-purple-400 focus:border-purple-400 hover:bg-gray-50 focus:bg-white"
                        />
                    </div>
                </div>

                <div className="my-4">
                    <label
                        htmlFor="price"
                        className="text-sm font-medium text-gray-400 block mb-1"
                    >
                        Price
                    </label>
                    <div className="rounded-md relative flex items-center">
                        <div className="absolute left-0 pl-4 flex items-center justify-center pointer-events-none">
                            <span className="text-gray-400 text-base">￦</span>
                        </div>
                        <input
                            id="price"
                            type="text"
                            placeholder="0.00"
                            className="appearance-none w-full pl-8 px-4 py-2 my-2 border border-transparent rounded-md shadow-md placeholder-gray-400 focus:outline-none focus:ring-purple-400 focus:border-purple-400 hover:bg-gray-50 focus:bg-white"
                        />
                        <div className="absolute right-0 pr-4 flex items-center pointer-events-none">
                            <span className="text-gray-400">KRW</span>
                        </div>
                    </div>
                </div>

                <div className="my-4">
                    <label
                        className="text-sm font-medium text-gray-400 block mb-1"
                        htmlFor=""
                    >
                        Description
                    </label>
                    <textarea
                        rows={4}
                        className="mt-1 shadow-md w-full rounded-md border border-transparent
                    focus:ring-purple-400 focus:border-purple-400"
                    />
                </div>
                <button className="w-full my-4 text-sm font-medium bg-purple-400 hover:bg-purple-700 text-white py-2 px-4 border border-transparent rounded-md shadow-md focus:ring-2 focus:ring-offset-2 focus:ring-purple-400 focus:outline-none">
                    Open live stream
                </button>
            </div>
        </Layout>
    );
};

export default NewStream;
