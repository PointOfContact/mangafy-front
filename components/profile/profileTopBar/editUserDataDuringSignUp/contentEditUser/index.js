import React, { useState } from 'react';

import { Select } from 'antd';
import cn from 'classnames';
import PrimaryInput from 'components/ui-elements/input';
import TextArea from 'components/ui-elements/text-area';
import { EVENTS } from 'helpers/amplitudeEvents';
import { userTypes, userTypesEnums } from 'helpers/constant';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';

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
  user,
}) => {
  const [editMod, setFavoriteNovel] = useState('');

  const sendEvent = (event_type, update = {}) => {
    const data = [
      {
        event_type,
        event_properties: { isModal: true, ...update },
        user_id: user._id,
        user_properties: {
          ...user,
        },
      },
    ];
    console.log('data', data);
    myAmplitude(data);
  };

  return (
    <div className={styles.container}>
      {/* <div className={styles.card_wrap}> */}
      <div className={styles.containerContent}>
        <h3>Full Name</h3>
        <PrimaryInput
          value={userData.name}
          onBlur={() => sendEvent(EVENTS.UPDATE_FULL_NAME, { name: userData.name })}
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
            onBlur={() => sendEvent(EVENTS.ADDED_USER_TYPES, { types: userData.types })}
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
          onBlur={() => sendEvent(EVENTS.ADDED_BIO, { content: userData.content })}
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
            onBlur={() => sendEvent(EVENTS.ADDED_GENRES, { genres })}
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
  showModalEdit: PropTypes.bool,
  setStoryEditMode: PropTypes.func,
  genresMyProfileEnums: PropTypes.array.isRequired,
  handleChangeGenres: PropTypes.func.isRequired,
  setUserData: PropTypes.func,
  errorAboutMe: PropTypes.bool.isRequired,
  nameRequired: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

ContentEditUser.defaultProps = {
  setUserData: () => {},
  errorAboutMe: false,
  setStoryEditMode: () => {},
  showModalEdit: false,
};

export default ContentEditUser;
