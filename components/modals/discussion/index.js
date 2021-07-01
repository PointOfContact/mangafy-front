import React, { useEffect, useState } from 'react';

import { Modal, notification, Popover } from 'antd';
import client from 'api/client';
import SvgClose from 'components/icon/Close';
import SvgHeart from 'components/icon/Heart';
import SvgShareColored from 'components/icon/ShareColored';
import Imgix from 'components/imgix';
import { ShareButtons } from 'components/share';
import { Comments } from 'components/type-content/comments';
import Link from 'next/link';
import Router from 'next/router';
import PropTypes from 'prop-types';
import * as qs from 'query-string';
import { LinkCreator } from 'utils/linkCreator';

import styles from './styles.module.scss';

const ModalDiscussion = ({
  changeShowModal,
  showModal,
  user,
  postId,
  title,
  logo,
  img,
  url,
  likesCount,
  logoNavigate,
}) => {
  const [commentsData, setCommentsData] = useState([]);
  const [likesData, setLikesData] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (showModal) {
      getPost();
    }
  }, [postId, showModal]);

  const getPost = async () => {
    const post = await client.service('api/v2/posts').get(postId);
    setLikesData(post.likes.data);
    setCommentsData(post.comments.data);
    post.likes.data.find((item) => item.senderId === user?._id) && setIsLiked(true);
  };

  const handleLike = () => {
    if (!user) {
      Router.push(`/sign-in`);
      return;
    }

    if (isLiked) {
      return;
    }

    const jwt = client.getCookie('feathers-jwt');
    import('api/restClient').then((m) => {
      m.default
        .service('/api/v2/post-likes')
        .create(
          {
            postId,
          },
          {
            headers: { Authorization: `Bearer ${jwt}` },
            mode: 'no-cors',
          }
        )
        .then((res) => setLikesData([...likesData, { ...res }]), setIsLiked(true))
        .catch((err) => {
          openNotification('error', err.message);
        });
    });
  };

  const openNotification = (type, message, description = '') => {
    notification[type]({
      message,
      description,
      placement: 'bottomLeft',
    });
  };

  const handleCancel = () => {
    const parsed = qs.parse(window.location.search);
    delete parsed.postId;
    Router.push(LinkCreator.toQuery({ ...parsed }, '/'), LinkCreator.toQuery({ ...parsed }, '/'), {
      scroll: false,
    });
    changeShowModal(false);
  };

  return (
    <Modal
      className={styles.modal}
      title={''}
      footer={null}
      style={{ minWidth: '95%', maxWidth: '1200px', marginTop: '20px' }}
      visible={showModal}
      closeIcon={<SvgClose height="18px" width="18px" />}
      okText="Send"
      onCancel={handleCancel}>
      <div className={styles.modalContent}>
        <div className="container">
          <div className="ant-row">
            <div className="ant-col-md-16 ant-col-xs-24">
              <div className={styles.br}>
                <div className={styles.info}>
                  <spam className={styles.logo}>
                    <Link href={logoNavigate}>
                      <a>
                        <span>
                          {logo ? (
                            <Imgix
                              width={54}
                              height={54}
                              src={client.UPLOAD_URL + logo}
                              layout="intrinsic"
                            />
                          ) : (
                            <Imgix
                              width={54}
                              height={54}
                              layout="intrinsic"
                              src={'https://mangafy.club/img/mangastory.webp'}
                            />
                          )}
                        </span>
                      </a>
                    </Link>
                    <h2 className={styles.subtitle}>{title}</h2>
                  </spam>
                  <div className={styles.share}>
                    <span className={styles.like}>
                      <span>{likesData.length || likesCount}</span>
                      <SvgHeart
                        width="25px"
                        height="22px"
                        onClick={handleLike}
                        className={isLiked && styles.isLiked}
                      />
                    </span>
                    <Popover
                      placement="bottomRight"
                      title={''}
                      content={<ShareButtons shareUrl={`https://mangafy.club${url}`} text="" />}
                      trigger="click">
                      <SvgShareColored width="25px" height="25px" />
                    </Popover>
                  </div>
                </div>
                <div className={styles.img}>
                  {img ? (
                    <Imgix width={1000} height={1000} src={client.UPLOAD_URL + img} />
                  ) : (
                    <Imgix
                      width={800}
                      height={600}
                      src={'https://mangafy.club/img/mangastory.webp'}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="ant-col-md-8 ant-col-xs-24">
              <h2 className={styles.subtitle}>{commentsData.length} Comments</h2>
              <Comments
                user={user}
                commentsData={commentsData}
                postId={postId}
                setCommentsData={setCommentsData}
              />
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
  logo: PropTypes.string.isRequired,
  img: PropTypes.string,
  url: PropTypes.string.isRequired,
  likesCount: PropTypes.number,
  commentsData: PropTypes.array,
  user: PropTypes.object,
  logoNavigate: PropTypes.string,
};

ModalDiscussion.defaultProps = {
  user: null,
  img: null,
  logoNavigate: '',
  commentsData: [],
  likesCount: 0,
};
