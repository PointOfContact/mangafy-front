import React, { useEffect, useState } from 'react';

import SvgBulbColored from 'components/icon/BulbColored';
import PrimaryButton from 'components/ui-elements/button';
import Link from 'next/link';
import PropTypes from 'prop-types';

import ExerciseCard from './exerciseCard';
import styles from './styles.module.scss';

const DiscussionRightBar = ({ dailyWarmUps }) => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    setExercises(dailyWarmUps);
  }, [dailyWarmUps]);

  return (
    <div className={styles.container}>
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
      <div className={styles.addfeed}>
        <h3>Don’t Just dream do!</h3>
        <p>Want to get early feedback on your graphic novel idea or manuscript?</p>
        <Link href="/get-feedback">
          <a>
            <PrimaryButton text="Get Feebacks" />
          </a>
        </Link>
      </div>
    </div>
  );
};

DiscussionRightBar.propTypes = { dailyWarmUps: PropTypes.array };

DiscussionRightBar.defaultProps = { dailyWarmUps: [] };

export default DiscussionRightBar;
