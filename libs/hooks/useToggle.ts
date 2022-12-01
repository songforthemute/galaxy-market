import { useUI } from "@components/contexts/uiContext";

export const useToggleSidebar = () => {
    const { showSidebar, openSidebar, closeSidebar } = useUI();

    const setState = () => {
        return showSidebar ? closeSidebar() : openSidebar();
    };

    return { sidebar: showSidebar, setSidebar: setState };
};

export const useToggleModal = () => {
    const { showModal, openModal, closeModal } = useUI();

    const setState = () => {
        return showModal ? closeModal() : openModal();
    };

    return { modal: showModal, setModal: setState };
};
