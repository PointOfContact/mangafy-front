import React from 'react';

import cn from 'classnames';
import SvgAdd2 from 'components/icon/Add2';
import Imgix from 'components/imgix';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const AddHeroCard = ({
  imgWidth,
  imgHeight,
  addHero,
  heroTypes,
  getAllowCreate,
  title,
  img,
  ifValidCards,
}) => (
  <div className={ifValidCards ? styles.container : styles.containerTwo}>
    <div
      className={cn(
        ifValidCards ? styles.addButton : styles.addButtonTwo,
        !getAllowCreate(heroTypes) ? styles.disabled : ''
      )}
      onClick={() => addHero(heroTypes)}>
      <SvgAdd2 width="31px" height="31px" />
      <p className={styles.addButtonText}>{title}</p>
    </div>

    {img && (
      <div className={styles.showImage}>
        <Imgix
          width={imgWidth}
          height={imgHeight}
          src={`https://mangafy.club/img/${img}`}
          alt="MangaFy icon"
        />
      </div>
    )}
  </div>
);

AddHeroCard.propTypes = {
  imgWidth: PropTypes.number,
  imgHeight: PropTypes.number,
  addHero: PropTypes.func,
  heroTypes: PropTypes.object,
  getAllowCreate: PropTypes.func,
  title: PropTypes.string,
  img: PropTypes.string,
  ifValidCards: PropTypes.bool,
};

AddHeroCard.defaultProps = {
  imgWidth: 200,
  imgHeight: 200,
  addHero: () => {},
  heroTypes: {},
  getAllowCreate: () => {},
  title: '',
  img: null,
  ifValidCards: false,
};

export default AddHeroCard;
