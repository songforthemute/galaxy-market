// utils
import { booleanCls, cls } from "@libs/client";
// styles
import s from "./Rating.module.css";
// icons
import { Star } from "@components/Atoms/icons";

interface Props {
    className?: string;
    value: number;
}

const Rating = ({ className = "", value = 5 }: Props) => {
    const rate: boolean[] = new Array(5)
        .fill(true, 0, value)
        .fill(false, value);
    return (
        <div className={cls(s.root, className)}>
            {rate.map((v, i) => (
                <span
                    key={i}
                    className={cls(s.star, booleanCls(Boolean(v), s.on, s.off))}
                >
                    <Star fill={Boolean(v)} />
                </span>
            ))}
        </div>
    );
};

export default Rating;
