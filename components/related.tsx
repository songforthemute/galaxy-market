import { getImgSource, priceConverter } from "@libs/client/util";
import Link from "next/link";
import dynamic from "next/dynamic";

const Image = dynamic(() => import("next/image"), {
    ssr: false,
});

interface relatedInterface {
    price: number;
    href: string;
    name: string;
    imageUrl?: string | null;
}

const Related = ({ price, href, name, imageUrl }: relatedInterface) => {
    return (
        <Link href={href}>
            <a className="cursor-pointer hover:opacity-50 space-y-2">
                {imageUrl ? (
                    <div className="aspect-square mx-auto mb-4 relative">
                        <Image
                            src={getImgSource(imageUrl)}
                            alt={`image_${name}`}
                            layout="fill"
                            objectFit="scale-down"
                            priority={false}
                        />
                    </div>
                ) : (
                    <div className="aspect-square max-h-72 bg-slate-400 rounded-md" />
                )}
                {/* 이미지 */}
                <h3 className="text-base font-semibold text-slate-700">
                    {name}
                </h3>
                <span className="text-sm font-medium text-slate-400">
                    ₩ {priceConverter(String(price))}
                </span>
            </a>
        </Link>
    );
};

export default Related;
