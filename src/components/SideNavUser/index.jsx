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
import { navigationUser } from '../../navigationUser';
import { useWindowSize } from '../../hooks/useWindowSize';
import { NavLink, useLocation } from 'react-router-dom';
import { useDrawerStore } from '../../store/drawerStore';
import DrawerHost from '../DrawerHost';
import MoreDrawer from '../MoreDrawer';
import SearchDrawer from '../SearchDrawer';
import Text from '../Text';
import { useEffect } from 'react';
import MessageDrawer from '../MessageDrawer';
import { useSelector } from 'react-redux';

function SideNavUser() {
  const { width } = useWindowSize();
  const {
    toggleDrawer,
    closeDrawer,
    hasOpenDrawers,
    openDrawer,
    closeAllDrawers,
    closeAllExcept,
  } = useDrawerStore();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const location = useLocation();
  useEffect(() => {
    const isMessages = location.pathname.startsWith('/messages');
    if (isMessages) {
      openDrawer('messages', <MessageDrawer />, { mask: false });
    } else {
      closeDrawer('messages');
    }
  }, [location, openDrawer, closeDrawer]);

  const isOpen = hasOpenDrawers();
  const smallSideNav = width <= 1024 || isOpen;
  const navItems = navigationUser(
    toggleDrawer,
    closeDrawer,
    openDrawer,
    closeAllDrawers
  );

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
        />

        {/* Logo */}
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
                style={{ height: '42px', width: '118px', objectFit: 'contain' }}
              />
            </NavLink>
          </div>

          {/* Search Button */}
          <div
            className={clsx(
              styles.DivSearchWrapper,
              isOpen && styles.DivSearchWrapperOnDrawer
            )}
            onClick={() => {
              closeDrawer(['more', 'activity', 'messages']);
              toggleDrawer('search', <SearchDrawer />);
            }}
          >
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
            />
          </div>
        </div>

        {/* Nav Buttons */}
        <div className={styles.DivScrollingContentContainer}>
          <div className={styles.DivMainNavContainer}>
            {Object.values(navItems).map((item) => (
              <div
                className="TUXTooltip-reference StyledTUXTooltip"
                key={item.label}
              >
                <Button
                  to={item.link}
                  label={item.label}
                  isDefault
                  size="medium"
                  secondary
                  className={clsx(
                    styles.StyledTUXNavButton,
                    isOpen && styles.StyledTUXNavButtonOnDrawer
                  )}
                  icon={item.icon}
                  onClick={item.onClick}
                />
              </div>
            ))}

            {/* Profile */}
            <div
              className="TUXTooltip-reference StyledTUXTooltip"
              key="profile"
            >
              <Button
                to={`/@${currentUser.username}`}
                label="Hồ sơ"
                isDefault
                size="medium"
                secondary
                className={clsx(
                  styles.StyledTUXNavButton,
                  isOpen && styles.StyledTUXNavButtonOnDrawer
                )}
                icon={<FontAwesomeIcon icon={faUser} />}
                onClick={() => closeAllDrawers()}
              />
            </div>

            {/* More Drawer */}
            <div className="TUXTooltip-reference StyledTUXTooltip" key="more">
              <Button
                label="Thêm"
                isDefault
                size="medium"
                secondary
                className={clsx(
                  styles.StyledTUXNavButton,
                  isOpen && styles.StyledTUXNavButtonOnDrawer
                )}
                icon={<FontAwesomeIcon icon={faEllipsis} />}
                onClick={() => {
                  closeAllExcept(['more', 'messages']);
                  toggleDrawer('more', <MoreDrawer />);
                }}
              />
            </div>
          </div>

          {/* Followed Accounts */}
          {!smallSideNav && (
            <div className={styles.SubMainNavContentContainer}>
              <div className={styles.DivUserContainer}>
                <Text as="p" weight="medium" className={styles.StyledTUXText}>
                  Các tài khoản Đã follow
                </Text>
                <ul className={styles.UlAccountList}>
                  <p>Những tài khoản bạn đã follow sẽ xuất hiện tại đây</p>
                </ul>
              </div>
            </div>
          )}

          {/* Footer */}
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

        {/* Drawer Host */}
        <DrawerHost stylesDrawer={{ left: '0px' }} />
      </div>
    </div>
  );
}

export default SideNavUser;
