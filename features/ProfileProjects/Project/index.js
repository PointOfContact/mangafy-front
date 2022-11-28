import client from 'api/client';
import Avatar from 'components/Avatar';
import Imgix from 'components/imgix';
import React, { useMemo, useCallback } from 'react';
import { countPages, getEditedDate } from '../helpers';
import styles from './styles.module.scss';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { useRouter } from 'next/router';

const Project = ({ setOpenedProject, setIsOpened, project }) => {
  const pagesCount = useMemo(() => countPages(project), [project]);
  const editedDate = useMemo(() => getEditedDate(project), [project]);
  const router = useRouter();

  const debouncedMouseEventHandler = useCallback(
    AwesomeDebouncePromise(mouseEventHandler, 200),
    []
  );

  function handleDoubleClick() {
    debouncedMouseEventHandler('doubleClick');
  }

  function handleClick() {
    debouncedMouseEventHandler('click');
  }

  function mouseEventHandler(type) {
    if (type === 'doubleClick') {
      router.push('/project/production/' + project?._id);
    } else {
      setOpenedProject(project);
      setIsOpened(true);
    }
  }

  return (
    <div className={styles.project} onClick={handleClick} onDoubleClick={handleDoubleClick}>
      <div className={styles.project__cover}>
        {/* <img src="/img/feedTemp/cover.png" alt="cover" /> */}
        {project.image ? (
          <Imgix src={client.UPLOAD_URL + project?.image} objectFit="cover" layout="fill" />
        ) : (
          <div className={styles.project__noImage}>
            <p>{project?.title}</p>
          </div>
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
