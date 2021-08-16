import React, { useEffect, useState } from 'react';

import { notification } from 'antd';
import { patchPage, createPage, deletePage } from 'api/storyBoardClient';
import cn from 'classnames';
import SvgDelete from 'components/icon/Delete';
import Popconfirm from 'components/popconfirm';
import AddButton from 'components/ui-elements/add-button';
import { EVENTS } from 'helpers/amplitudeEvents';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';

import EditCard from './editCard';
import ModalScript from './modalScript';
import styles from './styles.module.scss';

const ProjectScripts = ({ pages, storyBoardId, storyBoard, setStoryBoard, user }) => {
  const [scripts, setScripts] = useState(pages);
  const [visiblePageModal, setVisiblePageModal] = useState(false);
  const [showTitleInput, setShowTitleInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalIndex, setIndex] = useState(0);
  const [valuesField, setValuesField] = useState({});

  useEffect(() => {
    const newScripts = [
      ...pages,
      {
        _id: Math.floor(Math.random() * 1000000),
        newCreated: true,
        title: '',
        text: '',
      },
      {
        _id: Math.floor(Math.random() * 1000000),
        newCreated: true,
        title: '',
        text: '',
      },
    ];
    setScripts(newScripts);
  }, []);

  const removeScript = (index) => {
    deletePage(
      scripts[index]._id,
      () => {
        const items = [...scripts];
        items.splice(index, 1);
        const newPages = [];
        setScripts(items);
        setStoryBoard({
          ...storyBoard,
          pages: newPages,
        });
      },
      (err) => {
        notification.error({ message: err.message, placement: 'bottomLeft' });
      }
    );
  };

  const clickScript = (index, script) => {
    setIndex(index);
    setValuesField({
      title: script.title,
      text: script.text,
      newCreated: script.newCreated,
      script,
    });
    index + 1 !== scripts.length && setVisiblePageModal(true);
    ifCreateScript(script) ? setShowTitleInput(true) : setShowTitleInput(false);
  };
  const saveScript = (title, text, index, addNew = false) => {
    const items = [...scripts];

    if (title.type === 'title') {
      items[index].title = title.value;
    }
    if (text.type === 'text') {
      items[index].text = text.value;
    }
    if (items[index].title) {
      const dataToSave = {
        ...items[index],
      };
      delete dataToSave?._id;
      if (items[index].newCreated) {
        delete items[index]?.newCreated;
        delete dataToSave?.newCreated;
        dataToSave.order = index + 1;
        dataToSave.storyBoard = storyBoardId;

        createPage(
          dataToSave,
          (res) => {
            const data = {
              event_type: EVENTS.ADDED_BOARD_PAGE,
              event_properties: { storyBoardId, pageId: res?._id },
              user_id: user._id,
              user_properties: {
                ...user,
              },
            };
            myAmplitude(data);

            items[index]._id = res?._id;
            setScripts(items);
            setVisiblePageModal(false);
            setLoading(false);

            if (addNew) {
              clickScript(modalIndex + 1, scripts[modalIndex + 1]);
              setVisiblePageModal(true);
            }

            const newPages = scripts.filter((item) => !item.newCreated);
            setStoryBoard({
              ...storyBoard,
              pages: newPages,
            });
          },
          (err) => {
            notification.error({ message: err.message, placement: 'bottomLeft' });
          }
        );
      } else if (items[index].title) {
        patchPage(
          items[index]?._id,
          dataToSave,
          () => {
            setVisiblePageModal(false);
            setLoading(false);
            const newPages = scripts.filter((item) => item.newCreated);
            setStoryBoard({
              ...storyBoard,
              pages: newPages,
            });
          },
          (err) => {
            notification.error({ message: err.message, placement: 'bottomLeft' });
          }
        );
      }
    }
    if (items[items.length - 2].title) {
      items.push({
        _id: Math.floor(Math.random() * 1000000),
        newCreated: true,
        title: '',
        text: '',
      });
    }
    setScripts(items);
  };
  const ifCreateScript = (script) => script.title && !script.newCreated;
  return (
    <div className={styles.projectScripts}>
      {scripts.map((script, index) => (
        <div
          key={script._id}
          className={cn(
            ifCreateScript(script) ? styles.script : styles.scriptDef,
            index + 1 === scripts.length && styles.disabled
          )}>
          <div className={styles.content}>
            <div className={styles.pageCount}>Page {index + 1}</div>
            <div className={styles.text}>
              <div
                className={
                  ifCreateScript(script) ? styles.addButtonContainer : styles.addButtonContainerDef
                }
                onClick={() => {
                  clickScript(index, script);
                }}>
                {ifCreateScript(script) ? (
                  <>
                    <h4 className={styles.title}>{script.title}</h4>
                    <p className={styles.description}>{script.text}</p>
                  </>
                ) : (
                  <>
                    <h4 className={styles.titleButton}>
                      <AddButton text="" />
                    </h4>
                    <h4 className={styles.titleButton}>{`Add page #${index + 1}`}</h4>
                  </>
                )}
                {ifCreateScript(script) && (
                  <EditCard
                    confirm={removeScript}
                    modalIndex={index}
                    showModalScript={setVisiblePageModal}
                  />
                )}
              </div>
            </div>
            {ifCreateScript(script) && (
              <Popconfirm
                overlayClassName={styles.popConfirm}
                position={'right'}
                title="Are you sure to delete this script"
                onConfirm={() => {
                  removeScript(index);
                }}
                item={
                  <span className={styles.deletePage}>
                    <SvgDelete width="11.92px" height="11.92px" />
                  </span>
                }
              />
            )}
          </div>
        </div>
      ))}
      <ModalScript
        visibleModal={visiblePageModal}
        valuesField={valuesField}
        setVisiblePageModal={setVisiblePageModal}
        showTitleInput={showTitleInput}
        setShowTitleInput={setShowTitleInput}
        modalIndex={modalIndex}
        confirm={removeScript}
        saveScript={saveScript}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
};
ProjectScripts.propTypes = {
  pages: PropTypes.array,
  storyBoardId: PropTypes.string,
  storyBoard: PropTypes.object,
  setStoryBoard: PropTypes.func,
  user: PropTypes.object,
};

ProjectScripts.defaultProps = {
  storyBoardId: '',
  pages: [],
  storyBoard: {},
  setStoryBoard: () => {},
  user: {},
};

export default ProjectScripts;
