/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';

import client from 'api/client';
import cn from 'classnames';
import SvgComment from 'components/icon/Comment';
import SvgHeart from 'components/icon/Heart';
import Imgix from 'components/imgix';
import ModalDiscussion from 'components/modals/discussion';
import PrimaryButton from 'components/ui-elements/button';
import { EVENTS } from 'helpers/amplitudeEvents';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import router from 'next/router';
import PropTypes from 'prop-types';
import * as qs from 'query-string';
import myAmplitude from 'utils/amplitude';
import { LinkCreator } from 'utils/linkCreator';

import DiscussionType from '../discussionType';
import EditPostItems from './editPostItems';
import styles from './styles.module.scss';

const PDFViewer = dynamic(() => import('components/pdfViewer'), {
  ssr: false,
});

const DiscussionCard = (props) => {
  const {
    id,
    logo,
    logoNavigate,
    title,
    category,
    categories,
    img,
    subTitle,
    url,
    btnText,
    user,
    commentsCount,
    likesCount,
    type,
    userId,
    discussions,
    setDiscussions,
  } = props;

  const [showModal, changeShowModal] = useState(false);

  const imgType = img?.slice(-3);
  const ifPdf = imgType === 'pdf' || imgType === 'PDF';
  const openPost = (postId) => {
    const parsed = qs.parse(window.location.search);
    router.push(
      LinkCreator.toQuery({ ...parsed, postId }, '/feed'),
      LinkCreator.toQuery({ ...parsed, postId }, '/feed'),
      {
        scroll: false,
        shallow: true,
      }
    );
    const data = {
      event_type: EVENTS.OPENED_POST,
      event_properties: { postId },
    };
    myAmplitude(data);

    changeShowModal(true);
  };

  const ifVideo = img?.includes('.mp4');

  return (
    <>
      <div className={styles.projectsForYou_card} onClick={() => openPost(id)}>
        <div className={styles.projectsForYou_Top}>
          <Link href={logoNavigate || ''}>
            <a style={{ marginRight: 8 }}>
              <Imgix
                className={styles.projectsForYou_Logo}
                src={logo ? client.UPLOAD_URL + logo : 'https://mangafy.club/img/mangastory.jpg'}
                width={40}
                height={40}
              />
            </a>
          </Link>
          <div className={styles.projectsForYou_Descr}>
            <div className={styles.projectsForYou_Name}>{title}</div>
            <div className={styles.projectsForYou_Category}>
              <DiscussionType type={type} />
              {category && <div className={styles.projectsForYou_Category_Name}>{category}</div>}
              <ul className={styles.projectsForYou_Category_List}>
                {categories?.map((categorie) => (
                  <li key={categorie} className={styles.projectsForYou_Category_List_Item}>
                    <div
                      className={cn(
                        styles.projectsForYou_Category_List_Circle,
                        styles.circle
                      )}></div>
                    <div className={styles.projectsForYou_Category_List_Text}>{categorie}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <EditPostItems
            id={id}
            discussions={discussions}
            setDiscussions={setDiscussions}
            user={user}
            userId={userId}
            img={img}
            subTitle={subTitle}
            categories={categories}
          />
        </div>
        <div
          className={cn(!img && styles.projectsForYou_mainImg, styles.projectsForYou_mainImgDef)}>
          <div className={styles.bgImg}>
            {img &&
              (ifVideo ? (
                <video controls autoPlay muted loop>
                  <source src={`${client.UPLOAD_URL + img}`} type="video/mp4" />
                </video>
              ) : ifPdf ? (
                <PDFViewer url={client.UPLOAD_URL + img} />
              ) : (
                <Imgix
                  className={(!img && styles.defaultBg) || ''}
                  layout="fill"
                  src={`${client.UPLOAD_URL + img}`}
                  alt="MangaFy story"
                />
              ))}
          </div>
          <div className={cn(styles.comments, ifVideo && styles.comments_video)}>
            <div>
              <span>{!!likesCount && likesCount}</span>
              <SvgHeart width="20px" height="17px" />
              <span>{!!commentsCount && commentsCount}</span>
              <SvgComment width="17px" height="17px" />
            </div>
          </div>
          {!!categories && !!categories[0] && img && (
            <span className={cn(!img && styles.cat, styles.catDef)}>{categories[0]}</span>
          )}
        </div>

        <div
          className={cn(!img && styles.projectsForYou_botDesc, styles.projectsForYou_botDescDef)}
          onClick={() => openPost(id)}>
          <span>{subTitle}</span>
          <div
            className={cn(!img && styles.containerButton, styles.containerButtonDef)}
            onClick={(e) => e.stopPropagation()}>
            {/* <div className={styles.}> */}
            <Link href={url || '/'}>
              <a>
                <PrimaryButton
                  text={btnText}
                  suffix={<span style={{ marginLeft: '15px' }}>❯</span>}
                />
              </a>
            </Link>
            {/* </div> */}
            {!img && !!categories[0] && (
              <span className={cn(!img && styles.cat, styles.catDef)}>{categories[0]}</span>
            )}
          </div>
        </div>
      </div>
      <ModalDiscussion
        changeShowModal={changeShowModal}
        showModal={showModal}
        img={img}
        logo={logo}
        title={title}
        user={user}
        postId={id}
        likesCount={likesCount}
        logoNavigate={logoNavigate}
        subTitle={subTitle}
        ifVideo={ifVideo}
        ifPdf={ifPdf}
        id={id}
        discussions={discussions}
        setDiscussions={setDiscussions}
        userId={userId}
        categories={categories}
      />
    </>
  );
};

DiscussionCard.propTypes = {
  id: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string,
  img: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  subTitle: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
  user: PropTypes.object,
  commentsCount: PropTypes.number.isRequired,
  likesCount: PropTypes.number.isRequired,
  logoNavigate: PropTypes.string,
  userId: PropTypes.string,
  discussions: PropTypes.array,
  setDiscussions: PropTypes.func,
};

DiscussionCard.defaultProps = {
  user: null,
  logoNavigate: '',
  category: '',
  userId: '',
  discussions: [],
  setDiscussions: () => {},
};

export default DiscussionCard;
