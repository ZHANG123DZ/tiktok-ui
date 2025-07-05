import PropTypes from 'prop-types';

import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import Input from '../Input';

function CodeInput({
  name = 'code',
  label = 'Nhập mã gồm 6 chữ số',
  targetField = '',
  requiredFields = [],
  countDown = 60,
  errors = {},
  register = () => {},
  watch = () => {},
  getValues = () => ({}),
  trigger = async () => {},
  clearErrors = () => {},
  onSend = () => {},
}) {
  const [timer, setTimer] = useState(0);

  const errorMessage = errors?.[name]?.message;

  //Kiểm tra xem dc điền hết chưa
  const isFilled = requiredFields.every((field) => {
    const value = watch(field);
    return value !== '' && value !== undefined && value !== null;
  });

  //CountDown send code
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  //Action gửi mã OTP
  const handleSendCode = async () => {
    const isValid = await trigger(requiredFields);
    const targetValue = getValues(targetField);

    if (isFilled && isValid && targetValue) {
      onSend(targetValue);
      setTimer(countDown);
    }
  };

  return (
    <div>
      <div className={styles.DivCodeInputContainer}>
        <div
          style={{
            display: 'flex',
            width: '100%',
          }}
        >
          <Input
            name={name}
            register={register}
            watch={watch}
            label={label}
            message={errorMessage}
            errors={errors}
            styled={true}
            onBlur={async (e) => {
              if (e.target.value !== '') await trigger(name);
            }}
            onFocus={() => clearErrors(name)}
          />
        </div>

        <button
          className={styles.ButtonSendCode}
          onClick={() => handleSendCode()}
          type="button"
          disabled={!isFilled || timer > 0}
        >
          {timer > 0 ? `Gửi mã: ${timer}s` : 'Gửi mã'}
        </button>
      </div>

      {errorMessage && (
        <div className={styles.DivTextContainer}>
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}

CodeInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  requiredFields: PropTypes.arrayOf(PropTypes.string),
  countDown: PropTypes.number,
  errors: PropTypes.object,
  register: PropTypes.func,
  watch: PropTypes.func,
  getValues: PropTypes.func,
  trigger: PropTypes.func,
  clearErrors: PropTypes.func,
  onSend: PropTypes.func,
  targetField: PropTypes.string,
};

export default CodeInput;
