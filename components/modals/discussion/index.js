/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';

import { Modal, notification, Popover } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import SvgClose from 'components/icon/Close';
import SvgHeart from 'components/icon/Heart';
import SvgShare from 'components/icon/Share';
import Imgix from 'components/imgix';
import Loading from 'components/loading';
import { ShareButtons } from 'components/share';
import { Comments } from 'components/type-content/comments';
import EditPostItems from 'components/type-content/discussionCard/editPostItems';
import { EVENTS } from 'helpers/amplitudeEvents';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import * as qs from 'query-string';
import myAmplitude from 'utils/amplitude';
import { LinkCreator } from 'utils/linkCreator';

import styles from './styles.module.scss';

const PDFViewer = dynamic(() => import('components/pdfViewer'), {
  ssr: false,
});

const ModalDiscussion = ({
  changeShowModal,
  showModal,
  user,
  postId,
  title,
  logo,
  img,
  likesCount,
  logoNavigate,
  subTitle,
  ifVideo,
  ifPdf,
  id,
  discussions,
  setDiscussions,
  userId,
  categories,
  likesData,
  setLikesData,
}) => {
  const [commentsData, setCommentsData] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [photoProject, setPhotoProject] = useState(img);
  const [logoProject, setLogoProject] = useState(client.UPLOAD_URL + logo);
  const [loading, setLoading] = useState('');
  const [subTitleData, setSubTitleData] = useState('');

  const router = useRouter();

  useEffect(() => {
    if (showModal) {
      getPost();
    }
  }, [postId, showModal]);

  const getPost = async () => {
    setLoading(true);
    const post = await client.service('api/v2/posts').get(postId);
    setLogoProject(client.UPLOAD_URL + post.logoUrl);
    setPhotoProject(post.imageUrl);
    setSubTitleData(post.subTitle);
    setLoading(false);
    setLikesData(post.likes.data);
    setCommentsData(post.comments.data);
    post.likes.data.find((item) => item.senderId === user?._id) && setIsLiked(true);
  };

  const handleLike = () => {
    if (!user) {
      Router.push(`/sign-in?postId=${postId}`);
      return;
    }

    if (isLiked) {
      return;
    }

    setIsLiked(true);

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
        .then((res) => {
          const eventData = [
            {
              event_type: EVENTS.POST_LIKE,
              event_properties: { postLike: res._id, postId: res.postId },
            },
          ];
          myAmplitude(eventData);
          setLikesData([...likesData, { ...res }]);
        })
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
    Router.push(
      LinkCreator.toQuery({ ...parsed }, '/feed'),
      LinkCreator.toQuery({ ...parsed }, '/feed'),
      {
        scroll: false,
        shallow: true,
      }
    );
    changeShowModal(false);
  };

  const setPhotoOrLogo = (ifValidPhoto, photo, sizeImg, ifPhoto) => {
    // TODO
    const validPhoto =
      photo.includes('png') ||
      photo.includes('jpg') ||
      photo.includes('webp') ||
      photo.includes('jpeg');

    return validPhoto ? (
      <Imgix
        layout="intrinsic"
        width={sizeImg}
        height={sizeImg}
        src={photo}
        alt="MangaFy manga story"
      />
    ) : (
      ifPhoto && (
        <Imgix
          width={sizeImg}
          height={sizeImg}
          layout="intrinsic"
          src={'https://mangafy.club/img/mangastory.webp'}
          alt="MangaFy manga story default"
        />
      )
    );
  };

  return loading ? (
    <Loading />
  ) : (
    <Modal
      className={styles.modal}
      title={''}
      footer={null}
      style={{ minWidth: '95%', maxWidth: '1200px', marginTop: '20px' }}
      visible={showModal}
      closeIcon={
        <span className={styles.close}>
          <SvgClose />
        </span>
      }
      okText="Send"
      onCancel={handleCancel}
    >
      <div className={styles.modalContent}>
        <div className="container">
          <div className="ant-row">
            <div className="ant-col-md-16 ant-col-xs-24">
              <div className={styles.br}>
                <div className={styles.info}>
                  <spam className={styles.logo}>
                    <Link href={logoNavigate}>
                      <a>
                        <span>{setPhotoOrLogo(logoProject, logoProject, 54, true)}</span>
                      </a>
                    </Link>
                    <h2 className={styles.subtitle}>{title}</h2>
                  </spam>
                  <div className={styles.share}>
                    <span className={styles.like}>
                      <span>
                        {(!!likesData.length && likesData.length) || (!!likesCount && likesCount)}
                      </span>
                      <SvgHeart
                        width="26px"
                        height="22px"
                        onClick={handleLike}
                        className={isLiked && styles.isLiked}
                      />
                    </span>
                    <EditPostItems
                      id={id}
                      discussions={discussions}
                      setDiscussions={setDiscussions}
                      user={user}
                      userId={userId}
                      img={img}
                      subTitle={subTitle}
                      categories={categories}
                      className={styles.shareIcon}
                      changeRouter={false}
                    />
                    <Popover
                      placement="bottomRight"
                      title={''}
                      content={
                        <ShareButtons shareUrl={`${client.API_ENDPOINT}${router.asPath}`} text="" />
                      }
                      trigger="click"
                    >
                      <SvgShare className={styles.iconShare} width="20px" height="20px" />
                    </Popover>
                  </div>
                </div>
                <div className={!photoProject && styles.containerPhoto}>
                  <div className={cn(!photoProject && styles.img, styles.imgDef)}>
                    {ifVideo ? (
                      <video
                        controls="true"
                        autoPlay
                        muted
                        loop
                        playsInline
                        poster="https://mangafy.club/api/v2/uploads/1645708912743-980848197-istockphoto-1017890344-170667a.jpg"
                      >
                        <source src={`${client.UPLOAD_URL + img}`} type="video/mp4" />
                      </video>
                    ) : ifPdf ? (
                      <PDFViewer url={client.UPLOAD_URL + img} />
                    ) : (
                      setPhotoOrLogo(photoProject, client.UPLOAD_URL + photoProject, 1000, false)
                    )}
                  </div>
                  <p className={cn(!photoProject && styles.description, styles.descriptionDef)}>
                    {subTitle || subTitleData}
                  </p>
                </div>
              </div>
            </div>
            <div className="ant-col-md-8 ant-col-xs-24">
              <h2 className={styles.subtitle}>
                {!!commentsData.length && commentsData.length} Comments
              </h2>
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
  logo: PropTypes.string,
  img: PropTypes.string,
  url: PropTypes.string,
  likesCount: PropTypes.number,
  commentsData: PropTypes.array,
  user: PropTypes.object,
  logoNavigate: PropTypes.string,
  subTitle: PropTypes.string,
  ifVideo: PropTypes.bool,
  ifPdf: PropTypes.bool,
  id: PropTypes.string,
  categories: PropTypes.array,
  userId: PropTypes.string,
  discussions: PropTypes.array,
  setDiscussions: PropTypes.func,
  likesData: PropTypes.array.isRequired,
  setLikesData: PropTypes.func.isRequired,
};

ModalDiscussion.defaultProps = {
  user: null,
  img: null,
  logoNavigate: '',
  commentsData: [],
  likesCount: 0,
  ifPdf: false,
  logo: '',
  discussions: [],
  userId: '',
  categories: [],
  setDiscussions: () => {},
  id: '',
  subTitle: '',
  ifVideo: true,
  url: '',
};
