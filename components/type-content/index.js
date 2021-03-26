import React, { useState } from 'react';

import cn from 'classnames';
import { DISCUSSIONS } from 'helpers/constant';

import DiscussionCard from './discussionCard';
import DiscussionLeftBar from './discussionLeftBar';
import DiscussionRightBar from './discussionRightBar';
import styles from './styles.module.scss';

export default function TypePage() {
  const [discussions, setDiscussions] = useState(DISCUSSIONS);
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
                  key={discussion.id}
                  logo={discussion.logo}
                  title={discussion.title}
                  category={discussion.category}
                  type={discussion.type}
                  img={discussion.img}
                  description={discussion.description}
                />
              ))}

              <button className={styles.projectsForYou_ShowMore}> Show More </button>
            </div>
            <DiscussionRightBar />
            <DiscussionLeftBar />
          </div>
        </div>
      </div>
    </>
  );
}
