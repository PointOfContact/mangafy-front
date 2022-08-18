import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { Col, Row } from 'antd';
import Logo from 'components/icon/new/Logo';
import Close from 'components/icon/new/Close';
import client from 'api/client';
import { useRouter } from 'next/router';

import ArrowDown2 from 'components/icon/new/ArrowDown2';

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
    // let newCards = cards ? cards.slice() : [];
    // if (newCards.length === 0) newCards = await getCards(type, 40, 0);
    // console.log(`(${type}): First render: newCards`);
    // console.log(newCards);
    // const newCardsElements = makeCardsElements(newCards);
    // setCardsElements((oldCardsElements) => [...oldCardsElements, ...newCardsElements]);

    if (!localStorage.getItem('welcomeCardClosed')) setWelcomeCardVisible(true);

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const [firstCol, secondCol, thirdCol] = [[], [], []];

  let colToPush = 1;
  for (let i = 0; i < cardsElements.length; i++) {
    if (cardsElements[i]) {
      if (colToPush === 1) firstCol.push(cardsElements[i]);
      if (colToPush === 2) secondCol.push(cardsElements[i]);
      if (colToPush === 3) thirdCol.push(cardsElements[i]);
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
