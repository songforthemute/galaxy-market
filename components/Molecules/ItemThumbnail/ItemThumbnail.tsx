import s from "./ItemThumbnail.module.css";
import { Img, Text } from "@components/Atoms";

interface Props {
    image?: string | null;
    title?: string;
    subTitle?: string | number;
}

const ItemThumbnail = ({ image, title, subTitle }: Props) => {
    return (
        <div className={s.root}>
            {image ? (
                <Img src={image} className={s.image} />
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
