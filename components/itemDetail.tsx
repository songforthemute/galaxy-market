import { cls, priceConverter } from "@libs/client/util";

interface itemDetailInterface {
    children: React.ReactNode;
    name: string;
    description?: string | null;
    price: number;
    _onClickLike: () => void;
    isLiked: boolean;
}

const ItemDetail = ({
    children,
    name,
    description,
    price,
    _onClickLike,
    isLiked,
}: itemDetailInterface) => {
    return (
        <div className="mt-8 space-y-2.5">
            <h1 className="text-3xl font-bold text-black">{name}</h1>

            <div className="text-2xl mt-1 text-slate-700">
                {priceConverter(String(price))} 원
            </div>
            {description && (
                <p className="text-base mt-4 text-slate-700">{description}</p>
            )}
            <div className="flex items-center justify-between space-x-2 my-4">
                {children}

                {/* Like Toggle Btn */}
                <button
                    onClick={_onClickLike}
                    className={cls(
                        "p-2 flex items-center justify-center transition-all hover:animate-bounce",
                        isLiked
                            ? "text-red-400 hover:text-slate-400"
                            : "text-slate-400 hover:text-red-400"
                    )}
                >
                    {isLiked ? (
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
    );
};

export default ItemDetail;
