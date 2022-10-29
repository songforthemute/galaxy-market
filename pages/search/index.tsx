import type { NextPage } from "next";
import HelperBtn from "../../components/helperBtn";
import Layout from "@components/layout";

const Search: NextPage = () => {
    return (
        <Layout title="검색" hasTabBar canGoBack hasConfig>
            <div className="px-4 pb-2 space-y-4 divide-y-2">
                {[1, 2].map((v, i) => (
                    <div key={i} className="pb-2 pt-8 px-4">
                        <div className="cursor-pointer hover:opacity-70 transition-all">
                            <div className="w-1/2 bg-slate-400 aspect-video rounded-md shadow-md" />
                            <h3 className="text-slate-700 text-xl mt-2">
                                Let's cook pizza
                            </h3>
                        </div>
                    </div>
                ))}

                <HelperBtn href="/search/new">
                    <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                        />
                    </svg>
                </HelperBtn>
            </div>
        </Layout>
    );
};

export default Search;
