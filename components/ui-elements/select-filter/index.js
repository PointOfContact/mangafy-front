import React from 'react';

import { Select } from 'antd';
import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const { Option } = Select;

function SelectFilter({
  className,
  value,
  name,
  options,
  onChange,
  id,
  dropdownClassName,
  ...rest
}) {
  return (
    <>
      <Select
        className={cn(styles.box, className, 'select-filter')}
        value={value}
        name={name}
        onChange={onChange}
        id={id}
        dropdownClassName={'select-filter'}
        {...rest}>
        {options.map((item) => (
          <Option key={item.key} value={item.key}>
            {item.value}
          </Option>
        ))}
      </Select>
    </>
  );
}

SelectFilter.propTypes = {
  className: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  dropdownClassName: PropTypes.string,
  value: PropTypes.any,
  name: PropTypes.string,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  id: PropTypes.string,
};

SelectFilter.defaultProps = {
  className: {},
  value: undefined,
  name: '',
  onChange: () => {},
  id: null,
};

export default SelectFilter;
