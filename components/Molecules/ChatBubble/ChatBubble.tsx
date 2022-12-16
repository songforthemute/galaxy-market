// utils
import { booleanCls, cls, convertDate } from "@libs/client/util";
// styles
import s from "./ChatBubble.module.css";
// component
import { Img, Text } from "@components/Atoms";

interface Props {
    avatarUrl?: string | null;
    isMine?: boolean;
    text?: string;
    date?: Date;
}

const ChatBubble = ({
    avatarUrl = null,
    isMine = false,
    text,
    date,
}: Props) => {
    return (
        <article className={cls(s.root, booleanCls(isMine, s.reverse))}>
            {avatarUrl ? (
                <Img className={s.avatar} src={avatarUrl} priority />
            ) : (
                <div className={s.empty} />
            )}

            <Text className={s.message} variant="paragraph">
                {text}
            </Text>
            <Text className={s.date} variant="span">
                {convertDate(date!)}
            </Text>
        </article>
    );
};

export default ChatBubble;
