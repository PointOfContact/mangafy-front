import React, { useEffect, useState } from 'react';

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
          <div className={styles.date}>Tue, Mar 23</div>
          <div className={styles.dialyTitle}>
            <h4>Daily Warm-Ups</h4>
            <p>3 quick & easy creative exercises</p>
          </div>
        </div>
        <div className={styles.cards}>
          {exercises.map((exercise) => (
            <ExerciseCard
              key={exercise._id}
              order={exercise.order}
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
