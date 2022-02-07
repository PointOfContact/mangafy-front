import React, { useState } from 'react';

import { notification, Popover } from 'antd';
import client from 'api/client';
import GetFeedback from 'components/get-feedback';
import SvgDelete from 'components/icon/Delete';
import SvgEdit from 'components/icon/Edit';
import SvgShare from 'components/icon/Share';
import Popconfirm from 'components/popconfirm';
import { ShareButtons } from 'components/share';
import { EVENTS } from 'helpers/amplitudeEvents';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';

import styles from './styles.module.scss';

const EditPostItems = ({
  id,
  discussions,
  setDiscussions,
  user,
  userId,
  img,
  subTitle,
  categories,
}) => {
  const [visibleEditModal, visibleEditPostModal] = useState(false);
  const [showShareIcon, setShowShareIcon] = useState(false);
  const [visibleSettings, setVisibleSettings] = useState(false);

  const editPost = (e) => {
    e.stopPropagation();
    visibleEditPostModal(true);
    setVisibleSettings(false);
  };

  const deletePost = (e) => {
    e.stopPropagation();

    const jwt = client.getCookie('feathers-jwt');
    import('../../../../api/restClient').then((m) => {
      m.default
        .service('/api/v2/posts')
        .remove(id, {
          headers: { Authorization: `Bearer ${jwt}` },
        })
        .then(() => {
          const posts = discussions.filter((value) => value._id !== id);
          setDiscussions(posts);
          const data = [
            {
              event_type: EVENTS.DELETE_POST,
              event_properties: { postId: id },
            },
          ];

          myAmplitude(data);
        })
        .catch((err) =>
          notification.error({
            message: err,
            placement: 'bottomLeft',
          })
        );
    });
  };

  const editPostItems = user && userId && user._id === userId && (
    <div className={styles.editPost}>
      <p className={styles.editPostItems} onClick={editPost}>
        <SvgEdit width="15" height="15" />
        Edit
      </p>
      <Popconfirm
        overlayClassName={styles.popConfirm}
        position={'right'}
        title="Are you sure to delete this post"
        onConfirm={deletePost}
        onCancel={(e) => e.stopPropagation()}
        item={
          <span className={styles.editPostItems} onClick={(e) => e.stopPropagation()}>
            <SvgDelete width="15" height="15" />
            Delete
          </span>
        }
      />
      <p
        className={styles.editPostItems}
        onClick={(e) => {
          e.stopPropagation();
          setShowShareIcon(true);
        }}>
        <SvgShare width="15" height="15" />
        Share
      </p>
    </div>
  );

  return (
    <>
      <Popover
        onClick={(e) => e.stopPropagation()}
        placement="bottomRight"
        visible={visibleSettings}
        onVisibleChange={() => setVisibleSettings(!visibleSettings)}
        content={
          <ul style={{ minWidth: '200px' }}>
            <li>{editPostItems}</li>
            {showShareIcon && (
              <li>
                <ShareButtons
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowShareIcon(false);
                    setVisibleSettings(false);
                  }}
                  shareUrl={`${client.API_ENDPOINT}/feed?postId=${id}`}
                  text=""
                />
              </li>
            )}
          </ul>
        }
        trigger="click">
        <span className={styles.shareUrl} onClick={() => setVisibleSettings(true)}>
          ...
        </span>
      </Popover>
      <GetFeedback
        user={user}
        setIsModalVisible={visibleEditPostModal}
        isModalVisible={visibleEditModal}
        edit={true}
        postId={id}
        img={img}
        currentSubTitle={subTitle}
        categories={categories}
      />
    </>
  );
};

EditPostItems.propTypes = {
  id: PropTypes.string.isRequired,
  discussions: PropTypes.array.isRequired,
  setDiscussions: PropTypes.func.isRequired,
  user: PropTypes.object,
  userId: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  currentSubTitle: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
};

EditPostItems.defaultProps = {
  currentSubTitle: '',
  user: {},
};

export default EditPostItems;
