/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';

import { Modal, Form, Select } from 'antd';
import SvgClose from 'components/icon/Close';
import SvgDelete from 'components/icon/Delete';
import Popconfirm from 'components/popconfirm';
import PrimaryButton from 'components/ui-elements/button';
import HeroUpload from 'components/ui-elements/heroUpload';
import PrimaryInput from 'components/ui-elements/input';
import TextEditor from 'components/ui-elements/text-editor';
import mangaStoryAPI from 'features/mangaStory/mangaStoryAPI';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const { Option } = Select;

const ModalCreatePage = ({
  visibleModal,
  setVisibleModal,
  chapters,
  setChapters,
  storyBoard,
  chapterItem,
  pagesArray,
  modalTitle,
  pageItem,
}) => {
  const [title, setTitle] = useState('');
  const [text, setDescription] = useState('');
  const [characterArray, setCharacterArray] = useState([]);
  const [imgId, setImgId] = useState('');
  const [openNew, setOpenNew] = useState(false);
  const [options, setOptions] = useState([]);
  const [imgLoad, setImgLoad] = useState(false);
  const [personage, setPersonage] = useState([]);
  const [form] = Form.useForm();
  const ifEdit = modalTitle === 'Edit page';
  const ifUpgrade = !title?.length;

  useEffect(() => {
    if (visibleModal) {
      setTitle(pageItem?.value?.title);
      setCharacterArray(pageItem?.value?.characterArray);
      setDescription(pageItem?.value?.text);
      setImgId(pageItem?.value?.imageUrl);
      form.setFieldsValue({
        title: pageItem?.value?.title,
        characterArray: pageItem?.value?.characterArray,
      });
    } else {
      setDescription('');
      setImgId('');
      form.resetFields();
    }
  }, [visibleModal]);

  useEffect(() => {
    // get personage
    const getPersonage = storyBoard?.heroes?.filter((value) => value.type === 'personage');
    setPersonage(getPersonage);
  }, [storyBoard?.heroes]);

  useEffect(() => {
    const createOption = personage?.map((value) => (
      <Option key={value._id} value={value._id} label={value.name}>
        {value.name}
      </Option>
    ));
    setOptions(createOption);
  }, [personage]);

  const textEditorData = (value) => {
    setDescription(value);
  };

  const createPage = (newTitle, newCharacterArray) => {
    const data = {
      title: newTitle,
      text,
      order: pagesArray?.length + 1,
      storyBoard: storyBoard?._id,
      characterArray: newCharacterArray,
      imageUrl: imgId,
      chapterId: chapterItem?.value?._id,
    };

    if (ifEdit) {
      delete data.storyBoard;
      mangaStoryAPI.pages.patchPage(
        chapterItem?.index,
        pageItem,
        chapters,
        setChapters,
        setVisibleModal,
        data
      );
    } else {
      return mangaStoryAPI.pages.createPage(
        chapterItem?.index,
        chapters,
        setChapters,
        setVisibleModal,
        data
      );
    }
  };

  const confirmDelete = () => {
    mangaStoryAPI.pages.deletePage(
      chapterItem?.index,
      chapters,
      setChapters,
      pageItem,
      setVisibleModal
    );
  };

  const request = (e) => {
    const newTitle = !!e.title.trim() ? e.title : 'Untitled page';
    setTitle(newTitle);
    setCharacterArray(e.characterArray);
    createPage(newTitle, e.characterArray).then(() => {
      openNew && (setVisibleModal(true), setOpenNew(false));
    });
  };

  return (
    <Modal
      className={styles.modalCreatePage}
      closeIcon={
        <span className={styles.close}>
          <SvgClose />
        </span>
      }
      title={<h2 className={styles.titlePage}>{modalTitle}</h2>}
      onCancel={() => {
        setVisibleModal(false);
      }}
      visible={visibleModal}
      footer={null}>
      <div className={styles.border} />
      <Form name="createPage" form={form} onFinish={(e) => request(e)}>
        <h3>Page beats</h3>
        <Form.Item name="title">
          <PrimaryInput
            maxLength={100}
            className={styles.namePage}
            placeholder={'Give a name to page '}
          />
        </Form.Item>
        <h3>Characters</h3>
        <Form.Item name="characterArray">
          <Select
            className={styles.option}
            mode="multiple"
            dropdownRender={(menu) => (
              <div className={styles.selectDropDown}>
                {menu}
                Bzzzt! You are missing some characters in your story. Characters are the building
                blocks of your story add them here Note here - should be a link to the character
                creation page
              </div>
            )}
            showSearch
            placeholder={'Link characters to page'}
            filterOption={(inputValue, option) =>
              inputValue ? option.label.toLowerCase().includes(inputValue.toLowerCase()) : true
            }>
            {options}
          </Select>
        </Form.Item>
        <h3>Panel proposal</h3>
        <TextEditor
          placeholder="Using your thumbnails as a reference, write a script for your story which will eventually be turned into the final panel."
          result={textEditorData}
          value={text}
        />
        <h3 className={styles.uploadTitle}>Upload page</h3>
        <HeroUpload
          className={styles.imgPage}
          showText={false}
          mangaUrl={imgId}
          setImgId={setImgId}
          setImgLoad={setImgLoad}
          text="Drag or browse your art to start uploading"
          notUploadVideo={true}
        />
        <Form.Item className={styles.deletePage}>
          <Popconfirm
            position={'right'}
            title={`Are you sure to delete this page`}
            onConfirm={confirmDelete}
            item={
              <span className={styles.deleteCard}>
                <SvgDelete width="10px" height="11px" />
              </span>
            }
          />
          <PrimaryButton
            loading={imgLoad}
            className={styles.saveButton}
            htmlType="submit"
            text="Save"
          />
          {ifUpgrade && (
            <PrimaryButton
              className={styles.newPage}
              isWhite={true}
              loading={imgLoad}
              htmlType="submit"
              onClick={() => setOpenNew(true)}
              text="New Page"
            />
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

ModalCreatePage.propTypes = {
  visibleModal: PropTypes.bool.isRequired,
  setVisibleModal: PropTypes.func.isRequired,
  storyBoard: PropTypes.object.isRequired,
  pagesArray: PropTypes.array,
  modalTitle: PropTypes.string.isRequired,
  chapterItem: PropTypes.object.isRequired,
  chapters: PropTypes.array.isRequired,
  setChapters: PropTypes.func.isRequired,
  pageItem: PropTypes.object,
};

ModalCreatePage.defaultProps = {
  pagesArray: [],
  pageItem: {},
};

export default ModalCreatePage;
