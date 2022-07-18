import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import styles from './styles.module.scss';
import cn from 'classnames';
import { Col, Row, Carousel, Tabs } from 'antd';
import client from 'api/client';
import { useRouter } from 'next/router';

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

const cards = [
  {
    id: 11,
    title: 'Lorem, ipsum.',
    type: 'task',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, sint.',
    author: 'John Doe',
    time: 2,
    price: 1300,
  },
  {
    id: 12,
    type: 'task',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, sint.',
    author: 'John Doe',
    time: 5,
    price: 5,
  },
  {
    id: 13,
    title: 'Lorem, ipsum.',
    type: 'task',
    author: 'John Doe',
    time: 14,
    price: 500,
  },
  {
    id: 8,
    title: 'Lorem, ipsum.',
    type: 'collab',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, sint.',
    author: 'John Doe',
    time: 2,
  },
  {
    id: 9,
    type: 'collab',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, sint.',
    author: 'John Doe',
    time: 5,
  },
  {
    id: 10,
    title: 'Lorem, ipsum.',
    type: 'collab',
    author: 'John Doe',
    time: 14,
  },
  {
    id: 1,
    title: 'Lorem, ipsum.',
    type: 'post',
    image: 'img/feedTemp/cover.png',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, sint.',
    author: 'John Doe',
  },
  {
    id: 2,
    title: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.',
    type: 'post',
    image: 'img/feedTemp/cover.png',
    text: 'Lorem ipsum dolor',
    author: 'John Doe',
  },
  {
    id: 3,
    title: 'Lorem, ipsum dolor.',
    type: 'post',
    image: 'img/feedTemp/cover.png',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque aperiam, quidem, placeat sit nobis, voluptates ut optio accusamus quis nam voluptatibus quo id minima officia enim odio nihil totam dolor?',
    author: 'Mr. Loooooooooooooooooooooooooooooooooooooooooooooongname',
  },
  {
    id: 8,
    title: 'Lorem, ipsum dolor.',
    type: 'post',
    // image: '/1500/300',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque aperiam, quidem, placeat sit nobis, voluptates ut optio accusamus quis nam voluptatibus quo id minima officia enim odio nihil totam dolor?',
    author: 'Mr. Loooooooooooooooooooooooooooooooooooooooooooooongname',
  },
  {
    id: 4,
    // title: 'Some title',
    type: 'post',
    image: 'img/feedTemp/cover.png',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    author: 'Pip',
  },
  {
    id: 5,
    title: 'Looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong title',
    type: 'post',
    // image: '/145/165',
    text: ' A post without picture. Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, sint.',
    author: 'A man without pictures',
  },
  {
    id: 6,
    title: 'Title of the card',
    type: 'post',
    image: 'img/feedTemp/cover.png',
    // text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, sint.'
    author: 'Sponge Bob Square Pants',
  },
  {
    id: 7,
    title: 'Title of the card',
    type: 'post',
    image: 'img/feedTemp/cover.png',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, sint. Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, sint.',
    author: '1 2 3 4 5 6 7 8',
  },
  {
    id: 7,
    title: 'Title of the card',
    type: 'post',
    image: 'img/feedTemp/cover.png',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, sint. Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, sint.',
    author: '1 2 3 4 5 6 7 8',
  },
];

const FeedNew = (props) => {
  const {
    jwt,
    user,
    posts,
    dailyWarmUps,
    members,
    collaborations,
    getCurrentPostData,
    gallery,
    selectedCategories,
    selectedType,
  } = props;

  const router = useRouter();
  const defaultActiveTab = router.query?.tab || 'recent';
  const cardsData = props.posts?.data || [];

  const [screenWidth, setScreenWidth] = useState(0);
  function onWindowResize() {
    setScreenWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', onWindowResize);
    setScreenWidth(window.innerWidth);
    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  return (
    <>
      <NextSeo
        title={
          getCurrentPostData
            ? getCurrentPostData.title
            : 'MangaFY – From story buidling to a full digital release.'
        }
        description={
          getCurrentPostData
            ? getCurrentPostData.subTitle
            : 'The digital hub designed to help you produce your very owm comic or manga. From story buidling to a full digital release.'
        }
        canonical={
          getCurrentPostData
            ? `https://mangafy.club/feed?postId=${getCurrentPostData._id}`
            : 'https://www.mangafy.club'
        }
        openGraph={{
          url: getCurrentPostData
            ? `https://mangafy.club/feed?postId=${getCurrentPostData._id}`
            : 'https://www.mangafy.club',
          title: getCurrentPostData
            ? getCurrentPostData.title
            : 'Start your Graphic Novel Journey and Get Creative with MangaFY',
          description: getCurrentPostData
            ? getCurrentPostData.subTitle
            : 'The digital hub designed to help you produce your very owm comic or manga. From story buidling to a full digital release.',
          site_name: 'MangaFY',
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
      <div>
        {/* header */}
        <HeaderNew user={user} />
        {/* <Button
          onClick={async () => {
            const queryPosts = {
              $limit: 400,
              $sort: {
                createdAt: -1,
              },
            };
            const posts = await client.service('/api/v2/posts').find({ query: queryPosts });
            console.log(posts);
            // const typesOnly = posts.data.map((post) => post.postType);
            // console.log(new Set(typesOnly));

            // const data = {
            //   title: 'PostTitle',
            //   subTitle: 'PostSubTitle',
            //   type: 'artist',
            //   logoUrl: 'ef607cf420e522f650ed0f7785af5109a3173ef4a4f90d076b24ee5e4c773401.png',
            //   postType: 'Post',
            // };
            // const posts = await client.service('/api/v2/posts').create(data, {
            //   headers: { Authorization: `Bearer ${jwt}` },
            //   mode: 'no-cors',
            // });
          }}>
          Fetch
        </Button> */}
        <div className={styles.feed}>
          {/* feed header */}
          {/* <Featured /> */}
          <Row className={styles.feedContent}>
            {/* feed desktop content */}
            <Col span={24} className={styles.filter}>
              <Tabs
                tabBarGutter={30}
                className={styles.filter__tabs}
                defaultActiveKey={defaultActiveTab}
                tabPosition="top"
                moreIcon={null}>
                <TabPane tab="Recent" key="recent">
                  <RecentCards cards={cardsData} screenWidth={screenWidth} user={user} />
                </TabPane>
                <TabPane tab="Posts" key="posts">
                  Posts cards
                </TabPane>
                <TabPane tab="People" key="people">
                  People cards
                </TabPane>
                <TabPane tab="Jobs" key="jobs">
                  Jobs cards
                </TabPane>
              </Tabs>
            </Col>
          </Row>
          <FooterPolicy />
        </div>
      </div>
    </>
  );
};

export default FeedNew;

function RecentCards({ cards, screenWidth, user }) {
  return (
    <>
      <FilterNew genres="Genres" search />
      <CardsContainer
        cards={cards}
        columns={screenWidth >= 1000 ? 3 : screenWidth >= 700 ? 2 : 1}
        user={user}
      />
    </>
  );
}
