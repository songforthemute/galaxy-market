import type { NextPage } from "next";
import { Fragment } from "react";
import Layout from "../../components/layout";

const ChatDetail: NextPage = () => {
    return (
        // 스테이트로 유저 네임 동적 할당
        <Layout title={"메시지"} canGoBack>
            <div className="p-4 pb-20 space-y-4">
                {[1, 2, 3, 4, 5, 6, 7].map((v, i) => (
                    <Fragment key={i}>
                        <div className="flex items-start space-x-2">
                            <div className="rounded-full w-8 h-8 bg-gray-400" />
                            <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-400 rounded-md ">
                                <p>Hi how much are you selling them for?</p>
                            </div>
                        </div>
                        <div className="flex flex-row-reverse items-start space-x-2 space-x-reverse">
                            <div className="rounded-full w-8 h-8 bg-gray-400" />
                            <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-400 rounded-md ">
                                <p>I want ￦20,000</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-2">
                            <div className="rounded-full w-8 h-8 bg-gray-400" />
                            <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-400 rounded-md ">
                                <p>Ooh!!</p>
                            </div>
                        </div>
                    </Fragment>
                ))}

                <div className="fixed w-full mx-auto max-w-md bottom-4 inset-x-0">
                    <div className="flex items-center relative">
                        <input
                            type="text"
                            placeholder="Write here sending message..."
                            className="shadow-md rounded-full w-full border-gray-400 pr-12
                    focus:ring-purple-400 focus:outline-none focus:border-purple-400
                    hover:border-purple-400 hover:bg-purple-50 transition-colors"
                        />
                        <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
                            <button
                                className="flex items-center bg-purple-400 rounded-full p-2 text-sm text-white transition-all 
                    hover:bg-purple-700 cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-purple-700 focus:bg-purple-700"
                            >
                                &rarr;
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ChatDetail;
