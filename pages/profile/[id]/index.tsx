import { useRouter } from "next/router";
import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
// types
import type { NextPage } from "next";
import type { Review, User } from "@prisma/client";
// custom hooks
import useUser from "@libs/client/useUser";
import useGetKey from "@libs/client/useGetKey";
import { useInfiniteScrollDown } from "@libs/client/useInfiniteScroll";
// components
import Layout from "@components/layout";
import ProfileBtn from "@components/profileBtn";
import SkeletonReviews from "@components/skeleton/reivew";
import SkeletonUserCard from "@components/skeleton/userCard";

// dynamic imports
const UserCard = dynamic(() => import("@components/userCard"), {
    ssr: false,
    suspense: true,
});
const Reviews = dynamic(() => import("@components/review"), {
    ssr: false,
    suspense: true,
});
const HelperBtn = dynamic(() => import("@components/helperBtn"), {
    ssr: true,
});

// interfaces
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
interface ProfileReturn {
    status: boolean;
    profile: User;
}

// Page
const Profile: NextPage = () => {
    const {
        query: { id },
    } = useRouter();
    const { user } = useUser();

    // fetch data: user profile
    const { data: profileData } = useSWR<ProfileReturn>(
        `/api/users/profile?id=${id}`
    );

    // fetch data: user's reviews
    const getKey = useGetKey<ReviewsReturn>({
        url: `/api/reviews?id=${id}`,
        hasQuery: true,
    });
    const { data: reviewData, setSize } = useSWRInfinite<ReviewsReturn>(getKey);

    // set page number for infinite scroll
    const page = useInfiniteScrollDown();
    useEffect(() => {
        setSize(page);
    }, [setSize, page]);

    // received dataset
    const [reviews, setReviews] = useState<ReviewWithUser[]>([]);
    useEffect(() => {
        if (reviewData && !reviewData?.[0]?.error) {
            setReviews(() => reviewData.map((data) => data.reviews).flat());
        } else {
            setReviews([]);
        }
    }, [reviewData]);

    return (
        <Layout title="프로필" hasTabBar canGoBack hasConfig>
            <Suspense fallback={<SkeletonUserCard isLarge />}>
                <UserCard
                    username={profileData?.profile?.username as string}
                    avatarUrl={profileData?.profile?.avatarUrl}
                    text={
                        user?.id === Number(id)
                            ? "프로필 수정 →"
                            : "메시지 보내기 →"
                    }
                    type="profile"
                    href={
                        user?.id === Number(id)
                            ? "/profile/edit"
                            : `/chats/${id}`
                    }
                    isLarge
                />
            </Suspense>

            <div className="mt-10 flex justify-around">
                <ProfileBtn href={`/profile/${id}/sell`} text="판매내역">
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

                <ProfileBtn href={`/profile/${id}/buy`} text="구매내역">
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

                <ProfileBtn href={`/profile/${id}/like`} text="관심목록">
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
                {reviews.map((review) => (
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

            {user?.id !== Number(id) && (
                <HelperBtn href={`/profile/${id}/review`}>
                    <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path
                            fillRule="evenodd"
                            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                            clipRule="evenodd"
                        />
                    </svg>
                </HelperBtn>
            )}
        </Layout>
    );
};

export default Profile;
