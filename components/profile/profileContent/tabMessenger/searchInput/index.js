import React from 'react';

import { Input } from 'antd';
import SvgSearch from 'components/icon/Search';
import PropTypes from 'prop-types';

import styles from './styles.module,scss';

const SearchInput = ({ mobile }) => (
  <div className={mobile ? styles.containerMobile : styles.container}>
    <Input placeholder="Search" />
    <i className={styles.searchIcon}>
      <SvgSearch width="22" height="22" />
    </i>
  </div>
);

SearchInput.propTypes = {
  mobile: PropTypes.bool,
};

SearchInput.defaultProps = {
  mobile: false,
};

export default SearchInput;
