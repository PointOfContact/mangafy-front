import React from 'react';

import { Input } from 'antd';
import cn from 'classnames';
import PropTypes from 'prop-types';

import SvgSearch from '../../icon/Search';
import styles from './styles.module.scss';

function Search({ className, isFullWidth, onClick, ...rest }) {
  return (
    <div className={cn(styles.search, className, isFullWidth && styles.full_width)}>
      <button onClick={onClick}>
        <SvgSearch width="22px" height="22px" />
      </button>
      <Input {...rest} />
    </div>
  );
}

Search.propTypes = {
  className: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  isFullWidth: PropTypes.bool,
  onClick: PropTypes.func,
};

Search.defaultProps = {
  className: {},
  isFullWidth: false,
  onClick: () => {},
};

export default Search;
