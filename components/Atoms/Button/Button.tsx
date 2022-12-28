import { forwardRef, useRef } from "react";
// types
import type { ButtonHTMLAttributes, FC } from "react";
// util
import { booleanCls, cls, useMergeRefs } from "@libs/client";
// css
import s from "./Button.module.css";
import LoadingDots from "@components/Atoms/LoadingDots";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    href?: string;
    className?: string;
    loading?: boolean;
    disabled?: boolean;
    active?: boolean;
    variant?: Variant;
    onClick?: () => void;
}

type Variant = "normal" | "chromaOutline" | "achromaOutline";

const Button: FC<Props> = forwardRef(
    (
        {
            href,
            variant = "normal",
            className = "",
            loading = false,
            disabled = false,
            active,
            children,
            onClick,
            ...rest
        },
        buttonRef
    ) => {
        const ref = useRef(null);

        return (
            <button
                aria-pressed={active}
                ref={useMergeRefs<any>(ref, buttonRef)}
                className={cls(
                    className,
                    s.root,
                    booleanCls(loading, s.loading),
                    booleanCls(disabled, s.disabled),
                    s[variant]
                )}
                disabled={disabled}
                onClick={onClick}
                {...rest}
            >
                {!loading ? (
                    children
                ) : (
                    <span className="m-0 inline-flex">
                        <LoadingDots />
                    </span>
                )}
            </button>
        );
    }
);
Button.displayName = "Button";

export default Button;
