import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faSearch } from '@fortawesome/free-solid-svg-icons';

import styles from './SideNav.module.scss';

import './styles.css';

import { NavLink } from 'react-router-dom';

import TikTokIcon from '/public/tiktok-Icon.svg';
import TikTokFullWidth from '/public/tiktok-full-width.png';

import clsx from 'clsx';
import { useDrawerStore } from '../../../../store/drawerStore';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import SearchDrawer from '../../../../components/SearchDrawer';
import Button from '../../../../components/Button';
import ProtectedButton from '../../../../components/ProtectedButton';
import MoreDrawer from '../../../../components/MoreDrawer';
import DrawerHost from '../../../../components/DrawerHost';
import navigation from '../../navigation';
import { useTranslation } from 'react-i18next';

function SideNav() {
  const { t } = useTranslation('common');
  const { width } = useWindowSize();
  const { closeDrawer, hasOpenDrawers, toggleDrawer } = useDrawerStore();

  const isOpen = hasOpenDrawers();
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
                label={t('search')}
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
            {Object.values(navigation).map((data) => (
              <div
                className="TUXTooltip-reference StyledTUXTooltip"
                key={data.label}
              >
                {data.protected ? (
                  <ProtectedButton to={data.link}>
                    <Button
                      label={t(`sideNav.${data.label}`)}
                      isDefault
                      size="medium"
                      secondary
                      className={clsx(
                        styles.StyledTUXNavButton,
                        isOpen && styles.StyledTUXNavButtonOnDrawer
                      )}
                      icon={data.icon}
                    ></Button>
                  </ProtectedButton>
                ) : (
                  <Button
                    to={data.link}
                    label={t(`sideNav.${data.label}`)}
                    isDefault
                    size="medium"
                    secondary
                    className={clsx(
                      styles.StyledTUXNavButton,
                      isOpen && styles.StyledTUXNavButtonOnDrawer
                    )}
                    icon={data.icon}
                  ></Button>
                )}
              </div>
            ))}
            <div
              className="TUXTooltip-reference StyledTUXTooltip"
              key={t(`sideNav.more`)}
            >
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
                  closeDrawer(['search']);
                  toggleDrawer('more', <MoreDrawer />);
                }}
              ></Button>
            </div>
          </div>

          {!smallSideNav && (
            <div className={styles.SubMainNavContentContainer}>
              <div className="TUXTooltip-reference StyledTUXTooltip">
                <ProtectedButton>
                  <Button
                    primary
                    label={t(`subSideNav.login`)}
                    className={styles.StyledLeftSidePrimaryButtonRedesign}
                    isDefault
                    size="medium"
                    id="loginBtn"
                  ></Button>
                </ProtectedButton>
              </div>
            </div>
          )}
          {!smallSideNav && (
            <div className={styles.SubMainNavFooterContainer}>
              <div className={styles.DivFooterContainer}>
                <h4 className={styles.H4LinkListHeader}>
                  {t(`subSideNav.listFollwing`)}
                </h4>
                <h4 className={styles.H4LinkListHeader}>
                  {t(`subSideNav.notification`)}
                </h4>
                <h4 className={styles.H4LinkListHeader}>
                  {t(`subSideNav.company`)}
                </h4>
                <h4 className={styles.H4LinkListHeader}>
                  {t(`subSideNav.program`)}
                </h4>
                <h4 className={styles.H4LinkListHeader}>
                  {t(`subSideNav.terms&policies`)}
                </h4>
                <span className={styles.SpanCopyright}>&copy; 2025 TikTok</span>
              </div>
            </div>
          )}
        </div>
        <DrawerHost stylesDrawer={{ left: '0px' }} />
      </div>
    </div>
  );
}

export default SideNav;
