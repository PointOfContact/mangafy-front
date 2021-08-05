import React from 'react';

import Card from 'components/card';
import Imgix from 'components/imgix';
import PropTypes from 'prop-types';

import styles from '../styles.module.scss';

const IfNotGeneres = ({ userGenres, setStoryEditMode }) =>
  !userGenres?.length && (
    <div className={styles.card}>
      <h3 className={styles.sub_title}>Genres</h3>
      <Card
        description="Select 3 categories that best </br> describe your art"
        btnText="Choose 3 categories"
        items={[
          <Imgix
            key="1"
            width={187}
            height={140}
            layout="fixed"
            src="https://mangafy.club/img/NovelType.webp"
            alt="MangaFy novel"
          />,
        ]}
        onClick={() => setStoryEditMode(true)}
      />
    </div>
  );

IfNotGeneres.propTypes = {
  userGenres: PropTypes.array.isRequired,
  setStoryEditMode: PropTypes.func.isRequired,
};

export default IfNotGeneres;
