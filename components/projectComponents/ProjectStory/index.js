import React, { useState } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import { formatHtml } from 'helpers/shared';

import Link from 'next/link';
import Edit2 from 'components/icon/new/Edit2';

const ProjectStory = ({ className, project, user }) => {
  const isMoreThan200 = project?.story?.length > 200;
  const [showMore, setShowMore] = useState(false);
  const ifAdmin = user?._id === project?.author;

  return (
    <div className={cn(className, styles.story)}>
      <div className={styles.story__title}>
        {project?.title}
        {ifAdmin && (
          <Link href={'/project/production/' + project?._id + '?tab=settings#basics'}>
            <a>
              <Edit2 />
            </a>
          </Link>
        )}
      </div>
      <div
        className={cn(styles.story__description, showMore && styles.story__showAll)}
        dangerouslySetInnerHTML={{
          __html: formatHtml(showMore ? project?.story : project?.story?.slice(0, 400), false),
        }}
      />
      {isMoreThan200 && (
        <div className={styles.story__more} onClick={() => setShowMore(!showMore)}>
          {showMore ? 'Hide text' : 'Read more ...'}
        </div>
      )}
      <div className={styles.story__genres}>
        Genres:
        {project?.genres?.map((genre, index) => (
          <div key={genre._id + index} className={styles.story__genre}>
            {genre.name}
          </div>
        ))}
        {ifAdmin && (
          <Link href={'/project/production/' + project?._id + '?tab=settings#genres'}>
            <a>
              <Edit2 />
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProjectStory;
