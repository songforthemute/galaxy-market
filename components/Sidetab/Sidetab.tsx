import { useCallback, useEffect, useRef } from "react";
import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";
// types
import type { FC, ReactNode, MutableRefObject } from "react";
// css
import s from "./Sidetab.module.css";
import CloseIcon from "@components/icons/close";

interface Props {
    children?: ReactNode;
    className?: string;
    onClose: () => void;
}

const Sidetab: FC<Props> = ({ children, onClose }) => {
    const sidetabRef = useRef() as MutableRefObject<HTMLDivElement>;
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
        if (sidetabRef.current) {
            sidetabRef.current.focus();
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
        <aside className={s.root} ref={sidetabRef}>
            <div className={s.container}>
                <section className={s.sidetab}>
                    <div className="w-full h-full">
                        <button onClick={onClose} className={s.close}>
                            <CloseIcon />
                        </button>
                        <div className={s.content} ref={contentRef}>
                            {children}
                        </div>
                    </div>
                </section>
            </div>
        </aside>
    );
};

export default Sidetab;
