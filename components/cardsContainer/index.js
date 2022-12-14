import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { Col, Row } from 'antd';
import client from 'api/client';

import WelcomeCard from './WelcomeCard';
import myAmplitude from 'utils/amplitude';
import { EVENTS } from 'helpers/amplitudeEvents';

const placeholderData = [
  {
    id: 1,
    height: 400,
  },
  {
    id: 2,
    height: 300,
  },
  {
    id: 3,
    height: 350,
  },
  {
    id: 4,
    height: 300,
  },
  {
    id: 5,
    height: 400,
  },
  {
    id: 6,
    height: 350,
  },
];

const CardsContainer = ({
  error,
  columns = 3,
  cardsElements = [],
  user,
  onPageEnd,
  openCreateShotModal,
  openCreateProjectModal,
}) => {
  const [firstColRef, secondColRef, thirdColRef] = [useRef(null), useRef(null), useRef(null)];
  const [welcomeCardVisible, setWelcomeCardVisible] = useState(false);

  function closeWelcomeCard() {
    setWelcomeCardVisible(false);
    localStorage.setItem('welcomeCardClosed', true);
  }

  function onScroll(e) {
    const firstColRect = firstColRef.current?.getBoundingClientRect();
    const secondColRect = secondColRef.current?.getBoundingClientRect();
    const thirdColRect = thirdColRef.current?.getBoundingClientRect();
    if (
      window.innerHeight > firstColRect?.bottom ||
      window.innerHeight > secondColRect?.bottom ||
      window.innerHeight > thirdColRect?.bottom
    ) {
      onPageEnd();
    }
  }

  const sendEvent = (event_type, post = 'New') => {
    const eventData = [
      {
        event_type,
        event_properties: { post },
      },
    ];
    myAmplitude(eventData);
  };

  function createProjectHandler() {
    sendEvent(EVENTS.OPEN_CREATE_NEW_PROJECT_MODAL);
    openCreateProjectModal();
  }

  useEffect(async () => {
    if (!localStorage.getItem('welcomeCardClosed')) setWelcomeCardVisible(true);

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const [firstCol, secondCol, thirdCol] = [[], [], []];

  let colToPush = 1;
  let elements = cardsElements;
  if (cardsElements.length === 0 && !error)
    elements = placeholderData
      .sort(() => (Math.random() > 0.5 ? 1 : -1))
      .map((card) => (
        <div key={card.id} style={{ height: card.height }} className={styles.placeholder}></div>
      ));
  for (let i = 0; i < elements.length; i++) {
    if (elements[i]) {
      if (colToPush === 1) firstCol.push(elements[i]);
      if (colToPush === 2) secondCol.push(elements[i]);
      if (colToPush === 3) thirdCol.push(elements[i]);
      if (colToPush >= columns) colToPush = 1;
      else colToPush++;
    }
  }

  if (cardsElements.length === 0 && error) {
    return <div className={styles.error}>{/* Place for error placeholder */}</div>;
  }

  return (
    <>
      <Row align="top" gutter={20} style={{ marginTop: '1.5em' }}>
        <Col ref={firstColRef} span={24 / columns} className={styles.col}>
          {!!user && !!welcomeCardVisible ? (
            <WelcomeCard
              closeWelcomeCard={closeWelcomeCard}
              openCreateShotModal={openCreateShotModal}
              createProjectHandler={createProjectHandler}
              user={user}
            />
          ) : null}
          {firstCol}
        </Col>
        {columns > 1 ? (
          <Col ref={secondColRef} span={24 / columns} className={styles.col}>
            {secondCol}
          </Col>
        ) : null}
        {columns > 2 ? (
          <Col ref={thirdColRef} span={24 / columns} className={styles.col}>
            {thirdCol}
          </Col>
        ) : null}
      </Row>
      {!!error && <div className={styles.error}>{/* Place for error placeholder */}</div>}
    </>
  );
};

export default CardsContainer;
