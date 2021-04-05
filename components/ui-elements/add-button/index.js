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
  ...rest
}) => (
  <div
    {...rest}
    className={cn(
      styles.add_button,
      className,
      isDark && styles.dark,
      isActive && styles.active_primary
    )}
    onClick={onClick}
    disabled={disabled}>
    <span>{text}</span>
    <SvgPrimaryAdd width={width} height={height} />
  </div>
);

AddButton.propTypes = {
  className: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  isDark: PropTypes.bool,
  isActive: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  isFullWidth: PropTypes.bool,
  text: PropTypes.string,
};

AddButton.defaultProps = {
  className: '',
  isDark: false,
  isActive: false,
  disabled: false,
  isFullWidth: false,
  onClick: () => {},
  width: '31px',
  height: '31px',
  text: 'Add',
};

export default AddButton;
