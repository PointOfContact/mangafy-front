import React, { useEffect, useState } from 'react';

import { Select } from 'antd';
import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const { Option } = Select;
function PrimarySelect({
  countLimit,
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
  const [optionsSelected, setOptionsSelected] = useState([]);
  const [itemOptions, setItemOptions] = useState([]);

  useEffect(() => {
    setItemOptions(
      options?.map((item) => (
        <Option
          value={item.key}
          key={item.key}
          label={item.value}
          disabled={
            countLimit ? optionsSelected.length > 9 && !optionsSelected.includes(item.key) : false
          }>
          {item.value}
        </Option>
      ))
    );
  }, [optionsSelected, options]);

  const handleChange = (arrayValues) => {
    setOptionsSelected(arrayValues);
  };

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
        onChange={(e) => {
          handleChange(e);
          onChange(e);
        }}
        id={id}
        filterOption={(inputValue, option) =>
          inputValue ? option.label.toLowerCase().includes(inputValue.toLowerCase()) : true
        }
        {...rest}>
        {itemOptions}
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
  countLimit: PropTypes.bool,
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
  countLimit: false,
};

export default PrimarySelect;
