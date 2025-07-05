import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const Text = ({
  as: Tag = 'p',
  className = '',
  children,
  weight,
  display = false,
  ...props
}) => {
  return (
    <Tag
      className={clsx(
        `TUXText`,
        'TUXText--tiktok-sans',
        `TUXText--weight-${weight}`,
        className,
        display && `TUXText--tiktok-display`
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
  weight: PropTypes.string,
  display: PropTypes.bool,
};

export default Text;
