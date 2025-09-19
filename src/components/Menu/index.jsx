import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Button';
import styles from './Menu.module.scss';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Text from '../Text';

function Menu({ title = '', menu = [], onClickBackIcon = () => {} }) {
  return (
    <div className={styles.DivMoreDrawerContainer}>
      <div className={styles.DivMoreDrawerHeader}>
        <Button
          size="medium"
          capsule
          secondary
          backIcon
          icon={<FontAwesomeIcon icon={faChevronLeft} fontSize={12} />}
          onClick={onClickBackIcon}
        />
        <Text
          as="h2"
          weight="bold"
          display
          className={styles.StyledTUXText}
          style={{ color: 'inherit', fontSize: '20px', fontWeight: '700' }}
        >
          {title}
        </Text>
      </div>

      <ul
        data-e2e="see-more-popup"
        id="creator-tools-selection-menu-header"
        role="listbox"
        className={styles.UlMoreScrollingContentContainer}
      >
        {menu.map((item, i) => (
          <li key={i} className={styles.LiMoreButtonContainer}>
            <Button
              to={item?.link}
              label={item.label}
              isDefault
              secondary
              size="small"
              className={styles.StyledTUXMoreOptionButton}
              onClick={item?.onClick}
              style={{ width: '100%' }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
