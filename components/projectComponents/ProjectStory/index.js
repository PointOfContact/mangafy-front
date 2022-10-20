import React, { useState } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import { formatHtml } from 'helpers/shared';

const ProjectStory = ({ className, project }) => {
  const isMoreThan200 = project?.story?.length > 200;
  const [showMore, setShowMore] = useState(false);

  return (
    <div className={cn(className, styles.story)}>
      <div className={styles.story__title}>{project?.title}</div>
      <div
        className={styles.story__description}
        dangerouslySetInnerHTML={{
          __html: formatHtml(showMore ? project?.story : project?.story?.slice(0, 400), false),
        }}></div>
      {isMoreThan200 && (
        <div className={styles.story__more} onClick={() => setShowMore(!showMore)}>
          {showMore ? 'Hide text' : 'Read more ...'}
        </div>
      )}
      <div className={styles.story__genres}>
        Genres:
        {project?.genres?.map((genre) => (
          <div className={styles.story__genre}>{genre.name}</div>
        ))}
      </div>
    </div>
  );
};

export default ProjectStory;
