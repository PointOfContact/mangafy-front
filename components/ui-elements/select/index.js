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
          isLinear && styles.linear
        )}
        value={value}
        bordered={bordered}
        name={name}
        onChange={onChange}
        id={id}
        {...rest}>
        {options.map((item) => (
          <Option key={item.key}>{item.value}</Option>
        ))}
      </Select>
    </>
  );
}

PrimarySelect.propTypes = {
  className: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  isFullWidth: PropTypes.bool,
  isLinear: PropTypes.bool,
  bordered: PropTypes.bool,
  value: PropTypes.any,
  name: PropTypes.string,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  id: PropTypes.string,
  label: PropTypes.string,
};

PrimarySelect.defaultProps = {
  className: {},
  isFullWidth: false,
  isLinear: false,
  bordered: false,
  value: undefined,
  name: '',
  onChange: () => {},
  id: null,
  label: null,
};

export default PrimarySelect;
