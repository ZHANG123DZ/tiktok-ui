import clsx from 'clsx';
import styles from './ReactionPicker.module.scss';

const reactions = ['❤️', '😂', '😮', '😢', '😡', '👍', '+'];

const ReactionPicker = ({ onClickEmoji }) => {
  return (
    <div className={clsx(styles.ReactionPickerContainer, 'styledPicker')}>
      {reactions.map((emoji, index) => (
        <button
          key={index}
          className={`${styles.ReactionButton} ${
            emoji === '+' ? styles.AddButton : ''
          }`}
          aria-label={`reaction-${emoji}`}
          onClick={() => onClickEmoji(emoji)}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
};

export default ReactionPicker;
