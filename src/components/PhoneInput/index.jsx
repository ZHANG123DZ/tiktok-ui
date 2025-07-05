import styles from './styles.module.scss';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from '../Input';

function PhoneInput({
  name = 'phone',
  register = () => {},
  watch = () => {},
  errors = {},
  label = 'Số điện thoại',
}) {
  const errorMessage = errors?.[name]?.message;

  return (
    <div className={styles.DivContainer}>
      <div
        className={styles.DivPhoneInputContainer}
        style={{ border: errorMessage && '1px solid rgb(255, 76, 58)' }}
      >
        <div className={styles.DivAreaSelectionContainer}>
          <div className={styles.DivAreaLabelContainer}>
            <span className={styles.SpanLabelContainer}>VN +84</span>
            <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
          </div>
        </div>

        <Input
          name={'phone'}
          register={register}
          watch={watch}
          label={'Số điện thoại'}
          styled={true}
          errors={errors}
        />
      </div>

      {errorMessage && (
        <div className={styles.DivTextContainer}>
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}

export default PhoneInput;
