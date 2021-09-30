import React from 'react';

import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const ToggleSwitch = ({ onChange, inputRef, className, ...rest }) => (
  <label className={cn(styles.switch, className)}>
    <input type="checkbox" onChange={onChange} ref={inputRef} {...rest} />
    <span className={cn(styles.slider, styles.round)}></span>
  </label>
);

ToggleSwitch.propTypes = {
  onChange: PropTypes.func.isRequired,
  inputRef: PropTypes.object,
  className: PropTypes.string,
};

ToggleSwitch.defaultProps = {
  inputRef: {},
  className: '',
};

export default ToggleSwitch;
