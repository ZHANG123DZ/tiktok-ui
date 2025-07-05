import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';
import { useState } from 'react';

function CheckBox({ label }) {
  const [isCheck, setIsCheck] = useState(false);

  return (
    <div
      className={styles.DivContainer}
      onMouseDown={() => setIsCheck(!isCheck)}
    >
      <div className={styles.DivCheckboxWrapper}>
        <input
          type="checkbox"
          className={styles.InputCheckbox}
          id="email-consent"
        />
        <label htmlFor="email-consent" className={styles.LabelCheck}>
          {isCheck ? (
            <FontAwesomeIcon icon={faCheck} className={styles.CheckboxIcon} />
          ) : null}
        </label>
      </div>
      <label htmlFor="email-consent" className={styles.LabelCheckboxText}>
        {label}
      </label>
    </div>
  );
}

CheckBox.propTypes = {
  label: PropTypes.string,
};

export default CheckBox;
