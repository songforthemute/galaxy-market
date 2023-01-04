import { useCallback, useEffect, useRef } from "react";
import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";
// types
import type { FC, ReactNode, MutableRefObject } from "react";
// utils
import { cls } from "@libs/client";
// styles
import s from "./Sidebar.module.css";
// components
import { Close } from "@components/Atoms";

interface Props {
    children?: ReactNode;
    className?: string;
    onClose: () => void;
}

const Sidebar: FC<Props> = ({ children, onClose, className = "" }) => {
    const sidebarRef = useRef() as MutableRefObject<HTMLDivElement>;
    const contentRef = useRef() as MutableRefObject<HTMLDivElement>;

    const _onClick = () => onClose();

    const handleKeydownEscape = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                return onClose();
            }
        },
        [onClose]
    );

    useEffect(() => {
        if (sidebarRef.current) {
            sidebarRef.current.focus();
        }

        const { current } = contentRef;

        if (current) {
            disableBodyScroll(current, { reserveScrollBarGap: true });
            window.addEventListener("keydown", handleKeydownEscape);
        }

        return () => {
            clearAllBodyScrollLocks();
            window.removeEventListener("keydown", handleKeydownEscape);
        };
    }, [handleKeydownEscape]);

    return (
        <nav className={s.root} ref={sidebarRef}>
            <div className={s.container}>
                <section aria-modal={true} className={s.sidebar}>
                    <div className="w-full h-full md:w-screen md:max-w-md">
                        <button
                            aria-label="Closing Sidebar Button"
                            onClick={_onClick}
                            className={s.close}
                        >
                            <Close />
                        </button>
                        <div
                            tabIndex={-1}
                            className={cls(s.content, className)}
                            ref={contentRef}
                        >
                            {children}
                        </div>
                    </div>
                </section>
            </div>
        </nav>
    );
};

export default Sidebar;
