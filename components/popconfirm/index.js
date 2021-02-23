import React from 'react';

import { Popconfirm as AntPopconfirm } from 'antd';
import cn from 'classnames';
import PropTypes from 'prop-types';

function Popconfirm({ className, title, onConfirm, onCancel, okText, cancelText, item, ...rest }) {
  return (
    <span className="popconfirm">
      <AntPopconfirm
        className={cn(className)}
        title={title}
        onConfirm={onConfirm}
        onCancel={onCancel}
        okText={okText}
        cancelText={cancelText}
        {...rest}>
        {item}
      </AntPopconfirm>
    </span>
  );
}

Popconfirm.propTypes = {
  className: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  item: PropTypes.any.isRequired,
};

Popconfirm.defaultProps = {
  className: {},
  title: 'Are you sure delete this?',
  okText: 'Yes',
  cancelText: 'No',
  onConfirm: () => {},
  onCancel: () => {},
};

export default Popconfirm;
