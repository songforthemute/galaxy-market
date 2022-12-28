// types
import type { FC, ReactNode } from "react";
// styles
import s from "./ReplyDetail.module.css";
// utils
import { convertDate } from "@libs/client";
// components
import { Img, Text } from "@components/Atoms";

interface Props {
    avatar?: string | null;
    text?: string;
    created?: Date;
    username?: string;
    children?: ReactNode | string | any;
}

const ReplyDetail: FC<Props> = ({
    avatar,
    text,
    created: updated,
    username,
    children,
}) => {
    return (
        <article className={s.root}>
            {avatar ? (
                <Img alt="avatar" priority src={avatar} className={s.avatar} />
            ) : (
                <div className={s.empty} />
            )}
            <div className={s.container}>
                <Text className={s.author} variant="contentsHeading">
                    {username}
                </Text>
                <Text className={s.date} variant="span">
                    {convertDate(updated!)}
                </Text>
                <Text className={s.text} variant="paragraph">
                    {text}
                </Text>
            </div>

            {children}
        </article>
    );
};

export default ReplyDetail;
