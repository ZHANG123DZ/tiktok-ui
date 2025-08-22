import Text from '../Text';
import styles from './ShareModal.module.scss';
import './ShareModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faCode } from '@fortawesome/free-solid-svg-icons';
import { createPortal } from 'react-dom';
import { FaFacebookF, FaTelegram, FaWhatsapp } from 'react-icons/fa';
import Icon from '../Icon/Icon';
import { useEffect, useRef } from 'react';
import handleCopy from '../../utils/handleCopy';

export default function ShareModal({ isOpen = false, onClose = () => {} }) {
  const shareOptions = [
    {
      icon: (
        <Icon
          name={'link'}
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#348bc5ff',
            color: 'white',
            rotate: '135deg',
            padding: '10px',
          }}
        />
      ),
      name: 'Copy',
      onClick: () => {
        handleCopy();
        onClose();
      },
    },
    {
      icon: (
        <Icon
          name="WhatsApp"
          color={'white'}
          style={{
            backgroundColor: 'rgb(37, 211, 102)',
            borderRadius: '50%',
            width: '64px',
            height: '64px',
            padding: '10px',
          }}
          size={'64px'}
        />
      ),
      name: 'WhatsApp',
    },
    {
      icon: (
        <FontAwesomeIcon
          icon={faCode}
          style={{
            fontSize: '32px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: 'rgb(0, 186, 208)',
            color: 'white',
            padding: '16px',
          }}
        />
      ),
      name: 'Embed',
    },
    {
      icon: (
        <FaFacebookF
          size={64}
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#1877F2',
            color: 'white',
            paddingTop: '12px',
          }}
        />
      ),
      name: 'facebook',
    },
    {
      icon: (
        <FaTelegram
          size={64}
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            color: 'rgb(55, 174, 226)',
            backgroundColor: 'white',
          }}
        />
      ),
      name: 'Telegram',
    },
  ];
  const shareRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareRef.current && !shareRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isOpen) return null;
  return createPortal(
    <div
      className="TUXModal-overlay"
      data-transition-status="open"
      data-tux-color-scheme="dark"
      dir="ltr"
      style={{
        position: 'fixed',
        overflow: 'auto',
        inset: 0,
        zIndex: 3500,
      }}
    >
      <span
        data-type="inside"
        tabIndex="0"
        aria-hidden="true"
        data-floating-ui-focus-guard=""
        data-floating-ui-inert=""
        style={{
          border: '0px',
          clip: 'rect(0px, 0px, 0px, 0px)',
          height: '1px',
          margin: '-1px',
          overflow: 'hidden',
          padding: '0px',
          position: 'fixed',
          whiteSpace: 'nowrap',
          width: '1px',
          top: '0px',
          left: '0px',
        }}
      ></span>
      <div
        ref={shareRef}
        className="TUXModal"
        data-width="small"
        role="dialog"
        style={{ maxWidth: 'unset', width: '30rem', zIndex: 3500 }}
      >
        {/* Header */}
        <div className="TUXModalNavBar">
          <div className="TUXModalNavBar-leading" />
          <h2 className="TUXModalNavBar-title">Share to</h2>
          <div className="TUXModalNavBar-trailing">
            <button
              type="button"
              className="TUXUnstyledButton TUXNavBarIconButton"
              aria-label="close"
              onClick={onClose}
            >
              <FontAwesomeIcon
                icon={faClose}
                style={{ width: '24px', height: '24px', color: 'white' }}
              />
            </button>
          </div>
        </div>

        {/* Share options */}
        <div
          className={styles.DivActionGroupContainer}
          style={{ gap: '0.75rem' }}
        >
          <div className={styles['css-nkwb4a']}>
            <div
              className={styles['css-18yu2gh']}
              style={{ height: '7.75rem' }}
            >
              <div
                style={{ width: '992px', height: '100%', position: 'relative' }}
              >
                {shareOptions.map((s, i) => (
                  <div
                    key={s.name}
                    style={{
                      position: 'absolute',
                      top: '0px',
                      insetInlineStart: '0px',
                      height: '100%',
                      width: '88px',
                      transform: `translateX(${88 * i + 12}px)`,
                    }}
                    onClick={() => s.onClick && s.onClick()}
                  >
                    <div className={styles.DivActionContainer}>
                      <div className={styles.DivAction}>
                        <div style={{ display: 'flex' }}>{s.icon}</div>
                        <Text className="StyledTUXText" alignCenter>
                          {s.name}
                        </Text>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles['css-15obktd']} style={{ top: '2.75rem' }}>
              <div className={styles['css-14gbl02']}></div>
            </div>
          </div>
          {/* {[
            { label: 'Copy', icon: '🔗' },
            { label: 'WhatsApp', icon: '📱' },
            { label: 'Embed', icon: '</>' },
            { label: 'Facebook', icon: '📘' },
            { label: 'Telegram', icon: '✈️' },
            { label: 'X', icon: '𝕏' },
            { label: 'LinkedIn', icon: '💼' },
            { label: 'Email', icon: '✉️' },
            { label: 'Reddit', icon: '👽' },
            { label: 'Line', icon: '💬' },
          ].map((item) => (
            <button key={item.label} className="share-button">
              <span className="icon">{item.icon}</span>
              <p>{item.label}</p>
            </button>
          ))} */}
        </div>
      </div>
    </div>,
    document.body
  );
}
