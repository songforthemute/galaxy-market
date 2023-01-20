import { forwardRef } from "react";
// types
import type { ButtonHTMLAttributes, FC, MutableRefObject } from "react";
// util
import { booleanCls, cls } from "@libs/client";
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
        return (
            <button
                aria-pressed={active}
                ref={buttonRef as MutableRefObject<HTMLButtonElement>}
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
