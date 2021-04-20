import React from 'react';

import { Col } from 'antd';
import Imgix from 'components/imgix';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const AnimePlatformCard = ({ img, title, description, width, height }) => (
  <Col className="gutter-row" sm={24} lg={12} xl={12}>
    <div className={styles.card}>
      <div className={styles.img}>
        <div className={styles.img_bg}></div>
        <Imgix
          layout="intrinsic"
          width={width}
          height={height}
          src={`https://mangafy.club/img/${img}`}
          alt=""
        />
      </div>
      <div className={styles.info}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  </Col>
);

AnimePlatformCard.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};

AnimePlatformCard.defaultProps = {
  width: 150,
  height: 150,
};

export default AnimePlatformCard;
