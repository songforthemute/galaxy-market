import { Bulb, ChatBubbleSquare, Quantity } from "@components/Atoms";
import { booleanCls, cls } from "@libs/client/util";
import s from "./PostReaction.module.css";

interface Props {
    onClickInterest?: () => void;
    interest?: number;
    replies?: number;
    isInterested?: boolean;
    className?: string;
}

const PostReaction = ({
    interest,
    replies,
    onClickInterest,
    isInterested = false,
    className = "",
}: Props) => {
    return (
        <div className={cls(s.root, className)}>
            {onClickInterest ? (
                <button
                    onClick={onClickInterest}
                    className={booleanCls(isInterested, s.on)}
                >
                    <Quantity>
                        <Bulb className={s.icon} strokeWidth={1.5} />
                        <span>궁금해요 {interest}</span>
                    </Quantity>
                </button>
            ) : (
                <div>
                    <Quantity>
                        <Bulb className={s.icon} strokeWidth={1.5} />
                        <span>궁금해요 {interest}</span>
                    </Quantity>
                </div>
            )}
            <div>
                <Quantity>
                    <ChatBubbleSquare className={s.icon} strokeWidth={1.5} />
                    <span>댓글 {replies}</span>
                </Quantity>
            </div>
        </div>
    );
};

export default PostReaction;
