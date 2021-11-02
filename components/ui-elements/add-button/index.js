import * as React from 'react';

import cn from 'classnames';
import PropTypes from 'prop-types';

import SvgPrimaryAdd from '../../icon/PrimaryAdd';
import styles from './styles.module.scss';

const AddButton = ({
  disabled,
  text,
  className,
  onClick,
  isDark,
  isActive,
  height,
  width,
  svg,
  ...rest
}) => (
  <div
    {...rest}
    className={cn(
      styles.add_button,
      isDark && styles.dark,
      isActive && styles.active_primary,
      className
    )}
    onClick={onClick}
    disabled={disabled}>
    <span>{text}</span>
    {svg || <SvgPrimaryAdd width={width} height={height} />}
  </div>
);

AddButton.propTypes = {
  svg: PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  isDark: PropTypes.bool,
  isActive: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string,
};

AddButton.defaultProps = {
  className: '',
  isDark: false,
  isActive: false,
  disabled: false,
  onClick: () => {},
  width: '31px',
  height: '31px',
  text: 'Add',
  svg: '',
};

export default AddButton;
