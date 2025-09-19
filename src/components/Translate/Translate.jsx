import translateService from '../../services/translate/translate.service';
import Text from '../Text';

const Translate = ({ content = '', source = '', setNewContent = () => {} }) => {
  const toggleTranslate = async () => {
    try {
      if (content === source) {
        const data = await translateService.translate(content);
        setNewContent(data);
      } else {
        setNewContent(source);
      }
    } catch (err) {
      console.error('Translate error:', err);
    }
  };

  return (
    <Text
      weight="medium"
      className="StyledTUXText-StyledDescriptionTranslationToggleText"
      style={{ color: 'var(--ui-text-3)', fontSize: '14px', cursor: 'pointer' }}
      onClick={toggleTranslate}
    >
      Xem bản dịch
    </Text>
  );
};

export default Translate;
