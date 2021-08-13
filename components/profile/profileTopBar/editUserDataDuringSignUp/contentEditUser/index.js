import React from 'react';

import CreateGeneres from 'components/profile/profileContent/tabStory/createGeneres';
import PrimaryInput from 'components/ui-elements/input';
import TextArea from 'components/ui-elements/text-area';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const ContentEditUser = ({
  userData,
  setUserData,
  userGenres,
  genres,
  genresMyProfileEnums,
  handleChangeGenres,
}) => {
  // const [favoriteNovel, setFavoriteNovel] = useState('');
  const errorAboutMe = userData?.content?.length < 3 || userData?.content === undefined;
  const nameRequired = userData?.name?.length < 3 || userData?.name === undefined;

  return (
    <div className={styles.container}>
      <div className={styles.card_wrap}>
        <div className={styles.containerContent}>
          <h3>Full Name</h3>
          <PrimaryInput
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            placeholder="Your name"
            className={styles.fullNameInput}
          />
          {nameRequired && (
            <p className={styles.errorAboutMe}> Name length should be minimum 3 characters </p>
          )}
          {/* <h3>Add an area of expertise</h3> */}
          {/* //TODO replace component */}
          {/* <CreateGeneres
            userGenres={userGenres}
            ifMyProfile={true}
            profileGenres={[]}
            userData={userData}
            genresMyProfileEnums={genresMyProfileEnums}
            genres={genres}
            handleChangeGenres={handleChangeGenres}
            editModalSide={false}
          /> */}
          {/* <h3 className={styles.languagesSpeak}>What languages do you speak?</h3> */}
          {/* //TODO replace component */}
          {/* <CreateGeneres
            userGenres={userGenres}
            ifMyProfile={true}
            profileGenres={[]}
            userData={userData}
            genresMyProfileEnums={genresMyProfileEnums}
            genres={genres}
            handleChangeGenres={handleChangeGenres}
            editModalSide={false}
          /> */}
          <h3>About Me</h3>
          <TextArea
            className={styles.aboutMe}
            value={userData.content}
            onChange={(e) => {
              setUserData({
                ...userData,
                content: e.target.value,
              });
            }}
            placeholder="Tell your story, what are you creating? A comic book Manga or maybe a whole novella, we're very interested!"
          />
          {errorAboutMe && (
            <p className={styles.errorAboutMe}> Text length should be minimum 3 characters </p>
          )}
          <h3 className={styles.graphicNovels}>What types of graphic novels do you enjoy?</h3>
          <CreateGeneres
            userGenres={userGenres}
            ifMyProfile={true}
            profileGenres={[]}
            userData={userData}
            genresMyProfileEnums={genresMyProfileEnums}
            genres={genres}
            handleChangeGenres={handleChangeGenres}
            editModalSide={false}
          />
          {/* <h3 className={styles.supporterButton}>Allow supporter button</h3>
          <p>Add the ability to accept support from your fans </p>
          <ToggleSwitch />
          <h3>What is your favorite novel or anime?</h3>
          <PrimaryInput
            className={styles.favoriteNovel}
            placeholder="Akira, Naruto, OpePiece"
            value={favoriteNovel}
            onChange={(e) => {
              setFavoriteNovel(e.target.value);
            }}
          /> */}
        </div>
      </div>
    </div>
  );
};

ContentEditUser.propTypes = {
  userData: PropTypes.object.isRequired,
  userGenres: PropTypes.array.isRequired,
  genres: PropTypes.array.isRequired,
  showModalEdit: PropTypes.bool.isRequired,
  setStoryEditMode: PropTypes.func.isRequired,
  genresMyProfileEnums: PropTypes.object.isRequired,
  handleChangeGenres: PropTypes.func.isRequired,
  setUserData: PropTypes.func,
};

ContentEditUser.defaultProps = {
  setUserData: () => {},
  errorAboutMe: false,
};

export default ContentEditUser;
