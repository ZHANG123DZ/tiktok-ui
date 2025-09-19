import CloseButton from '../CloseButton';
import styles from './MediaModal.module.scss';

function MediaModal({ media, onClose = () => {} }) {
  return (
    <div
      className={styles.DivContainer}
      style={{ minWidth: '33px', minHeight: '33px' }}
    >
      <img
        src={media}
        alt="image message"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          maxHeight: 'calc(-160px + 100vh)',
        }}
      />
      <div className={styles.DivIndicatorContainer}></div>
      <div className={styles.CloseButtonContainer}>
        <CloseButton onClick={onClose} />
      </div>
    </div>
  );
}

export default MediaModal;
