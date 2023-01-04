// types
import type { MouseEvent } from "react";
// utils
import { booleanCls, cls } from "@libs/client";
// styles
import s from "./Scoring.module.css";
// component
import { Star } from "@components/Atoms";

interface Props {
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    score?: number;
    className?: string;
}

const star = [1, 2, 3, 4, 5];

const Scoring = ({ onClick, score, className = "" }: Props) => {
    return (
        <div className={s.root}>
            {star.map((v) => (
                <button
                    aria-label="Score for Upload Review"
                    className={cls(
                        s.button,
                        className,
                        booleanCls(Boolean((score || 0) >= v), s.active)
                    )}
                    onClick={onClick}
                    type="button"
                    key={`star_${v}`}
                    data-score={v}
                >
                    <Star
                        fill={Boolean((score || 0) >= v)}
                        className="w-10 h-10"
                        strokeWidth={1}
                    />
                </button>
            ))}
        </div>
    );
};

export default Scoring;
