import React, { useEffect, useState } from 'react';

import cn from 'classnames';
import СardGenres from 'components/card-genres';
import Imgix from 'components/imgix';
import Avatar from 'components/ui-elements/avatar';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const ColaborationCards = ({ label, client }) => {
  const [participantsInfo, setParticipantsInfo] = useState([]);
  const [publishChapter, setPublishChapter] = useState(false);

  useEffect(() => {
    const publishedChapter = label?.storyBoards[0]?.chapters?.some((value) => value.published);
    setPublishChapter(publishedChapter);
  }, []);

  useEffect(() => {
    const participants = label.participentsInfo.map((value, index) => {
      if (index <= 6) {
        return (
          <div key={value._id + index} className={styles.participantsItem}>
            <Imgix
              width={34}
              height={34}
              src={client.UPLOAD_URL + value.avatar}
              alt="MangaFy participants data"
            />
          </div>
        );
      }
      return <></>;
    });
    setParticipantsInfo(participants);
  }, [label.participentsInfo]);

  return (
    <Link href={`/manga-story/${label._id}`}>
      <a className={styles.colabWrap__item}>
        <div className={styles.colabWrap__top}>
          <div className={cn(styles.avatar__img, styles.avatar__imgOnline)}>
            <div className={styles.avatar__avatar}>
              {label.authorInfo.avatar ? (
                <Imgix
                  width={47}
                  height={47}
                  layout="fixed"
                  src={client.UPLOAD_URL + label.authorInfo.avatar}
                  alt="Manga story cover"
                />
              ) : (
                <Avatar text={label.authorInfo.name} fontSize={20} />
              )}
            </div>
          </div>
          <div className={styles.colabWrap__name}>
            <p className={styles.colabWrap__authorName}>{label.authorInfo.name}</p>
            <p className={styles.colabWrap__personage}>Creator</p>
            {/* <div className={styles.colabWrap__authorDescr}>{label.searchingFor[0]}</div> */}
          </div>
          <div className={styles.language}>
            {/* <SVGEnglish width={26} height={26} /> */}
            <p>{label.preferredLanguage}</p>
          </div>
        </div>
        <p className={styles.colabName}>{label.title}</p>
        <div className={styles.colabWrap__descr}>{label.story}</div>
        <div className={styles.colabWrap__footer}>
          <div className={styles.participantsContainer}>
            {participantsInfo}
            {label?.participentsInfo?.length ? (
              <span>{label?.participentsInfo?.length} participants</span>
            ) : (
              ''
            )}
          </div>
          <div className={styles.colabWrap__bot}>
            <СardGenres genres={label.genres} limit={2} />
            <div className={styles.colabWrap__publish}>
              {publishChapter ? 'Published' : 'No Published'}
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
