import { useRouter } from "next/router";
import { useEffect } from "react";
import useMutation from "@libs/client/useMutation";
//types
import type { Product } from "@prisma/client";
import type { NextPage } from "next";
// components
import Layout from "@components/layout";
import { UploadItemForm } from "@components/Templetes";

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
    }, [data]);

    return (
        <Layout title="상품 등록" hasTabBar canGoBack>
            <UploadItemForm loading={loading} mutatorFn={mutation} />
        </Layout>
    );
};

export default UploadItem;
