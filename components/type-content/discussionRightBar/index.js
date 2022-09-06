import React, { useEffect, useState } from 'react';

import GetFeedback from 'components/get-feedback';
import SvgBulbColored from 'components/icon/BulbColored';
import PrimaryButton from 'components/ui-elements/button';
import { EVENTS } from 'helpers/amplitudeEvents';
import Router from 'next/router';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';

import ExerciseCard from './exerciseCard';
import styles from './styles.module.scss';

const DiscussionRightBar = ({ dailyWarmUps, user }) => {
  const [exercises, setExercises] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setExercises(dailyWarmUps);
  }, [dailyWarmUps]);

  const sendEvent = (event_type, post = 'New') => {
    const eventData = user
      ? [
          {
            event_type,
            event_properties: { post },
          },
        ]
      : [
          {
            event_type,
            event_properties: { post },
          },
        ];
    myAmplitude(eventData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.addfeed}>
        <h3>Write your first post</h3>
        <p>Creators who post regularly tend to earn more support and collaborations</p>
        <PrimaryButton
          text="Write a post"
          onClick={() => {
            if (user) {
              sendEvent(EVENTS.OPEN_CREATE_NEW_POST_MODAL);
              setIsModalVisible(true);
            } else {
              sendEvent(EVENTS.UNAUTHORIZED_CREATE_NEW_POST);
              Router.push('/sign-in?page=get-feedback', undefined, { scroll: false });
            }
          }}
        />
      </div>
      {exercises.length ? (
        <div className={styles.dailyWarmUps}>
          <div className={styles.dailyWarmUps_Top}>
            <div className={styles.date}>
              {new Date().toGMTString().split(' ')?.slice(0, 3).join(' ')}
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
                user={user}
                warmapId={exercise._id}
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
      ) : (
        ''
      )}
      <div>
        <GetFeedback
          user={user}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          sendEvent={sendEvent}
        />
      </div>
    </div>
  );
};

DiscussionRightBar.propTypes = { dailyWarmUps: PropTypes.array, user: PropTypes.object };

DiscussionRightBar.defaultProps = { dailyWarmUps: [], user: {} };

export default DiscussionRightBar;
