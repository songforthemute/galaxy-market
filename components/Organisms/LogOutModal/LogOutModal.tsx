// styles
import s from "./LogOutModal.module.css";
// components
import { Button, Modal, Text } from "@components/Atoms";

interface Props {
    onClose: () => void;
    onConfirm: () => void;
    loading?: boolean;
}

const LogOutModal = ({ onClose, onConfirm, loading = false }: Props) => {
    return (
        <Modal onClose={onClose}>
            <div className={s.root}>
                <Text variant="pageHeading">정말 로그아웃 하시겠습니까?</Text>
                <div className={s.container}>
                    <Button
                        loading={loading}
                        onClick={onConfirm}
                        className={s.button}
                    >
                        예
                    </Button>
                    <Button onClick={onClose} className={s.button}>
                        아니요
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default LogOutModal;
