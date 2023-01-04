import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
// types
import type { Product } from "@prisma/client";
import type { NextPage } from "next";
// utils
import { useMutation } from "@libs/client";
// components
import { Layout, ReviewForm } from "components";

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
    }, [mutateReturn, query.id, push]);

    // initialize soldout items for review
    const { data } = useSWR<SoldoutProductsReturn>(
        `/api/products/${query.id}/soldout`
    );

    return (
        <Layout
            title="리뷰하기"
            backwardButton
            metaContent="This is the review page on the Profiles tab. You can upload reviews of products purchased from the user."
        >
            <ReviewForm
                loading={loading}
                soldoutList={data?.soldoutProducts}
                mutatorFn={reviewing}
            />
        </Layout>
    );
};

export default WriteReview;
