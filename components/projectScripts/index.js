import React, { useEffect, useState } from 'react';

import { Form } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { patchPage, createPage, deletePage } from 'api/storyBoardClient';
import cn from 'classnames';
import SvgClose from 'components/icon/Close';
import SvgDelete from 'components/icon/Delete';
import SvgPurplePencil from 'components/icon/PurplePencil';
import Popconfirm from 'components/popconfirm';
import AddButton from 'components/ui-elements/add-button';
import PrimaryButton from 'components/ui-elements/button';
import PrimaryInput from 'components/ui-elements/input';
import TextArea from 'components/ui-elements/text-area';
import PropTypes from 'prop-types';
import useWindowSize from 'utils/useWindowSize';

import styles from './styles.module.scss';

const ProjectScripts = ({ pages, storyBoardId, storyBoard, setStoryBoard }) => {
  const { width } = useWindowSize();
  const [scripts, setScripts] = useState(pages);
  const [selectedScript, setSelectedScript] = useState(scripts[0]?._id);
  const [visiblePageModal, setVisiblePageModal] = useState(false);
  const [showTitleInput, setShowTitleInput] = useState(false);
  const [getIndex, setIndex] = useState(0);

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

  const cahangeSelectedScriot = (index, id) => {
    if (index !== scripts.length) setSelectedScript(id);
  };

  const confirm = (index) => {
    removeScript(index);
  };

  const removeScript = (index) => {
    deletePage(
      scripts[index]._id,
      (res) => {
        console.log('', res);
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
        console.log(err);
      }
    );
  };
  const updateScripts = (value, index, feild) => {
    const items = [...scripts];
    if (feild === 'title') {
      items[index].title = value;
    }
    if (feild === 'text') {
      items[index].text = value;
    }
    // if (items[index].title) {
    //   const dataToSave = {
    //     ...items[index],
    //   };
    //   delete dataToSave?._id;
    //   if (items[index].newCreated) {
    //     delete items[index]?.newCreated;
    //     delete dataToSave?.newCreated;
    //     dataToSave.order = index + 1;
    //     dataToSave.storyBoard = storyBoardId;

    //     createPage(
    //       dataToSave,
    //       (res) => {
    //         items[index]._id = res?._id;
    //         setScripts(items);
    //         setSelectedScript(res?._id);
    //         const newPages = scripts.filter((item) => !item.newCreated);
    //         setStoryBoard({
    //           ...storyBoard,
    //           pages: newPages,
    //         });
    //       },
    //       (err) => {}
    //     );
    //   } else if (items[index].title) {
    //     patchPage(
    //       items[index]?._id,
    //       dataToSave,
    //       (res) => {
    //         const newPages = scripts.filter((item) => item.newCreated);
    //         setStoryBoard({
    //           ...storyBoard,
    //           pages: newPages,
    //         });
    //       },
    //       (err) => {}
    //     );
    //   }
    // }
    // if (items[items.length - 2].title) {
    //   items.push({
    //     _id: Math.floor(Math.random() * 1000000),
    //     newCreated: true,
    //     title: '',
    //     text: '',
    //   });
    // }
    // setScripts(items);
  };
  const saveScript = (index) => {
    const items = [...scripts];
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
            items[index - 1]._id = res?._id;
            setScripts(items);
            setSelectedScript(res?._id);
            const newPages = scripts.filter((item) => !item.newCreated);
            setStoryBoard({
              ...storyBoard,
              pages: newPages,
            });
          },
          (err) => {}
        );
      } else if (items[index].title) {
        patchPage(
          items[index]?._id,
          dataToSave,
          (res) => {
            const newPages = scripts.filter((item) => item.newCreated);
            setStoryBoard({
              ...storyBoard,
              pages: newPages,
            });
          },
          (err) => {}
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
  return (
    <div className={styles.projectScripts}>
      {scripts.map((script, index) => (
        <div
          key={script._id}
          className={cn(
            // selectedScript === script._id && styles.active_script,
            styles.script,
            index + 1 === scripts.length && styles.disabled
          )}
          onClick={() => cahangeSelectedScriot(index + 1, script._id)}>
          <div className={styles.content}>
            <div className={styles.pageCount}>Page {index + 1}</div>
            <div className={styles.text}>
              {/* {(selectedScript === script._id && (
                <> */}
              {/* <Form name="basic" initialValues={{ title: script.title, text: script.text }}>
                    <Form.Item
                      name="title"
                      rules={[
                        {
                          required: true,
                          message: 'Field is required!',
                        },
                      ]}>
                      <PrimaryInput
                        onBlur={(e) => updateScripts(e.target.value, index, 'title')}
                        placeholder="Page title"
                      />
                    </Form.Item>
                    <Form.Item name="text">
                      <TextArea
                        onBlur={(e) => updateScripts(e.target.value, index, 'text')}
                        onChange={(e) => (script.text = e.target.value)}
                        style={{ lineHeight: 1.2, overflow: 'auto' }}
                        placeholder="Page description"
                        minRows={width < 768 ? 5 : 12}
                        maxRows={width < 768 ? 5 : 12}
                      />
                    </Form.Item>
                  </Form> */}
              <Modal
                className={styles.addPageModal}
                onCancel={() => {
                  setVisiblePageModal(!visiblePageModal);
                }}
                closeIcon={<SvgClose width={19.85} height={19.85} />}
                visible={visiblePageModal}
                footer={null}>
                <Form name="basic" initialValues={{ title: script.title, text: script.text }}>
                  <Form.Item
                    className={styles.titlePage}
                    name="title"
                    rules={[
                      {
                        required: true,
                        message: 'Field is required!',
                      },
                    ]}>
                    {showTitleInput ? (
                      <PrimaryInput
                        onBlur={(e) => updateScripts(e.target.value, index, 'title')}
                        placeholder="Page title"
                      />
                    ) : (
                      <div className={styles.pageTitleContainer}>
                        <h3>Page Title</h3>
                        <SvgPurplePencil
                          className={styles.editAboutButton}
                          onClick={() => setShowTitleInput(true)}
                          width="44.42"
                          height="44.42"
                        />
                      </div>
                    )}
                    <div className={styles.borderTitle} />
                  </Form.Item>
                  <div className={styles.descriptionPage}>
                    <p>Page {getIndex + 1}</p>
                    <Form.Item name="text">
                      <TextArea
                        maxlength="5000"
                        maxRows={5000}
                        onBlur={(e) => updateScripts(e.target.value, getIndex, 'text')}
                        onChange={(e) => (script.text = e.target.value)}
                        style={{ lineHeight: 1.2, overflow: 'auto' }}
                        placeholder="Add a panel: Exact panel layout usually left to artist,
                          but if you want you have something specific in mind, put it in your
                          description.Dialoges: Charackets speaking form off-panel
                          are omdocated this way"
                      />
                    </Form.Item>
                  </div>
                </Form>
                <div className={styles.addPageButtonContainer}>
                  <Popconfirm
                    overlayClassName={styles.popConfirm}
                    position={'right'}
                    title="Are you sure to delete this script"
                    onConfirm={() => {
                      setVisiblePageModal(!visiblePageModal);
                      confirm(getIndex);
                    }}
                    item={
                      <span className={styles.deletePage}>
                        <SvgDelete width="23.35px" height="23.35px" />
                      </span>
                    }
                  />
                  <PrimaryButton
                    className={styles.saveChange}
                    onClick={() => {
                      saveScript(index);
                      setVisiblePageModal(!visiblePageModal);
                    }}
                    text={'Save'}
                  />
                  <PrimaryButton onClick={() => {}} text="Save and add new" isActive={true} />
                </div>
              </Modal>
              {/* </>
              )) || ( */}
              <>
                <div
                  className={styles.addButtonContainer}
                  onClick={() => {
                    setIndex(index);
                    index + 1 !== scripts.length && setVisiblePageModal(!visiblePageModal);
                  }}>
                  {!script.title && (
                    <h4 className={styles.title}>
                      <AddButton text="" />
                    </h4>
                  )}
                  <h4 className={styles.title}>{script.title || `Add page #${index + 1}`}</h4>
                  <p className={styles.description}>{script.text || ''}</p>
                </div>
              </>
              {/* )} */}
            </div>
            {/* {scripts.length - 3 === index && (
              <Popconfirm
                title="Are you sure to delete this script"
                onConfirm={() => confirm(index)}
                item={
                  <span className={styles.delete}>
                    <SvgDustbin width="22px" height="22px" />
                  </span>
                }
              />
            )} */}
          </div>
        </div>
      ))}
    </div>
  );
};
ProjectScripts.propTypes = {
  pages: PropTypes.array,
  storyBoardId: PropTypes.string,
  storyBoard: PropTypes.object,
  setStoryBoard: PropTypes.func,
};

ProjectScripts.defaultProps = {
  storyBoardId: '',
  pages: [],
  storyBoard: {},
  setStoryBoard: () => {},
};

export default ProjectScripts;
