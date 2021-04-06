import React from 'react';

import client from 'api/client';
import SvgComment from 'components/icon/Comment';
import SvgHeart from 'components/icon/Heart';
import PrimaryButton from 'components/ui-elements/button';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const DiscussionCard = (props) => {
  const { logo, title, category, categories, img, description, url, btnText } = props;
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
              <div className={styles.projectsForYou_Category_Name}>{category}</div>
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
        <Link href={url || '/'}>
          <a>
            <div
              className={styles.projectsForYou_MainImg}
              style={{
                backgroundImage: `url(${img ? client.UPLOAD_URL + img : '/img/mangastory.jpg'})`,
              }}>
              <div className={styles.comments}>
                <div>
                  <span>0</span>
                  <SvgHeart width="17px" height="17px" />
                  <span>0</span>
                  <SvgComment width="17px" height="17px" />
                </div>
              </div>
              <span className={styles.cat}>{categories && categories[0]}</span>
            </div>
          </a>
        </Link>

        <div className={styles.projectsForYou_BotDescr}>
          <span>{description}</span>
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
    </>
  );
};

DiscussionCard.propTypes = {
  logo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  categories: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
};

DiscussionCard.defaultProps = {};

export default DiscussionCard;
