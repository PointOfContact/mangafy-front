import React, { useState } from 'react';

import { Select } from 'antd';
import cn from 'classnames';
import PrimaryInput from 'components/ui-elements/input';
import TextArea from 'components/ui-elements/text-area';
import { userTypes, userTypesEnums } from 'helpers/constant';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const { Option } = Select;

const ContentEditUser = ({
  userData,
  setUserData,
  userGenres,
  genres,
  genresMyProfileEnums,
  handleChangeGenres,
  errorAboutMe,
  nameRequired,
}) => {
  const [editMod, setFavoriteNovel] = useState('');

  return (
    <div className={styles.container}>
      {/* <div className={styles.card_wrap}> */}
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
        <h3>Add an area of expertise</h3>
        {/* //TODO replace component */}
        <div className={cn('garners_buttons', styles.genres_wrap)}>
          <Select
            bordered={false}
            mode="multiple"
            defaultValue={userTypesEnums[userData.types[0]]}
            value={userData.types}
            style={{ width: '100%' }}
            onChange={(value) => setUserData({ ...userData, types: value })}>
            {userTypes.map((item) => (
              <Option key={item.key} value={item.key}>
                {item.value}
              </Option>
            ))}
          </Select>
        </div>
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
        {/* <CreateGeneres
          userGenres={userGenres}
          ifMyProfile={true}
          profileGenres={[]}
          userData={userData}
          genresMyProfileEnums={genresMyProfileEnums}
          genres={genres}
          handleChangeGenres={handleChangeGenres}
          editModalSide={true}
        /> */}
        <div className={cn('garners_buttons', styles.genres_wrap)}>
          <Select
            bordered={false}
            mode="multiple"
            MangaGenres={userData.skills || []}
            placeholder="Type or select an option"
            style={{ width: '100%' }}
            options={genresMyProfileEnums}
            value={genres}
            onChange={handleChangeGenres}
          />
        </div>
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
    // </div>
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
  errorAboutMe: PropTypes.bool.isRequired,
  nameRequired: PropTypes.bool.isRequired,
};

ContentEditUser.defaultProps = {
  setUserData: () => {},
  errorAboutMe: false,
};

export default ContentEditUser;
