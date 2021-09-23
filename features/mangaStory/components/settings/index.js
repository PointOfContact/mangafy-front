import React, { useEffect, useRef } from 'react';

import { Modal } from 'antd';
import { findStoryBoard } from 'api/storyBoardClient';
import SvgClose from 'components/icon/Close';
import ToggleSwitch from 'components/ui-elements/toggleSwitch';
import mangaStoryAPI from 'features/mangaStory/mangaStoryAPI';
import PropTypes from 'prop-types';

import DraftCheckbox from '../headerCollab/draftCheckbox';
import DeleteProjectField from './deleteProjectField';
import EditGenresField from './editGenresField';
import PaypalEmailField from './paypalEmailField';
import styles from './styles.module.scss';
import ViewUrlName from './viewUrlName';

const { info } = Modal;

const Settings = ({
  baseData,
  genres,
  onChangeSingleField,
  saveMangaStoryData,
  getStoryBoard,
  storyBoard,
  setBaseData,
  openNotification,
  originUrl,
  userData,
  setUserData,
  showPayPalContent,
  setShowPayPalContent,
}) => {
  const collabRef = useRef();

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
        }).then(() =>
          info({
            className: styles.modal,
            closable: true,
            icon: <SvgClose width={10} height={10} />,
            okText: <></>,
            content: <DraftCheckbox originUrl={originUrl} />,
            onOk() {},
          })
        );
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
    } else {
      onGoToPublic(userData?._id, baseData?._id);
      userData?.payPalEmail && mangaStoryAPI.draft.leaveManga(baseData, true);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <EditGenresField
          baseData={baseData}
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
            <span className={styles.toggleTitle}>Draft</span>
            <ToggleSwitch
              className={styles.toggle}
              onChange={() => onPublish()}
              inputRef={collabRef}
            />
            <span className={styles.toggleTitle}>Visible</span>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <ViewUrlName
          storyBoard={storyBoard}
          baseData={baseData}
          onChangeSingleField={onChangeSingleField}
        />
      </div>
      <div className={styles.container}>
        <PaypalEmailField
          userData={userData}
          setUserData={setUserData}
          onChangeSingleField={onChangeSingleField}
          setShowPayPalContent={setShowPayPalContent}
          showPayPalContent={showPayPalContent}
        />
      </div>
      <div className={styles.container}>
        <DeleteProjectField userData={userData} baseData={baseData} />
      </div>
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
  storyBoard: PropTypes.object.isRequired,
  setBaseData: PropTypes.func.isRequired,
  openNotification: PropTypes.func.isRequired,
  originUrl: PropTypes.string.isRequired,
  showPayPalContent: PropTypes.bool.isRequired,
  setShowPayPalContent: PropTypes.func.isRequired,
};

export default Settings;
