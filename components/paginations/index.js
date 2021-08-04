import React from 'react';

import { Pagination } from 'antd';
import Link from 'next/link';
import PropTypes from 'prop-types';
import * as qs from 'query-string';
import { LinkCreator } from 'utils/linkCreator';

function is_server() {
  return !(typeof window !== 'undefined' && window.document);
}

const Paginations = ({
  className,
  total,
  pageSize,
  defaultCurrent,
  showSizeChanger,
  hideOnSinglePage,
  current,
  onChange,
  prefix,
  ...rest
}) => {
  const getPageLink = (page) => {
    const parsed = qs.parse(window.location.search);
    return `${prefix}/${LinkCreator.toQuery({ ...parsed, page })}`;
  };
  return (
    <div className={'paginations'}>
      <Pagination
        {...rest}
        className={className}
        hideOnSinglePage={hideOnSinglePage}
        showSizeChanger={showSizeChanger}
        pageSize={pageSize}
        defaultCurrent={defaultCurrent}
        current={current}
        total={total}
        onChange={onChange}
        itemRender={(page, type, originalElement) => {
          if (is_server()) return originalElement;
          switch (type) {
            case 'page':
              return (
                <Link href={getPageLink(page)}>
                  <a>{originalElement}</a>
                </Link>
              );
            case 'next':
              return (
                <Link href={getPageLink(current + 1 <= total / pageSize ? current + 1 : current)}>
                  <a>{originalElement}</a>
                </Link>
              );
            case 'prev':
              return (
                <Link href={getPageLink(current - 1 || 1)}>
                  <a>{originalElement}</a>
                </Link>
              );
            default:
              return originalElement;
          }
        }}
      />
    </div>
  );
};

Paginations.propTypes = {
  className: PropTypes.string,
  hideOnSinglePage: PropTypes.bool,
  showSizeChanger: PropTypes.bool,
  pageSize: PropTypes.number,
  defaultCurrent: PropTypes.number,
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  prefix: PropTypes.string.isRequired,
};

Paginations.defaultProps = {
  className: '',
  hideOnSinglePage: true,
  showSizeChanger: false,
  pageSize: 9,
  defaultCurrent: 9,
};

export default Paginations;
