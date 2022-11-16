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
import ModalCreateProject from 'components/modalCreateProject';
import client from 'api/client';
import { NextSeo } from 'next-seo';

const ProfileProjects = ({ user, profile }) => {
  const [openedProject, setOpenedProject] = useState(null);
  const [isOpened, setIsOpened] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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

  async function updateProjectsInfo() {
    try {
      const profile = await client.service('/api/v2/users').get(profileInfo?._id || profile?._id);
      setProfileInfo(profile);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.projects}>
      <NextSeo
        title={'My projects'}
        description={'Here you can manage your projects'}
        canonical={`${client.API_ENDPOINT}/shot/${profileInfo?._id}`}
        openGraph={{
          url: `${client.API_ENDPOINT}/shot/${profileInfo?._id}`,
          title: 'My projects',
          description: 'Here you can manage your projects',
          type: 'article',
          site_name: 'MangaFY',
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
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
          {!!projectsElements?.length && (
            <div className={styles.projects__create}>
              <div
                className={styles.projects__createEmpty}
                onClick={() => setIsCreateModalOpen(true)}>
                Create
                <Add2 />
              </div>
            </div>
          )}
          <div className={styles.projects__projects}>
            {projectsElements?.length ? (
              projectsElements
            ) : (
              <div className={styles.projects__noProjects}>
                <div className={styles.projects__noProjectsTitle}>Start your first project</div>
                <div className={styles.projects__noProjectsSubtitle}>
                  MangaFY connects everyone in the production process so teams can deliver better
                  novels, faster.
                </div>
                <Button md pink rounded onClick={() => setIsCreateModalOpen(true)}>
                  Upload
                </Button>
              </div>
            )}
          </div>
        </div>
        <OpenedProject
          user={user}
          isOpened={isOpened}
          setIsOpened={setIsOpened}
          setProject={setOpenedProject}
          project={openedProject}
          className={styles.projects__project}
          updateProjectsInfo={updateProjectsInfo}
        />
        <ModalCreateProject
          createProjectModal={isCreateModalOpen}
          showCreateProjectModal={setIsCreateModalOpen}
          user={user}
        />
      </div>
    </div>
  );
};

export default ProfileProjects;
