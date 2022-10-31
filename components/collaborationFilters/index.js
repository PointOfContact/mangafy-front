import React from 'react';

import cn from 'classnames';

import Close from '../icon/Close';
import SvgFiltr from '../icon/Filter';
import styles from './styles.module.scss';

const CollaborationFilters = ({}) => (
  <>
    <div className={styles.box}>
      <div className={'container'}>
        <div className={styles.box__wrapper}>
          <button
            id="collaborationFilterId"
            className={cn(styles.box__toggle, styles.box__toggle_active)}
          >
            <SvgFiltr width="22" height="16" />
          </button>
          <button
            id="collaborationFilterAllId"
            className={cn(styles.box__all, styles.box__all_active)}
          >
            All
          </button>
          <div className={styles.box__title}>
            <p className={styles.box__title_text}>All collaborations</p>
          </div>
          <button id="collaborationClearFiltersId" className={styles.box__clear}>
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
