import React from 'react';

import cn from 'classnames';
import SvgLeftArrow from 'components/icon/LeftArrow';
import SvgRightArrow from 'components/icon/RightArrow';
import { EVENTS } from 'helpers/amplitudeEvents';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';

import styles from './styles.module.scss';

const Pagination = ({ currentNumber, setCurrentNumber, data, user }) => {
  const dataEvent = [
    {
      user_id: user?._id,
      user_properties: {
        ...user,
      },
    },
  ];

  return (
    <div className={styles.pagination}>
      <div
        className={cn(currentNumber === 1 && styles.disabledButton, styles.arrow)}
        onClick={() => {
          dataEvent[0].event_type = EVENTS.PREV_VIEW_PAGE;
          dataEvent[0].event_properties = { chapter: data[currentNumber - 1] };
          myAmplitude(dataEvent);
          setCurrentNumber(currentNumber - 1);
        }}>
        <SvgLeftArrow width="14" height="14" />
      </div>
      <p className={styles.currentChapter}># {currentNumber}</p>
      <div
        className={cn(currentNumber === data.length && styles.disabledButton, styles.arrow)}
        onClick={() => {
          dataEvent[0].event_type = EVENTS.NEXT_VIEW_PAGE;
          dataEvent[0].event_properties = { chapter: data[currentNumber + 2] };
          myAmplitude(dataEvent);
          setCurrentNumber(currentNumber + 1);
        }}>
        <SvgRightArrow width="14" height="14" />
      </div>
    </div>
  );
};

Pagination.propTypes = {
  currentNumber: PropTypes.number.isRequired,
  setCurrentNumber: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  user: PropTypes.object,
};

Pagination.defaultProps = {
  user: {},
};

export default Pagination;
