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
  limit,
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
    disabled={disabled}>
    {items?.length ? (
      <>
        {items?.length <= limit + 1 ? (
          <div className={styles.main} style={{ width: `${items.length * 17 + 10}px` }}>
            {items.map((item, index) => (
              <div key={index} className={styles.users_img} style={{ left: `${index * 17}px` }}>
                {item}
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className={styles.main} style={{ width: `${(limit + 1) * 17 + 10}px` }}>
              {items.slice(0, limit).map((item, index) => (
                <div key={index} className={styles.users_img} style={{ left: `${index * 17}px` }}>
                  {item}
                </div>
              ))}
              <div className={styles.users_img_count} style={{ left: `${limit * 17}px` }}>
                <div className={styles.count}>+{items.length - limit}</div>
              </div>
            </div>
          </>
        )}
      </>
    ) : (
      text
    )}

    {suffix}
  </Button>
);

PrimaryButton.propTypes = {
  className: PropTypes.string,
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
  limit: PropTypes.number,
};

PrimaryButton.defaultProps = {
  className: '',
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
  limit: 3,
};

export default PrimaryButton;
