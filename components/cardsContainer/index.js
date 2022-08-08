import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { Col, Row } from 'antd';
import Logo from 'components/icon/new/Logo';
import Close from 'components/icon/new/Close';
import client from 'api/client';
import PublishedCard from 'components/feedCards/PublishedCard';
import ArrowDown2 from 'components/icon/new/ArrowDown2';

// import PostCard from 'components/postCard';
import TaskCard from 'components/feedCards/TaskCard';
// import CollabCard from 'components/collabCard';
// import ProfileCard from 'components/profileCard';
import PortfolioCard from 'components/feedCards/PortfolioCard';
import ShotCard from 'components/feedCards/ShotCard';

const testCards = [
  {
    id: 11,
    title: 'Lorem, ipsum 1.',
    postType: 'Task',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, sint.',
    author: 'John Doe',
    time: 2,
    price: 1300,
    likes: 145,
    comments: 123,
  },
  {
    id: 12,
    title: 'Lorem, ipsum 2.',
    postType: 'Task',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, sint.',
    author: 'John Doe',
    time: 5,
    price: 5,
    likes: 145,
    comments: 123,
  },
  {
    id: 13,
    title: 'Lorem, ipsum 3.',
    postType: 'Task',
    author: 'John Doe',
    time: 14,
    price: 500,
    likes: 145,
    comments: 123,
  },
  {
    id: 8,
    title: 'Lorem, ipsum coll.',
    postType: 'Collab',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, sint.',
    author: 'John Doe',
    time: 2,
    likes: 145,
    comments: 123,
  },
  {
    id: 9,
    title: 'Lorem, ipsum coll 2.',
    postType: 'Collab',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, sint.',
    author: 'John Doe',
    time: 5,
    likes: 145,
    comments: 123,
  },
  {
    id: 10,
    title: 'Lorem, ipsum.',
    postType: 'Collab',
    author: 'John Doe',
    time: 14,
    likes: 145,
    comments: 123,
  },
  {
    id: 1,
    title: 'Lorem, ipsum.',
    postType: 'Post',
    image: 'img/feedTemp/cover.png',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, sint.',
    author: 'John Doe',
    likes: 145,
    comments: 123,
  },
  {
    id: 2,
    title: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.',
    postType: 'Post',
    image: 'img/feedTemp/wide_cover.jpg',
    text: 'Lorem ipsum dolor',
    author: 'John Doeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    likes: 145,
    comments: 123,
  },
  {
    id: 3,
    title: 'Lorem, ipsum dolor.',
    postType: 'Post',
    image: 'img/feedTemp/cover.png',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque aperiam, quidem, placeat sit nobis, voluptates ut optio accusamus quis nam voluptatibus quo id minima officia enim odio nihil totam dolor?',
    author: 'Mr. Loooooooooooooooooooooooooooooooooooooooooooooongname',
    likes: 145,
    comments: 123,
  },
  {
    id: 8,
    title: 'Lorem, ipsum dolor.',
    postType: 'Post',
    // image: '/1500/300',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque aperiam, quidem, placeat sit nobis, voluptates ut optio accusamus quis nam voluptatibus quo id minima officia enim odio nihil totam dolor?',
    author: 'Mr. Loooooooooooooooooooooooooooooooooooooooooooooongname',
    likes: 145,
    comments: 123,
  },
  {
    id: 4,
    title: 'Some title',
    postType: 'Post',
    image: 'img/feedTemp/cover.png',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    author: 'Pip',
    likes: 145,
    comments: 123,
  },
  {
    id: 5,
    title: 'Looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong name',
    postType: 'Portfolio',
    images: ['img/feedTemp/cover.png', 'img/feedTemp/cover.png', 'img/feedTemp/cover.png'],
    text: ' A post without picture. Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, sint.',
    author: 'A man without pictures',
    likes: 145,
    comments: 123,
  },
  {
    id: 6,
    title: 'Title of the card',
    postType: 'Manga',
    image: 'img/feedTemp/cover.png',
    // text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, sint.'
    author: 'Sponge Bob Square Pants',
    likes: 145,
    comments: 123,
  },
  {
    id: 7,
    title: 'Title of the card',
    postType: 'Manga',
    image: 'img/feedTemp/cover.png',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, sint. Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, sint.',
    author: '1 2 3 4 5 6 7 8 addsssssssssssssssssssssssssssssssssddddddddddd',
    likes: 145,
    comments: 123,
  },
  {
    id: 7,
    title: 'Title of the card',
    postType: 'Portfolio',
    images: ['img/feedTemp/cover.png', 'img/feedTemp/cover.png', 'img/feedTemp/cover.png'],
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, sint. Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, sint.',
    author: 'Looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong name',
    likes: 145,
    comments: 123,
  },
];

