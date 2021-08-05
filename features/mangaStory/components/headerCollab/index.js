import React from 'react';

import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Input, Popover } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { findStoryBoard } from 'api/storyBoardClient';
import cn from 'classnames';
import SvgPencilColored from 'components/icon/PencilColored';
import PrimaryButton from 'components/ui-elements/button';
import ButtonToggle from 'components/ui-elements/button-toggle';
import PropTypes from 'prop-types';

import mangaStoryAPI from '../mangaStoryAPI';
import DraftCheckbox from './draftCheckbox';
import styles from './styles.module.scss';

const { confirm } = Modal;
const { info } = Modal;

const Amplitude = require('amplitude');

const amplitude = new Amplitude('3403aeb56e840aee5ae422a61c1f3044');

const HeaderCollab = ({
  isOwn,
  user,
  mangaStory,
  openNotification,
  originUrl,
  setCollabActiveTab,
  baseData,
  setBaseData,
  onChangeSingleField,
  editTitle,
  collabActiveTab,
  stage,
  canEdit,
  setEditTitle,
  saveUserDataByKey,
  setShowPayPalToggle,
}) => {
  const cancelEditTitle = () => {
    setEditTitle(false);
  };

  const onPublish = () => {
    if (baseData.published) {
      onGoToPrivate();
      mangaStoryAPI.draft.leaveManga(mangaStory, false, setShowPayPalToggle);
    } else {
      onGoToPublic();
      user?.payPalEmail && mangaStoryAPI.draft.leaveManga(mangaStory, true, setShowPayPalToggle);
    }
  };

  const patchStory = (data) =>
    mangaStoryAPI.hiderCollab.patchStory(
      data,
      setBaseData,
      user,
      amplitude,
      baseData,
      openNotification
    );

  const onGoToPublic = () => {
    findStoryBoard(
      user._id,
      mangaStory._id,
      (res) => {
        const boad = res.data[0];
        if (boad?.idea?.title && boad?.idea?.text) {
          patchStory({
            published: true,
          }).then(() =>
            info({
              title: (
                <h3 className={styles.modalTitle}>
                  AWESOME! You opened your graphic novel project!
                </h3>
              ),
              icon: '',
              width: '100%',
              style: { top: 120, maxWidth: '1000px' },
              content: (
                <DraftCheckbox
                  originUrl={originUrl}
                  user={user}
                  mangaStory={mangaStory}
                  setShowPayPalToggle={setShowPayPalToggle}
                  setBaseData={setBaseData}
                  baseData={baseData}
                />
              ),
              onOk() {},
            })
          );
        } else {
          confirm({
            title: 'Update story board',
            icon: <ExclamationCircleOutlined />,
            style: { top: 120 },
            content:
              'Before switching to live mode, you must complete at last one step. Update this information in stroy board tab',
            onOk() {
              setCollabActiveTab('2');
            },
            onCancel() {},
          });
        }
      },
      (err) => {
        openNotification('error', err.message);
      }
    );
  };

  const onGoToPrivate = () => {
    confirm({
      confirmLoading: true,
      title: 'Oh, going private? No problem',
      style: { top: 120 },
      icon: <ExclamationCircleOutlined />,
      content:
        'Your project is moving to private mode. But no worries, if you want to collaborate or add members in various roles, you can always switch up to public. Good Luck!',
      onOk() {
        patchStory({
          published: false,
        });
      },
      onCancel() {},
    });
  };

  return (
    <section className="section_landing_for">
      <div className="mangafy_vontainer  container">
        <div className="row">
          <div className="col-sm-12 manga-story manga-story-m">
            {isOwn && (
              <>
                <div className={styles.publishContent}>
                  <Popover
                    placement="bottomRight"
                    overlayStyle={{ maxWidth: '400px', zIndex: '100' }}
                    title={''}
                    content={
                      'Note: published projects will only show general information about your project (inc. what you look for, and what you aim to work on without disclosing anything else). In draft mode, you go off-grid and need to invite collaborations manually, while the member you invite sees nothing.'
                    }
                    trigger="hover">
                    <div className={styles.publishSwitch}>
                      <ButtonToggle
                        id={'Draft'}
                        isChecked={baseData.published}
                        size={50}
                        offText="Draft"
                        onText="Make visible"
                        onChange={onPublish}
                      />
                    </div>
                  </Popover>
                </div>
              </>
            )}

            {!editTitle ? (
              <div className={styles.storyTabContent}>
                <div className={styles.header}>
                  {collabActiveTab === '2' ? (
                    <>
                      {stage?.tab !== '6' ? (
                        <h2>
                          STORY BIBLE <span>STAGE {stage?.tab}</span> - {stage?.title}
                        </h2>
                      ) : (
                        <h2>{stage?.title}</h2>
                      )}
                      <p>{stage?.description}</p>
                    </>
                  ) : (
                    <h2>{baseData.title}</h2>
                  )}
                </div>
                {canEdit && collabActiveTab !== '2' && (
                  <SvgPencilColored
                    className={styles.editSVG}
                    onClick={() => setEditTitle(true)}
                    width="22px"
                    height="22px"
                  />
                )}
              </div>
            ) : (
              canEdit && (
                <>
                  <div className={styles.inputs}>
                    <h2>
                      <Input
                        className={!baseData.title.replace(/\s+/g, '') && styles.error}
                        isLinear={true}
                        isFullWidth={true}
                        name="title"
                        onChange={onChangeSingleField}
                        placeholder=""
                        type="text"
                        value={baseData.title}
                        required
                      />
                      {!baseData.title.replace(/\s+/g, '') && (
                        <p className={styles.error}>Title is required</p>
                      )}
                    </h2>
                  </div>
                  <div className={cn(styles.editProfile, 'buttonsProfile_styles')}>
                    <PrimaryButton
                      className="buttonsProfile_cancel"
                      text="Cancel"
                      isDark
                      isRound
                      disabled={false}
                      onClick={cancelEditTitle}
                    />
                    <PrimaryButton
                      className="buttonsProfile_save"
                      text="save"
                      isActive
                      isRound
                      disabled={false}
                      onClick={() => {
                        baseData.title.replace(/\s+/g, '') && saveUserDataByKey(baseData, 'title');
                      }}
                    />
                  </div>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

HeaderCollab.propTypes = {
  isOwn: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  mangaStory: PropTypes.object.isRequired,
  openNotification: PropTypes.func.isRequired,
  originUrl: PropTypes.string.isRequired,
  setCollabActiveTab: PropTypes.func.isRequired,
  baseData: PropTypes.object.isRequired,
  setBaseData: PropTypes.func.isRequired,
  onChangeSingleField: PropTypes.func.isRequired,
  paypalToggle: PropTypes.object.isRequired,
  editTitle: PropTypes.string.isRequired,
  collabActiveTab: PropTypes.bool.isRequired,
  stage: PropTypes.object.isRequired,
  canEdit: PropTypes.bool.isRequired,
  setEditTitle: PropTypes.func.isRequired,
  saveUserDataByKey: PropTypes.func.isRequired,
  setShowPayPalToggle: PropTypes.func.isRequired,
};

export default HeaderCollab;
