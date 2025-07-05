import * as yup from 'yup';
import getDaysInMonth from '../function/getDaysInMonth';

export const registerPhoneSchema = yup
  .object({
    phone: yup
      .string()
      .matches(/^\d+$/, 'Nhập số điện thoại hợp lệ')
      .required('Không được để trống mã kiểm tra'),
    code: yup
      .string()
      .matches(/^\d+$/, 'Nhập mã có 6 chữ số')
      .length(6, 'Nhập mã có 6 chữ số')
      .required('Không được để trống mã kiểm tra'),
  })
  .required();

export const registerEmailSchema = yup
  .object({
    email: yup
      .string()
      .email('Nhập địa chỉ email hợp lệ')
      .required('Không được để trống mã kiểm tra'),
    password: yup
      .string()
      .matches(
        /^(?!.*\s)[A-Za-z0-9!@#$%^&*()_+\-=[\];:,.<>?/|~]+$/,
        'Ký tự đặc biệt không hợp lệ'
      )
      .required('Thiếu thông tin chứng nhận ID')
      .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
      .max(20, 'Mật khẩu không được vượt quá 20 ký tự')
      .matches(/[A-Za-z]/, 'Mật khẩu phải chứa ít nhất một chữ cái')
      .matches(/\d/, 'Mật khẩu phải chứa ít nhất một số')
      .matches(/[^A-Za-z0-9]/, 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt'),
    code: yup
      .string()
      .matches(/^\d+$/, 'Phải nhập mã có 6 chữ số')
      .length(6, 'Phải nhập mã có 6 chữ số')
      .required('Không được để trống mã kiểm tra'),
    day: yup
      .number()
      .typeError('Hãy đảm bảo bạn nhập ngày sinh thật của mình')
      .required('Vui lòng chọn ngày')
      .test(
        'valid-day',
        'Hãy đảm bảo bạn nhập ngày sinh thật của mình',
        function (value) {
          const { month, year } = this.parent;
          if (!month || !year || !value) return true;
          return value <= getDaysInMonth(month, year);
        }
      ),
    month: yup
      .number()
      .typeError('Hãy đảm bảo bạn nhập ngày sinh thật của mình')
      .required('Vui lòng chọn tháng'),
    year: yup
      .number()
      .typeError('Hãy đảm bảo bạn nhập ngày sinh thật của mình')
      .required('Vui lòng chọn năm')
      .test(
        'is-18',
        'Hãy đảm bảo bạn nhập ngày sinh thật của mình',
        function (year) {
          const { day, month } = this.parent;
          const today = new Date();
          const birthDate = new Date(year, month - 1, day);

          const age = today.getFullYear() - birthDate.getFullYear();
          const hasHadBirthday =
            today.getMonth() > birthDate.getMonth() ||
            (today.getMonth() === birthDate.getMonth() &&
              today.getDate() >= birthDate.getDate());

          return age > 18 || (age === 18 && hasHadBirthday);
        }
      ),
  })
  .required();
export const TikTokID = yup.object({
  username: yup.string(),
});
export default { registerPhoneSchema, registerEmailSchema, TikTokID };

//Hãy đảm bảo bạn nhập ngày sinh thật của mình

//Nhập một ngày hợp lệ

//
// .test('checkEmail', 'Email đã tồn tại', async (email) => {
//   const res = await httpRequest.post(email);
//   const data = await res.json();
//   return data.isAvailable;
// }),
