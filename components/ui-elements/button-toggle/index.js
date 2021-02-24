import React from 'react';

import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const ButtonToggle = ({ onText, offText, className, onChange, isChecked, ...rest }) => (
  <>
    <div className={cn(styles.box, className)}>
      <input
        className={styles.box__field}
        onChange={onChange}
        type="checkbox"
        name="radio"
        checked={isChecked}
        {...rest}
      />
      <div className={styles.box__content}>
        <p className={cn(styles.box__text, styles.box__text_not_active)}>{offText}</p>
        <i className={styles.box__circle}></i>
        <p className={cn(styles.box__text, styles.box__text_active)}>{onText}</p>
      </div>
    </div>
  </>
);

ButtonToggle.propTypes = {
  className: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onText: PropTypes.string,
  offText: PropTypes.string,
  onChange: PropTypes.func,
  isChecked: PropTypes.bool,
};

ButtonToggle.defaultProps = {
  className: {},
  onText: '',
  offText: '',
  isChecked: null,
  onChange: () => {},
};

export default ButtonToggle;
