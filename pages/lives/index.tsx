import type { NextPage } from "next";
import HelperBtn from "../../components/helperBtn";
import Layout from "@components/layout";
import useUser from "@libs/client/useUser";

const Stream: NextPage = () => {
    const { user } = useUser();

    return (
        <Layout title="라이브 커머스" hasTabBar canGoBack hasConfig>
            <div className="px-4 pb-2 space-y-4 divide-y-2">
                {[1, 2, 3, 4].map((v, i) => (
                    <div key={i} className="pb-2 pt-8 px-4">
                        <div className="cursor-pointer hover:opacity-70 transition-all">
                            <div className="w-full bg-slate-400 aspect-video rounded-md shadow-md" />
                            <h3 className="text-slate-700 text-xl mt-2">
                                Let's cook pizza
                            </h3>
                        </div>
                    </div>
                ))}

                <HelperBtn href="/lives/new">
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
                </HelperBtn>
            </div>
        </Layout>
    );
};

export default Stream;
