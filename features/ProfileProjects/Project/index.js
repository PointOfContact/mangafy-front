import client from 'api/client';
import Avatar from 'components/Avatar';
import Imgix from 'components/imgix';
import React, { useMemo } from 'react';
import { countPages, getEditedDate } from '../helpers';
import styles from './styles.module.scss';

const Project = ({ setOpenedProject, setIsOpened, project }) => {
  const pagesCount = useMemo(() => countPages(project), [project]);
  const editedDate = useMemo(() => getEditedDate(project), [project]);

  return (
    <div
      className={styles.project}
      onClick={() => {
        setOpenedProject(project);
        setIsOpened(true);
      }}>
      <div className={styles.project__cover}>
        {/* <img src="/img/feedTemp/cover.png" alt="cover" /> */}
        {project.image ? (
          <Imgix src={client.UPLOAD_URL + project?.image} objectFit="cover" layout="fill" />
        ) : (
          <div className={styles.project__noImage}>{project?.title}</div>
        )}
      </div>
      <div className={styles.project__title}>{project?.title}</div>
      <div className={styles.project__description}>
        Edited {editedDate} | {pagesCount} pages
      </div>
    </div>
  );
};

export default Project;
