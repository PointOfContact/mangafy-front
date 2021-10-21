import React from 'react';

import SvgAdd from 'components/icon/Add';
import AddButton from 'components/ui-elements/add-button';
import PrimaryButton from 'components/ui-elements/button';
import PropTypes from 'prop-types';

import Pages from './pages';
import styles from './styles.module.scss';

const Chapter = ({ pages }) => {
  console.log('Chapter');
  return (
    <div className={styles.container}>
      <div className={styles.selectContainer}>
        <PrimaryButton className={styles.published} isWhite={true} text={'Published'} />
        <PrimaryButton isWhite={true} text={'Last modified'} />
      </div>
      <div className={styles.chapterContainer}>
        <div className={styles.addPageContainer}>
          <h2 className={styles.chapterTitle}>Chapter 1</h2>
          <div className={styles.addPage}>
            <h3>New Page</h3>
            <SvgAdd width={50} height={50} />
          </div>
        </div>
        <Pages pages={pages} />
      </div>
      <AddButton className={styles.addChapter} onClick={() => {}} text={'Add Chapter'} />
    </div>
  );
};

Chapter.propTypes = {
  pages: PropTypes.array.isRequired,
};

export default Chapter;
