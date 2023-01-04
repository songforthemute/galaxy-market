import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";
import dynamic from "next/dynamic";
// types
import type { Product } from "@prisma/client";
import type { NextPage } from "next";
// utils
import {
    useGetKey,
    useToggleModal,
    useInfiniteScrollDown,
    booleanCls,
} from "@libs/client";
// components
import {
    Layout,
    FloatingButton,
    SearchFormModal,
    MagnifyingGlass,
    LoadingSuspense,
} from "../components";
// dynamic components
const ItemCard = dynamic(() => import("@components/Organisms/ItemCard"), {
    loading: () => <LoadingSuspense />,
});

interface FormInterface {
    name: string;
    lowestPrice?: number;
    highestPrice?: number;
    sort?: string;
}
interface ProductWithLike extends Product {
    _count: {
        record: number;
    };
}
interface SearchReturn {
    status: boolean;
    result: ProductWithLike[];
    pageNum: number;
    error?: string;
}

const Search: NextPage = () => {
    const { query, push, pathname } = useRouter();
    const { modal, toggleModal } = useToggleModal();
    // fatch data
    const getKey = useGetKey<SearchReturn>({
        url: query.name
            ? `/api/products/search?name=${query.name}&lowestPrice=${query.lowestPrice}&highestPrice=${query.highestPrice}&sort=${query.sort}`
            : null,
        hasQuery: true,
    });
    const { data, setSize } = useSWRInfinite<SearchReturn>(getKey);

    // set page number for infinite sroll
    const page = useInfiniteScrollDown();
    useEffect(() => {
        setSize(page);
    }, [setSize, page]);

    // changed received dataset
    const [results, setResults] = useState<ProductWithLike[]>([]);
    useEffect(() => {
        if (data && !data?.[0]?.error) {
            setResults(() => data.map((data) => data.result).flat());
        } else {
            setResults([]);
        }
    }, [data, setResults]);

    return (
        <Layout
            title="상품 검색하기"
            backwardButton
            dockBar
            configTab
            metaContent={
                results.length === 0
                    ? "This is the Search tab. You can search for other users' products according to the option to set them through the modal of the floating button."
                    : results.reduce((prev, curr) => prev + curr.name, "")
            }
        >
            {modal && (
                <SearchFormModal
                    onClose={() => toggleModal()}
                    onSearch={(data?: FormInterface) => {
                        push(
                            `${pathname}?name=${data?.name}&lowestPrice=${data?.lowestPrice}&highestPrice=${data?.highestPrice}&sort=${data?.sort}`,
                            pathname
                        );
                        toggleModal();
                    }}
                />
            )}

            <section className="flex flex-col divide-y-[1px]">
                {results.map((item) => (
                    <ItemCard product={item} key={`item-${item?.id}`} />
                ))}
            </section>

            <FloatingButton
                className={booleanCls(
                    Boolean(!data),
                    "animate-bounce",
                    "hover:animate-bounce"
                )}
                onClick={() => toggleModal()}
            >
                <MagnifyingGlass className="mx-auto" />
            </FloatingButton>
        </Layout>
    );
};

export default Search;
