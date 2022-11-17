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
            <a className="cursor-pointer transition-all hover:opacity-50">
                <div className="h-56 w-56 mb-2 bg-slate-400" />
                <h3 className="text-sm font-semibold text-slate-700 -mb-1">
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
