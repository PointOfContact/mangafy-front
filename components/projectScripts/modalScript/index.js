import React, { useEffect, useState } from 'react';

import { Form } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Modal from 'antd/lib/modal/Modal';
import SvgClose from 'components/icon/Close';
import SvgDelete from 'components/icon/Delete';
import SvgPurplePencil from 'components/icon/PurplePencil';
import Popconfirm from 'components/popconfirm';
import PrimaryButton from 'components/ui-elements/button';
import PrimaryInput from 'components/ui-elements/input';
import PropTypes from 'prop-types';

import styles from '../styles.module.scss';

const ModalScript = ({
  visibleModal,
  valuesField,
  setVisiblePageModal,
  showTitleInput,
  setShowTitleInput,
  modalIndex,
  confirm,
  saveScript,
  loading,
  setLoading,
}) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [titleError, setTitleError] = useState('');
  const [notChangeInput, setNotChangeInput] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    setTitle('');
    setText('');
    setTitleError('');
    setLoading(false);
  }, [valuesField]);

  useEffect(() => {
    form.setFieldsValue({
      title: valuesField?.title,
      text: valuesField?.text,
    });
  }, [valuesField, form]);

  const createScript = (titleObj, textObj, addNew = false) => {
    if (titleObj?.value?.trim()) {
      setLoading(true);
      setTitleError('');
      saveScript(titleObj, textObj, modalIndex, addNew);
    } else if (/^\s+$/.test(titleObj?.value)) {
      setTitleError('Field title only contains whitespace ');
    } else {
      setTitleError('Field title required');
    }
  };

  useEffect(() => {
    createScript(title, text);
  }, [notChangeInput]);

  return (
    <Modal
      forceRender
      className={styles.addPageModal}
      onCancel={() => {
        setVisiblePageModal(!visibleModal);
      }}
      closeIcon={<SvgClose width={19.85} height={19.85} />}
      visible={visibleModal}
      footer={null}>
      <Form
        form={form}
        name="basic"
        initialValues={{ title: valuesField.title, text: valuesField.text }}>
        <Form.Item className={styles.titlePage} name="title">
          {!showTitleInput ? (
            <PrimaryInput
              maxLength={200}
              className={titleError && styles.titleInput}
              onBlur={(e) => {
                setTitle({ value: e.target.value, type: 'title' });
              }}
              placeholder="Page title"
            />
          ) : (
            <div className={styles.pageTitleContainer}>
              <h3>{valuesField.title}</h3>
              <SvgPurplePencil
                className={styles.editAboutButton}
                onClick={() => {
                  setShowTitleInput(false);
                }}
                width="44.42"
                height="44.42"
              />
            </div>
          )}
        </Form.Item>
        <span className={styles.titleError}>{titleError}</span>
        <div className={styles.borderTitle} />
        <div className={styles.descriptionPage}>
          <p>Panel {modalIndex + 1}</p>
          <Form.Item name="text">
            <TextArea
              className={styles.textareaPage}
              autoSize={true}
              maxLength={100000}
              maxrows={5000}
              onBlur={(e) => setText({ value: e.target.value, type: 'text' })}
              placeholder="Add a panel: Exact panel layout Is usually left to the artist,
               but if you want to have something specific in mind, put it in your description.
               Dialogues: Charackets speaking from off-panel are indicated this way"
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
            if (!valuesField.newCreated) {
              confirm(modalIndex);
            }
            setVisiblePageModal(!visibleModal);
          }}
          item={
            <span className={styles.deletePageFromModal}>
              <SvgDelete width="23.35px" height="23.35px" />
            </span>
          }
        />

        <PrimaryButton
          loading={loading}
          className={valuesField.newCreated ? styles.saveChange : ''}
          onClick={() => {
            if (title.value === undefined) {
              setTitle({ value: valuesField.title, type: 'title' });
              setText({ value: valuesField.text, type: 'text' });
              setNotChangeInput(true);
            } else {
              createScript(title, text);
            }
          }}
          text={'Save'}
        />

        {valuesField.newCreated && (
          <PrimaryButton
            loading={loading}
            onClick={() => {
              createScript(title, text, true);
            }}
            text="Save and add new"
            isActive={true}
          />
        )}
      </div>
    </Modal>
  );
};

ModalScript.propTypes = {
  visibleModal: PropTypes.bool.isRequired,
  valuesField: PropTypes.object.isRequired,
  setVisiblePageModal: PropTypes.func.isRequired,
  showTitleInput: PropTypes.bool.isRequired,
  setShowTitleInput: PropTypes.func.isRequired,
  modalIndex: PropTypes.number.isRequired,
  confirm: PropTypes.func.isRequired,
  saveScript: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default ModalScript;
