import { useRouter } from "next/router";
import { useEffect } from "react";
import useMutation from "@libs/client/useMutation";
//types
import type { Product } from "@prisma/client";
import type { NextPage } from "next";
// components
import Layout from "@components/layout";
import { UploadItemForm } from "@components/Templetes";
import { FloatingButton } from "@components/Molecules";
import { Bin, Button, Modal, Text } from "@components/Atoms";
import useSWR from "swr";
import { useToggleModal } from "@libs/hooks/useToggle";

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
    }, [data]);

    return (
        <Layout title="상품 업데이트" hasTabBar canGoBack>
            {modal && (
                <Modal onClose={() => toggleModal()}>
                    <div className="flex flex-col p-12 items-start">
                        <Text variant="pageHeading">
                            정말 삭제하시겠습니까?
                        </Text>
                        <Text variant="contentsHeading" className="mt-1.5 mb-8">
                            다시 복구할 수 없습니다.
                        </Text>

                        <Button
                            className="rounded-lg w-full mx-auto"
                            onClick={_onClickDelete}
                        >
                            삭제할래요
                        </Button>
                    </div>
                </Modal>
            )}

            <UploadItemForm
                loading={loading}
                mutatorFn={mutation}
                preset={preset?.product}
            />

            <FloatingButton
                className="hover:text-rose-400"
                onClick={() => toggleModal()}
            >
                <Bin />
            </FloatingButton>
        </Layout>
    );
};

export default UpdateItem;
