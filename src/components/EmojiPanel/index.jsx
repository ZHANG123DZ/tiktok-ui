import styles from './EmojiPanel.module.scss';

const emojiList = [
  '😀',
  '😃',
  '😄',
  '😁',
  '😆',
  '😅',
  '🤣',
  '😂',
  '🙂',
  '🙃',
  '😉',
  '😊',
  '😇',
  '😍',
  '😘',
  '😗',
  '😚',
  '😙',
  '😋',
  '😛',
  '😜',
  '😝',
  '🤑',
  '🤗',
  '🤔',
  '🤐',
  '😐',
  '😑',
  '😶',
  '😏',
  '😒',
  '🙄',
  '😬',
  '🤥',
  '😌',
  '😔',
  '😪',
  '🤤',
  '😴',
  '😷',
  '🤒',
  '🤕',
  '🤢',
  '🤧',
  '😵',
  '🤠',
  '😎',
  '🤓',
  '😕',
  '😟',
  '🙁',
  '😮',
  '😯',
  '😲',
  '😳',
  '😦',
  '😧',
  '😨',
  '😰',
  '😥',
  '😢',
  '😭',
  '😱',
  '😖',
  '😣',
  '😞',
  '😓',
  '😩',
  '😫',
  '😤',
  '😡',
  '😠',
  '😈',
  '👿',
  '💀',
  '💩',
  '🤡',
  '👹',
  '👺',
  '👻',
  '👽',
  '👾',
  '🤖',
  '😺',
  '😸',
  '😹',
  '😻',
  '😼',
  '😽',
  '🙀',
  '😿',
  '😾',
];

const EmojiPanel = ({ panelRef, handleClickEmoji }) => {
  return (
    <div className={styles.DivEmojiPanelContainer} ref={panelRef}>
      <div
        id="emoji-suggestion-container"
        className={styles.DivEmojiSuggestionContainer}
      >
        <ul role="tablist" className={styles.UlNavContainer}>
          <li
            data-index="0"
            role="tab"
            tabIndex="0"
            aria-selected="true"
            aria-controls="emoji-panel-container"
            className={styles.LiEmojiItem}
          >
            😊
          </li>
        </ul>
        <div className={styles.DivPanelContainer}>
          <ul
            id="emoji-panel-container"
            role="tabpanel"
            tabIndex="0"
            className={styles.UlPanelList}
          >
            {emojiList.map((emoji, index) => (
              <li
                key={index}
                data-index={index}
                tabIndex="0"
                role="button"
                aria-label={emoji}
                className={styles.LiEmojiItem}
                onClick={() => handleClickEmoji(emoji)}
              >
                {emoji}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmojiPanel;
