/* eslint-disable react/display-name */
import React, { useState } from 'react';
import styles from './styles.module.scss';
import PropTypes from 'prop-types';
import ViewScroll from './ViewScroll';
import BookView from './BookView';
import ChangeViewTab from 'features/shotPage/changeViewTab';

const MangaBody = ({
  images,
  className,
  readStyle,
  setRef,
  refBook,
  setConutPage,
  conutPage,
  chapter,
  setReadStyle,
}) => {
  return (
    <div className={styles.mangaBody}>
      {/* {readStyle ? (
        <BookView images={images} refBook={refBook} setConutPage={setConutPage} />
      ) : ( */}
      <ViewScroll images={images} />
      {/* )} */}
      {/* <ChangeViewTab
        conutPage={conutPage}
        chapter={chapter}
        refBook={refBook}
        readStyle={readStyle}
        setConutPage={setConutPage}
        setReadStyle={setReadStyle}
      /> */}
    </div>
  );
};

MangaBody.propTypes = {
  images: PropTypes.array.isRequired,
  className: PropTypes.string,
  readStyle: PropTypes.bool.isRequired,
  setRef: PropTypes.func.isRequired,
  setConutPage: PropTypes.func.isRequired,
  refBook: PropTypes.object,
};

MangaBody.defaultProps = {
  className: '',
  refBook: null,
};

export default MangaBody;
