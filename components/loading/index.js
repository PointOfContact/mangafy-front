import * as React from 'react';

import { Spin } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const Loading = ({ loading }) => (
  <Modal
    visible={loading}
    className={styles.loading}
    width={'100%'}
    zIndex={1000000}
    centered={true}
    footer={null}
    closable={false}
  >
    <Spin className={styles.spin} size="large" tip="Loading..."></Spin>
  </Modal>
);

Loading.propTypes = {
  loading: PropTypes.bool,
};

Loading.defaultProps = {
  loading: false,
};

export default Loading;
