/* eslint-disable react/display-name */
import React, { useState } from 'react';
import styles from './styles.module.scss';
import PropTypes from 'prop-types';
import ViewScroll from './ViewScroll';
import BookView from './BookView';

const MangaBody = ({ images, className, readStyle }) => {
  const [ref, setRef] = useState();

  return readStyle ? <BookView images={images} /> : <ViewScroll images={images} />;
};

MangaBody.propTypes = {
  images: PropTypes.array.isRequired,
  className: PropTypes.string,
  readStyle: PropTypes.bool.isRequired,
};

MangaBody.defaultProps = {
  className: '',
};

export default MangaBody;
