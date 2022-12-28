import { useUI } from "@components/contexts/uiContext";

export const useToggleSidebar = () => {
    const { showSidebar, openSidebar, closeSidebar } = useUI();

    const toggleSidebar = () => {
        return showSidebar ? closeSidebar() : openSidebar();
    };

    return { sidebar: showSidebar, toggleSidebar };
};

export const useToggleModal = () => {
    const { showModal, openModal, closeModal } = useUI();

    const toggleModal = () => {
        return showModal ? closeModal() : openModal();
    };

    return { modal: showModal, toggleModal };
};
