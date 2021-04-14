import React, { useEffect, useState } from 'react';

import client from 'api/client';
import cn from 'classnames';
import SvgBulbColored from 'components/icon/BulbColored';
import PrimaryButton from 'components/ui-elements/button';
// import { USER_TYPES } from 'helpers/constant';
import PropTypes from 'prop-types';

import DiscussionCard from './discussionCard';
import DiscussionLeftBar from './discussionLeftBar';
import DiscussionRightBar from './discussionRightBar';
// import SearchForDiscussions from './searchForDiscussions';
import styles from './styles.module.scss';

// const categories = USER_TYPES.map((item) => ({
//   key: item.label,
//   value: item.label,
// }));

export default function TypePage({
  posts,
  dailyWarmUps,
  members,
  collaborations,
  user,
  selectedCategories,
  selectedType,
}) {
  const [discussions, setDiscussions] = useState([]);
  const [more, setMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setDiscussions(posts);
  }, [posts]);

  const showMore = async () => {
    setIsLoading(true);
    const query = {
      $limit: 5,
      $skip: discussions.length,
      $sort: {
        createdAt: -1,
      },
    };
    const newPosts = await client.service('/api/v2/posts').find({
      query,
    });
    const allPosts = discussions.concat(newPosts.data);
    allPosts.length === newPosts.total && setMore(false);
    setDiscussions(allPosts);
    setIsLoading(false);
  };

  return (
    <>
      <div className={styles.type_main}>
        <div className={cn('container', styles.main__container)}>
          <div className={styles.type_main__wrap}>
            <div className={styles.projectsForYou}>
              <div className={styles.projectsForYou__MainTitle}>
                <h2 className={styles.projectsForYou__MainTitle_Title}>
                  <div className={styles.forYou}>
                    <SvgBulbColored width="20px" height="20px" />
                    <span>Your Feed</span>
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

              {discussions.map((discussion) => (
                <DiscussionCard
                  key={discussion._id}
                  id={discussion._id}
                  logo={discussion.logoUrl}
                  title={discussion.title}
                  type={discussion.type}
                  categories={discussion.categories}
                  img={discussion.imageUrl}
                  subTitle={discussion.subTitle}
                  url={discussion.button?.navigateTo}
                  btnText={discussion.button?.title}
                  user={user}
                  commentsCount={discussion.commentsCount}
                  likesCount={discussion.likesCount}
                />
              ))}

              {more && (
                <PrimaryButton
                  text="Show More"
                  loading={isLoading}
                  className={styles.projectsForYou_ShowMore}
                  onClick={() => showMore()}
                />
              )}
            </div>
            <DiscussionRightBar dailyWarmUps={dailyWarmUps} />
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
