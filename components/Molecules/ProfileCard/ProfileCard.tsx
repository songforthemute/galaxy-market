import s from "./ProfileCard.module.css";
import { ChevronRight, Img, Text } from "@components/Atoms";
import { cls, booleanCls } from "@libs/client/util";

interface Props {
    avatar?: string | null;
    username?: string;
    subtext?: string | any;
    isSquare?: boolean;
}

const ProfileCard = ({
    avatar,
    username,
    subtext,
    isSquare = false,
}: Props) => {
    return (
        <div className={s.root}>
            {avatar ? (
                <Img
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
