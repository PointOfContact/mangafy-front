import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import { formatHtml } from 'helpers/shared';

const ProjectStory = ({ className, project }) => {
  return (
    <div className={cn(className, styles.story)}>
      <div className={styles.story__title}>{project?.title}</div>
      <div
        className={styles.story__description}
        dangerouslySetInnerHTML={{ __html: formatHtml(project?.story, false) }}></div>
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
