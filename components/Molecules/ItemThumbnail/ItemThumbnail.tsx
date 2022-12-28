// types
import type { KeyboardEvent } from "react";
// utils
import { cls } from "@libs/client";
// styles
import s from "./ItemThumbnail.module.css";
// Component
import { Img, Text } from "@components/Atoms";

interface Props {
    image?: string | null;
    title?: string;
    subTitle?: string | number;
    tabIndex?: number;
    onKeyDown?: (event: KeyboardEvent) => void;
    className?: string;
}

const ItemThumbnail = ({
    image,
    title,
    subTitle,
    onKeyDown,
    tabIndex,
    className = "",
}: Props) => {
    return (
        <div
            tabIndex={tabIndex}
            onKeyDown={onKeyDown}
            className={cls(s.root, className)}
        >
            {image ? (
                <Img alt="thumbnail" src={image} className={s.image} />
            ) : (
                <div className={s.empty} />
            )}
            <div className={s.container}>
                <Text variant="pageHeading" className={s.title}>
                    {title}
                </Text>
                <Text variant="contentsHeading" className={s.price}>
                    {subTitle}
                </Text>
            </div>
        </div>
    );
};

export default ItemThumbnail;
