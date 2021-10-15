import React from 'react';

import { Input } from 'antd';
import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const { TextArea: AntTextArea } = Input;

function TextArea({
  className,
  isFullWidth,
  isLinear,
  value,
  placeholder,
  onChange,
  minRows,
  maxRows,
  ...rest
}) {
  return (
    <AntTextArea
      className={cn(
        styles.primary_textArea,
        isFullWidth && styles.full_width,
        isLinear && styles.linear,
        className
      )}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoSize={{ minRows, maxRows }}
      {...rest}
    />
  );
}

TextArea.propTypes = {
  className: PropTypes.string,
  isFullWidth: PropTypes.bool,
  onChange: PropTypes.func,
  isLinear: PropTypes.bool,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  minRows: PropTypes.number,
  maxRows: PropTypes.number,
};

TextArea.defaultProps = {
  className: '',
  isFullWidth: false,
  onChange: () => {},
  value: '',
  placeholder: '',
  minRows: 5,
  maxRows: 7,
  isLinear: false,
};

export default TextArea;
