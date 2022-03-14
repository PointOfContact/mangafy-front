import React, { useEffect, useState } from 'react';

import cn from 'classnames';
import СardGenres from 'components/card-genres';
import Imgix from 'components/imgix';
import Avatar from 'components/ui-elements/avatar';
import { EVENTS } from 'helpers/amplitudeEvents';
import Link from 'next/link';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';

import ChapterContent from './chapterContent';
import styles from './styles.module.scss';

const CollaborationCards = ({ label, client }) => {
  const [participantsInfo, setParticipantsInfo] = useState([]);
  const [createdDate, setCreatedDate] = useState('');

  useEffect(() => {
    const date = label.createdAt.substring(0, 10);
    setCreatedDate(date);
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

  const navigateToManga = () => {
    const eventData = [
      {
        event_type: EVENTS.OPENED_MANGA_STORY,
        event_properties: { mangaStoryId: label._id, from: 'Collabs page' },
      },
    ];
    myAmplitude(eventData);
  };

  return (
    <Link href={`/manga-story/${label._id}`}>
      <a className={styles.colabWrap__item} onClick={navigateToManga}>
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
            <p>{createdDate}</p>
          </div>
        </div>
        <p className={styles.colabName}>{label.title}</p>
        <div
          className={styles.colabWrap__descr}
          dangerouslySetInnerHTML={{
            __html: label.story,
          }}
        />
        <div className={styles.colabWrap__footer}>
          <div className={styles.participantsContainer}>
            {participantsInfo}
            {!!label?.participentsInfo?.length && (
              <span>{label?.participentsInfo?.length} participants</span>
            )}
          </div>
          <div className={styles.colabWrap__bot}>
            <div>
              Genres:
              <СardGenres
                title={'More Genres'}
                subTitle={'💪 fan of all genres'}
                genres={label.genres}
                limit={2}
              />
            </div>
            <div>
              Goal:
              <СardGenres
                title={'More Types'}
                subTitle={'💪 fan of all types'}
                genres={!!label?.projectType && [label?.projectType].map((val) => ({ name: val }))}
                limit={2}
              />
            </div>
          </div>
          <ChapterContent label={label} />
        </div>
      </a>
    </Link>
  );
};

CollaborationCards.propTypes = {
  label: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
};
export default CollaborationCards;
