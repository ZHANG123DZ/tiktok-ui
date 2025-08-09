import clsx from 'clsx';
import './text.css';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const Text = ({
  as: Tag = 'p',
  className = '',
  children,
  weight = 'regular',
  display = false,
  truncate = false,
  label = false,
  ...props
}) => {
  return (
    <Tag
      className={clsx(
        'TUXText',
        'TUXText--tiktok-sans',
        `TUXText--weight-${weight}`,
        className && styles[className], // Class từ SCSS module
        className && !styles[className] && className, // Class global nếu không có trong SCSS
        display && 'TUXText--tiktok-display',
        truncate && 'TUXText--truncate',
        label && 'TUXMenuItem-label'
      )}
      {...props}
    >
      {children}
    </Tag>
  );
};

Text.propTypes = {
  as: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  weight: PropTypes.oneOf(['regular', 'medium', 'semibold', 'bold']),
  display: PropTypes.bool,
  truncate: PropTypes.bool,
  label: PropTypes.bool,
};

Text.defaultProps = {
  as: 'p',
  className: '',
  weight: 'regular',
  display: false,
};

export default Text;
