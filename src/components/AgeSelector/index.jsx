import styles from './styles.module.scss';

import Selector from '../Selector';
import getDaysInMonth from '../../function/getDaysInMonth';

function AgeSelector({
  day = '',
  month = '',
  year = '',
  errors = {},
  onChange = () => {},
  watch = () => {},
  setValue = () => {},
}) {
  const currentYear = new Date().getFullYear();
  const yearList = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const monthList = Array.from({ length: 12 }, (_, i) => i + 1);
  const daysInMonth = getDaysInMonth(month || 1, year || currentYear);
  const dayList = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  let ageHasError = errors.day || errors.month || errors.year;

  return (
    <div>
      <div className={styles.DivAgeSelector}>
        <Selector
          name={'month'}
          label={'Tháng'}
          list={monthList}
          placeholder={'Tháng'}
          error={ageHasError}
          value={month}
          watch={watch}
          onSelect={(val) => onChange('month', val)}
          setValue={setValue}
        />
        <Selector
          name={'day'}
          label={'Ngày'}
          list={dayList}
          placeholder={'Ngày'}
          error={ageHasError}
          watch={watch}
          value={day}
          onSelect={(val) => onChange('day', val)}
          setValue={setValue}
        />
        <Selector
          name={'year'}
          label={'Năm'}
          list={yearList}
          placeholder={'Năm'}
          error={ageHasError}
          watch={watch}
          value={year}
          onSelect={(val) => onChange('year', val)}
          setValue={setValue}
        />
      </div>
      <div
        className={styles.DivDescription}
        style={{
          color: ageHasError ? 'rgb(255, 76, 58)' : 'rgba(255, 255, 255, 0.5)',
        }}
      >
        {!ageHasError
          ? 'Ngày sinh của bạn sẽ không được hiển thị công khai.'
          : 'Hãy đảm bảo bạn nhập ngày sinh thật của mình'}
      </div>
    </div>
  );
}

export default AgeSelector;
