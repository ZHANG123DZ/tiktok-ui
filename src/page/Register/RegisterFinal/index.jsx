import { useDispatch, useSelector } from 'react-redux';
import Form from '../../../components/Form';
import Input from '../../../components/Input';
import authService from '../../../services/auth/auth.service';
import { TikTokID } from '../../../schema/registerSchema';
import { useModal } from '../../../contexts/ModalContext';
import { toast } from 'react-toastify';

import styles from './styles.module.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '../../../components/Button';
import { areFieldsFilled } from '../../../function/areFieldsFilled';
import { setRegister } from '../../../features/auth/authSlice';

function RegisterFinal() {
  const dispatch = useDispatch();
  const payload = useSelector((state) => state.auth.dataRegister);
  const { closeModal } = useModal();
  const methods = useForm({
    resolver: yupResolver(TikTokID),
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
    // payload.username = data.username;
    dispatch(setRegister(payload));
    console.log('Dayd là payload: ', payload);
    try {
      // const res = await authService.register(payload);
      // if (res.success === true) {
      //   toast.success('Đăng ký thành công', { closeButton: true });
      //   closeModal();
      // }
    } catch (error) {
      toast.error('Đăng ký thất bại', { closeButton: true });
      console.log(error);
    }
  };
  const isFilled = areFieldsFilled(getValues());

  return (
    <>
      <Form methods={methods} onSubmit={onSubmit}>
        <h2 className="H2Title">Đăng ký</h2>
        <div className={styles.DivDescription}>Tạo TikTok ID</div>
        <Input
          label={'TikTok ID'}
          name={'username'}
          register={register}
          errors={errors}
          watch={watch}
        />
        <p className={styles.DivTextContainer}>
          <span>Bạn luôn có thể thay đổi điều này sau.</span>
        </p>
        <button
          type="submit"
          className={styles.DivTextContainer2}
          style={{ fontSize: '18px' }}
        >
          Bỏ qua
        </button>
        <Button styledButton type="submit" disabled={!isFilled || isSubmitting}>
          Tiếp
        </Button>
      </Form>
    </>
  );
}
//Tên người dùng này không khả dụng. Hãy thử tên người dùng được gợi ý hoặc nhập tên người dùng mới.
export default RegisterFinal;
{
  /* <div class="css-10djjbw-DivSuggestListWrapper e1ulspo0">
  <div class="css-myif39-DivLabel e1ulspo1">Được đề xuất</div>
  <ul class="css-3s5rn0-UlList e1ulspo2">
    <li class="css-1v3wwlv-LiListItem e1ulspo3">rdtf30</li>
    <li class="css-1v3wwlv-LiListItem e1ulspo3">rdtf56</li>
    <li class="css-1v3wwlv-LiListItem e1ulspo3">rdtf98</li>
    <li class="css-1v3wwlv-LiListItem e1ulspo3">rdtf104</li>
    <li class="css-1v3wwlv-LiListItem e1ulspo3">rdtf223</li>
    <li class="css-1v3wwlv-LiListItem e1ulspo3">rdtf260</li>
  </ul>
</div>; */
}
