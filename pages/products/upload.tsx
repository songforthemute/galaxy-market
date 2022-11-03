import type { NextPage } from "next";
import Btn from "@components/btn";
import Input from "@components/input";
import Layout from "@components/layout";
import TxtArea from "@components/txtArea";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useEffect } from "react";
import { Product } from "@prisma/client";
import { useRouter } from "next/router";

interface UploadProductFormInterface {
    name: string;
    price: number;
    option?: string;
    description?: string;
}

interface UploadProductReturn {
    status: boolean;
    product: Product;
}

const Upload: NextPage = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UploadProductFormInterface>();
    const [uploadProduct, { loading, data }] = useMutation<UploadProductReturn>(
        { url: "/api/products", method: "POST" }
    );

    const _onValid = (data: UploadProductFormInterface) => {
        if (loading) return;

        uploadProduct(data);
    };

    // 데이터베이스에 생성 잘 되나 프론트단에 product 안넘어옴 => then으로 해결
    useEffect(() => {
        if (data?.status) {
            router.push(`/products/${data.product.id}`);
        }
    }, [data, router]);

    return (
        <Layout title="상품 등록" hasTabBar canGoBack>
            <form className="px-4 pt-10" onSubmit={handleSubmit(_onValid)}>
                <div>
                    <label
                        className="w-full h-48 flex items-center justify-center
                            border-2 border-dashed border-slate-700 py-8 rounded-md
                          text-slate-700 hover:text-purple-400 hover:border-purple-400 transition-colors cursor-pointer"
                    >
                        <svg
                            className="h-12 w-12"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                        >
                            <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>

                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                        />
                    </label>
                </div>

                <div className="space-y-8 mt-8 mb-4">
                    <Input
                        name="name"
                        label="상품명"
                        required
                        placeholder="상품명을 입력해주세요."
                        register={register("name", { required: true })}
                        isCheckOk={Boolean(!errors.name)}
                    />

                    <Input
                        name="option"
                        label="옵션"
                        placeholder="옵션을 입력해주세요."
                        register={register("option")}
                        isCheckOk={Boolean(!errors.option)}
                    />

                    <Input
                        name="price"
                        label="가격"
                        type="price"
                        required
                        placeholder="0"
                        register={register("price", { required: true })}
                    />

                    <TxtArea
                        label="상품 설명"
                        placeholder="상품 설명을 입력해주세요."
                        name="description"
                        register={register("description")}
                    />
                </div>

                <Btn text={loading ? "등록 중이에요" : "상품 등록하기"} />
            </form>
        </Layout>
    );
};

export default Upload;
