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
          <button
            onClick={async () => {
              // const posts = await getCards();
              const posts = await client.service('/api/v2/posts').find({
                query: {
                  $limit: 30,
                  $sort: {
                    createdAt: -1,
                  },
                  $skip: 20,
                  // postType: 'Profile',
                },
              });
              console.log(posts.data.filter((post) => post.postType === 'Profile'));
            }}>
            fetch
          </button>
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
                  <RecentCards screenWidth={screenWidth} user={user} />
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

// function PortfolioCards({ cards, screenWidth, user }) {
//   return (
//     <>
//       <FilterNew genres="Genres" search />
//       <CardsContainer
//         cards={cards}
//         columns={screenWidth >= 1000 ? 3 : screenWidth >= 700 ? 2 : 1}
//         user={user}
//       />
//     </>
//   );
// }
