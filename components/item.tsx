import Link from "next/link";
import { priceConverter } from "@libs/client/util";

interface ItemProps {
    href: string;
    name: string;
    imgUrl?: string;
    opt: string;
    price: number;
    likes: number;
}

const Item = ({ href, name, imgUrl, opt, price, likes }: ItemProps) => {
    return (
        <Link href={href}>
            <a className="flex p-4 cursor-pointer justify-between hover:opacity-50 transition-opacity">
                <div className="flex space-x-4">
                    <div className="w-20 h-20 bg-gray-400 rounded-md" />
                    <div className="py-1.5 flex flex-col">
                        <h3 className="text-sm font-medium text-gray-700">
                            {name}
                        </h3>
                        <span className="text-xs text-gray-400">{opt}</span>
                        <span className="font-medium mt-2 text-gray-700">
                            ₩ {priceConverter(String(price))}
                        </span>
                    </div>
                </div>

                <div className="flex items-end justify-end space-x-4">
                    <div className="flex items-center text-sm text-gray-400 space-x-1">
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            ></path>
                        </svg>
                        <span>{likes}</span>
                    </div>
                </div>
            </a>
        </Link>
    );
};

export default Item;
