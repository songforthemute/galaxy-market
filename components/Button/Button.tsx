import { forwardRef, useRef } from "react";
// types
import type { ButtonHTMLAttributes, JSXElementConstructor, FC } from "react";
// hooks
import { useMergeRefs } from "@libs/hooks/useMergeRefs";
// util
import { booleanCls, cls } from "@libs/client/util";
// css
import s from "./Button.module.css";
import LoadingDots from "@components/LoadingDots";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    href?: string;
    className?: string;
    Component?: JSXElementConstructor<any> | string;
    loading?: boolean;
    disabled?: boolean;
    active?: boolean;
    variant?: Variant;
    type?: "button" | "submit";
    onClick?: () => void;
}

type Variant = "normal" | "chromaOutline" | "achromaOutline";

const Button: FC<Props> = forwardRef(
    (
        {
            href,
            variant = "normal",
            className = "",
            Component = "button",
            loading = false,
            disabled = false,
            active,
            children,
            onClick,
            ...rest
        },
        buttonRef
    ) => {
        const ref = useRef<typeof Component>(null);

        return (
            <Component
                aria-pressed={active}
                ref={useMergeRefs<any>(ref, buttonRef)}
                className={cls(
                    className,
                    s.root,
                    booleanCls(loading, s.loading),
                    booleanCls(disabled, s.disabled),
                    booleanCls(true, s[variant])
                )}
                disabled={disabled}
                onClick={onClick}
                {...rest}
            >
                {!loading ? (
                    children
                ) : (
                    <i className="m-0 flex">
                        <LoadingDots />
                    </i>
                )}
            </Component>
        );
    }
);

export default Button;
