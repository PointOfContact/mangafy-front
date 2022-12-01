import React, { useEffect, useRef, useState } from 'react';

import { findStoryBoard } from 'api/storyBoardClient';
import ToggleSwitch from 'components/ui-elements/toggleSwitch';
import mangaStoryClient from 'api/mangaStoryClient';
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
  user,
  chapters,
  setChapters,
}) => {
  const collabRef = useRef();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [publishedChapter, setPublishedChapter] = useState(false);

  useEffect(() => {
    getStoryBoard();
    collabRef.current.checked = baseData?.published;
  }, []);

  function isReadyToPublish() {
    return !(!baseData.story || baseData.story === '<p><br></p>' || !baseData.image);
  }

  const patchStory = (data) =>
    mangaStoryClient?.hiderCollab?.patchStory(
      data,
      setBaseData,
      userData,
      baseData,
      openNotification
    );

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
      chapters.forEach(async (chapter) => {
        if (!chapter.published) {
          return;
        }
        try {
          await mangaStoryClient.chapter.patch(
            chapter?._id,
            { published: false, mangaStoryId: storyBoard?.mangaStoryId },
            () => {},
            () => {},
            setChapters,
            (res) => {
              const dataEvent = [
                {
                  event_properties: { chapter },
                },
              ];

              if (res.published) {
                dataEvent[0].event_type = EVENTS.PUBLISHED_CHAPTER;
              } else {
                dataEvent[0].event_type = EVENTS.DRAFT_CHAPTER;
              }

              myAmplitude(dataEvent);

              const updatedChapters = chapters.map((val, i) => {
                if (i === index) {
                  val.published = publishedValue;
                  return val;
                }
                return val;
              });

              setStoryBoard({ ...storyBoard, chapters: updatedChapters });
            }
          );
        } catch (error) {
          console.log('Error in un-publishing chapter:');
          console.log(error);
        }
      });

      patchStory({
        ...baseData,
        published: false,
      });
      mangaStoryClient.draft.leaveManga(baseData, false);
      sendEvent(EVENTS.EDIT_PROJECT_PUBLISHED, 'published', false);
    } else {
      onGoToPublic(userData?._id, baseData?._id);
      userData?.payPalEmail && mangaStoryClient.draft.leaveManga(baseData, true);
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
          setBaseData={setBaseData}
          userData={userData}
          sendEvent={sendEvent}
          genresEnums={genres}
          onChangeSingleField={onChangeSingleField}
          saveMangaStoryData={saveMangaStoryData}
        />
      </div>
      <div className={styles.container}>
        <div className={styles.publicProject} id="visible">
          <h2>Make visible</h2>
          <p>
            Visible projects will only show general information about your project (inc. what you
            look for, and what you aim to work on without disclosing anything else). In draft mode,
            you go off-grid and need to invite collaborations manually, while the member you invite
            sees nothing.
          </p>
          <div className={styles.toggleStylesMakeVisible}>
            <span className={styles.toggleTitle}>Invisible</span>
            <span
              onClick={() => {
                if (!isReadyToPublish() && !baseData.published)
                  openNotification(
                    'error',
                    'Please add a description and a cover before publishing your project'
                  );
              }}>
              <ToggleSwitch
                className={styles.toggle}
                onChange={() => onPublish()}
                inputRef={collabRef}
                disabled={!isReadyToPublish() && !baseData.published}
              />
            </span>
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
