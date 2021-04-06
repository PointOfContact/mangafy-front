import React, { useEffect, useState } from 'react';

import client from 'api/client';
import cn from 'classnames';
import PropTypes from 'prop-types';

import DiscussionCard from './discussionCard';
import DiscussionLeftBar from './discussionLeftBar';
import DiscussionRightBar from './discussionRightBar';
import styles from './styles.module.scss';

export default function TypePage({ posts, dailyWarmUps, members, collaborations }) {
  const [discussions, setDiscussions] = useState([]);
  const [more, setMore] = useState(true);

  useEffect(() => {
    setDiscussions(posts);
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
                <h2 className={styles.projectsForYou__MainTitle_Title}>For you</h2>
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
  posts: PropTypes.array,
  dailyWarmUps: PropTypes.array,
  members: PropTypes.array,
  collaborations: PropTypes.array,
};

TypePage.defaultProps = {
  posts: [],
  dailyWarmUps: [],
  members: [],
  collaborations: [],
};
