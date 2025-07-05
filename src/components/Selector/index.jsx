import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faSortDown } from '@fortawesome/free-solid-svg-icons';

import styles from './styles.module.scss';

function Selector({
  name,
  label,
  list,
  placeholder,
  error,
  value,
  onSelect = () => {},
  setValue = () => {},
  watch = () => {},
}) {
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    setValue(name, '');
  }, [name, setValue]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (item) => {
    setOpen(false);
    onSelect?.(item);
  };

  //Hãy đảm bảo bạn nhập ngày sinh thật của mình
  return (
    <div
      className={styles.DivSelector}
      ref={boxRef}
      data-name={name}
      onClick={() => setOpen((prev) => !prev)}
    >
      <div
        className={clsx(styles.DivSelectLabel, { [styles.HasError]: error })}
        style={{
          color: error ? 'rgb(255, 76, 58)' : value ? 'white' : undefined,
        }}
      >
        {value ? `${label} ${value}` : placeholder}
        <FontAwesomeIcon
          icon={faSortDown}
          className={clsx(styles.StyledArrowBase, {
            [styles.StyledArrowRotated]: open,
          })}
        />
      </div>

      {open && (
        <div className={styles.DivOptionsWrapper}>
          {list.map((item) => (
            <div
              key={item}
              className={clsx(styles.DivOption, {
                [styles.DivCheck]: value === item,
              })}
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(item);
              }}
            >
              {label} {item}
              {value === item && (
                <FontAwesomeIcon
                  icon={faCheck}
                  className={styles.DivIconContainer}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

Selector.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.number).isRequired,
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.object,
  value: PropTypes.number,
  onSelect: PropTypes.func,
  setValue: PropTypes.func,
  watch: PropTypes.func,
};

export default Selector;
