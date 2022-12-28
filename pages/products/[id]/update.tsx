import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import dynamic from "next/dynamic";
// types
import type { Product } from "@prisma/client";
import type { NextPage } from "next";
// utils
import { useMutation, useToggleModal } from "@libs/client";
// components
import { Layout, UploadItemForm, FloatingButton, Bin } from "components";
// dynamic components
const DeleteModal = dynamic(() => import("@components/Organisms/DeleteModal"));

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
interface UploadReturn {
    status: boolean;
    product: Product;
}

const UpdateItem: NextPage = () => {
    const { push, asPath } = useRouter();
    const productId = asPath.split("/")[2];

    const { modal, toggleModal } = useToggleModal();
    const _onClickDelete = () => {
        deleteMutation({ id: productId });
        toggleModal();
        push("/");
    };

    // preset value
    const { data: preset } = useSWR<ProductReturn | undefined>(
        `/api/products/${productId}`
    );

    // for update
    const [mutation, { loading, data }] = useMutation<UploadReturn>({
        url: `/api/products/${productId}`,
        method: "PUT",
    });

    // for delete
    const [deleteMutation] = useMutation<UploadReturn>({
        url: `/api/products/${productId}`,
        method: "DELETE",
    });

    // success fetch
    useEffect(() => {
        if (data?.status === true) {
            push(`/products/${productId}`);
        }
    }, [data, push, productId]);

    return (
        <Layout title="상품 업데이트" backwardButton configTab>
            {modal && <DeleteModal onClickConfirm={_onClickDelete} />}

            <UploadItemForm
                loading={loading}
                mutatorFn={mutation}
                preset={preset?.product}
            />

            <FloatingButton
                className="hover:text-rose-400"
                onClick={() => toggleModal()}
            >
                <Bin className="mx-auto" />
            </FloatingButton>
        </Layout>
    );
};

export default UpdateItem;
