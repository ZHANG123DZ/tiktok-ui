import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsis,
  faSearch,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import styles from './style.module.scss';
import Button from '../Button';
import TikTokIcon from '/public/tiktok-Icon.svg';
import TikTokFullWidth from '/public/tiktok-full-width.png';
import clsx from 'clsx';
import navigationUser from '../../navigationUser';
import { useWindowSize } from '../../hooks/useWindowSize';
import { Navigate, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DrawerHost from '../DrawerHost';
import { useDrawerStore } from '../../store/drawerStore';
import MoreDrawer from '../MoreDrawer';
import Text from '../Text';
import SearchDrawer from '../SearchDrawer';

function SideNavUser() {
  const { width } = useWindowSize();
  const {
    openDrawer,
    closeDrawer,
    closeAllDrawer,
    isDrawerOpen,
    toggleDrawer,
  } = useDrawerStore();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const isOpen = isDrawerOpen(['search', 'more', 'active']);
  const smallSideNav = width <= 1024 || isOpen;
  return (
    <div
      className={clsx(
        styles.DivSideNavPlaceholderContainer,
        isOpen && styles.DivSideNavPlaceholderContainerOnDrawer
      )}
    >
      <div
        className={clsx(
          styles.DivSideNavContainer,
          isOpen && styles.DivSideNavContainerOnDrawer
        )}
      >
        <div
          className={clsx(
            styles.DivAnimationCover,
            isOpen && styles.DivAnimationCoverOnDrawer
          )}
        ></div>
        <div className={styles.DivFixedContentContainer}>
          <div
            className={clsx(
              styles.DivLogoWrapper,
              isOpen && styles.DivLogoWrapperOnDrawer
            )}
          >
            <NavLink to={'/'} style={{ position: 'relative' }}>
              <img
                src={smallSideNav ? TikTokIcon : TikTokFullWidth}
                alt="logoTikTok"
                style={{
                  height: '42px',
                  width: '118px',
                  objectFit: 'contain',
                }}
              />
            </NavLink>
          </div>
          <div
            className={clsx(
              styles.DivSearchWrapper,
              isOpen && styles.DivSearchWrapperOnDrawer
            )}
            onClick={() => {
              closeDrawer(['more']);
              toggleDrawer('search', <SearchDrawer />);
            }}
          >
            {
              <Button
                label="Tìm kiếm"
                secondary
                className={clsx(
                  styles.StyledTUXSearchButton,
                  isOpen && styles.StyledTUXSearchButtonOnDrawer
                )}
                size="medium"
                capsule
                icon={<FontAwesomeIcon icon={faSearch} />}
              ></Button>
            }
          </div>
        </div>
        <div className={styles.DivScrollingContentContainer}>
          <div className={styles.DivMainNavContainer}>
            {Object.values(navigationUser).map((data) => (
              <div
                className="TUXTooltip-reference StyledTUXTooltip"
                key={data.label}
              >
                <Button
                  to={data.link}
                  label={data.label}
                  isDefault
                  size="medium"
                  secondary
                  className={clsx(
                    styles.StyledTUXNavButton,
                    isOpen && styles.StyledTUXNavButtonOnDrawer
                  )}
                  icon={data.icon}
                  onClick={data.onClick}
                ></Button>
              </div>
            ))}
            <div
              className="TUXTooltip-reference StyledTUXTooltip"
              key={'profile'}
            >
              <Button
                to={`/@${currentUser.username}`}
                label={'Hồ sơ'}
                isDefault
                size="medium"
                secondary
                className={clsx(
                  styles.StyledTUXNavButton,
                  isOpen && styles.StyledTUXNavButtonOnDrawer
                )}
                icon={<FontAwesomeIcon icon={faUser} />}
              ></Button>
            </div>
            <div className="TUXTooltip-reference StyledTUXTooltip" key={'more'}>
              <Button
                label={'Thêm'}
                isDefault
                size="medium"
                secondary
                className={clsx(
                  styles.StyledTUXNavButton,
                  isOpen && styles.StyledTUXNavButtonOnDrawer
                )}
                icon={<FontAwesomeIcon icon={faEllipsis} />}
                onClick={() => {
                  closeDrawer(['search']);
                  toggleDrawer('more', <MoreDrawer />);
                }}
              ></Button>
            </div>
          </div>
          {!smallSideNav && (
            <div className={styles.SubMainNavContentContainer}>
              <div className={styles.DivUserContainer}>
                <Text as="p" weight={'medium'} className={styles.StyledTUXText}>
                  Các tài khoản Đã follow
                </Text>
                <ul className={styles.UlAccountList}>
                  <p>Những tài khoản bạn đã follow sẽ xuất hiện tại đây</p>
                </ul>
              </div>
            </div>
          )}
          {!smallSideNav && (
            <div className={styles.SubMainNavFooterContainer}>
              <div className={styles.DivFooterContainer}>
                <h4 className={styles.H4LinkListHeader}>Công ty</h4>
                <h4 className={styles.H4LinkListHeader}>Chương trình</h4>
                <h4 className={styles.H4LinkListHeader}>
                  Điều khoản và chính sách
                </h4>
                <div className={styles.DivMoreContainer}>
                  <span className={styles.SpanMoreText}>Thêm</span>
                </div>
                <span className={styles.SpanCopyright}>&cpy 2025 TikTok</span>
              </div>
            </div>
          )}
        </div>
        <DrawerHost stylesDrawer={{ left: '0px' }} />
      </div>
    </div>
  );
}

export default SideNavUser;
