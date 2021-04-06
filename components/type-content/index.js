import React, { useEffect, useState } from 'react';

import client from 'api/client';
import cn from 'classnames';
import SvgBulbColored from 'components/icon/BulbColored';
import SvgFiltr from 'components/icon/Filtr';
import PropTypes from 'prop-types';

import DiscussionCard from './discussionCard';
import DiscussionLeftBar from './discussionLeftBar';
import DiscussionRightBar from './discussionRightBar';
import styles from './styles.module.scss';

export default function TypePage({ posts, dailyWarmUps, members, collaborations, user }) {
  const [discussions, setDiscussions] = useState([]);
  const [more, setMore] = useState(true);

  useEffect(() => {
    setDiscussions(posts);
    console.log('postspostspostsposts', posts);
  }, [posts]);

  const showMore = async () => {
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
  };

  return (
    <>
      <div className={styles.type_main}>
        <div className={cn('container', styles.main__container)}>
          <div className={styles.type_main__wrap}>
            <div className={styles.projectsForYou}>
              <div className={styles.projectsForYou__MainTitle}>
                <h2 className={styles.projectsForYou__MainTitle_Title}>
                  <div>
                    <SvgBulbColored width="20px" height="20px" /> For you
                  </div>
                  <div className={styles.filtr}>
                    <span>All</span>
                    <span>
                      <SvgFiltr width="15px" height="15px" />
                    </span>
                    <span>&#8645;</span>
                  </div>
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
                  description={discussion.title}
                  url={discussion.button?.navigateTo}
                  btnText={discussion.button?.title}
                  user={user}
                  commentsCount={discussion.commentsCount}
                  likesCount={discussion.likesCount}
                />
              ))}

              {more && (
                <button className={styles.projectsForYou_ShowMore} onClick={() => showMore()}>
                  Show More
                </button>
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
};

TypePage.defaultProps = {
  user: null,
  posts: [],
  dailyWarmUps: [],
  members: [],
  collaborations: [],
};
