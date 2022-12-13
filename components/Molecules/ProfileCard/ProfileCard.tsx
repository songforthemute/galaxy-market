import { ChevronRight, Img, Text } from "@components/Atoms";
import s from "./ProfileCard.module.css";

interface Props {
    avatar?: string | null;
    username?: string;
    subtext?: string;
}

const ProfileCard = ({ avatar, username, subtext }: Props) => {
    return (
        <article className={s.root}>
            {avatar ? (
                <Img src={avatar} className={s.avatar} priority />
            ) : (
                <div className={s.empty} />
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
        </article>
    );
};

export default ProfileCard;
