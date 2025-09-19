import { Link } from 'react-router-dom';
import Button from '../Button';
import styles from './MoreDrawer.module.scss';

import { useDrawerStore } from '../../store/drawerStore';
import Menu from '../Menu';
import LogoutConfirm from '../LogoutConfirm';
import { useState } from 'react';
import toggleTheme from '../../utils/toggleTheme';

function MoreDrawer() {
  const { closeDrawer, openDrawer, closeAllDrawers, closeAllExcept } =
    useDrawerStore();

  const [isOpenLogout, setOpenLogout] = useState(false);

  return (
    <div className={styles.DivMoreDrawerContainer}>
      <div className={styles.DivMoreDrawerHeader}>
        <h2
          className={`${styles.StyledTUXText} TUXText TUXText--tiktok-display TUXText--weight-bold`}
          letterSpacing="0.3"
          style={{ color: 'inherit', fontSize: '20px' }}
        >
          Thêm
        </h2>
      </div>

      <ul
        data-e2e="see-more-popup"
        id="creator-tools-selection-menu-header"
        role="listbox"
        className={styles.UlMoreScrollingContentContainer}
      >
        <li className={styles.LiMoreButtonContainer}>
          <Link
            to="/coin?enter_from=web_main_nav_secondary"
            data-e2e="nav-more-menu_get-coins"
            tabIndex={-1}
            className="link-a11y-focus"
          >
            <Button
              className={styles.StyledTUXMoreOptionButton}
              label="Nhận xu"
              isDefault
              size="small"
              secondary
            />
          </Link>
        </li>

        <li className={styles.LiMoreButtonContainer}>
          <Link
            to="https://effecthouse.tiktok.com/download?utm_campaign=ttweb_entrance_v1&utm_source=tiktok_webapp_main"
            target="_blank"
            tabIndex={-1}
            className="link-a11y-focus"
          >
            <Button
              className={styles.StyledTUXMoreOptionButton}
              label="Tạo hiệu ứng TikTok"
              isDefault
              size="small"
              secondary
            />
          </Link>
        </li>

        <li className={styles.LiMoreButtonContainer}>
          <Button
            className={styles.StyledTUXMoreOptionButton}
            expand="Công cụ dành cho nhà sáng tạo"
            isDefault
            size="small"
            secondary
          />
        </li>

        <li className={styles.LiMoreButtonContainer}>
          <Button
            className={styles.StyledTUXMoreOptionButton}
            expand="Tiếng Việt"
            isDefault
            size="small"
            secondary
          />
        </li>

        <li className={styles.LiMoreButtonContainer}>
          <Button
            className={styles.StyledTUXMoreOptionButton}
            expand="Chế độ tối"
            isDefault
            size="small"
            secondary
            onClick={() => {
              closeAllExcept(['messages']);
              openDrawer(
                'more-theme',
                <Menu
                  title="Chế độ tối"
                  menu={[
                    { label: 'Tự động' },
                    { label: 'Chế độ tối', onClick: toggleTheme },
                    { label: 'Chế độ sáng', onClick: toggleTheme },
                  ]}
                  onClickBackIcon={() => {
                    closeAllDrawers();
                    openDrawer('more', <MoreDrawer />);
                  }}
                />,
                { closeButton: false }
              );
            }}
          />
        </li>

        <li className={styles.LiMoreButtonContainer}>
          <Link
            to="/setting"
            data-e2e="settings-entrance"
            tabIndex={-1}
            className="link-a11y-focus"
          >
            <Button
              className={styles.StyledTUXMoreOptionButton}
              label="Cài đặt"
              isDefault
              size="small"
              secondary
            />
          </Link>
        </li>

        <li className={styles.LiMoreButtonContainer}>
          <a
            href="/feedback"
            data-e2e="feedback-entrance"
            tabIndex={-1}
            className="link-a11y-focus"
          >
            <Button
              className={styles.StyledTUXMoreOptionButton}
              label="Phản hồi và trợ giúp"
              isDefault
              size="small"
              secondary
            />
          </a>
        </li>

        <li className={styles.LiMoreButtonContainer}>
          <Button
            className={styles.StyledTUXMoreOptionButton}
            label="Đăng xuất"
            isDefault
            size="small"
            secondary
            onClick={() => setOpenLogout(true)}
          />
          {isOpenLogout && (
            <LogoutConfirm
              isOpen={isOpenLogout}
              onClose={() => setOpenLogout(false)}
            />
          )}
        </li>
      </ul>
    </div>
  );
}

export default MoreDrawer;
