import { Suspense } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import useSWR from "swr";
// types
import type { NextPage } from "next";
import type { Product } from "@prisma/client";
// custom hooks
import useUser from "@libs/client/useUser";
import useMutation from "@libs/client/useMutation";
// utils
import { getImgSource } from "@libs/client/util";
// components
import Layout from "@components/layout";
import SkeletonRelated from "@components/skeleton/related";
import SkeletonItemDetail from "@components/skeleton/detailedItem";
import SkeletonUserCard from "@components/skeleton/userCard";

// dynamic imports
const Image = dynamic(() => import("next/image"), {
    ssr: false,
    suspense: true,
});
const Related = dynamic(() => import("@components/related"), {
    ssr: false,
    suspense: true,
});
const UserCard = dynamic(() => import("@components/userCard"), {
    ssr: false,
    suspense: true,
});
const Btn = dynamic(() => import("@components/btn"), {
    ssr: true,
    suspense: true,
});
const ItemDetail = dynamic(() => import("@components/itemDetail"), {
    ssr: false,
    suspense: true,
});

// interfaces
interface ProductWithUserInterface extends Product {
    user: {
        username: string;
        avatarUrl: string;
    };
}
interface ProductReturn {
    status: boolean;
    product: ProductWithUserInterface;
    relatedProducts: Product[];
    isLiked: boolean;
}

// Page
const ItemDetailPage: NextPage = () => {
    const router = useRouter();
    const { user } = useUser();

    // fetch data
    const { data, mutate } = useSWR<ProductReturn | undefined>(
        router.query.id ? `/api/products/${router.query?.id}` : null
    );

    // toggle like/dislike
    const [toggleLike] = useMutation({
        url: `/api/products/${router.query?.id}/like`,
        method: "POST",
    });
    const _onClickLike = () => {
        if (!data) return;

        toggleLike({});
        mutate({ ...data, isLiked: !data?.isLiked }, false);
    };

    // toggle selling/soldout
    const [toggleSoldout] = useMutation({
        url: `/api/products/${router.query?.id}/soldout`,
        method: "PUT",
    });
    const _onClickSoldout = () => {
        if (!data) return;

        toggleSoldout({ isSoldout: data.product.isSoldOut });
        mutate(
            {
                ...data,
                product: {
                    ...data.product,
                    isSoldOut: !data.product.isSoldOut,
                },
            },
            false
        );
    };

    // event handler - talk to seller
    const _onClickTalkSeller = () => {
        router.push(`/chats/${data?.product.userId}`);
    };

    return (
        <Layout title="상품 상세" canGoBack>
            <div className="p-4 space-y-10">
                <div className="mb-10">
                    {data?.product && (
                        <>
                            {data.product.image ? (
                                <Suspense
                                    fallback={
                                        <div className="w-full max-h-96 aspect-[4/3] bg-slate-400 mb-4 rounded-md" />
                                    }
                                >
                                    <div className="mx-auto mb-4 max-h-96 aspect-[4/3] relative">
                                        <Image
                                            src={getImgSource(
                                                data.product.image
                                            )}
                                            alt="image"
                                            layout="fill"
                                            objectFit="scale-down"
                                            priority
                                        />
                                    </div>
                                </Suspense>
                            ) : (
                                <div className="w-full max-h-96 aspect-[4/3] bg-slate-400 mb-4 rounded-md" />
                            )}

                            <Suspense fallback={<SkeletonUserCard />}>
                                <UserCard
                                    text="프로필 보기 &rarr;"
                                    username={data.product.user?.username!}
                                    avatarUrl={data.product.user?.avatarUrl}
                                    type="profile"
                                    href={`/profile/${data.product.userId}`}
                                    hasBorder
                                />
                            </Suspense>

                            <Suspense fallback={<SkeletonItemDetail />}>
                                <ItemDetail
                                    _onClickLike={_onClickLike}
                                    isLiked={data.isLiked}
                                    name={data.product.name}
                                    description={data.product.description}
                                    price={data.product.price}
                                >
                                    {user?.id !== data.product.userId ? (
                                        <Btn
                                            text={"판매자에게 연락하기"}
                                            _onClick={_onClickTalkSeller}
                                        />
                                    ) : (
                                        <Btn
                                            text={
                                                data.product.isSoldOut
                                                    ? "판매 재개하기"
                                                    : "판매 완료하기"
                                            }
                                            _onClick={_onClickSoldout}
                                        />
                                    )}
                                </ItemDetail>
                            </Suspense>
                        </>
                    )}
                </div>

                {data?.relatedProducts?.length && (
                    <>
                        <h2 className="mb-8 text-2xl font-medium text-slate-700">
                            이런 상품은 어떠세요?
                        </h2>
                        <div className="max-w-lg grid grid-cols-2 gap-4">
                            {data.relatedProducts.map((prod) => (
                                <Suspense
                                    fallback={<SkeletonRelated />}
                                    key={prod.id}
                                >
                                    <Related
                                        key={prod.id}
                                        href={`/products/${prod.id}`}
                                        name={prod.name}
                                        price={prod.price}
                                        imageUrl={prod.image}
                                    />
                                </Suspense>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </Layout>
    );
};

export default ItemDetailPage;
