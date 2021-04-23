import React from 'react';

import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const ButtonToggle = ({ onText, offText, className, onChange, isChecked, size, id }) => (
  <>
    <div className={cn(styles.box, className)}>
      <p className={cn(!isChecked && styles.active)}>{offText}</p>
      <div
        style={{
          width: `${(size * 128) / 100}px`,
          height: `${(size * 48) / 100}px`,
        }}
        className="toggle-box">
        <div
          style={{
            transform: `scale(${size / 100})`,
          }}
          className={styles.toggle_wrapper}>
          <div className={cn(styles.toggle, styles.dog_rollover)}>
            <input
              className={styles.doggo}
              id={id}
              type="checkbox"
              onChange={onChange}
              checked={isChecked}
            />
            <label className={styles.toggle_item} htmlFor={id}>
              <div className={styles.dog}>
                <div className={styles.ear}></div>
                <div className={cn(styles.ear, styles.right)}></div>
                <div className={styles.face}>
                  <div className={styles.eyes}></div>
                  <div className={styles.mouth}></div>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
      <p className={cn(isChecked && styles.active)}>{onText}</p>
    </div>
  </>
);

ButtonToggle.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  onText: PropTypes.string,
  offText: PropTypes.string,
  onChange: PropTypes.func,
  isChecked: PropTypes.bool,
  size: PropTypes.number,
};

ButtonToggle.defaultProps = {
  className: '',
  onText: '',
  offText: '',
  isChecked: false,
  size: 50,
  onChange: () => {},
};

export default ButtonToggle;
