import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
// types
import type { Product } from "@prisma/client";
import type { NextPage } from "next";
// custom hook
import useMutation from "@libs/client/useMutation";
// components
import Layout from "@components/layout";
import { ReviewForm } from "@components/Templetes";

// interfaces
interface SoldoutProductsReturn {
    status: boolean;
    soldoutProducts: Product[];
}
interface ReviewingInterface {
    status: boolean;
}

// Page
const WriteReview: NextPage = () => {
    const { query, push } = useRouter();

    // fetching for submit form
    const [reviewing, { data: mutateReturn, loading }] =
        useMutation<ReviewingInterface>({
            url: `/api/users/reviews?createdTo=${query.id}`,
            method: "POST",
        });

    // if success
    useEffect(() => {
        if (mutateReturn && mutateReturn.status) {
            push(`/profile/${query.id}`);
        }
    }, [mutateReturn]);

    // initialize soldout items for review
    const { data } = useSWR<SoldoutProductsReturn>(
        `/api/products/${query.id}/soldout`
    );

    return (
        <Layout title="리뷰하기" backwardButton>
            <ReviewForm
                loading={loading}
                soldoutList={data?.soldoutProducts}
                mutatorFn={reviewing}
            />
        </Layout>
    );
};

export default WriteReview;
