import React from 'react';

import { Modal, notification } from 'antd';
import SvgClose from 'components/icon/Close';
import SvgHeart from 'components/icon/Heart';
import { ShareButtons } from 'components/share';
import { Comments } from 'components/type-content/comments';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const ModalDiscussion = ({
  changeShowModal,
  showModal,
  user,
  postId,
  title,
  commentsData,
  logo,
  like,
  img,
}) => {
  const ModalTitle = (
    <div className={styles.titleWrapper}>
      <div className={styles.modalTitle}>{title}</div>
    </div>
  );

  const openNotification = (type, message, description = '') => {
    notification[type]({
      message,
      description,
    });
  };

  const handleCancel = () => {
    changeShowModal(false);
  };

  return (
    <Modal
      className={styles.modal}
      title={ModalTitle}
      footer={null}
      style={{ minWidth: '95%', maxWidth: '1200px' }}
      visible={showModal}
      closeIcon={<SvgClose height="18px" width="18px" />}
      okText="Send"
      onCancel={handleCancel}>
      <div className={styles.modalContent}>
        <div className="container">
          <div className="ant-row">
            <div className="ant-col-sm-16">
              <div className={styles.br}>
                <h2 className={styles.subtitle}>{title}</h2>
                <div className={styles.info}>
                  <spam>{logo}</spam>
                  <div>
                    <span className={styles.like}>
                      <SvgHeart width="20px" height="17px" />
                      <span>{like}</span>
                    </span>
                    <ShareButtons
                      shareUrl="https://mangafy.club/resources/manga-paneling-basics"
                      text=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="ant-col-sm-8">
              <h2 className={styles.subtitle}>{commentsData.length} Comments</h2>
              <Comments user={user} commentsData={commentsData} postId={postId} />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default ModalDiscussion;

ModalDiscussion.propTypes = {
  changeShowModal: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  postId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  like: PropTypes.number.isRequired,
  logo: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  commentsData: PropTypes.array,
  user: PropTypes.object,
};

ModalDiscussion.defaultProps = {
  user: null,
  commentsData: [],
};
