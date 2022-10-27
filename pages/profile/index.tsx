import type { NextPage } from "next";
import Layout from "@components/layout";
import ProfileBtn from "@components/profileBtn";
import UserCard from "@components/userCard";
import useSWR from "swr";
import { Review } from "@prisma/client";
import { cls } from "@libs/client/util";

interface ReviewWithCreator extends Review {
    createdBy: {
        id: number;
        username: string;
        avatarUrl?: string;
    };
}

interface ReviewsReturn {
    status: boolean;
    reviews: ReviewWithCreator[];
}

const Profile: NextPage = () => {
    const { data } = useSWR<ReviewsReturn>("api/reviews");

    console.log(data);

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
                    {data?.status
                        ? data?.reviews.map((review) => (
                              <div key={review.id} className="py-4">
                                  <div className="flex items-center space-x-4">
                                      <div className="w-12 h-12 rounded-full bg-gray-400" />
                                      <div>
                                          <h4 className="ml-0.5 text-sm font-bold">
                                              {review.createdBy.username}
                                          </h4>
                                          <div className="mt-0.5 flex items-center">
                                              {[0, 0, 0, 0, 0].map((v, i) => (
                                                  <svg
                                                      key={i}
                                                      className={cls(
                                                          "h-4 w-4",
                                                          i < review.star
                                                              ? "text-yellow-400"
                                                              : "text-gray-400"
                                                      )}
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
                                      <p>{review.text}</p>
                                  </div>
                              </div>
                          ))
                        : null}
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
