import React, { useState } from 'react';

import cn from 'classnames';
import Card from 'components/card';
import SvgPurplePencil from 'components/icon/PurplePencil';
import Imgix from 'components/imgix';
import ModalCreateProject from 'components/modalCreateProject';
import PropTypes from 'prop-types';

import CreateGeneres from './createGeneres';
import EditButtons from './editButtons';
import EditContent from './editContent';
import IfNotGeneres from './ifNotGeneres';
import styles from './styles.module.scss';

const TabStory = (props) => {
  const {
    storyEditMode,
    setStoryEditMode,
    cancelStoryEditMode,
    saveUserDataByKey,
    setUserData,
    userData,
    userGenres,
    profileGenres,
    handleChangeGenres,
    genresMyProfileEnums,
    genres,
    total,
    profile,
    ifMyProfile,
  } = props;

  const [createProjectModal, showCreateProjectModal] = useState(false);

  const editIfNotData = !!userData?.content || !!userData?.genresIds?.length;

  return (
    <div className={cn(styles.content_tab_profile_1)}>
      {ifMyProfile && !storyEditMode && editIfNotData && (
        <SvgPurplePencil
          className={styles.editAboutButton}
          onClick={() => setStoryEditMode(true)}
          width="30"
        />
      )}

      <EditButtons
        storyEditMode={storyEditMode}
        cancelStoryEditMode={cancelStoryEditMode}
        saveUserDataByKey={saveUserDataByKey}
      />

      <div>
        <EditContent
          profile={profile}
          storyEditMode={storyEditMode}
          ifMyProfile={ifMyProfile}
          userData={userData}
          setUserData={setUserData}
        />
        {ifMyProfile
          ? userGenres &&
            (!!userGenres?.length || storyEditMode) && (
              <>
                <h3 className={cn(styles.tab_title)}>
                  What kind of graphic novels are you interested in?
                </h3>
              </>
            )
          : profileGenres &&
            !!profileGenres?.length && <h3 className={cn(styles.sub_title)}>Genres</h3>}

        <CreateGeneres
          userGenres={userGenres}
          ifMyProfile={ifMyProfile}
          storyEditMode={storyEditMode}
          setStoryEditMode={setStoryEditMode}
          profileGenres={profileGenres}
          userData={userData}
          genresMyProfileEnums={genresMyProfileEnums}
          genres={genres}
          handleChangeGenres={handleChangeGenres}
        />

        {ifMyProfile && !storyEditMode && (
          <div className={styles.card_wrap} gutter={[16, 16]}>
            {!userData?.content && (
              <div className={styles.card}>
                <h3 className={cn(styles.sub_title)}>Bio</h3>
                <Card
                  description="It's time to tell about yourself.</br>  Let's start!"
                  btnText="Tell us about yourself"
                  items={[
                    <Imgix
                      key="1"
                      width={133}
                      height={140}
                      layout="fixed"
                      src="https://mangafy.club/img/aboutme.webp"
                      alt="MangaFy about me"
                    />,
                  ]}
                  onClick={() => setStoryEditMode(true)}
                />
              </div>
            )}
            <IfNotGeneres userGenres={userGenres} setStoryEditMode={setStoryEditMode} />
            {total === 0 && (
              <div className={styles.card}>
                <h3 className={cn(styles.sub_title)}>Projects</h3>
                <Card
                  description="Haven't created a project yet? </br> Let's start!"
                  btnText="Create your first project"
                  items={[
                    <Imgix
                      key="1"
                      width={111}
                      height={140}
                      layout="fixed"
                      src="https://mangafy.club/img/Projects.webp"
                      alt="MangaFy projects"
                    />,
                  ]}
                  onClick={() => showCreateProjectModal(true)}
                />
              </div>
            )}
          </div>
        )}
        {!ifMyProfile && (
          <div className={styles.card_wrap} gutter={[16, 16]}>
            {/* {!profile?.content && (
              <div className={styles.card}>
                <h3 className={cn(styles.sub_title)}>Bio</h3>
                <Card
                  description="Sorry, but there is nothing <br/> here (("
                  btnText=""
                  items={[
                    <Imgix
                      key="1"
                      width={124}
                      height={140}
                      layout="fixed"
                      src="https://mangafy.club/img/profile-apout-me.webp"
                      alt="MangaFy about me"
                    />,
                  ]}
                  onClick={() => setStoryEditMode(true)}
                />
              </div>
            )} */}
            {profileGenres &&
              (!!profileGenres?.length || (
                <div className={styles.card}>
                  <h3 className={cn(styles.sub_title)}>Novel Type</h3>
                  <Card
                    description="Nothing is filled in and it is <br/> very sad (("
                    btnText=""
                    items={[
                      <Imgix
                        key="1"
                        width={143}
                        height={140}
                        layout="fixed"
                        src="https://mangafy.club/img/ProfileNovelType.webp"
                        alt="MangaFy novel"
                      />,
                    ]}
                    onClick={() => setStoryEditMode(true)}
                  />
                </div>
              ))}
            {total === 0 && (
              <div className={styles.card}>
                <h3 className={cn(styles.sub_title)}>Projects</h3>
                <Card
                  description="There are no projects <br/> here (("
                  btnText=""
                  items={[
                    <Imgix
                      key="1"
                      width={134}
                      height={140}
                      layout="fixed"
                      src="https://mangafy.club/img/ProfileProjects.webp"
                      alt="MangaFy projects"
                    />,
                  ]}
                  onClick={() => showCreateProjectModal(true)}
                />
              </div>
            )}
          </div>
        )}
      </div>
      <ModalCreateProject
        createProjectModal={createProjectModal}
        showCreateProjectModal={showCreateProjectModal}
      />
    </div>
  );
};

TabStory.propTypes = {
  storyEditMode: PropTypes.bool,
  setStoryEditMode: PropTypes.func,
  cancelStoryEditMode: PropTypes.func,
  saveUserDataByKey: PropTypes.func,
  setUserData: PropTypes.func,
  userData: PropTypes.object,
  userGenres: PropTypes.array,
  handleChangeGenres: PropTypes.func,
  genresMyProfileEnums: PropTypes.any,
  genres: PropTypes.array,
  total: PropTypes.array,
  profile: PropTypes.object,
  profileGenres: PropTypes.array,
  ifMyProfile: PropTypes.bool,
};

TabStory.defaultProps = {
  setStoryEditMode: () => {},
  cancelStoryEditMode: () => {},
  saveUserDataByKey: () => {},
  setUserData: () => {},
  handleChangeGenres: () => {},
  storyEditMode: false,
  userData: null,
  userGenres: [],
  profile: null,
  genresMyProfileEnums: null,
  genres: null,
  total: [],
  profileGenres: null,
  ifMyProfile: null,
};

export default TabStory;
