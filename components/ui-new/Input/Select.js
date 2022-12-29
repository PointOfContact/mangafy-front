import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import { Select as AntdSelect } from 'antd';
const { Option } = AntdSelect;

const Select = ({
  sm,
  full,
  err,
  onChange,
  className,
  placeholder,
  defaultValue,
  rounded,
  options,
  disabled,
  mode,
}) => {
  return (
    <div
      className={cn(
        className,
        styles.input__container,
        mode === 'multiple' && styles.input__container_multiple,
        full && styles.input_fullWidth
      )}>
      <AntdSelect
        disabled={disabled}
        mode={mode}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={cn(
          styles.input,
          sm && styles.input_sm,
          full && styles.input_fullWidth,
          err && styles.input_red,
          typeof err === 'string' && styles.input_error,
          rounded && styles.input_rounded,
          disabled && styles.input_disabled,
          styles.select
        )}
        dropdownClassName={styles.select__dropdown}
        onChange={onChange}>
        {options.map((option) => (
          <Option value={option.key}>{option.value}</Option>
        ))}
      </AntdSelect>
      {typeof err === 'string' && <div className={styles.input__error}>{err}</div>}
    </div>
  );
};

export default Select;
