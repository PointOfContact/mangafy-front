import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { Col, Row } from 'antd';
import Logo from 'components/icon/new/Logo';
import Close from 'components/icon/new/Close';
import client from 'api/client';
import PublishedCard from 'components/publishedCard';
import ArrowDown2 from 'components/icon/new/ArrowDown2';

import PostCard from 'components/postCard';
import TaskCard from 'components/taskCard';
import CollabCard from 'components/collabCard';
import ProfileCard from 'components/profileCard';
import PortfolioWorkCard from 'components/portfolioWorkCard';

const CardsContainer = ({ columns = 3, cards = [], user }) => {
  const [firstColRef, secondColRef, thirdColRef] = [useRef(null), useRef(null), useRef(null)];
  const [cardsElements, setCardsElements] = useState([]);
  const [shouldFetchCards, setShouldFetchCards] = useState(false);
  const [endOfCardsReached, setEndOfCardsReached] = useState(false);
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
      setShouldFetchCards(true);
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
          <div className={styles.welcomeCard__button}>
            <div>Create a task</div> <ArrowDown2 color="#fff" />
          </div>
          <div className={styles.welcomeCard__button}>
            <div>Create your next bestseller</div> <ArrowDown2 color="#fff" />
          </div>
          <div className={styles.welcomeCard__button}>
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
    if (shouldFetchCards && !endOfCardsReached) {
      try {
        const newCards = await getCards(30, cardsElements.length);
        console.log(newCards);
        const newCardsElements = makeCardsElements(newCards);
        console.log(newCardsElements);
        if (!newCardsElements[newCardsElements.length - 1]) setEndOfCardsReached(true);
        setCardsElements((oldCardsElements) => {
          setShouldFetchCards(false);
          return [...oldCardsElements, ...newCardsElements];
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [shouldFetchCards]);

  useEffect(async () => {
    let newCards = cards.slice();
    if (newCards.length === 0) newCards = await getCards(30, 0);
    const newCardsElements = makeCardsElements(newCards);
    setCardsElements((oldCardsElements) => [...oldCardsElements, ...newCardsElements]);

    if (!localStorage.getItem('welcomeCardClosed')) setWelcomeCardVisible(true);

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const [firstCol, secondCol, thirdCol] = [[], [], []];

  for (let i = 0; i < cardsElements.length; i += 3) {
    firstCol.push(cardsElements[i]);
    if (cardsElements[i + 1]) secondCol.push(cardsElements[i + 1]);
    if (cardsElements[i + 2]) thirdCol.push(cardsElements[i + 2]);
  }

  return (
    <Row align="top" gutter={20} style={{ marginTop: '1.5em' }}>
      <Col ref={firstColRef} span={24 / columns}>
        {user && welcomeCardVisible ? <WelcomeCard /> : null}
        {firstCol}
      </Col>
      {columns > 1 ? (
        <Col ref={secondColRef} span={24 / columns}>
          {secondCol}
        </Col>
      ) : null}
      {columns > 2 ? (
        <Col ref={thirdColRef} span={24 / columns}>
          {thirdCol}
        </Col>
      ) : null}
    </Row>
  );
};

export default CardsContainer;

function makeCardsElements(newCards = []) {
  return newCards.map((card) => {
    if (card.postType === 'Task') return <TaskCard key={card._id} card={card} />;
    else if (card.postType === 'Manga') return <PublishedCard key={card._id} card={card} />;
    else if (card.postType === 'Profile') return <PortfolioWorkCard key={card._id} card={card} />;
  });
}

async function getCards(limit = 30, skip = 0) {
  try {
    console.log('fetching...');
    const posts = await client.service('/api/v2/posts').find({
      query: {
        $limit: limit,
        $sort: {
          createdAt: -1,
        },
        $skip: skip,
      },
    });
    return posts.data;
  } catch (error) {
    console.log(error);
  }
}
