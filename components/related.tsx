import { priceConverter } from "@libs/client/util";
import Link from "next/link";

interface relatedInterface {
    price: number;
    href: string;
    name: string;
}

const Related = ({ price, href, name }: relatedInterface) => {
    return (
        <Link href={href}>
            <a className="cursor-pointer transition-all hover:opacity-50 space-y-2">
                <div className="aspect-square max-h-80 bg-slate-400 rounded-md" />
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
