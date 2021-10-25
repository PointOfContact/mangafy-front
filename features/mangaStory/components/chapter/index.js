import React, { useState } from 'react';

import { notification } from 'antd';
import client from 'api/client';
import SvgAdd from 'components/icon/Add';
import AddButton from 'components/ui-elements/add-button';
import PrimaryButton from 'components/ui-elements/button';
import PropTypes from 'prop-types';

import Pages from './pages';
import styles from './styles.module.scss';

const Chapter = ({ pages, storyBoard }) => {
  const [chapters, setChapters] = useState([]);

  const chaptersApi = () => {
    const jwt = client.getCookie('feathers-jwt');

    // eslint-disable-next-line import/extensions
    import('../../../../api/restClient').then((m) => {
      const data = {
        title: `Chapter ${chapters[chapters.length - 1].order + 1}`,
        storyBoard: storyBoard?._id,
      };

      m.default
        .service('/api/v2/chapters')
        .create(data, {
          headers: { Authorization: `Bearer ${jwt}` },
          mode: 'no-cors',
        })
        .then((res) => {
          console.log(res, 5555);
          setChapters([...chapters, res.data]);
        })
        .catch((err) => {
          notification.error({
            message: err.message,
            placement: 'bottomLeft',
          });
          return err;
        });
    });
  };

  const createChapters = chapters.map((value) => (
    <div key={value._id} className={styles.chapterContainer}>
      <div className={styles.addPageContainer}>
        <h2 className={styles.chapterTitle}>Chapter 1</h2>
        <div className={styles.addPage}>
          <h3>New Page</h3>
          <SvgAdd width={50} height={50} />
        </div>
      </div>
      <Pages pages={pages} />
    </div>
  ));

  return (
    <div className={styles.container}>
      <div className={styles.selectContainer}>
        <PrimaryButton className={styles.published} isWhite={true} text={'Published'} />
        <PrimaryButton isWhite={true} text={'Last modified'} />
      </div>
      {/* <div className={styles.chapterContainer}>
        <div className={styles.addPageContainer}>
          <h2 className={styles.chapterTitle}>Chapter 1</h2>
          <div className={styles.addPage}>
            <h3>New Page</h3>
            <SvgAdd width={50} height={50} />
          </div>
        </div>
        <Pages pages={pages} />
      </div> */}
      {createChapters}
      <AddButton
        className={styles.addChapter}
        onClick={() => {
          chaptersApi;
        }}
        text={'Add Chapter'}
      />
    </div>
  );
};

Chapter.propTypes = {
  pages: PropTypes.array.isRequired,
  storyBoard: PropTypes.object.isRequired,
};

export default Chapter;
