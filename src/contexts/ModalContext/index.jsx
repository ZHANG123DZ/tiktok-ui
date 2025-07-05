import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types"
import Modal from "../../components/Modal";

const ModalContext = createContext();

export const ModalProvider = ({children, isActive = false, setActive = () => {}}) => {
    const [content, setContent] = useState(children);
    const [isOpen, setIsOpen] = useState(isActive);
    const [config, setConfig] = useState({});

    const openModal = (modalContent, configModal = {}) => {
        setContent(modalContent);
        setConfig(configModal);
        setIsOpen(true);
    }

    const closeModal = () => {
        setActive()
        setContent(null);
        setConfig({});
        setIsOpen(false);
    }

    return (
        <ModalContext.Provider value={{isOpen, openModal, closeModal, config, content}}>
            {isOpen && <Modal>
                {content}
            </Modal>}
        </ModalContext.Provider>
    )
}

ModalProvider.propTypes = {
    children: PropTypes.node,
    isActive: PropTypes.bool,
}

export const useModal = () => useContext(ModalContext);