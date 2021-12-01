import React from 'react';

import cn from 'classnames';
import SvgLeftArrow from 'components/icon/LeftArrow';
import SvgRightArrow from 'components/icon/RightArrow';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const Pagination = ({ currentNumber, setCurrentNumber, data }) => (
  <div className={styles.pagination}>
    <div
      className={cn(currentNumber === 1 && styles.disabledButton, styles.arrow)}
      onClick={() => setCurrentNumber(currentNumber - 1)}>
      <SvgLeftArrow width="14" height="14" />
    </div>
    <p className={styles.currentChapter}># {currentNumber}</p>
    <div
      className={cn(currentNumber === data.length && styles.disabledButton, styles.arrow)}
      onClick={() => setCurrentNumber(currentNumber + 1)}>
      <SvgRightArrow width="14" height="14" />
    </div>
  </div>
);

Pagination.propTypes = {
  currentNumber: PropTypes.number.isRequired,
  setCurrentNumber: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
};

export default Pagination;
