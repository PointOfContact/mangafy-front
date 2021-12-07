import React, { useEffect, useState } from 'react';

import cn from 'classnames';
import СardGenres from 'components/card-genres';
import SVGEnglish from 'components/icon/English';
import SvgPortfolio from 'components/icon/Portfolio';
import Imgix from 'components/imgix';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const ColaborationCards = ({ label, client }) => {
  const [participantsInfo, setParticipantsInfo] = useState([]);

  useEffect(() => {
    const participants = label.participentsInfo.map((value, index) => (
      <div key={value._id + index} className={styles.participantsItem}>
        <Imgix
          width={34}
          height={34}
          src={client.UPLOAD_URL + value.avatar}
          alt="MangaFy participants data"
        />
      </div>
    ));
    setParticipantsInfo(participants);
  }, [label.participentsInfo]);

  return (
    <Link href={`/manga-story/${label._id}`}>
      <a className={styles.colabWrap__item}>
        <div className={styles.colabWrap__top}>
          <div className={cn(styles.avatar__img, styles.avatar__imgOnline)}>
            <div className={styles.avatar__avatar}>
              {label.image ? (
                <Imgix
                  width={47}
                  height={47}
                  layout="fixed"
                  src={client.UPLOAD_URL + label.image}
                  alt="Manga story cover"
                />
              ) : (
                <Imgix
                  width={47}
                  height={47}
                  layout="fixed"
                  src="https://mangafy.club/img/mangastory.webp"
                  alt="Manga story cover"
                />
              )}
            </div>
          </div>
          <div className={styles.colabWrap__name}>
            <p className={styles.colabWrap__authorName}>{label.authorInfo.name}</p>
            <p className={styles.colabWrap__personage}>Creator</p>
            {/* <div className={styles.colabWrap__authorDescr}>{label.searchingFor[0]}</div> */}
          </div>
          <div className={styles.language}>
            <SVGEnglish width={26} height={26} />
            <p>English</p>
          </div>
        </div>
        <p className={styles.colabName}>{label.title}</p>
        <div className={styles.colabWrap__descr}>{label.story}</div>
        <div className={styles.colabWrap__footer}>
          <div className={styles.participantsContainer}>{participantsInfo}</div>
          <div className={styles.colabWrap__bot}>
            <СardGenres genres={label.genres} limit={2} />
            <div className={styles.colabWrap__commision}>
              <SvgPortfolio width="14px" height="14px" />
              {label.compensationModel === 'paid' ? 'Commission' : 'Collaboration'}
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

ColaborationCards.propTypes = {
  label: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
};
export default ColaborationCards;
