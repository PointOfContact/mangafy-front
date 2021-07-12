import React, { useEffect, useState } from 'react';

import { notification } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import SvgBulbColored from 'components/icon/BulbColored';
import AddButton from 'components/ui-elements/add-button';
import PrimaryButton from 'components/ui-elements/button';
import Link from 'next/link';
import PropTypes from 'prop-types';

import DiscussionCard from './discussionCard';
import DiscussionLeftBar from './discussionLeftBar';
import DiscussionRightBar from './discussionRightBar';
import styles from './styles.module.scss';

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
    try {
      const newPosts = await client.service('/api/v2/posts').find({
        query,
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

  return (
    <>
      <div className={styles.type_main}>
        <div className={cn('container', styles.main__container)}>
          <div className={styles.type_main__wrap}>
            <DiscussionRightBar dailyWarmUps={dailyWarmUps} />
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
                <Link href="/get-feedback">
                  <a className={styles.addfeed}>
                    <AddButton height={19} width={19} text="Add Feed" />
                  </a>
                </Link>
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
                  logoNavigate={discussion.logoNavigate}
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
