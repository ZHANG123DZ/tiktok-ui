import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faSpinner } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import './Button.css';
import styles from './Button.module.scss';
import { useCallback } from 'react';
import Text from '../Text';

function Button({
  children,
  icon,
  label = '',
  to = '',
  href = '',
  className = '',
  id = '',
  isDefault = false,
  expand = '',
  capsule = false,
  primary = false,
  secondary = false,
  borderless = false,
  size = '',
  responsiveButton = false,
  iconOnlyButton = false,
  segmentControl = false,
  mentionSuggest = false,
  emoji = false,
  styledButton = false,
  unstyledButton = false,
  closeButton = false,
  disabled = false,
  loading = false,
  onClick = () => ({}),
  ...propsValue
}) {
  let Component = 'button';
  const props = {
    id,
    className: clsx('TUXButton', className, {
      ['TUXButton--default']: isDefault,
      [`TUXButton--${size}`]: size,
      [`TUXButton--primary`]: primary,
      [`TUXButton--secondary`]: secondary,
      [`TUXButton--capsule`]: capsule,
      ['TUXButton--borderless']: borderless,
      ['TUXSegmentedControl']: segmentControl,
      ['TUXUnstyledButton']: unstyledButton,
      [styles['Button-StyledButton']]: styledButton,
      [styles.StyledTUXIconOnlyButton]: iconOnlyButton,
      [styles.StyledTUXResponsiveButton]: responsiveButton,
      [styles.StyledMentionSuggestionButton]: mentionSuggest,
      [styles.StyledEmojiButton]: emoji,
      [styles.StyledTUXMoreCloseButton]: closeButton,
      [styles.disabled]: disabled || loading,
    }),
    disabled,
    ...propsValue,
  };

  const handleClick = useCallback(
    (event) => {
      if (disabled || loading) {
        event.preventDefault();
        return;
      }

      onClick?.(event);
    },
    [disabled, loading, onClick]
  );

  if (to) {
    Component = NavLink;
    props.to = to;
  } else if (href) {
    Component = 'a';
    props.href = href;
  }

  return (
    <>
      <Component {...props} onClick={(event) => handleClick(event)}>
        {loading ? (
          <FontAwesomeIcon icon={faSpinner} spin />
        ) : (
          <div className="TUXButton-content">
            {icon && (
              <div className="TUXButton-iconContainer">
                <div className={styles.DivIconWithRedDotContainer}>{icon}</div>
              </div>
            )}
            {expand && (
              <>
                <div className="TUXButton-iconContainer">
                  <Text
                    className="StyledTUXText"
                    style={{ color: 'inherit', fontSize: '15px' }}
                  >
                    {expand}
                  </Text>
                </div>
                <div className="TUXButton-iconContainer">
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    fontSize={'16px'}
                    color="var(--ui-shape-neutral-2)"
                  />
                </div>
              </>
            )}
            {label && <div className="TUXButton-label">{label}</div>}
            {children && <div>{children}</div>}
          </div>
        )}
      </Component>
    </>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  to: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.element,
  isDefault: PropTypes.bool,
  capsule: PropTypes.bool,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  borderless: PropTypes.bool,
  responsiveButton: PropTypes.bool,
  iconOnlyButton: PropTypes.bool,
  segmentControl: PropTypes.bool,
  mentionSuggest: PropTypes.bool,
  emoji: PropTypes.bool,
  listIcon: PropTypes.array,
  styledButton: PropTypes.bool,
  unstyledButton: PropTypes.bool,
  expand: PropTypes.string,
  onlyButton: PropTypes.bool,
  closeButton: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  onClick: PropTypes.func,
};

export default Button;
