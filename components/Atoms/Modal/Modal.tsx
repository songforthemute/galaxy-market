import { useCallback, useEffect, useRef } from "react";
import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";
// types
import type { FC, ReactNode, MutableRefObject } from "react";
// styles
import s from "./Modal.module.css";
// components
import { Close } from "@components/Atoms/icons";

interface Props {
    children?: ReactNode;
    // className?: string;
    onClose: () => void;
}

const Modal: FC<Props> = ({ children, onClose }) => {
    const ref = useRef() as MutableRefObject<HTMLDivElement>;

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
        const { current } = ref;

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
        <div className={s.root}>
            <div aria-modal={true} ref={ref} className={s.modal}>
                <button
                    aria-label={"Closing Modal Button"}
                    onClick={_onClick}
                    className={s.close}
                >
                    <Close />
                </button>
                <div tabIndex={-1} className={s.content}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
