import * as React from 'react';

import { Button } from 'antd';
import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const HugeButton = ({ text, disabled, className, onClick, isFullWidth, ...rest }) => (
  <Button
    {...rest}
    className={cn(styles.hugeButton, className, isFullWidth && styles.full_width)}
    onClick={onClick}
    disabled={disabled}>
    {text}
  </Button>
);

HugeButton.propTypes = {
  className: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  text: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  isFullWidth: PropTypes.bool,
};

HugeButton.defaultProps = {
  className: {},
  text: '',
  disabled: false,
  isFullWidth: false,
  onClick: () => {},
};

export default HugeButton;
