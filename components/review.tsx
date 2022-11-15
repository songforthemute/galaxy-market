import { cls, dateConverter, getImgSource } from "@libs/client/util";
import Image from "next/image";
import Link from "next/link";

interface reviewProps {
    avatarUrl?: string;
    username: string;
    star: number;
    text: string;
    created: Date;
    productName: string;
    productOpt: string;
    productId: number;
    productImg?: string | null;
}

const Reviews = ({
    avatarUrl,
    username,
    created,
    star,
    text,
    productName,
    productOpt,
    productId,
    productImg,
}: reviewProps) => {
    return (
        <div className="py-4">
            <div className="mb-4 flex items-center space-x-4">
                {avatarUrl ? (
                    <div className="relative rounded-full p-6">
                        <Image
                            src={getImgSource(avatarUrl, "avatar")}
                            alt="avatar"
                            className="rounded-full"
                            layout="fill"
                            objectFit="scale-down"
                            quality={100}
                            priority
                        />
                    </div>
                ) : (
                    <div className="w-12 h-12 rounded-full bg-slate-400" />
                )}
                <div>
                    <h4 className="ml-0.5 text-sm font-bold">{username}</h4>

                    <div className="mt-0.5 flex items-center">
                        {[0, 0, 0, 0, 0].map((v, i) => (
                            <svg
                                key={i}
                                className={cls(
                                    "h-4 w-4",
                                    i < star
                                        ? "text-yellow-400"
                                        : "text-slate-400"
                                )}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                </div>
            </div>

            <div>
                <div className="text-slate-700">
                    <p>{text}</p>
                </div>

                <Link href={`/products/${productId}`}>
                    <a className="flex mt-4 space-x-2 rounded-lg hover:opacity-50 hover:text-purple-400 transition-all">
                        {productImg ? (
                            <div className="relative rounded-md p-12">
                                <Image
                                    src={getImgSource(productImg, "avatar")}
                                    alt="avatar"
                                    className="rounded-md"
                                    layout="fill"
                                    objectFit="scale-down"
                                    quality={100}
                                    priority
                                />
                            </div>
                        ) : (
                            <div className="w-12 h-12 bg-slate-400 rounded-lg" />
                        )}
                        <div className="flex flex-col space-y-1 justify-center">
                            <span className="text-sm font-medium text-slate-00">
                                {productName} ({productOpt})
                            </span>
                            <span className="text-xs text-slate-400">
                                {dateConverter(created, "Full")}
                            </span>
                        </div>
                    </a>
                </Link>
            </div>
        </div>
    );
};

export default Reviews;
