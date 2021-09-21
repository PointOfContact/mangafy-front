import React, { useEffect, useRef, useState } from 'react';

import { Modal, Tooltip } from 'antd';
import client from 'api/client';
import { findStoryBoard } from 'api/storyBoardClient';
import SvgClose from 'components/icon/Close';
import SvgCopy from 'components/icon/Copy';
import PrimaryInput from 'components/ui-elements/input';
import ToggleSwitch from 'components/ui-elements/toggleSwitch';
import copy from 'copy-to-clipboard';
import mangaStoryAPI from 'features/mangaStory/mangaStoryAPI';
import PropTypes from 'prop-types';

import DraftCheckbox from '../headerCollab/draftCheckbox';
import DeleteProjectField from './deleteProjectField';
import EditGenresField from './editGenresField';
import PaypalEmailField from './paypalEmailField';
import styles from './styles.module.scss';

const { info } = Modal;

const Settings = ({
  baseData,
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
  const [copyText, setCopyText] = useState('Copy to clipboard');
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
          onChangeSingleField={onChangeSingleField}
          saveMangaStoryData={saveMangaStoryData}
        />
      </div>
      <div className={styles.container}>
        <div className={styles.publicProject}>
          <h2>Public Project</h2>
          <p>
            Visible projects will only show general information about your project (inc. what you
            look for, and what you aim to work on without disclosing anything else). In draft mode,
            you go off-grid and need to invite collaborations manually, while the member you invite
            sees nothing.
          </p>
          <div className={styles.toggleStyles}>
            Draft
            <ToggleSwitch onChange={() => onPublish()} inputRef={collabRef} />
            Visible
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.viewLink}>
          <div className={styles.titleContainer}>
            <h2>Generate a personal page for your project</h2>
            <div className={styles.betaButton}>Beta</div>
          </div>
          <p>
            Claim project name and give fans an easy-to remember web adres for your Webcomics
            project
          </p>
          <h3>Custom URL</h3>
          <div className={styles.copyView}>
            <PrimaryInput value={`${client.API_ENDPOINT}/manga-view/${storyBoard?._id}`} />
            <Tooltip placement="topLeft" title={copyText}>
              <div
                className={styles.copy}
                onClick={() => {
                  setCopyText('Copied');
                  copy(`${client.API_ENDPOINT}/manga-view/${storyBoard?._id}`);
                }}
                onMouseOut={() => setCopyText('Copy to clipboard')}>
                <SvgCopy width="18px" height="18px" alt="mangaFy copy icon" />
              </div>
            </Tooltip>
          </div>
        </div>
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
