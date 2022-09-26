import type { NextPage } from "next";
import Layout from "../../components/layout";
import ProfileBtn from "../../components/profileBtn";
import UserCard from "../../components/userCard";

const Profile: NextPage = () => {
    return (
        <Layout title="프로필" hasTabBar canGoBack hasConfig>
            <div className="">
                <UserCard
                    username="조이"
                    text="프로필 수정 →"
                    type="profile"
                    href="/profile/edit"
                    isLarge
                />

                <div className="mt-10 flex justify-around">
                    <ProfileBtn href="/profile/sold" text="판매내역">
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
                    </ProfileBtn>

                    <ProfileBtn href="/profile/buy" text="구매내역">
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
                    </ProfileBtn>

                    <ProfileBtn href="/profile/like" text="관심목록">
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
                    </ProfileBtn>
                </div>

                <div className="mt-6 px-4 divide-y-[1px] divied-gray-400">
                    {[1, 2, 3, 4, 5].map((v, i) => (
                        <div key={i} className="py-4">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-full bg-gray-400" />
                                <div key={i}>
                                    <h4 className="ml-0.5 text-sm font-bold">
                                        Joey
                                    </h4>
                                    <div className="mt-0.5 flex items-center">
                                        {[1, 2, 3, 4, 5].map((v, j) => (
                                            <svg
                                                key={j}
                                                className="text-yellow-400 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 text-gray-700 text-sm">
                                <p>
                                    우리는 단순히 제품을 만들기만 하는 게 아니라
                                    사용자에게 마법과 같은 경험을 선사해요.
                                    Apple에서는 있는 그대로의 모습으로 당당하게
                                    성장하고 발전할 수 있습니다. 각기 다른
                                    배경을 지닌 사람들이 모였을 때, 부족한
                                    부분을 더 온전히 채울 수 있어요. Apple은
                                    제가 한 사람으로서 다른 사람에게 어떤 도움을
                                    줄 수 있는지를 봐주었어요.
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
