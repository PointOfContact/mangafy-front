/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';

import { Modal, Form, Select } from 'antd';
import SvgClose from 'components/icon/Close';
import SvgDelete from 'components/icon/Delete';
import Popconfirm from 'components/popconfirm';
import PrimaryButton from 'components/ui-elements/button';
import PrimaryInput from 'components/ui-elements/input';
import TextEditor from 'components/ui-elements/text-editor';
import Upload from 'components/ui-elements/upload';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const { Option } = Select;

const ModalCreatePage = ({ visibleModal, setVisibleModal, storyBoard, pages }) => {
  const [title, setTitle] = useState('Create Page');
  const [options, setOptions] = useState([]);
  const [personage, setPersonage] = useState([]);

  useEffect(() => {
    // get personage
    const getPersonage = storyBoard.heroes.filter((value) => value.type === 'personage');
    setPersonage(getPersonage);
  }, [storyBoard?.heroes]);

  useEffect(() => {
    const createOption = personage.map((value) => (
      <Option key={value._id} value={value.name} label={value.name}>
        {value.name}
      </Option>
    ));
    setOptions(createOption);
  }, [personage]);

  const changeSelectedHero = () => {};

  const textEditorData = (value) => {
    console.log(value);
  };

  return (
    <Modal
      className={styles.modalCreatePage}
      closeIcon={
        <span className={styles.close}>
          <SvgClose />
        </span>
      }
      title={<h2 className={styles.titlePage}>{title}</h2>}
      onCancel={() => {
        setVisibleModal(false);
      }}
      visible={visibleModal}
      footer={null}>
      <div className={styles.border} />
      <Form name="name">
        <h3>Page beats</h3>
        <Form.Item name="title">
          <PrimaryInput
            className={styles.namePage}
            isLinear={true}
            isFullWidth={true}
            placeholder={'Give a name to page '}
          />
        </Form.Item>
        <h3>Characters</h3>
        <Form.Item name="chooseCharacter">
          <Select
            className={styles.option}
            countLimit={true}
            mode="multiple"
            onChange={changeSelectedHero}
            isLinear={true}
            showSearch
            isFullWidth={true}
            placeholder={'Link characters to page'}
            defaultValue={pages?.characterArray}
            // onBlur={() => onChangeHero({})}
            filterOption={(inputValue, option) =>
              inputValue ? option.label.toLowerCase().includes(inputValue.toLowerCase()) : true
            }>
            {options}
          </Select>
        </Form.Item>
        <h3>Panel proposal</h3>
        <Form.Item name="description">
          <TextEditor
            placeholder={
              'Using your thumbnails as a reference, write a script for your story which will eventually be turned into the final panel.'
            }
            result={textEditorData}
          />
        </Form.Item>
        <h3>Panel proposal</h3>
        <Upload
          className={styles.imgPage}
          showText={false}
          uploadText="Drag or browse your art to start uploading"
        />
        <Form.Item className={styles.deletePage}>
          <Popconfirm
            position={'right'}
            title={`Are you sure to delete this page`}
            // onConfirm={confirmDelete}
            item={
              <span className={styles.deleteCard}>
                <SvgDelete width="10px" height="11px" />
              </span>
            }
          />
          <PrimaryButton className={styles.saveButton} text="Save" />
          <PrimaryButton className={styles.newPage} isWhite={true} text="New Page" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

ModalCreatePage.propTypes = {
  visibleModal: PropTypes.bool.isRequired,
  setVisibleModal: PropTypes.func.isRequired,
  storyBoard: PropTypes.object.isRequired,
  pages: PropTypes.object.isRequired,
};

export default ModalCreatePage;
