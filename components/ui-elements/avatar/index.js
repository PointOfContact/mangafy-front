import * as React from 'react';

import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const Avatar = ({ text, className, onClick, size, fontSize, ...rest }) => {
  return (
    <div
      {...rest}
      style={{
        fontSize: `${fontSize || size / 2 || 20}px`,
        width: size || '100%',
        height: size || '100%',
      }}
      className={cn(styles.avatar, className)}
      onClick={onClick}
    >
      {text && text[0]}
    </div>
  );
};

Avatar.propTypes = {
  className: PropTypes.string,
  size: PropTypes.any,
  fontSize: PropTypes.number,
  onClick: PropTypes.func,
  text: PropTypes.string,
};

Avatar.defaultProps = {
  className: '',
  fontSize: null,
  size: null,
  onClick: () => {},
  text: '',
};

export default Avatar;
