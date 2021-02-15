import * as React from 'react';

import { Button } from 'antd';
import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const PrimaryButton = ({
  text,
  disabled,
  className,
  onClick,
  isFullWidth,
  isRound,
  splitterStyle,
  isDark,
  isActive,
  items,
  isPlump,
  suffix,
  ...rest
}) => (
  <Button
    {...rest}
    className={cn(
      styles.primary_button,
      className,
      isFullWidth && styles.full_width,
      isRound && styles.round,
      isDark && styles.dark,
      isActive && styles.active_primary,
      isPlump && styles.plump
    )}
    onClick={onClick}
    style={splitterStyle || {}}
    onClick={onClick}
    disabled={disabled}>
    {items?.length ? (
      <div className={styles.main} style={{ width: `${items.length * 17 + 10}px` }}>
        {items.map((item, index) => (
          <div className={styles.users_img} style={{ left: `${index * 17}px` }}>
            {item}
          </div>
        ))}
      </div>
    ) : (
      text
    )}
    {suffix}
  </Button>
);

PrimaryButton.propTypes = {
  className: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  splitterStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  disabled: PropTypes.bool,
  text: PropTypes.string,
  onClick: PropTypes.func,
  isFullWidth: PropTypes.bool,
  isRound: PropTypes.bool,
  isDark: PropTypes.bool,
  isPlump: PropTypes.bool,
  isActive: PropTypes.bool,
  suffix: PropTypes.node,
};

PrimaryButton.defaultProps = {
  className: {},
  splitterStyle: {},
  text: '',
  items: null,
  disabled: false,
  isRound: false,
  isFullWidth: false,
  isDark: false,
  isPlump: false,
  isActive: false,
  onClick: () => {},
  suffix: '',
};

export default PrimaryButton;
