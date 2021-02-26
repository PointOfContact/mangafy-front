import React from 'react';

import { Pagination } from 'antd';
import PropTypes from 'prop-types';

const Paginations = ({
  className,
  total,
  pageSize,
  defaultCurrent,
  showSizeChanger,
  hideOnSinglePage,
  current,
  onChange,
  ...rest
}) => (
  <div className={'paginations'}>
    <Pagination
      {...rest}
      className={className}
      hideOnSinglePage={hideOnSinglePage}
      showSizeChanger={showSizeChanger}
      pageSize={pageSize}
      defaultCurrent={defaultCurrent}
      total={total}
      current={current}
      onChange={onChange}
    />
  </div>
);

Paginations.propTypes = {
  className: PropTypes.string,
  hideOnSinglePage: PropTypes.bool,
  showSizeChanger: PropTypes.bool,
  pageSize: PropTypes.number,
  defaultCurrent: PropTypes.number,
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

Paginations.defaultProps = {
  className: '',
  hideOnSinglePage: true,
  showSizeChanger: false,
  pageSize: 9,
  defaultCurrent: 9,
};

export default Paginations;
