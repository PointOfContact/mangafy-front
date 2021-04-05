import React, { useEffect, useState } from 'react';

import cn from 'classnames';
import { DISCUSSIONS } from 'helpers/constant';
import PropTypes from 'prop-types';

import DiscussionCard from './discussionCard';
import DiscussionLeftBar from './discussionLeftBar';
import DiscussionRightBar from './discussionRightBar';
import styles from './styles.module.scss';

export default function TypePage({ user, posts, dailyWarmUps, members, collaborations }) {
  const [discussions, setDiscussions] = useState(DISCUSSIONS);

  useEffect(() => {
    setDiscussions(posts);
  }, [posts]);

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

              <button className={styles.projectsForYou_ShowMore}> Show More </button>
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
