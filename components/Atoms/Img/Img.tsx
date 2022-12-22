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
    directSrc?: boolean;
}

const Img = ({
    src,
    variants = "public",
    alt = "img",
    className = "",
    objectFit = "scale-down",
    quality = 75,
    directSrc = false,
    priority = false,
    ...rest
}: Props) => {
    return (
        <div className={cls("relative", className)}>
            <Image
                src={directSrc ? src : getImgSource(src, variants)}
                alt={alt}
                className="rounded-sm"
                layout="fill"
                objectFit={objectFit}
                quality={quality}
                priority={priority}
                {...rest}
            />
        </div>
    );
};

export default Img;
