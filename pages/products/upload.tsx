import type { NextPage } from "next";
import Btn from "@components/btn";
import Input from "@components/input";
import Layout from "@components/layout";
import TxtArea from "@components/txtArea";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useEffect, useState } from "react";
import { Product } from "@prisma/client";
import { useRouter } from "next/router";
import { cls, fetcher } from "@libs/client/util";
import dynamic from "next/dynamic";

const Image = dynamic(() => import("next/image"), {
    ssr: false,
});

interface UploadProductFormInterface {
    name: string;
    price: number;
    option?: string;
    description?: string;
    image: FileList;
}

interface UploadProductReturn {
    status: boolean;
    product: Product;
}

interface CloudflareURLInterface {
    status: boolean;
    id: string;
    uploadURL: string;
}

interface CloudflareURLResponseInterface {
    errors?: any[];
    messages?: any[];
    success: boolean;
    result: {
        id: string;
        filename: string;
        uploaded: string;
        requireSignedURLs: boolean;
        variants: string[];
    };
}

const Upload: NextPage = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<UploadProductFormInterface>();
    const [uploadProduct, { loading, data }] = useMutation<UploadProductReturn>(
        { url: "/api/products", method: "POST" }
    );

    // attach image
    const attachment = watch("image");
    const [attachmentPreview, setAttachmentPreview] = useState("");

    useEffect(() => {
        if (attachment && attachment.length > 0) {
            const imgUrl = URL.createObjectURL(attachment[0]);
            setAttachmentPreview(imgUrl);
        }
    }, [attachment]);

    // submit
    const _onValid = async ({
        name,
        description,
        image,
        price,
        option,
    }: UploadProductFormInterface) => {
        if (loading) return;

        if (image && image.length > 0) {
            // request Cloudflare url for upload
            const { uploadURL }: CloudflareURLInterface = await fetcher(
                `/api/files`
            );

            // create form
            const form = new FormData();
            form.append("file", attachment[0], name);

            // upload img
            const {
                result: { id },
            }: CloudflareURLResponseInterface = await fetcher(uploadURL, {
                method: "POST",
                body: form,
            });

            uploadProduct({ name, price, option, description, imageUrlId: id });
        } else {
            uploadProduct({ name, price, option, description });
        }
    };

    // 데이터베이스에 생성 잘 되나 프론트단에 product 안넘어옴 => then으로 해결
    useEffect(() => {
        if (data?.status) {
            router.push(`/products/${data.product.id}`);
        }
    }, [data, router]);

    return (
        <Layout title="상품 등록" hasTabBar canGoBack>
            <form className="p-4" onSubmit={handleSubmit(_onValid)}>
                <div>
                    <label
                        htmlFor="image"
                        className={cls(
                            "w-full rounded-md hover:border-purple-400 transition-colors cursor-pointer",
                            attachmentPreview
                                ? ""
                                : "flex items-center justify-center py-24 border-2 border-dashed border-slate-700 text-slate-700 hover:text-purple-400"
                        )}
                    >
                        {attachmentPreview ? (
                            <div className="mx-auto py-48 relative rounded-md hover:opacity-50 transition-all cursor-pointer">
                                <Image
                                    src={attachmentPreview}
                                    alt="image"
                                    className="rounded-md"
                                    layout="fill"
                                    objectFit="scale-down"
                                    quality={100}
                                    priority
                                />
                            </div>
                        ) : (
                            <svg
                                className="h-14 w-14"
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
                        )}
                        <input
                            {...register("image")}
                            id="image"
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
