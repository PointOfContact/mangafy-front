import React from 'react';

import styles from './styles.module.scss';

const menuNotificationsItem = ({}) => (
  <>
    <div className={styles.box}>
      <div className={styles.box__img}>
        <img src="img/menu-notifications-item-user.png" alt="" />
      </div>
      <div className={styles.box__content}>
        <div className={styles.box__title_wrap}>
          <div className={styles.box__title}>
            <p className={styles.box__title_text}>Autor Name</p>
          </div>
          <div className={styles.box__description}>
            <p className={styles.box__description_text}>appreciated your project</p>
          </div>
        </div>
        <div className={styles.box__post}>
          <img src="img/menu-notifications-item-preview.jpg" alt="" />
        </div>
        <div className={styles.box__date}>
          <p className={styles.box__date_text}>3 months ago</p>
        </div>
      </div>
    </div>
  </>
);

export default menuNotificationsItem;
