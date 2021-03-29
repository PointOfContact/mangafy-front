import React from 'react';

import cn from 'classnames';
import SvgPortfolio from 'components/icon/Portfolio';
import Imgix from 'components/imgix';
import Link from 'next/link';
import PropTypes from 'prop-types';

import ButtonColab from './buttonColab';
import styles from './styles.module.scss';

const ColaborationCards = ({ label, client }) => (
  <Link href={`/manga-story/${label._id}`}>
    <a className={styles.colabWrap__item}>
      <div className={styles.colabWrap__top}>
        <div className={cn(styles.avatar__img, styles.avatar__imgOnline)}>
          <div className={styles.avatar__avatar}>
            {label.image ? (
              <Imgix
                width={104}
                height={104}
                layout="fixed"
                src={client.UPLOAD_URL + label.image}
                alt="Manga story cover"
              />
            ) : (
              <img width={104} height={104} src={'/img/mangastory.webp'} />
            )}
          </div>
        </div>
        <div className={styles.colabWrap__name}>
          <div className={styles.colabWrap__authorName}>{label.title}</div>
          <div className={styles.colabWrap__authorDescr}>{label.searchingFor[0]}</div>
        </div>
      </div>
      <div className={styles.colabWrap__descr}>{label.story}</div>
      <div className={styles.colabWrap__buttons}>
        {label.genres.length ? (
          label.genres.map((item) => (
            <ButtonColab key={item._id} className={cn(styles.ButtonPurple)} text={item.name} />
          ))
        ) : (
          <ButtonColab className={cn(styles.ButtonWhite)} text={'💪 fan of all genres'} />
        )}
      </div>
      <div className={styles.colabWrap__bot}>
        <div className={styles.colabWrap__commision}>
          <SvgPortfolio width="14px" height="14px" />
          {label.compensationModel == 'paid' ? 'Commission' : 'Collaboration'}
        </div>
      </div>
    </a>
  </Link>
);

ColaborationCards.propTypes = {
  label: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
};
export default ColaborationCards;
