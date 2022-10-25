import type { NextPage } from "next";
import Btn from "@components/btn";
import Layout from "@components/layout";
import UserCard from "@components/userCard";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Product } from "@prisma/client";
import { cls, priceConverter } from "@libs/client/util";
import Link from "next/link";
import useMutation from "@libs/client/useMutation";

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

const ItemDetail: NextPage = () => {
    const router = useRouter();
    const { data } = useSWR<ProductReturn | undefined>(
        router.query.id ? `/api/products/${router.query?.id}` : null
    );

    const [toggleLike] = useMutation(`/api/products/${router.query?.id}/like`);
    const _onLikeClick = () => {
        toggleLike({});
        console.log("toggle Like!");
    };

    return (
        <Layout title="상품 상세" hasTabBar canGoBack>
            <div className="p-4">
                {data?.product ? (
                    <>
                        <div className="mb-8">
                            <div className="h-96 bg-gray-400 mb-4" />

                            <UserCard
                                text="프로필 보기 &rarr;"
                                username={data.product.user?.username}
                                avatarUrl={data.product.user?.avatarUrl}
                                type="profile"
                                href={`/profile/${data.product.userId}`}
                                hasBorder
                            />

                            <div className="mt-8 space-y-4">
                                <h1 className="text-3xl font-bold text-black">
                                    {data?.product?.name}
                                </h1>
                                <div className="text-2xl mt-1 text-gray-700">
                                    {priceConverter(
                                        String(data?.product?.price)
                                    )}{" "}
                                    원
                                </div>
                                <p className="text-base mt-4 text-gray-700">
                                    {data?.product?.description}
                                </p>
                                <div className="flex items-center justify-between space-x-2 my-4">
                                    <Btn text={"판매자에게 연락하기"} />

                                    {/* Like Toggle Btn */}
                                    <button
                                        onClick={_onLikeClick}
                                        className={cls(
                                            "p-2 flex items-center justify-center transition-all hover:animate-bounce",
                                            data.isLiked
                                                ? "text-red-400 hover:text-gray-400"
                                                : "text-gray-400 hover:text-red-400"
                                        )}
                                    >
                                        {data.isLiked ? (
                                            <svg
                                                className="w-6 h-6"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                className="h-6 w-6 "
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="">
                            <h2 className="text-xl font-medium text-gray-700">
                                유사한 상품
                            </h2>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                {data?.relatedProducts?.map((prod) => (
                                    <Link
                                        key={prod.id}
                                        href={`/products/${prod.id}`}
                                    >
                                        <a className="cursor-pointer transition-all hover:opacity-50">
                                            <div className="h-56 w-56 mb-2 bg-gray-400" />
                                            <h3 className="text-sm font-semibold text-gray-700 -mb-1">
                                                {prod.name}
                                            </h3>
                                            <span className="text-sm font-medium text-gray-400">
                                                ₩{" "}
                                                {priceConverter(
                                                    String(prod.price)
                                                )}
                                            </span>
                                        </a>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    // Skeleton Loading Component
                    <div className="flex w-full flex-1 flex-col items-center mb-8">
                        <div className="w-full animate-pulse flex-row items-center justfiy-center space-x-1 space-y-4">
                            <div className="h-96 bg-gray-400 rounded-xl" />
                            <div className="h-16 rounded-md bg-gray-400" />
                            <div className="flex flex-col mt-8 space-y-2">
                                <div className="h-10 w-1/2 rounded-md bg-gray-400" />
                                <div className="h-10 w-1/3 rounded-md bg-gray-400" />
                                <div className="h-32 w-3/4 rounded-md bg-gray-400" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default ItemDetail;
