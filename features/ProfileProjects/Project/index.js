import client from 'api/client';
import Avatar from 'components/Avatar';
import Imgix from 'components/imgix';
import React from 'react';
import styles from './styles.module.scss';

const Project = ({ setOpenedProject, setIsOpened, project }) => {
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
      <div className={styles.project__title}> Project Title</div>
      <div className={styles.project__description}>Project Description</div>
    </div>
  );
};

export default Project;
