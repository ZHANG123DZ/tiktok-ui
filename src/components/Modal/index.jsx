import clsx from 'clsx';
import ReactDOM from 'react-dom';
import { useModal } from '../../contexts/ModalContext';
import './ModalStyle.css';
import styles from './styles.module.scss';

function Modal({ children }) {
  const { isOpen, closeModal, config, content } = useModal();
  const { backDrop = true, backdropClose = true, backDropStyles = '' } = config;

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.ModalContainer}>
      {backDrop && (
        <div
          className={clsx(styles.ModalBackdrop, backDropStyles)}
          onClick={backdropClose ? closeModal : undefined}
        ></div>
      )}
      <div className={styles.ModalContentContainer}>
        <div className={styles.ModalContentVerticalPositionContainer}>
          <div className={styles.ModalContentVerticalPositionPadding}>
            <section className={styles.ModalContentSection}>{content}</section>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default Modal;
