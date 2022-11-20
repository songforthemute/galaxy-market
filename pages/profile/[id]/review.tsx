import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import useSWR from "swr";
// types
import type { Product } from "@prisma/client";
import type { NextPage } from "next";
// custom hook
import useMutation from "@libs/client/useMutation";
// utils
import { cls, priceConverter } from "@libs/client/util";
// components
import Layout from "@components/layout";
import Btn from "@components/btn";
import TxtArea from "@components/txtArea";

// dynamic imports
const ErrorMessage = dynamic(() => import("@components/errMessage"), {
    ssr: false,
});

// interfaces
interface ReviewFormInteface {
    description: string;
}
interface SoldoutProductsReturn {
    status: boolean;
    soldoutProducts: Product[];
}
interface DropdownInterface {
    id?: string;
    text: string;
}
interface ReviewingInterface {
    status: boolean;
}

// Page
const WriteReview: NextPage = () => {
    const router = useRouter();
    // dropdown soldout items
    const [dropdownOpen, setdropdownOpen] = useState(false);
    const [dropdownValue, setDropdownValue] = useState<DropdownInterface>({
        id: undefined,
        text: "상품을 선택해주세요.",
    });
    const _onDropDownClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const { innerHTML, id } = e.target as HTMLDivElement;
        setDropdownValue({ id, text: innerHTML });
        setdropdownOpen(false);
    };

    // review form
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<ReviewFormInteface>({ reValidateMode: "onBlur" });

    // fetching for submit form
    const [reviewing, { data: mutationData, loading }] =
        useMutation<ReviewingInterface>({
            url: "/api/reviews",
            method: "POST",
        });

    // submit form
    const _onValid = ({ description }: ReviewFormInteface) => {
        // if no selected item
        if (dropdownValue.id === undefined) {
            setError("description", { message: "리뷰할 상품을 선택해주세요." });
            return;
        }

        reviewing({
            description,
            star: starScore.filter((s) => s === true).length,
            productId: dropdownValue.id,
            createdTo: router.query.id,
        });
    };

    // if success
    useEffect(() => {
        if (mutationData && mutationData.status) {
            router.push(`/profile/${router.query.id}`);
        }
    }, [mutationData, router]);

    // initialize soldout items for review
    const { data } = useSWR<SoldoutProductsReturn>(
        `/api/products/${router.query.id}/soldout`
    );

    // scoring
    const [starScore, setStarScore] = useState([
        false,
        false,
        false,
        false,
        false,
    ]);
    const _onClickStar = (e: React.MouseEvent<HTMLDivElement>) => {
        const { id } = e.currentTarget as HTMLDivElement;

        if (starScore[Number(id)] && !starScore[Number(id) + 1]) {
            setStarScore(Array(5).fill(false));
        } else {
            setStarScore(
                Array(5)
                    .fill(true, 0, Number(id) + 1)
                    .fill(false, Number(id) + 1)
            );
        }
    };

    return (
        <Layout title="리뷰하기" canGoBack>
            <form className="px-4 pt-10" onSubmit={handleSubmit(_onValid)}>
                <div className="space-y-8 -mt-4 mb-4">
                    {/*  드롭다운  */}
                    <label className="text-sm font-medium text-slate-400 block -mb-6">
                        상품 선택
                    </label>
                    <div
                        onClick={() => setdropdownOpen(!dropdownOpen)}
                        className="rounded-md shadow-md relative flex items-center hover:cursor-pointer hover:bg-slate-100 transition-all"
                    >
                        <div className="px-4 py-2 overflow-hidden rounded-full flex justify-center items-center">
                            {dropdownValue.text}
                        </div>

                        <div
                            className={cls(
                                "absolute left-0 z-40 mt-2 w-full rounded border-[.5px] border-light bg-white py-5 shadow-card transition-all",
                                dropdownOpen
                                    ? `top-full opacity-100 visible`
                                    : "top-[110%] invisible opacity-0"
                            )}
                        >
                            {data?.soldoutProducts.map((product) => (
                                <div
                                    id={String(product.id)}
                                    key={product.id}
                                    onClick={_onDropDownClick}
                                    className="block cursor-pointer py-2 px-5 text-sm font-medium hover:bg-opacity-5 hover:text-purple-400 hover:bg-purple-400 transition-all"
                                >
                                    {product.name} ({product.option}) ₩
                                    {priceConverter(String(product.price))}
                                </div>
                            ))}
                        </div>
                    </div>

                    <TxtArea
                        label="상세 후기"
                        placeholder="자세한 후기를 입력해주세요."
                        name="description"
                        register={register("description", {
                            required: "리뷰 내용을 입력해주세요.",
                        })}
                    />
                    {errors.description?.message && (
                        <ErrorMessage text={errors.description.message} />
                    )}

                    {/* 별점 */}
                    <label
                        // htmlFor={name}
                        className="text-sm font-medium text-slate-400 block"
                    >
                        {"별점"}
                    </label>
                    <div className="flex items-center justify-center space-x-2">
                        {starScore.map((star, i) => (
                            <div
                                id={`${i}`}
                                key={i}
                                onClick={_onClickStar}
                                className={cls(
                                    "hover:cursor-pointer hover:text-purple-700 transition-all",
                                    star ? "text-purple-400" : "text-slate-200"
                                )}
                            >
                                <svg
                                    className="w-full aspect-square max-h-20"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>
                        ))}
                    </div>
                </div>

                <Btn text={loading ? "등록 중이에요" : "리뷰 등록하기"} />
            </form>
        </Layout>
    );
};

export default WriteReview;
