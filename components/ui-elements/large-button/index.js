import * as React from 'react';

import { Button } from 'antd';
import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const LargeButton = ({ text, disabled, className, onClick, isFullWidth, ...rest }) => (
  <Button
    {...rest}
    className={cn(styles.large_primary_button, className, isFullWidth && styles.full_width)}
    onClick={onClick}
    disabled={disabled}>
    {text}
  </Button>
);

LargeButton.propTypes = {
  className: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  text: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  isFullWidth: PropTypes.bool,
};

LargeButton.defaultProps = {
  className: {},
  text: '',
  disabled: false,
  isFullWidth: false,
  onClick: () => {},
};

export default LargeButton;
