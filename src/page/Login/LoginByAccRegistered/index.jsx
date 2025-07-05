import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import styles from './styles.module.scss';
import { loginEmailPasswordSchema } from '../../../schema/loginSchema';
import { useMemo } from 'react';
import Form from '../../../components/Form';
import Input from '../../../components/Input';
import { login } from '../../../services/auth/auth.service';
import { getCurrentUser } from '../../../features/auth/authAsync';
import { useModal } from '../../../contexts/ModalContext';
import { setComponent } from '../../../features/auth/authSlice';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '../../../components/Button';
import { areFieldsFilled } from '../../../function/areFieldsFilled';

function LoginEmailForm() {
  const navigate = useNavigate();
  const link = useSelector((state) => state.url.link);
  const dispatch = useDispatch();
  let schema = useMemo(() => loginEmailPasswordSchema, []);
  const { openModal, closeModal } = useModal();
  const methods = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  });

  const {
    watch,
    trigger,
    register,
    getValues,
    setValue,
    formState: { errors, isSubmitting, isLoading },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const payload = {
        email: data.email,
        password: data.password,
      };
      const res = await login(payload);
      if (res.success === true) {
        dispatch(getCurrentUser());
        navigate(link, { replace: true });
        closeModal();
        toast.success('Đăng nhập thành công', { closeButton: true });
      }
    } catch (err) {
      toast.error('Đăng nhập thất bại', { closeButton: true });
      console.error('Submit failed:', err);
    }
  };
  const isFilled = areFieldsFilled(getValues());
  return (
    <>
      <Form methods={methods} onSubmit={onSubmit}>
        <h2 className="H2Title">Đăng nhập</h2>
        <h2 className={styles.H2Title}>Bạn đã đăng ký</h2>
        <Input
          name={'email'}
          label="Email hoặc TikTok ID"
          errors={errors}
          register={register}
          watch={watch}
          readOnly={true}
        />
        <Input name="password" label="Mật khẩu" isPassword />
        <div className={styles.DivTextContainer}>
          <span role="status">
            Hãy nhập mật khẩu để đăng nhập vào tài khoản của bạn.
          </span>
        </div>
        <Link className="ALink">Bạn quên mật khẩu?</Link>
        <Button styledButton type="submit" disabled={!isFilled || isSubmitting}>
          Đăng nhập
        </Button>
      </Form>
    </>
  );
}

export default LoginEmailForm;
