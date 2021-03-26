import React, { useState } from 'react';

import { CREATIVE_EXERCISES } from 'helpers/constant';

import ExerciseCard from './exerciseCard';
import styles from './styles.module.scss';

const DiscussionRightBar = (props) => {
  const {} = props;
  const [exercises, setExercises] = useState(CREATIVE_EXERCISES);

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
              key={exercise.id}
              count={exercise.count}
              type={exercise.type}
              description={exercise.description}
            />
          ))}
        </div>
        <p className={styles.warmsText}>New warm-ups every morning</p>
      </div>
    </>
  );
};

DiscussionRightBar.propTypes = {};

DiscussionRightBar.defaultProps = {};

export default DiscussionRightBar;
