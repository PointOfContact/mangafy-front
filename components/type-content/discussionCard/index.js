import React, { useState } from 'react';

import client from 'api/client';
import SvgComment from 'components/icon/Comment';
import SvgHeart from 'components/icon/Heart';
import ModalDiscussion from 'components/modals/discussion';
import PrimaryButton from 'components/ui-elements/button';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const DiscussionCard = (props) => {
  const {
    id,
    logo,
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
  } = props;
  const [showModal, changeShowModal] = useState(false);

  return (
    <>
      <div className={styles.projectsForYou_Card}>
        <div className={styles.projectsForYou_Top}>
          <div
            className={styles.projectsForYou_Logo}
            style={{
              backgroundImage: `url(${logo ? client.UPLOAD_URL + logo : '/img/mangastory.jpg'})`,
            }}></div>
          <div className={styles.projectsForYou_Descr}>
            <div className={styles.projectsForYou_Name}>{title}</div>
            <div className={styles.projectsForYou_Category}>
              {category && <div className={styles.projectsForYou_Category_Name}>{category}</div>}
              <ul className={styles.projectsForYou_Category_List}>
                {categories?.map((categorie) => (
                  <li key={categorie} className={styles.projectsForYou_Category_List_Item}>
                    <div className={styles.projectsForYou_Category_List_Circle}></div>
                    <div className={styles.projectsForYou_Category_List_Text}>{categorie}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div
          onClick={() => changeShowModal(true)}
          className={styles.projectsForYou_MainImg}
          style={{
            backgroundImage: `url(${img ? client.UPLOAD_URL + img : '/img/mangastory.jpg'})`,
          }}>
          <div className={styles.comments}>
            <div>
              <span>{likesCount}</span>
              <SvgHeart width="20px" height="17px" />
              <span>{commentsCount}</span>
              <SvgComment width="17px" height="17px" />
            </div>
          </div>
          <span className={styles.cat}>{categories && categories[0]}</span>
        </div>

        <div className={styles.projectsForYou_BotDescr}>
          <span>{subTitle}</span>
          <Link href={url || '/'}>
            <a>
              <PrimaryButton
                text={btnText}
                suffix={<span style={{ marginLeft: '15px' }}>❯</span>}
              />
            </a>
          </Link>
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
      />
    </>
  );
};

DiscussionCard.propTypes = {
  id: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  categories: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
  user: PropTypes.object,
  commentsCount: PropTypes.number.isRequired,
  likesCount: PropTypes.number.isRequired,
};

DiscussionCard.defaultProps = {
  user: null,
};

export default DiscussionCard;
