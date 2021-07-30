import React, { useEffect, useState } from 'react';

import { Modal } from 'antd';
import SvgBulbColored from 'components/icon/BulbColored';
import SvgClose from 'components/icon/Close';
import PrimaryButton from 'components/ui-elements/button';
import GetFeedback from 'features/get-feedback';
import Router from 'next/router';
import PropTypes from 'prop-types';

import ExerciseCard from './exerciseCard';
import styles from './styles.module.scss';

const DiscussionRightBar = ({ dailyWarmUps, user }) => {
  const [exercises, setExercises] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setExercises(dailyWarmUps);
  }, [dailyWarmUps]);

  return (
    <div className={styles.container}>
      <div className={styles.addfeed}>
        <h3>Write your first post</h3>
        <p>Creators who post regularly tend to earn more support and collaborations</p>
        <PrimaryButton
          text="Write a post"
          onClick={() => {
            if (user) {
              setIsModalVisible(true);
            } else {
              Router.push('/sign-in?page=get-feedback');
            }
          }}
        />
      </div>
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
      <div>
        <Modal
          className={styles.modalFeedbacks}
          zIndex={1000000}
          closeIcon={
            <span className={styles.closeIcon} onClick={() => setIsModalVisible(false)}>
              <SvgClose />
            </span>
          }
          visible={isModalVisible}
          footer={null}>
          <GetFeedback user={user} closeModal={setIsModalVisible} />
        </Modal>
      </div>
    </div>
  );
};

DiscussionRightBar.propTypes = { dailyWarmUps: PropTypes.array, user: PropTypes.object };

DiscussionRightBar.defaultProps = { dailyWarmUps: [], user: {} };

export default DiscussionRightBar;
