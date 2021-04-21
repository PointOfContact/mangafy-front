import React from 'react';

import cn from 'classnames';
import MenuNotificationsBox from 'components/menu-notifications-box';

import styles from './styles.module.scss';

const headerNotification = ({}) => (
  <>
    <div className={cn(styles.box, styles.box_position_center, styles.box_width_223)}>
      <div className={styles.box__notifications}>
        <MenuNotificationsBox />
      </div>
    </div>
  </>
);

export default headerNotification;
