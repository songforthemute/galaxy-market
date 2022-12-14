import { useRouter } from "next/router";
import useSWR from "swr";
import dynamic from "next/dynamic";
// types
import type { NextPage } from "next";
import type { Product } from "@prisma/client";
// utils
import { useUser, useMutation } from "@libs/client";
// components
import { Layout, ItemDetail } from "components";
// dynamic components
const FloatingAnchor = dynamic(
    () => import("@components/Molecules/FloatingAnchor")
);
const PencilSquare = dynamic(
    () => import("@components/Atoms/icons/pencilSquare")
);

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
    const { push, query, asPath } = useRouter();
    const { user } = useUser();

    // fetch data
    const { data, mutate } = useSWR<ProductReturn | undefined>(
        query.id ? `/api/products/${query?.id}` : null
    );

    // toggle like/dislike
    const [toggleLike] = useMutation({
        url: `/api/products/${query?.id}/like`,
        method: "POST",
    });
    const _onClickLike = () => {
        if (!data) return;

        toggleLike({});
        mutate({ ...data, isLiked: !data?.isLiked }, false);
    };

    // toggle selling/soldout
    const [toggleSoldout] = useMutation({
        url: `/api/products/${query?.id}/soldout`,
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
        push(`/chats/${data?.product.userId}`);
    };

    return (
        <Layout
            title="?????? ????????????"
            backwardButton
            configTab
            metaContent="This is the product details page. You can check the image or information and price of the product, register it as a product of interest, or contact the seller.
        "
        >
            <ItemDetail
                item={data?.product}
                related={data?.relatedProducts}
                isOwner={data?.product.userId === user?.id}
                isLiked={data?.isLiked}
                onClickButton={
                    data?.product.userId === user?.id
                        ? _onClickSoldout
                        : _onClickTalkSeller
                }
                onToggleLike={_onClickLike}
            />

            {/* ????????? ?????? ????????? ????????? ?????? ??? ?????? ??????????????? */}
            {data?.product.userId === user?.id && (
                <FloatingAnchor href={`${asPath}/update`}>
                    <PencilSquare />
                </FloatingAnchor>
            )}
        </Layout>
    );
};

export default ItemDetailPage;
