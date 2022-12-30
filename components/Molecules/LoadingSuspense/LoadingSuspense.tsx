// utils
import { booleanCls, cls } from "@libs/client";
// styles
import s from "./LoadingSuspense.module.css";
// components
import { LoadingDots } from "@components/Atoms";

interface Props {
    variant?: "full" | "circle";
}

const LoadingSuspense = ({ variant = "full" }: Props) => {
    return (
        <div
            className={cls(
                s.root,
                booleanCls(variant === "full", s.full, s.circle)
            )}
        >
            <LoadingDots />
        </div>
    );
};

export default LoadingSuspense;
