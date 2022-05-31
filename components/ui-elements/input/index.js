import React from 'react';

import { Input } from 'antd';
import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

function PrimaryInput({ inputRef, className, isFullWidth, isLinear, isSmall, onChange, ...rest }) {
  return (
    <Input
      {...inputRef}
      className={cn(
        styles.primary_input,
        className,
        isFullWidth && styles.full_width,
        isLinear && styles.linear,
        isSmall && styles.small
      )}
      onChange={onChange}
      {...rest}
    />
  );
}

PrimaryInput.propTypes = {
  className: PropTypes.string,
  isFullWidth: PropTypes.bool,
  isLinear: PropTypes.bool,
  isSmall: PropTypes.bool,
  onChange: PropTypes.func,
  inputRef: PropTypes.object,
};

PrimaryInput.defaultProps = {
  className: '',
  isFullWidth: false,
  isLinear: false,
  isSmall: false,
  onChange: () => {},
  inputRef: {},
};

export default PrimaryInput;
