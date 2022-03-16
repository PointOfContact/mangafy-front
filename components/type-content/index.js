/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';

import { notification, Select } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import SvgBulbColored from 'components/icon/BulbColored';
import PrimaryButton from 'components/ui-elements/button';
import router from 'next/router';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

import DiscussionCard from './discussionCard';
import DiscussionLeftBar from './discussionLeftBar';
import DiscussionRightBar from './discussionRightBar';
import styles from './styles.module.scss';

const { Option } = Select;

export default function TypePage({
  posts,
  dailyWarmUps,
  members,
  collaborations,
  user,
  selectedCategories,
  selectedType,
}) {
  const [discussions, setDiscussions] = useState(posts);
  const [more, setMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [option, setOption] = useState([]);
  const [postElements, setPostElements] = useState([]);
  const [infiniteScroll, setInfiniteScroll] = useState(false);
  const [query, serQuery] = useState([]);

  useEffect(() => {
    const existTypes = ['Profile', 'Manga', 'Task'];
    const types = ['Posts', 'Published', 'Proposals'].map((value, index) => (
      <Option className={styles.optionItem} key={value + index} value={existTypes[index]}>
        {value}
      </Option>
    ));
    setOption(types);
  }, []);

  useEffect(() => {
    setDiscussions(posts);
    serQuery(router.query.type);
  }, [posts]);

  const showMore = async () => {
    setIsLoading(true);
    let type;
    if (query) {
      if (Object.keys(query)) {
        type = [{ postType: query }];
      } else {
        type = query.type.map((value) => ({ postType: value }));
      }
    }

    const queryData = {
      $limit: 7,
      $skip: discussions.length,
      $sort: {
        createdAt: -1,
      },
      $or: type,
    };

    try {
      const newPosts = await client.service('/api/v2/posts').find({
        query: queryData,
      });
      const allPosts = discussions.concat(newPosts.data);
      allPosts.length === newPosts.total && setMore(false);
      setDiscussions(allPosts);
      setIsLoading(false);
    } catch (err) {
      notification.error({
        message: err.message,
        placement: 'bottomLeft',
      });
    }
  };

  const chooseType = async (type) => {
    let queryData = '';

    type.forEach((element, index) => {
      !!index ? (queryData += `&type=${element}`) : (queryData += `?type=${element}`);
    });

    router.push(queryData, undefined, { shallow: false, scroll: false });
  };

  const defaultValue = typeof query === 'string' ? [query] : query;

  useEffect(() => {
    const items = discussions.map((item, i) => (
      <DiscussionCard
        key={item._id + i}
        id={item._id}
        logo={item.logoUrl}
        title={item.title}
        type={item.type}
        categories={item.categories}
        img={item.imageUrl}
        subTitle={item.subTitle}
        url={item.button?.navigateTo}
        btnText={item.button?.title}
        user={user}
        commentsCount={item.commentsCount}
        likesCount={item.likesCount}
        logoNavigate={item.logoNavigate}
        userId={item.userId}
        discussions={discussions}
        setDiscussions={setDiscussions}
      />
    ));
    setPostElements(items);
  }, [discussions]);

  const infiniteScrollComponent = () =>
    infiniteScroll ? (
      <InfiniteScroll
        className={styles.postItems}
        dataLength={discussions.length}
        next={showMore}
        hasMore={true}>
        {postElements}
      </InfiniteScroll>
    ) : (
      postElements
    );

  return (
    <>
      <div className={styles.type_main}>
        <div className={cn('container', styles.main__container)}>
          <div className={styles.type_main__wrap}>
            <DiscussionRightBar dailyWarmUps={dailyWarmUps} user={user} />
            <div className={styles.projectsForYou}>
              <div className={styles.projectsForYou__MainTitle}>
                <h2 className={styles.projectsForYou__MainTitle_Title}>
                  <div className={styles.chooseTypeContainer}>
                    <div className={styles.forYou}>
                      <SvgBulbColored width="20px" height="20px" />
                      <span>Your Feed</span>
                    </div>
                    <Select
                      bordered={false}
                      showArrow={true}
                      showSearch={false}
                      placeholder="Post Type"
                      mode="multiple"
                      value={defaultValue}
                      onChange={chooseType}
                      dropdownClassName="select-filter"
                      className={cn(styles.box__nav_selectDef, 'select-filter')}>
                      {option}
                    </Select>
                  </div>
                  <div className={styles.forYouSub}>
                    Your place for the latest news and projects you can collaborate on
                  </div>
                  {/* <div className={styles.filtr}>
                    <SearchForDiscussions
                      categories={categories}
                      selectedCategories={selectedCategories}
                      selectedType={selectedType}
                    />
                  </div> */}
                </h2>
              </div>
              {infiniteScrollComponent()}
              {!infiniteScroll && more && (
                <PrimaryButton
                  text="Show More"
                  loading={isLoading}
                  className={styles.projectsForYou_ShowMore}
                  onClick={() => {
                    showMore();
                    setInfiniteScroll(true);
                  }}
                />
              )}
            </div>
            <DiscussionLeftBar members={members} collaborations={collaborations} />
          </div>
        </div>
      </div>
    </>
  );
}

TypePage.propTypes = {
  user: PropTypes.object,
  posts: PropTypes.array,
  dailyWarmUps: PropTypes.array,
  members: PropTypes.array,
  collaborations: PropTypes.array,
  selectedCategories: PropTypes.string,
  selectedType: PropTypes.string,
};

TypePage.defaultProps = {
  user: null,
  posts: [],
  dailyWarmUps: [],
  members: [],
  collaborations: [],
  selectedCategories: '',
  selectedType: '',
};
