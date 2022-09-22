import type { NextPage } from "next";
import Link from "next/link";
import Layout from "../../components/layout";

const ItemDetail: NextPage = () => {
    return (
        <Layout title="상품 상세" hasTabBar canGoBack>
            <div className="p-4">
                <div className="mb-8">
                    <div className="h-96 bg-slate-400" />
                    <div className="flex mt-2 py-4 items-center space-x-4 border-y">
                        <div className="w-12 h-12 rounded-full bg-slate-400" />
                        <Link href={"/profile"}>
                            <a className="cursor-pointer hover:opacity-50 transition-all">
                                <p className="text-sm font-medium text-gray-700">
                                    스티브 잡스
                                </p>
                                <p className="text-xs font-medium text-gray-400">
                                    프로필 보기 &rarr;
                                </p>
                            </a>
                        </Link>
                    </div>
                    <div className="mt-6">
                        <h1 className="text-3xl font-bold text-black">
                            Galaxy S50
                        </h1>
                        <div className="text-2xl mt-1 text-gray-700">$140</div>
                        <p className="text-base mt-4 text-gray-700">
                            My money&apos;s in that office, right? If she start
                            giving me some bullshit about it ain&apos;t there,
                            and we got to go someplace else and get it, I&apos;m
                            gonna shoot you in the head then and there. Then
                            I&apos;m gonna shoot that bitch in the kneecaps,
                            find out where my goddamn money is. She gonna tell
                            me too. Hey, look at me when I&apos;m talking to
                            you, motherfucker. You listen: we go in there, and
                            that ni**a Winston or anybody else is in there, you
                            the first motherfucker to get shot. You understand?
                        </p>
                        <div className="flex items-center justify-between space-x-2 my-4">
                            <button className="flex-1 bg-purple-400 text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400 shadow-md font-medium text-sm hover:bg-purple-700">
                                Talk to seller
                            </button>
                            <button className="p-2 flex items-center justify-center text-gray-400 rounded-md focus:text-red-400 focus:outline-none hover:text-red-100 transition-colors">
                                <svg
                                    className="h-6 w-6 "
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="">
                    <h2 className="text-xl font-medium text-gray-700">
                        유사한 상품
                    </h2>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        {[1, 2, 3, 4, 5, 6].map((_, i) => (
                            <div key={i} className="">
                                <div className="h-56 w-56 mb-2 bg-slate-400" />
                                <h3 className="text-sm text-gray-700 -mb-1">
                                    Galaxy S60
                                </h3>
                                <span className="text-sm font-medium text-gray-400">
                                    $6
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ItemDetail;
