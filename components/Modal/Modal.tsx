import { useCallback, useEffect, useRef } from "react";
import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";
import CloseIcon from "@components/icons/close";
// types
import type { FC, ReactNode, MutableRefObject } from "react";
// css
import s from "./Modal.module.css";

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
            <div ref={ref} className={s.modal}>
                <button onClick={_onClick} className={s.close}>
                    <CloseIcon />
                </button>
                <div tabIndex={-1} className="outline-none">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
