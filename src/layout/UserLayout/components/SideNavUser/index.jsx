import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsis,
  faSearch,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import styles from './style.module.scss';
import TikTokIcon from '/public/tiktok-Icon.svg';
import TikTokFullWidth from '/public/tiktok-full-width.png';
import clsx from 'clsx';
import { NavLink, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import { useDrawerStore } from '../../../../store/drawerStore';
import MessageDrawer from '../../../../components/MessageDrawer';
import { navigation } from '../../navigation';
import Button from '../../../../components/Button';
import SearchDrawer from '../../../../components/SearchDrawer';
import MoreDrawer from '../../../../components/MoreDrawer';
import Text from '../../../../components/Text';
import DrawerHost from '../../../../components/DrawerHost';
import { useTranslation } from 'react-i18next';

function SideNav() {
  const { t } = useTranslation('common');
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
  const navItems = navigation(
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
              label={t('search')}
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
                  label={t(`sideNav.${item.label}`)}
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
                label={t(`sideNav.profile`)}
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
                label={t(`sideNav.more`)}
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
                  {t(`subSideNav.listFollwing`)}
                </Text>
                <ul className={styles.UlAccountList}>
                  <p>{t(`subSideNav.notification`)}</p>
                </ul>
              </div>
            </div>
          )}

          {/* Footer */}
          {!smallSideNav && (
            <div className={styles.SubMainNavFooterContainer}>
              <div className={styles.DivFooterContainer}>
                <h4 className={styles.H4LinkListHeader}>
                  {t(`subSideNav.company`)}
                </h4>
                <h4 className={styles.H4LinkListHeader}>
                  {t(`subSideNav.program`)}
                </h4>
                <h4 className={styles.H4LinkListHeader}>
                  {t(`subSideNav.terms&policies`)}
                </h4>
                <div className={styles.DivMoreContainer}>
                  <span className={styles.SpanMoreText}>
                    {t(`subSideNav.more`)}
                  </span>
                </div>
                <span className={styles.SpanCopyright}>&copy; 2025 TikTok</span>
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

export default SideNav;
