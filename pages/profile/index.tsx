import type { NextPage } from "next";
import Link from "next/link";
import Layout from "../../components/layout";

const Profile: NextPage = () => {
    return (
        <Layout title="프로필" hasTabBar canGoBack hasConfig>
            <div className="pt-4 px-4">
                <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-400 rounded-full" />
                    <div className="flex flex-col">
                        <span className="font-medium text-gray-700">
                            스티브 잡스
                        </span>
                        <Link href={"/profile/edit"}>
                            <a>
                                <span className="text-sm text-gray-400 cursor-pointer transition-all hover:opacity-50">
                                    프로필 수정 &rarr;
                                </span>
                            </a>
                        </Link>
                    </div>
                </div>

                <div className="mt-10 flex justify-around">
                    <Link href={"/profile/sold"}>
                        <a className="flex flex-col items-center cursor-pointer hover:opacity-50 transition-all">
                            <div className="w-14 h-14 text-white bg-purple-400 rounded-full flex items-center justify-center">
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
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                    ></path>
                                </svg>
                            </div>
                            <span className="mt-2 text-sm font-medium text-gray-700">
                                판매내역
                            </span>
                        </a>
                    </Link>

                    <Link href={"/profile/buy"}>
                        <a className="flex flex-col items-center cursor-pointer  hover:opacity-50 transition-all">
                            <div className="w-14 h-14 text-white bg-purple-400 rounded-full flex items-center justify-center">
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
                                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                    ></path>
                                </svg>
                            </div>
                            <span className="mt-2 text-sm font-medium text-gray-700">
                                구매내역
                            </span>
                        </a>
                    </Link>

                    <Link href={"/profile/like"}>
                        <a className="flex flex-col items-center cursor-pointer  hover:opacity-50 transition-all">
                            <div className="w-14 h-14 text-white bg-purple-400 rounded-full flex items-center justify-center">
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
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    ></path>
                                </svg>
                            </div>
                            <span className="mt-2 text-sm font-medium text-gray-700">
                                관심목록
                            </span>
                        </a>
                    </Link>
                </div>

                <div className="mt-12">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-gray-400" />
                        <div>
                            <h4 className="ml-0.5 text-sm font-bold">Joey</h4>
                            <div className="mt-0.5 flex items-center">
                                <svg
                                    className="text-yellow-400 h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <svg
                                    className="text-yellow-400 h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <svg
                                    className="text-yellow-400 h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <svg
                                    className="text-yellow-400 h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <svg
                                    className="text-gray-400 h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 text-gray-700 text-sm">
                        <p>
                            Normally, both your asses would be dead as fucking
                            fried chicken, but you happen to pull this shit
                            while I&apos;m in a transitional period so I
                            don&apos;t wanna kill you, I wanna help you. But I
                            can&apos;t give you this case, it don&apos;t belong
                            to me. Besides, I&apos;ve already been through too
                            much shit this morning over this case to hand it
                            over to your dumb ass.
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
