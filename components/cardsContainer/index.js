import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { Col, Row } from 'antd';
import Logo from 'components/icon/new/Logo';
import Close from 'components/icon/new/Close';
import client from 'api/client';
import { useRouter } from 'next/router';

import ArrowDown2 from 'components/icon/new/ArrowDown2';

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

const CardsContainer = ({ columns = 3, cardsElements = [], user, onPageEnd }) => {
  const router = useRouter();
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

  function WelcomeCard(props) {
    return (
      <div className={styles.welcomeCard}>
        <div className={styles.welcomeCard__logo}>
          <Logo color="#fff" />
        </div>
        <div className={styles.welcomeCard__title}>You're now a part of the community!</div>
        <div className={styles.welcomeCard__text}>This Is What You can Do Right Now</div>
        <div className={styles.welcomeCard__buttons}>
          <div
            className={styles.welcomeCard__button}
            onClick={() => router.push('/profile/' + user._id + '?active=project')}>
            <div>Create a task</div> <ArrowDown2 color="#fff" />
          </div>
          <div
            className={styles.welcomeCard__button}
            onClick={() => router.push('/profile/' + user._id + '?active=project')}>
            <div>Create your next bestseller</div> <ArrowDown2 color="#fff" />
          </div>
          <div
            className={styles.welcomeCard__button}
            onClick={() => router.push('/profile/' + user._id)}>
            <div>Customise your portfolio</div> <ArrowDown2 color="#fff" />
          </div>
        </div>
        <div className={styles.welcomeCard__close} onClick={closeWelcomeCard}>
          <Close color="#fff" />
        </div>
      </div>
    );
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
  if (cardsElements.length === 0)
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

  return (
    <>
      <Row align="top" gutter={20} style={{ marginTop: '1.5em' }}>
        <Col ref={firstColRef} span={24 / columns} className={styles.col}>
          {user && welcomeCardVisible ? <WelcomeCard /> : null}
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
    </>
  );
};

export default CardsContainer;
