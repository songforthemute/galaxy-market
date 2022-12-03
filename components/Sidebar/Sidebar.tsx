import { useCallback, useEffect, useRef } from "react";
import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";
// types
import type { FC, ReactNode, MutableRefObject } from "react";
// css
import s from "./Sidebar.module.css";
import Close from "@components/icons/close";

interface Props {
    children?: ReactNode;
    className?: string;
    onClose: () => void;
}

const Sidebar: FC<Props> = ({ children, onClose }) => {
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

    // NEED TO AUTOFOCUS => useForm()
    return (
        <aside className={s.root} ref={sidebarRef}>
            <div className={s.container}>
                <section className={s.sidebar}>
                    <div className="w-full h-full md:w-screen md:max-w-md">
                        <button onClick={_onClick} className={s.close}>
                            <Close />
                        </button>
                        <div
                            tabIndex={-1}
                            className={s.content}
                            ref={contentRef}
                        >
                            {children}
                        </div>
                    </div>
                </section>
            </div>
        </aside>
    );
};

export default Sidebar;
