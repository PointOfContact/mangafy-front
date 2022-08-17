import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import styles from './styles.module.scss';
import cn from 'classnames';
import { Col, Row, Carousel, Tabs } from 'antd';
import client from 'api/client';
import { useRouter } from 'next/router';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

const { TabPane } = Tabs;

import Footer from 'components/footer';
import FooterPolicy from 'components/footer-policy';
import FeedCreateButton from 'components/FeedCreateButton';

import HeaderNew from 'components/headerNew';
import Featured from 'components/featured';
import FilterNew from 'components/filterNew';
import Cherry from 'components/icon/new/Cherry';
import Flash from 'components/icon/new/Flash';
import CardsContainer from 'components/cardsContainer';
import Button from 'components/ui-new/Button';

import TaskCard from 'components/feedCards/TaskCard';
import PortfolioCard from 'components/feedCards/PortfolioCard';
import ShotCard from 'components/feedCards/ShotCard';
import PublishedCard from 'components/feedCards/PublishedCard';

const FeedNew = (props) => {
  const { jwt, user, posts } = props;

  const router = useRouter();
  const defaultActiveTab = router.query?.tab || 'recent';

  const [screenWidth, setScreenWidth] = useState(0);

  function onWindowResize() {
    setScreenWidth(window.innerWidth);
  }

  // const debouncedUpdateCards = useCallback(AwesomeDebouncePromise(updateCards, 200), []);

  const [activeTab, setActiveTab] = useState('recent');
  const [cardsElements, setCardsElements] = useState(makeCardsElements(posts));
  const [shouldFetchCards, setShouldFetchCards] = useState(false);
  const [endOfCardsReached, setEndOfCardsReached] = useState(false);
  const [postType, setPostType] = useState(null);

  useEffect(async () => {
    if (!(posts && posts.length > 0)) {
      const posts = await getCards(20, 0);
      setCardsElements(makeCardsElements(posts));
    }

    window.addEventListener('resize', onWindowResize);
    setScreenWidth(window.innerWidth);
    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  useEffect(async () => {
    let isLastRequest = [true];
    if (shouldFetchCards) {
      updateCards(cardsElements, isLastRequest, false, postType);
    }
    // console.log(
    //   `[${new Date().toLocaleTimeString()}:${new Date().getMilliseconds()}] shouldFetchCards changed to ${shouldFetchCards}`
    // );

    return () => {
      isLastRequest[0] = false;
    };
  }, [shouldFetchCards]);

  useEffect(() => {
    let type = null;
    switch (activeTab) {
      case 'people':
        type = 'Profile';
        break;

      case 'shots':
        type = 'Portfolio';
        break;

      case 'jobs':
        type = 'Task';
        break;

      case 'projects':
        type = 'Project';
        break;
    }
    setPostType(type);
    // console.log(
    //   `[${new Date().toLocaleTimeString()}:${new Date().getMilliseconds()}] activeTab changed to ${activeTab}`
    // );
  }, [activeTab]);

  useEffect(() => {
    let isLastRequest = [true];
    updateCards(cardsElements, isLastRequest, true, postType);
    // console.log(
    //   `[${new Date().toLocaleTimeString()}:${new Date().getMilliseconds()}] postType changed to ${postType}`
    // );

    return () => {
      isLastRequest[0] = false;
    };
  }, [postType]);

  function onPageEnd() {
    // console.log(
    //   `[${new Date().toLocaleTimeString()}:${new Date().getMilliseconds()}] Page end triggered`
    // );
    setShouldFetchCards(true);
  }

  function clearCardsElements() {
    setCardsElements([]);
    // console.log(
    //   `[${new Date().toLocaleTimeString()}:${new Date().getMilliseconds()}] Card elements cleaned`
    // );
  }

  async function updateCards(cards, isLastRequest, shouldCleanCards, type) {
    try {
      const newCards = await getCards(40, shouldCleanCards ? 0 : cards.length, type);
      const newCardsElements = makeCardsElements(newCards);
      if (!newCardsElements[newCardsElements.length - 1]) setEndOfCardsReached(true);
      if (!isLastRequest[0]) {
        // console.log(
        //   `[${new Date().toLocaleTimeString()}:${new Date().getMilliseconds()}] - Request ${type} was rejected`
        // );
        return;
      }

      setCardsElements((oldCardsElements) => {
        setShouldFetchCards(false);
        setEndOfCardsReached(newCards?.length > 0 ? false : true);
        if (shouldCleanCards) {
          // console.log(
          //   `[${new Date().toLocaleTimeString()}:${new Date().getMilliseconds()}] = Card elements cleaned`
          // );
          return newCardsElements;
        } else {
          return [...oldCardsElements, ...newCardsElements];
        }
      });
    } catch (error) {
      setEndOfCardsReached(true);
      console.log(error);
    }
  }

  async function getCards(limit = 20, skip = 0, postType) {
    const query = {
      $limit: limit,
      $sort: {
        createdAt: -1,
      },
      $skip: skip,
    };
    if (postType) query.postType = postType;

    try {
      // console.log(
      //   `[${new Date().toLocaleTimeString()}:${new Date().getMilliseconds()}] Fetching ${
      //     postType || 'Recent'
      //   } cards`
      // );
      const posts = await client.service('/api/v2/posts').find({
        query,
      });
      // console.log(
      //   `[${new Date().toLocaleTimeString()}:${new Date().getMilliseconds()}] Fetch ended ${
      //     postType || 'Recent'
      //   } cards`
      // );
      return posts.data;
    } catch (error) {
      console.log(error);
    }
  }

  function makeCardsElements(newCards = []) {
    return newCards.map((card) => {
      if (card.postType === 'Task' || card.postType === 'Collab')
        return <TaskCard key={card._id} card={card} user={user} />;
      else if (card.postType === 'Project') return <PublishedCard key={card._id} card={card} />;
      else if (card.postType === 'Portfolio')
        return <ShotCard key={card._id} card={card} user={user} />;
      else if (card.postType === 'Profile')
        return <PortfolioCard key={card._id} card={card} user={user} />;
    });
  }

  return (
    <>
      <NextSeo
        title={'MangaFY – From story buidling to a full digital release.'}
        description={
          'The digital hub designed to help you produce your very owm comic or manga. From story buidling to a full digital release.'
        }
        canonical={'https://www.mangafy.club'}
        openGraph={{
          url: 'https://www.mangafy.club',
          title: 'Start your Graphic Novel Journey and Get Creative with MangaFY',
          description:
            'The digital hub designed to help you produce your very owm comic or manga. From story buidling to a full digital release.',
          site_name: 'MangaFY',
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
      <div className={styles.pageContent}>
        <HeaderNew user={user} />
        {/* <button
          onClick={async () => {
            // const posts = await getCards();
            const posts = await client.service('/api/v2/posts').find({
              query: {
                $limit: 300,
                $sort: {
                  createdAt: -1,
                },
                postType: 'Task',
                // $skip: 20,
              },
            });
            // console.log(new Set(posts.data.map((post) => post.postType)));
            console.log(posts.data.filter((post) => post.rewardType !== 'Collaboration'));
          }}>
          fetch
        </button> */}
        <div className={styles.feed}>
          <Row className={styles.feedContent}>
            <Col span={24} className={styles.filter}>
              <Tabs
                tabBarGutter={30}
                className={styles.filter__tabs}
                defaultActiveKey={defaultActiveTab}
                tabPosition="top"
                moreIcon={null}
                onChange={(tab) => setActiveTab(tab)}>
                <TabPane tab="Recent" key="recent"></TabPane>
                <TabPane tab="Shots" key="shots"></TabPane>
                <TabPane tab="Projects" key="projects"></TabPane>
                <TabPane tab="People" key="people"></TabPane>
                <TabPane tab="Jobs" key="jobs"></TabPane>
              </Tabs>
              {/* <FilterNew genres="Genres" search /> */}
              <CardsContainer
                cardsElements={cardsElements || []}
                columns={screenWidth >= 1000 ? 3 : screenWidth >= 700 ? 2 : 1}
                user={user}
                activeTab={activeTab}
                onPageEnd={onPageEnd}
                shouldFetchCards={shouldFetchCards}
              />
              {endOfCardsReached && <p>There is no more cards</p>}
            </Col>
          </Row>
        </div>
        <FooterPolicy />
      </div>
    </>
  );
};

export default FeedNew;