const CardsContainer = ({ columns = 3, cards = testCards, user }) => {
  const [firstColRef, secondColRef, thirdColRef] = [useRef(null), useRef(null), useRef(null)];
  const [cardsElements, setCardsElements] = useState(makeCardsElements(testCards));
  const [shouldFetchCards, setShouldFetchCards] = useState(false);
  const [endOfCardsReached, setEndOfCardsReached] = useState(false);
  const [welcomeCardVisible, setWelcomeCardVisible] = useState(false);

  function closeWelcomeCard() {
    setWelcomeCardVisible(false);
    localStorage.setItem('welcomeCardClosed', true);
  }

  // function onScroll(e) {
  //   const firstColRect = firstColRef.current?.getBoundingClientRect();
  //   const secondColRect = secondColRef.current?.getBoundingClientRect();
  //   const thirdColRect = thirdColRef.current?.getBoundingClientRect();
  //   if (
  //     window.innerHeight > firstColRect?.bottom ||
  //     window.innerHeight > secondColRect?.bottom ||
  //     window.innerHeight > thirdColRect?.bottom
  //   ) {
  //     setShouldFetchCards(true);
  //   }
  // }

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

  // useEffect(async () => {
  //   if (shouldFetchCards && !endOfCardsReached) {
  //     try {
  //       const newCards = await getCards(30, cardsElements.length);
  //       console.log(newCards);
  //       const newCardsElements = makeCardsElements(newCards);
  //       console.log(newCardsElements);
  //       if (!newCardsElements[newCardsElements.length - 1]) setEndOfCardsReached(true);
  //       setCardsElements((oldCardsElements) => {
  //         setShouldFetchCards(false);
  //         return [...oldCardsElements, ...newCardsElements];
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }, [shouldFetchCards]);

  useEffect(async () => {
    // let newCards = cards.slice();
    // if (newCards.length === 0) newCards = await getCards(30, 0);
    // const newCardsElements = makeCardsElements(newCards);
    // setCardsElements((oldCardsElements) => [...oldCardsElements, ...newCardsElements]);

    if (!localStorage.getItem('welcomeCardClosed')) setWelcomeCardVisible(true);

    // window.addEventListener('scroll', onScroll);
    // return () => {
    //   window.removeEventListener('scroll', onScroll);
    // };
  }, []);

  const [firstCol, secondCol, thirdCol] = [[], [], []];

  let colToPush = 1;
  console.log(cardsElements);
  for (let i = 0; i < cardsElements.length; i++) {
    // firstCol.push(cardsElements[i]);
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

function makeCardsElements(newCards = []) {
  return newCards.map((card) => {
    if (card.postType === 'Task' || card.postType === 'Collab')
      return <TaskCard key={card.id} card={card} />;
    else if (card.postType === 'Manga') return <PublishedCard key={card.id} card={card} />;
    else if (card.postType === 'Post') return <ShotCard key={card.id} card={card} />;
    else if (card.postType === 'Portfolio') return <PortfolioCard key={card.id} card={card} />;
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
        postType: 'Portfolio',
      },
    });
    return posts.data;
  } catch (error) {
    console.log(error);
  }
}
