import React, { useEffect, useRef, useState } from 'react';

import { findStoryBoard } from 'api/storyBoardClient';
import ToggleSwitch from 'components/ui-elements/toggleSwitch';
import mangaStoryAPI from 'features/mangaStory/mangaStoryAPI';
import { EVENTS } from 'helpers/amplitudeEvents';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';

import DraftCheckbox from '../headerCollab/draftCheckbox';
import DeleteProjectField from './deleteProjectField';
import EditGenresField from './editGenresField';
import PaypalEmailField from './paypalEmailField';
import styles from './styles.module.scss';
import ViewUrlName from './viewUrlName';

const Settings = ({
  baseData,
  genres,
  onChangeSingleField,
  saveMangaStoryData,
  getStoryBoard,
  setBaseData,
  openNotification,
  originUrl,
  userData,
  setUserData,
  showPayPalContent,
  setShowPayPalContent,
  confirmDelete,
  storyBoard,
}) => {
  const collabRef = useRef();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [publishedChapter, setPublishedChapter] = useState(false);

  useEffect(() => {
    getStoryBoard();
    collabRef.current.checked = baseData?.published;
  }, []);

  const patchStory = (data) =>
    mangaStoryAPI?.hiderCollab?.patchStory(data, setBaseData, userData, baseData, openNotification);

  const onGoToPublic = () => {
    findStoryBoard(
      userData?._id,
      baseData?._id,
      () => {
        patchStory({
          ...baseData,
          published: true,
        }).then(() => setIsModalVisible(true));
      },
      (err) => {
        openNotification('error', err.message);
      }
    );
  };

  const onPublish = () => {
    if (baseData?.published) {
      patchStory({
        ...baseData,
        published: false,
      });
      mangaStoryAPI.draft.leaveManga(baseData, false);
      sendEvent(EVENTS.EDIT_PROJECT_PUBLISHED, 'published', false);
    } else {
      onGoToPublic(userData?._id, baseData?._id);
      userData?.payPalEmail && mangaStoryAPI.draft.leaveManga(baseData, true);
      sendEvent(EVENTS.EDIT_PROJECT_PUBLISHED, 'published', true);
    }
  };

  const sendEvent = (event_type, field, value) => {
    const eventData = [
      {
        event_type,
        event_properties: { baseData, [field]: value },
      },
    ];
    myAmplitude(eventData);
  };

  useEffect(() => {
    const existPublishedChapter = storyBoard.chapters.some((item) => item.published);
    setPublishedChapter(existPublishedChapter);
  }, [storyBoard]);

  return (
    <>
      <div className={styles.container}>
        <EditGenresField
          baseData={baseData}
          userData={userData}
          sendEvent={sendEvent}
          genresEnums={genres}
          onChangeSingleField={onChangeSingleField}
          saveMangaStoryData={saveMangaStoryData}
        />
      </div>
      <div className={styles.container}>
        <div className={styles.publicProject}>
          <h2>Make visible</h2>
          <p>
            Visible projects will only show general information about your project (inc. what you
            look for, and what you aim to work on without disclosing anything else). In draft mode,
            you go off-grid and need to invite collaborations manually, while the member you invite
            sees nothing.
          </p>
          <div className={styles.toggleStylesMakeVisible}>
            <span className={styles.toggleTitle}>Invisible</span>
            <ToggleSwitch
              className={styles.toggle}
              onChange={() => onPublish()}
              inputRef={collabRef}
            />
            <span className={styles.toggleTitle}>Visible</span>
          </div>
        </div>
      </div>
      {publishedChapter && (
        <div className={styles.container}>
          <ViewUrlName
            baseData={baseData}
            sendEvent={sendEvent}
            onChangeSingleField={onChangeSingleField}
            storyBoard={storyBoard}
            publishedChapter={publishedChapter}
          />
        </div>
      )}
      <div className={styles.container}>
        <PaypalEmailField
          sendEvent={sendEvent}
          userData={userData}
          setUserData={setUserData}
          onChangeSingleField={onChangeSingleField}
          setShowPayPalContent={setShowPayPalContent}
          showPayPalContent={showPayPalContent}
        />
      </div>
      <div className={styles.container}>
        <DeleteProjectField
          sendEvent={sendEvent}
          userData={userData}
          baseData={baseData}
          confirmDelete={confirmDelete}
        />
      </div>
      <DraftCheckbox
        originUrl={originUrl}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </>
  );
};

Settings.propTypes = {
  userData: PropTypes.object.isRequired,
  genres: PropTypes.array.isRequired,
  setUserData: PropTypes.func.isRequired,
  baseData: PropTypes.object.isRequired,
  onChangeSingleField: PropTypes.func.isRequired,
  saveMangaStoryData: PropTypes.func.isRequired,
  getStoryBoard: PropTypes.func.isRequired,
  setBaseData: PropTypes.func.isRequired,
  openNotification: PropTypes.func.isRequired,
  originUrl: PropTypes.string.isRequired,
  showPayPalContent: PropTypes.bool.isRequired,
  setShowPayPalContent: PropTypes.func.isRequired,
  confirmDelete: PropTypes.func.isRequired,
  storyBoard: PropTypes.object,
};

Settings.defaultProps = {
  storyBoard: {},
};

export default Settings;
