import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import PhoneInput from '../../../components/PhoneInput';
import CodeInput from '../../../components/CodeInput';
import AgeSelector from '../../../components/AgeSelector';

import Form from '../../../components/Form';
import { registerPhoneSchema } from '../../../schema/registerSchema';
import { setComponent } from '../../../features/auth/authSlice';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '../../../components/Button';
import { areFieldsFilled } from '../../../function/areFieldsFilled';

function RegisterPhoneForm() {
  const dispatch = useDispatch();
  const methods = useForm({
    resolver: yupResolver(registerPhoneSchema),
    mode: 'onSubmit',
  });

  const {
    watch,
    trigger,
    register,
    getValues,
    setValue,
    clearErrors,
    formState: { errors, isSubmitting, isLoading },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const payload = {
        firstName: 'newUser',
        lastName: 'newUser',
        password: data.password,
        password_confirmation: data.password,
        email: data.email,
      };
      // dispatch(finalRegister(payload));
    } catch (error) {
      console.log(error);
    }
  };

  const isFilled = areFieldsFilled(getValues());

  return (
    <>
      <Form methods={methods} onSubmit={onSubmit}>
        <h2 className="H2Title">Đăng ký</h2>
        <div className={styles.DivTitle}>
          Vui lòng cho biết ngày sinh của bạn
        </div>
        <AgeSelector
          day={watch('day')}
          month={watch('month')}
          year={watch('year')}
          errors={errors}
          onChange={(field, value) => setValue(field, value)}
          watch={watch}
        />
        <div className={styles.DivDescription}>
          Điện thoại
          <Link
            className="ALink"
            onClick={() => dispatch(setComponent('emailRegister'))}
          >
            Đăng ký bằng email
          </Link>
        </div>
        <PhoneInput
          register={register}
          label="Số điện thoại"
          name="phone"
          watch={watch}
        />
        <CodeInput
          name="code"
          targetField="phone"
          requiredFields={['day', 'month', 'year', 'phone']}
          countDown={60}
          errors={errors}
          trigger={trigger}
          register={register}
          clearErrors={clearErrors}
          getValues={getValues}
          watch={watch}
        />
        <Button styledButton type="submit" disabled={!isFilled || isSubmitting}>
          Tiếp
        </Button>
      </Form>
    </>
  );
}

export default RegisterPhoneForm;
