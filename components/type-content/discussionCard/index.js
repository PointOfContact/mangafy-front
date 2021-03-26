import React from 'react';

import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const DiscussionCard = (props) => {
  const { logo, title, category, type, img, description } = props;
  return (
    <>
      <div className={styles.projectsForYou_Card}>
        <div className={styles.projectsForYou_Top}>
          <div
            className={styles.projectsForYou_Logo}
            style={{ backgroundImage: `url(${logo})` }}></div>
          <div className={styles.projectsForYou_Descr}>
            <div className={styles.projectsForYou_Name}>{title}</div>
            <div className={styles.projectsForYou_Category}>
              <div className={styles.projectsForYou_Category_Name}>{category}</div>
              <ul className={styles.projectsForYou_Category_List}>
                <li className={styles.projectsForYou_Category_List_Item}>
                  <div className={styles.projectsForYou_Category_List_Circle}></div>
                  <div className={styles.projectsForYou_Category_List_Text}>{type}</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className={styles.projectsForYou_MainImg}
          style={{ backgroundImage: `url(${img})` }}></div>
        <div className={styles.projectsForYou_BotDescr}>{description}</div>
      </div>
    </>
  );
};

DiscussionCard.propTypes = {
  logo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

DiscussionCard.defaultProps = {};

export default DiscussionCard;
