import type { NextPage } from "next";
import Layout from "@components/layout";
import ProfileBtn from "@components/profileBtn";
import UserCard from "@components/userCard";
import { Review } from "@prisma/client";
import useUser from "@libs/client/useUser";
import useGetKey from "@libs/client/useGetKey";
import useSWRInfinite from "swr/infinite";
import { useInfiniteScrollDown } from "@libs/client/useInfiniteScroll";
import { Suspense, useEffect } from "react";
import dynamic from "next/dynamic";
import SkeletonReviews from "@components/skeleton/reivew";

const Reviews = dynamic(() => import("@components/review"), {
    ssr: false,
    suspense: true,
});

interface ReviewWithUser extends Review {
    createdBy: {
        id: number;
        username: string;
        avatarUrl?: string;
    };
    product: {
        name: string;
        option: string;
        image: string;
    };
}

interface ReviewsReturn {
    status: boolean;
    reviews: ReviewWithUser[];
    pageNum: number;
    error?: string;
}

const Profile: NextPage = () => {
    const { user } = useUser();
    const getKey = useGetKey<ReviewsReturn>({
        url: `/api/reviews?id=${user?.id}`,
        hasQuery: true,
    });
    const { data, setSize } = useSWRInfinite<ReviewsReturn>(getKey);
    const page = useInfiniteScrollDown();

    const reviews = !data?.[0]?.error
        ? data?.map((data) => data.reviews).flat()
        : undefined;

    useEffect(() => {
        setSize(page);
    }, [setSize, page]);

    return (
        <Layout title="프로필" hasTabBar canGoBack hasConfig>
            <UserCard
                avatarUrl={user?.avatarUrl}
                username={user?.username!}
                text="프로필 수정 →"
                type="profile"
                href="/profile/edit"
                isLarge
            />

            <div className="mt-8 flex justify-around">
                <ProfileBtn href={`/profile/${user?.id}/sell`} text="판매내역">
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

                <ProfileBtn href={`/profile/${user?.id}/buy`} text="구매내역">
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

                <ProfileBtn href={`/profile/${user?.id}/like`} text="관심목록">
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

            {/* 리뷰란 */}
            <div className="mt-6 px-4 divide-y-[1px] divied-slate-400">
                {reviews?.map((review) => (
                    <Suspense fallback={<SkeletonReviews />} key={review.id}>
                        <Reviews
                            key={review.id}
                            avatarUrl={review.createdBy.avatarUrl}
                            username={review.createdBy.username}
                            star={review.star}
                            text={review.text}
                            created={review.created}
                            productName={review.product.name}
                            productOpt={review.product.option}
                            productId={review.productId}
                            productImg={review.product.image}
                        />
                    </Suspense>
                ))}
            </div>
        </Layout>
    );
};

export default Profile;
