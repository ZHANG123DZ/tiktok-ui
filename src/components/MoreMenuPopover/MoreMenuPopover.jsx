import React, { useState } from 'react';
// Giả sử bạn có một thư viện icon để import các icon SVG
// Ví dụ, bạn tự tạo các component icon từ SVG

import './MoreMenuPopover.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowDownUpAcrossLine,
  faArrowUp,
  faArrowUpLong,
  faBan,
  faClosedCaptioning,
  faFlag,
  faHardDrive,
  faHeartBroken,
  faSlash,
  faTag,
  faUpLong,
} from '@fortawesome/free-solid-svg-icons';
import Icon from '../Icon/Icon';
import Text from '../Text';
import AutoscrollIcon from '../Icon/AutoScrollIcon';
import FloatingPlayerIcon from '../Icon/FloatingPlayerIcon';
import Button from '../Button';

const MoreMenuPopover = ({
  children,
  isMenu = false,
  open = false,
  dark = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const togglePopover = () => setIsOpen(!isOpen);

  const menuItems = [
    {
      label: 'Quality',
      secondaryText: 'Auto',
      icon: <Icon name={'hd'} />,
      action: () => console.log('Change quality'),
    },
    {
      label: 'Captions',
      icon: <FontAwesomeIcon icon={faClosedCaptioning} />,
      action: () => console.log('Toggle captions'),
    },
    {
      label: 'Auto scroll',
      icon: <AutoscrollIcon />,
      hasToggle: true,
      action: () => console.log('Toggle autoscroll'),
    },
    {
      label: 'Floating Player',
      icon: <FloatingPlayerIcon />,
      action: () => console.log('Open floating player'),
    },
    {
      label: 'Not interested',
      icon: <FontAwesomeIcon icon={faHeartBroken} />,
      action: () => console.log('Mark as not interested'),
    },
    {
      label: 'Report',
      icon: <FontAwesomeIcon icon={faFlag} />,
      action: () => console.log('Report video'),
      isDestructive: true,
    },
  ];

  // const menuItems = [
  //   {
  //     icon: (
  //       <div
  //         style={{
  //           padding: '8px 16px',
  //           display: 'flex',

  //           flexDirection: 'column',
  //         }}
  //       >
  //         <Button
  //           size="medium"
  //           secondary
  //           borderless
  //           label="Report"
  //           icon={<FontAwesomeIcon icon={faFlag} />}
  //         />
  //       </div>
  //     ),
  //     label: '',
  //   },
  // ];

  // const menuItems = [
  //   {
  //     label: 'Report',
  //     icon: <FontAwesomeIcon icon={faFlag} />,
  //   },
  //   {
  //     label: 'Block',
  //     icon: <FontAwesomeIcon icon={faBan} />,
  //   },
  // ];
  return (
    <div
      className={`TUXPopover-popover TUXPopover-popover--open ${
        dark && 'TUXPopover-popover--dark'
      }`}
      style={{
        transition: 'opacity 300ms cubic-bezier(0.65, 0, 0.35, 1)',
        zIndex: 4000,
        position: 'absolute',
        left: '0px',
        top: '0px',
        transform: 'translate(593.6px, 76px)',
      }}
    >
      <div
        className={`TUXPopover-content ${
          isMenu && 'more-menu-popover TUXMenu'
        }`}
      >
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="TUXMenuItem"
            tabIndex={0}
            onClick={item?.action}
            data-e2e={`more-menu-popover_${item?.label
              .toLowerCase()
              .replace(' ', '-')}`}
          >
            <div className="TUXMenuItem-leadingIcon">{item?.icon}</div>
            <Text
              as="span"
              weight="medium"
              truncate
              label
              style={{ color: 'inherit', fontSize: '16px' }}
            >
              {!item?.hasToggle && (
                <div
                  style={{
                    justifyContent: 'space-between',
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                >
                  <Text
                    as="p"
                    style={{ color: 'inherit', fontSize: '16px' }}
                    className="StyledTUXText"
                  >
                    {item?.label}
                  </Text>
                  {item?.secondaryText && (
                    <Text
                      as="p"
                      style={{ color: 'inherit', fontSize: '16px' }}
                      className="StyledTUXText"
                    >
                      {item?.secondaryText}
                    </Text>
                  )}
                </div>
              )}
              {item?.hasToggle && (
                <div className="DivAutoScrollItemBody emkmn1u1">
                  {item?.label}
                  <div className="DivAutoScrollSwitchWrapper emkmn1u0">
                    <div
                      className="TUXSwitch"
                      data-size="medium"
                      data-disabled="false"
                      data-loading="false"
                      data-label-position="after"
                      data-text-direction="ltr"
                    >
                      <div className="TUXSwitch-inputContainer">
                        <input
                          id={`toggle-${index}`}
                          className="TUXSwitch-input"
                          role="switch"
                          type="checkbox"
                          aria-disabled="false"
                        />
                        <div className="TUXSwitch-handle"></div>
                      </div>
                      <div className="TUXSwitch-labelContainer">
                        <label
                          className="TUXSwitch-label"
                          htmlFor={`toggle-${index}`}
                        ></label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Text>
          </div>
        ))}
      </div>
      {/* <svg
        fill="currentColor"
        aria-hidden="true"
        width="16"
        height="14"
        viewBox="0 0 14 14"
        style={{
          position: 'absolute',
          PointerEvent: 'none',
          left: '15.2px',
          bottom: '99%',
          transform: 'rotate(180deg)',
        }}
      >
        <path
          clipPath="url(#floating-ui-253)"
          fill="none"
          stroke="rgb(105, 105, 105)"
          strokeWidth="3"
          d="M0,0 H14 L9.625,5 Q7,8 4.375,5 Z"
        ></path>
        <path stroke="currentColor" d="M0,0 H14 L9.625,5 Q7,8 4.375,5 Z"></path>
        <clipPath id="floating-ui-253">
          <rect x="-1" y="1" width="16" height="14"></rect>
        </clipPath>
      </svg> */}
    </div>
  );
};

export default MoreMenuPopover;
