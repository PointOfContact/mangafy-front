import React from 'react';

import Modal from 'antd/lib/modal/Modal';
import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const { info } = Modal;

const HeaderCollab = ({
  // isOwn,
  // user,
  // mangaStory,
  // openNotification,
  // originUrl,
  baseData,
  // setBaseData,
  // onChangeSingleField,
  // editTitle,
  collabActiveTab,
  stage,
  // canEdit,
  // setEditTitle,
  // saveMangaStoryData,
  // setMangaStoryNew,
  // mangaStoryNew,
}) => {
  // const onPublish = () => {
  //   if (baseData.published) {
  //     patchStory({
  //       published: false,
  //     });
  //     mangaStoryAPI.draft.leaveManga(mangaStory, false);
  //   } else {
  //     onGoToPublic(user?._id, mangaStory?._id);
  //     user?.payPalEmail && mangaStoryAPI.draft.leaveManga(mangaStory, true);
  //   }
  // };

  // const patchStory = (data) =>
  //   mangaStoryAPI.hiderCollab.patchStory(data, setBaseData, user, baseData, openNotification);

  // const onGoToPublic = () => {
  //   findStoryBoard(
  //     user._id,
  //     mangaStory._id,
  //     () => {
  //       patchStory({
  //         published: true,
  //       }).then(() =>
  //         info({
  //           className: styles.modal,
  //           closable: true,
  //           icon: <SvgClose width={10} height={10} />,
  //           okText: <></>,
  //           content: (
  //             <DraftCheckbox
  //               originUrl={originUrl}
  //               user={user}
  //               mangaStory={mangaStory}
  //               setMangaStoryNew={setMangaStoryNew}
  //               mangaStoryNew={mangaStoryNew}
  //             />
  //           ),
  //           onOk() {},
  //         })
  //       );
  //     },
  //     (err) => {
  //       openNotification('error', err.message);
  //     }
  //   );
  // };

  const ifCreatePage = collabActiveTab === '2';

  return (
    <section className="section_landing_for">
      <div className="mangafy_vontainer  container">
        <div className="row">
          <div className="col-sm-12 manga-story manga-story-m">
            {/* {isOwn && (
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
            )} */}

            <div
              className={cn(
                styles.storyTabContent,
                // editTitle && styles.containerInput,
                ifCreatePage && styles.storyTabCreate
              )}>
              {/* {!editTitle ? (
                <> */}
              <div className={styles.header}>
                {ifCreatePage ? (
                  <>
                    {stage?.tab !== '6' ? (
                      <h2>
                        <span>STAGE {stage?.tab}</span> - {stage?.title}
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
              {/* {canEdit && collabActiveTab !== '2' && (
                    <SvgPencilColored
                      className={styles.editSVG}
                      onClick={() => setEditTitle(true)}
                      width="22px"
                      height="22px"
                    />
                  )}
                </>
              ) : (
                canEdit && (
                  <WriteCollabName
                    baseData={baseData}
                    onChangeSingleField={onChangeSingleField}
                    setEditTitle={setEditTitle}
                    saveMangaStoryData={saveMangaStoryData}
                  />
                )
              )} */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

HeaderCollab.propTypes = {
  // isOwn: PropTypes.bool.isRequired,
  // user: PropTypes.object.isRequired,
  // mangaStory: PropTypes.object.isRequired,
  // openNotification: PropTypes.func.isRequired,
  // originUrl: PropTypes.string.isRequired,
  // setCollabActiveTab: PropTypes.func,
  baseData: PropTypes.object.isRequired,
  // setBaseData: PropTypes.func.isRequired,
  // onChangeSingleField: PropTypes.func.isRequired,
  // paypalToggle: PropTypes.object,
  // editTitle: PropTypes.bool.isRequired,
  collabActiveTab: PropTypes.string.isRequired,
  stage: PropTypes.object.isRequired,
  // canEdit: PropTypes.bool.isRequired,
  // setEditTitle: PropTypes.func.isRequired,
  // saveMangaStoryData: PropTypes.func.isRequired,
  // setMangaStoryNew: PropTypes.func,
  // mangaStoryNew: PropTypes.object,
};
// HeaderCollab.defaultProps = {
//   mangaStoryNew: {},
//   setMangaStoryNew: () => {},
//   paypalToggle: {},
//   setCollabActiveTab: () => {},
// };

export default HeaderCollab;
