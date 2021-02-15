import React from 'react';

import Close from '../../components/icon/Close';
import styles from './styles.module.scss';

const CollaborationFilters = ({}) => (
  <>
    <div className={styles.box}>
      <div className={'container'}>
        <div className={styles.box__wrapper}>
          <div className={styles.box__title}>
            <p className={styles.box__title_text}>All collaborations</p>
          </div>
          <button className={styles.box__clear}>
            <span className={styles.box__clear_text}>Clear filters</span>
            <i className={styles.box__clear_icon}>
              <Close width="16" height="16" />
            </i>
          </button>
          <div className={styles.box__filter}>
            <p className={styles.box__filter_title}>Found collaborations</p>
            <span className={styles.box__filter_data}>580</span>
          </div>
        </div>
      </div>
    </div>
  </>
);
export default CollaborationFilters;
