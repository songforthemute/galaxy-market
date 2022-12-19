// typs
import type { KeyboardEvent } from "react";
// utils
import { cls, booleanCls } from "@libs/client/util";
// styles
import s from "./ProfileCard.module.css";
// components
import { ChevronRight, Img, Text } from "@components/Atoms";

interface Props {
    avatar?: string | null;
    username?: string;
    subtext?: string | any;
    isSquare?: boolean;
    onKeyDown?: (e: KeyboardEvent) => void;
    tabIndex?: number;
}

const ProfileCard = ({
    avatar,
    username,
    subtext,
    isSquare = false,
    onKeyDown,
    tabIndex,
}: Props) => {
    return (
        <div tabIndex={tabIndex} onKeyDown={onKeyDown} className={s.root}>
            {avatar ? (
                <Img
                    alt={isSquare ? "item" : "avatar"}
                    src={avatar}
                    className={cls(
                        s.avatar,
                        booleanCls(isSquare, s.square, s.circle)
                    )}
                    priority
                />
            ) : (
                <div
                    className={cls(
                        s.empty,
                        booleanCls(isSquare, s.square, s.circle)
                    )}
                />
            )}

            <div className={s.profile}>
                <Text variant="contentsHeading" className={s.username}>
                    {username}
                </Text>
                <Text variant="span" className={s.subtext}>
                    {subtext}
                </Text>
            </div>

            <ChevronRight className={s.chevron} w={4} h={4} strokeWidth={2} />
        </div>
    );
};

export default ProfileCard;
