import { useRouter } from "next/router";
import useSWR from "swr";
// types
import type { NextPage } from "next";
import type { Product } from "@prisma/client";
// custom hooks
import useUser from "@libs/client/useUser";
import useMutation from "@libs/client/useMutation";
// components
import Layout from "@components/layout";
import { ItemDetail } from "@components/Templetes";
import { FloatingButton } from "@components/Molecules";

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
    const { push, query } = useRouter();
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
        <Layout title="상품 상세" canGoBack>
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

            {/* 템플릿 외의 페이지 단에서 수정 및 삭제 플로팅버튼 */}
            {/* <FloatingButton href="/" /> */}
        </Layout>
    );
};

export default ItemDetailPage;
