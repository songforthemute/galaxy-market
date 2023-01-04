import { useRouter } from "next/router";
import { useEffect } from "react";
//types
import type { Product } from "@prisma/client";
import type { NextPage } from "next";
// utiis
import { useMutation } from "@libs/client";
// components
import { Layout, UploadItemForm } from "components";

interface UploadReturn {
    status: boolean;
    product: Product;
}

const UploadItem: NextPage = () => {
    const { push } = useRouter();
    const [mutation, { loading, data }] = useMutation<UploadReturn>({
        url: "/api/products",
        method: "POST",
    });

    useEffect(() => {
        if (data?.status === true) {
            push(`/products/${data.product.id}`);
        }
    }, [data, push]);

    return (
        <Layout
            title="상품 업로드하기"
            backwardButton
            configTab
            metaContent="This is the product upload page. You can upload the product you want to sell."
        >
            <UploadItemForm loading={loading} mutatorFn={mutation} />
        </Layout>
    );
};

export default UploadItem;
