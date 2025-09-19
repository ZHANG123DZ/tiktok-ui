import React, { forwardRef, useEffect, useState } from 'react';
// Giả sử bạn có một thư viện icon để import các icon SVG
// Ví dụ, bạn tự tạo các component icon từ SVG

import './MorePopover.css';
import Text from '../Text';
import { createPortal } from 'react-dom';
import calculatePopoverPosition from '../../function/calculatePopoverPosition';

import styles from './styles.module.scss';
/**
 * @typedef {Object} MorePopoverProps
 * @property {React.ReactNode} [children] - Nội dung bên trong popover
 * @property {HTMLElement|null} [triggerElement] - Element để định vị popover
 * @property {boolean} [isMenu] - Có phải dạng menu không
 * @property {boolean} [dark] - Theme tối hay sáng
 */

/**
 * @param {MorePopoverProps} props
 * @param {React.Ref<HTMLDivElement>} ref
 */

const MorePopover = forwardRef(
  (
    {
      list = [],
      triggerElement,
      isMenu = false,
      isAction = false,
      onlyButton = false,
      dark = true,
      showDirection = true,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const togglePopover = () => setIsOpen(!isOpen);
    const [position, setPosition] = useState({});

    const handleAdjustPosition = () => {
      if (!ref.current || !triggerElement?.current) return;
      const { top, left, arrowDirection, arrowLeft } = calculatePopoverPosition(
        triggerElement.current,
        ref.current,
        20
      );
      setPosition({ top, left, arrowDirection, arrowLeft });
    };

    useEffect(() => {
      window.addEventListener('resize', handleAdjustPosition);
      return () => {
        window.removeEventListener('resize', handleAdjustPosition);
      };
    }, [triggerElement, ref]);

    useEffect(() => {
      handleAdjustPosition();
    }, [isOpen]);

    return createPortal(
      <div>
        <span
          tabIndex={-1}
          aria-hidden="true"
          data-floating-ui-focus-guard=""
          data-floating-ui-inert=""
          style={{
            border: 0,
            clip: 'rect(0px, 0px, 0px, 0px)',
            height: '1px',
            margin: '-1px',
            overflow: 'hidden',
            padding: 0,
            position: 'fixed',
            whiteSpace: 'nowrap',
            width: '1px',
            top: 0,
            left: 0,
          }}
          data-tabindex="0"
        />
        <div
          ref={ref}
          className={`TUXPopover-popover TUXPopover-popover--open ${
            dark && 'TUXPopover-popover--dark'
          }`}
          style={{
            transition: 'opacity 300ms cubic-bezier(0.65, 0, 0.35, 1)',
            zIndex: 4000,
            position: 'absolute',
            left: '0px',
            top: '0px',
            transform: `translate(${position.left || -1000}px, ${
              position.top || -1000
            }px)`,
          }}
        >
          <div
            className={`TUXPopover-content ${
              isMenu && 'more-menu-popover TUXMenu'
            }`}
          >
            {isMenu &&
              list.map((item, i) => (
                <div
                  key={i}
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
                                id={`toggle-${i}`}
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
                                htmlFor={`toggle-${i}`}
                              ></label>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Text>
                </div>
              ))}
            {isAction && (
              <div className={styles.DivActionOutsideContainer}>
                {list.map((item, i) => (
                  <div
                    key={i}
                    tabIndex="0"
                    role="button"
                    aria-label={item.label}
                    className={styles.DivActionContainer}
                  >
                    <div className={styles.DivActionItem}>
                      {item?.icon}
                      <p className={styles.PText}>{item?.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {onlyButton && (
              <div
                style={{
                  padding: '8px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {list.map((item, i) => (
                  <React.Fragment key={i}>{item.button}</React.Fragment>
                ))}
              </div>
            )}
          </div>
          {showDirection && (
            <svg
              fill="currentColor"
              aria-hidden="true"
              width="16"
              height="14"
              viewBox="0 0 14 14"
              style={{
                position: 'absolute',
                PointerEvent: 'none',
                left: `${position.arrowLeft || (triggerElement && 20)}px`,
                bottom: '100%',
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
              <path
                stroke="currentColor"
                d="M0,0 H14 L9.625,5 Q7,8 4.375,5 Z"
              ></path>
              <clipPath id="floating-ui-253">
                <rect x="-1" y="1" width="16" height="14"></rect>
              </clipPath>
            </svg>
          )}
        </div>
      </div>,
      document.body
    );
  }
);

MorePopover.displayName = 'MorePopover';

export default MorePopover;
