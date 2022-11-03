/* eslint-disable react/display-name */
import React, { useState } from 'react';
import styles from './styles.module.scss';
import PropTypes from 'prop-types';
import ViewScroll from './ViewScroll';
import BookView from './BookView';

const MangaBody = ({ images, className, readStyle, setRef, refBook, setConutPage }) => {
  return readStyle ? (
    <BookView images={images} setRef={setRef} refBook={refBook} setConutPage={setConutPage} />
  ) : (
    <ViewScroll images={images} />
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
