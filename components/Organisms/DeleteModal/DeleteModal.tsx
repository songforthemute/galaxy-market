import { Button, Modal, Text } from "@components/Atoms";
import { useToggleModal } from "@libs/client";

interface Props {
    onClickConfirm?: () => void;
    loading?: boolean;
}

const DeleteModal = ({ onClickConfirm, loading = false }: Props) => {
    const { toggleModal } = useToggleModal();

    return (
        <Modal onClose={() => toggleModal()}>
            <div className="flex flex-col p-12 items-start">
                <Text variant="pageHeading">정말 삭제하시겠습니까?</Text>
                <Text variant="contentsHeading" className="mt-1.5 mb-8">
                    다시 복구할 수 없습니다.
                </Text>

                <Button
                    className="rounded-lg w-full mx-auto"
                    onClick={onClickConfirm}
                    loading={loading}
                >
                    삭제할래요
                </Button>
            </div>
        </Modal>
    );
};

export default DeleteModal;
