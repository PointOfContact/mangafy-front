import React, { useState } from 'react';

import client from 'api/client';
import cn from 'classnames';
import SvgComment from 'components/icon/Comment';
import SvgHeart from 'components/icon/Heart';
import Imgix from 'components/imgix';
import ModalDiscussion from 'components/modals/discussion';
import PrimaryButton from 'components/ui-elements/button';
import { EVENTS } from 'helpers/amplitudeEvents';
import Link from 'next/link';
import Router from 'next/router';
import PropTypes from 'prop-types';
import * as qs from 'query-string';
import myAmplitude from 'utils/amplitude';
import { LinkCreator } from 'utils/linkCreator';

import DiscussionType from '../discussionType';
import styles from './styles.module.scss';

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
  } = props;

  const [showModal, changeShowModal] = useState(false);

  const openPost = (postId) => {
    const parsed = qs.parse(window.location.search);
    Router.push(
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
      user_id: user?._id,
      user_properties: {
        ...user,
      },
    };
    myAmplitude(data);

    changeShowModal(true);
  };

  const ifVideo = img?.includes('youtube');

  return (
    <>
      <div className={styles.projectsForYou_card} onClick={() => openPost(id)}>
        <div className={styles.projectsForYou_Top}>
          <Link href={logoNavigate}>
            <a>
              <div
                className={styles.projectsForYou_Logo}
                style={{
                  backgroundImage: `url(${
                    logo ? client.UPLOAD_URL + logo : '/img/mangastory.jpg'
                  })`,
                }}></div>
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
        </div>
        <div
          className={cn(!img && styles.projectsForYou_mainImg, styles.projectsForYou_mainImgDef)}>
          <div className={styles.bgImg}>
            {img &&
              (ifVideo ? (
                <iframe
                  loading="lazy"
                  className={styles.postVideo}
                  src={`${img}?autoplay=1&mute=1&controls=0&playlist=RBolDaIdg5M&loop=1&autopause=0`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen></iframe>
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
          <div className={styles.containerButton}>
            <Link href={url || '/'}>
              <a>
                <PrimaryButton
                  text={btnText}
                  suffix={<span style={{ marginLeft: '15px' }}>❯</span>}
                />
              </a>
            </Link>
            {!img && <span className={cn(!img && styles.cat, styles.catDef)}>{categories[0]}</span>}
          </div>
        </div>
      </div>
      <ModalDiscussion
        changeShowModal={changeShowModal}
        showModal={showModal}
        url={url}
        img={img}
        logo={logo}
        title={title}
        user={user}
        postId={id}
        likesCount={likesCount}
        logoNavigate={logoNavigate}
        subTitle={subTitle}
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
};

DiscussionCard.defaultProps = {
  user: null,
  logoNavigate: '',
  category: '',
};

export default DiscussionCard;
