import React, { useEffect, useState } from 'react';

import SvgBulbColored from 'components/icon/BulbColored';
import PropTypes from 'prop-types';

import ExerciseCard from './exerciseCard';
import styles from './styles.module.scss';

const DiscussionRightBar = ({ dailyWarmUps }) => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    setExercises(dailyWarmUps);
  }, [dailyWarmUps]);

  return (
    <>
      <div className={styles.dailyWarmUps}>
        <div className={styles.dailyWarmUps_Top}>
          <div className={styles.date}>
            {new Date().toGMTString().split(' ').slice(0, 3).join(' ')}
          </div>
          <div className={styles.dialyTitle}>
            <SvgBulbColored width="15px" height="15px" />
            <div>
              <h4>Daily Warm-Ups</h4>
              <p>{exercises.length} quick & easy creative exercises</p>
            </div>
          </div>
        </div>
        <div className={styles.cards}>
          {exercises.map((exercise, index) => (
            <ExerciseCard
              key={exercise._id}
              order={index + 1}
              categories={exercise.categories}
              title={exercise.title}
              url={exercise.button.navigateTo}
              btnText={exercise.button.title}
            />
          ))}
        </div>
        <p className={styles.warmsText}>New warm-ups every morning</p>
      </div>
    </>
  );
};

DiscussionRightBar.propTypes = { dailyWarmUps: PropTypes.array };

DiscussionRightBar.defaultProps = { dailyWarmUps: [] };

export default DiscussionRightBar;
