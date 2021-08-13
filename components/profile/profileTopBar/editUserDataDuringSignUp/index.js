import React, { useState } from 'react';

import Modal from 'antd/lib/modal/Modal';
import SvgPrimaryAdd from 'components/icon/PrimaryAdd';
import ChangeYourAvatar from 'components/profile/profileTopBar/changeYourAvatar';
import SetPhotoAvatar from 'components/profile/profileTopBar/setPhotoAvatar';
import PropTypes, { object } from 'prop-types';

import ContentEditUser from './contentEditUser';
import HeaderEditUser from './headerEditUser';
import styles from './styles.module.scss';

const EditUserDataDuringSignUp = ({
  loadingImg,
  showModalEdit,
  setShowModalEdit,
  props,
  userData,
  setUserData,
  genresMyProfileEnums,
  userGenres,
  genres,
  handleChangeGenres,
  saveUserDataByKey,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);

  return (
    <Modal
      onCancel={() => {
        setShowModalEdit(false);
      }}
      closable={false}
      className={styles.modal}
      footer={null}
      visible={showModalEdit}>
      <HeaderEditUser
        userData={userData}
        setShowModalEdit={setShowModalEdit}
        saveUserDataByKey={saveUserDataByKey}
      />
      <ContentEditUser
        userData={userData}
        userGenres={userGenres}
        genres={genres}
        genresMyProfileEnums={genresMyProfileEnums}
        handleChangeGenres={handleChangeGenres}
        setUserData={setUserData}
      />
      <div className={styles.containerAvatar}>
        <div className={styles.img}>
          <SetPhotoAvatar ifMyProfile={true} userData={userData} loadingImg={loadingImg} />

          <SvgPrimaryAdd
            className={styles.add}
            id="setDataId"
            width="40"
            height="40px"
            onClick={() => {
              setDisabledButton(true);
              setIsModalVisible(true);
            }}
          />

          <ChangeYourAvatar
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            disabledButton={disabledButton}
            setDisabledButton={setDisabledButton}
            userData={userData}
            setUserData={setUserData}
            beforeUploadBase64={props.beforeUploadBase64}
            setLoadingImg={props.setLoadingImg}
            props={props}
          />
        </div>
      </div>
    </Modal>
  );
};

EditUserDataDuringSignUp.propTypes = {
  showModalEdit: PropTypes.bool.isRequired,
  setShowModalEdit: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
  setUserData: PropTypes.func.isRequired,
  profile: PropTypes.object,
  loadingImg: PropTypes.bool,
  props: object,
  genresMyProfileEnums: PropTypes.array,
  userGenres: PropTypes.array,
  genres: PropTypes.array,
  handleChangeGenres: PropTypes.func,
  saveUserDataByKey: PropTypes.func,
};

EditUserDataDuringSignUp.defaultProps = {
  profile: {},
  loadingImg: '',
  props: {},
  genresMyProfileEnums: [],
  userGenres: [],
  genres: [],
  handleChangeGenres: () => {},
  saveUserDataByKey: () => {},
};

export default EditUserDataDuringSignUp;
