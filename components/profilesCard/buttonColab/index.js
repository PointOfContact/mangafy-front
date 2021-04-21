import React from 'react';

import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const ButtonColab = ({ text, className, ...rest }) => (
  <div className={cn(styles.ButtonColab, className)}>{text}</div>
);

ButtonColab.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
};

ButtonColab.defaultProps = {
  className: {},
  text: '',
};

export default ButtonColab;
