import Image from "next/image";
// types
import type { ImageProps } from "next/image";
// utils
import { cls, getImgSource } from "@libs/client/util";

interface Props extends ImageProps {
    src: string;
    variants?: "avatar" | "public" | "thumbnail" | string;
    alt?: string;
    className?: string;
    objectFit?: "scale-down" | "contain" | "cover" | "fill";
    quality?: number;
    priority?: boolean;
}

const Img = ({
    src,
    variants = "public",
    alt = "img",
    className = "",
    objectFit = "scale-down",
    quality = 75,
    ...rest
}: Props) => {
    return (
        <div className={cls("relative", className)}>
            <Image
                src={getImgSource(src, variants)}
                alt={alt}
                className="rounded-sm"
                layout="fill"
                objectFit={objectFit}
                quality={quality}
                {...rest}
            />
        </div>
    );
};

export default Img;
