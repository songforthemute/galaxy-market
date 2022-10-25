import type { NextPage } from "next";
import Btn from "@components/btn";
import Layout from "@components/layout";
import UserCard from "@components/userCard";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Product } from "@prisma/client";
import { priceConverter } from "@libs/client/util";
import Link from "next/link";

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
}

const ItemDetail: NextPage = () => {
    const router = useRouter();
    const { data } = useSWR<ProductReturn | undefined>(
        router.query.id ? `/api/products/${router.query?.id}` : null
    );

    console.log(data);

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
                                    <button className="p-2 flex items-center justify-center text-gray-400 rounded-md focus:text-red-400 focus:outline-none hover:text-red-100 transition-colors">
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
                                    <Link href={`/products/${prod.id}`}>
                                        <a
                                            key={prod.id}
                                            className="cursor-pointer transition-all hover:opacity-50"
                                        >
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
