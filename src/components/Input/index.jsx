import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faEyeSlash,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
function Input({
  label = '',
  name = '',
  register = () => ({}),
  watch = () => ({}),
  onChange = () => {},
  onKeyDown = () => {},
  onFocus = () => {},
  onBlur = () => {},
  errors = {},
  isPassword = false,
  styled = false,
  readOnly = false,
}) {
  const [isHidden, setIsHidden] = useState(true);
  const errorMessage = errors?.[name]?.message;
  const inputType = isPassword ? (isHidden ? 'password' : 'text') : 'text';

  return (
    <>
      <div
        className={
          styled
            ? styles['DivInputContainer-StyledBaseInput']
            : styles.DivInputContainer
        }
      >
        <input
          type={inputType}
          placeholder={label}
          {...register(name, {
            onChange: (e) => onChange(e),
            onBlur: (e) => onBlur(e),
          })}
          onKeyDown={(e) => onKeyDown(e)}
          onFocus={(e) => onFocus(e)}
          className={clsx(
            styles.InputContainer,
            styled
              ? styles['InputContainer-StyledBaseInput']
              : styles.InputContainer
          )}
          style={{ border: errorMessage && '1px solid rgb(255, 76, 58)' }}
          readOnly={readOnly}
        />

        <div className={styles.DivIconContainer}>
          {errorMessage && (
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              style={{ color: 'rgb(255, 76, 58)' }}
            />
          )}
          {isPassword && (
            <FontAwesomeIcon
              icon={isHidden ? faEyeSlash : faEye}
              style={{ color: 'rgba(255, 255, 255, 0.5)', marginLeft: '16px' }}
              onClick={() => setIsHidden(!isHidden)}
            />
          )}
        </div>
      </div>
      {errorMessage && !styled && (
        <div className={styles.DivTextContainer}>
          <span>{errorMessage}</span>
        </div>
      )}
    </>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  register: PropTypes.func,
  watch: PropTypes.func,
  errors: PropTypes.object,
  isPassword: PropTypes.bool,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  styled: PropTypes.bool,
  readOnly: PropTypes.bool,
};

export default Input;
