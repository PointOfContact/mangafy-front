import React from 'react';

import { Select } from 'antd';
import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const { Option } = Select;

function PrimarySelect({
  className,
  isFullWidth,
  isLinear,
  bordered,
  value,
  name,
  options,
  onChange,
  id,
  label,
  isMulti,
  ...rest
}) {
  return (
    <>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <Select
        className={cn(
          styles.select,
          className,
          isFullWidth && styles.full_width,
          isMulti && styles.isMulti,
          isMulti && 'isMultiPlacholder',
          isLinear && styles.linear
        )}
        value={value}
        bordered={bordered}
        name={name}
        onChange={onChange}
        id={id}
        {...rest}>
        {options?.map((item) => (
          <Option key={item.key}>{item.value}</Option>
        ))}
      </Select>
    </>
  );
}

PrimarySelect.propTypes = {
  className: PropTypes.string,
  isFullWidth: PropTypes.bool,
  isLinear: PropTypes.bool,
  bordered: PropTypes.bool,
  value: PropTypes.any,
  name: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  id: PropTypes.string,
  label: PropTypes.string,
  isMulti: PropTypes.bool,
};

PrimarySelect.defaultProps = {
  className: '',
  isFullWidth: false,
  isLinear: false,
  bordered: false,
  value: undefined,
  name: '',
  onChange: () => {},
  id: null,
  label: null,
  options: [],
  isMulti: false,
};

export default PrimarySelect;
