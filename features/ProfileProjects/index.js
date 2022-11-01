import HeaderNew from 'components/headerNew';
import React, { useState, useEffect, useMemo } from 'react';
import styles from './styles.module.scss';

import Link from 'next/link';
import Button from 'components/ui-new/Button';
import ArrowDown from 'components/icon/new/ArrowDown';
import { Add2 } from 'components/icon';
import Project from './Project';
import cn from 'classnames';
import OpenedProject from './OpenedProject';

const ProfileProjects = ({ user, profile }) => {
  const [openedProject, setOpenedProject] = useState(null);
  const [isOpened, setIsOpened] = useState(false);

  const [profileInfo, setProfileInfo] = useState(profile);

  useEffect(() => {
    if (openedProject) {
      setIsOpened(true);
    }
  }, [openedProject]);

  const projectsElements = useMemo(() => {
    if (profileInfo?.mangaStories?.data?.length) {
      return profileInfo?.mangaStories?.data?.map((project) => (
        <Project
          key={project._id}
          project={project}
          setIsOpened={setIsOpened}
          setOpenedProject={setOpenedProject}
        />
      ));
    }
  }, [profileInfo]);

  return (
    <div className={styles.projects}>
      <HeaderNew user={user} />
      <div
        className={cn(
          styles.projects__container,
          isOpened && styles.projects__container_withProjectOpened
        )}>
        <div className={styles.projects__all}>
          <div className={styles.projects__header}>
            <Link href={'/profile/' + profile._id}>
              <a>
                <Button
                  outline
                  rounded
                  sm
                  iconRight
                  icon={<ArrowDown />}
                  className={styles.projects__back}>
                  Back
                </Button>
              </a>
            </Link>
            Projects
          </div>
          <div className={styles.projects__create}>
            <div className={styles.projects__createEmpty}>
              Create
              <Add2 />
            </div>
          </div>
          <div className={styles.projects__projects}>{projectsElements}</div>
        </div>
        <OpenedProject
          isOpened={isOpened}
          setIsOpened={setIsOpened}
          setProject={setOpenedProject}
          project={openedProject}
          className={styles.projects__project}
        />
      </div>
    </div>
  );
};

export default ProfileProjects;
