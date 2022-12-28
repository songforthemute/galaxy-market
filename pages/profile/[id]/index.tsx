import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
// types
import type { NextPage } from "next";
import type { Review, User } from "@prisma/client";
// utils
import {
    booleanCls,
    useUser,
    useGetKey,
    useInfiniteScrollDown,
    useFocusEvent,
    useToggleModal,
    useMutation,
} from "@libs/client";
// components
import {
    Layout,
    CircleButton,
    ProfileCard,
    Anchor,
    Heart,
    ShoppingBag,
    ShoppingCart,
    Text,
} from "components";
// dynamic components
const ReviewCard = dynamic(() => import("@components/Organisms/ReviewCard"));
const DeleteModal = dynamic(() => import("@components/Organisms/DeleteModal"));
const PencilSquare = dynamic(
    () => import("@components/Atoms/icons/pencilSquare")
);
const FloatingAnchor = dynamic(
    () => import("@components/Molecules/FloatingAnchor")
);

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
    const { query, asPath } = useRouter();
    const { user } = useUser();
    const { onKeyDownEnter } = useFocusEvent("parent");

    // fetch data: user profile
    const { data: profileData } = useSWR<ProfileReturn>(
        query.id ? `/api/users/profile?id=${query.id}` : null
    );

    // fetch data: user's reviews
    const getKey = useGetKey<ReviewsReturn>({
        url: query.id ? `/api/users/reviews?id=${query.id}` : null,
        hasQuery: true,
    });
    const {
        data: reviewData,
        setSize,
        mutate: reviewMutate,
    } = useSWRInfinite<ReviewsReturn>(getKey);

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

    // Delete Review
    const { modal, toggleModal } = useToggleModal();
    const [deleteReviewId, setDeleteReviewId] = useState<number | undefined>();
    const _onClickDeleteReview = (reviewId: number) => {
        setDeleteReviewId(reviewId);
        toggleModal();
    };

    const [
        deleteReview,
        { data: deleteReviewReturn, loading: deleteReviewLoading },
    ] = useMutation<{ status: boolean }>({
        url: `/api/users/reviews`,
        method: "DELETE",
    });

    useEffect(() => {
        if (deleteReviewReturn && deleteReviewReturn?.status) {
            reviewMutate();
        }
    }, [deleteReviewReturn, reviewMutate]);

    return (
        <Layout title="프로필" backwardButton dockBar configTab>
            {modal && (
                <DeleteModal
                    loading={deleteReviewLoading}
                    onClickConfirm={() => {
                        deleteReview({ reviewId: deleteReviewId });
                        toggleModal();
                    }}
                />
            )}

            <div className="p-4 space-y-10 w-full md:max-w-7xl mx-auto">
                {/* 프로파일 */}
                <Anchor
                    as={profileData?.profile?.avatarUrl ? "image" : undefined}
                    href={booleanCls(
                        user?.id === profileData?.profile?.id,
                        `/profile/edit`,
                        `/chats/${profileData?.profile?.id}`
                    )}
                >
                    <ProfileCard
                        tabIndex={0}
                        onKeyDown={onKeyDownEnter}
                        avatar={profileData?.profile?.avatarUrl}
                        subtext={booleanCls(
                            user?.id === profileData?.profile?.id,
                            "프로필 수정하기",
                            "메시지 보내기"
                        )}
                        username={profileData?.profile?.username}
                    />
                </Anchor>

                {/* Sell Buy Like */}
                <div className="flex justify-around mx-12 gap-x-5">
                    <Anchor className="rounded-full" href={`${asPath}/sell`}>
                        <CircleButton>
                            <ShoppingCart />
                            <Text className="inline-block" variant="span">
                                판매내역
                            </Text>
                        </CircleButton>
                    </Anchor>

                    <Anchor className="rounded-full" href={`${asPath}/buy`}>
                        <CircleButton>
                            <ShoppingBag />
                            <Text className="inline-block" variant="span">
                                구매내역
                            </Text>
                        </CircleButton>
                    </Anchor>

                    <Anchor className="rounded-full" href={`${asPath}/like`}>
                        <CircleButton>
                            <Heart />
                            <Text className="inline-block" variant="span">
                                관심목록
                            </Text>
                        </CircleButton>
                    </Anchor>
                </div>

                {/* Reviews */}
                <section className="divide-y-[1px]">
                    {reviews.map((v) => (
                        <ReviewCard
                            data={v}
                            key={`review_${v.id}`}
                            userId={user?.id}
                            onClickDelete={_onClickDeleteReview}
                        />
                    ))}
                </section>
            </div>

            {/* 플로팅버튼 - 리뷰 작성 */}
            {profileData && user?.id !== profileData.profile?.id && (
                <FloatingAnchor href={`${asPath}/review`}>
                    <PencilSquare />
                </FloatingAnchor>
            )}
        </Layout>
    );
};

export default Profile;
