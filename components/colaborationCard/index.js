import React, { useEffect, useState } from 'react';
import СardGenres from 'components/card-genres';
import Imgix from 'components/imgix';
import { EVENTS } from 'helpers/amplitudeEvents';
import Link from 'next/link';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';
import ChapterContent from './chapterContent';
import styles from './styles.module.scss';
import client from 'api/client';

const CollaborationCards = ({ label, client, href }) => {
  const [participantsInfo, setParticipantsInfo] = useState([]);
  const [createdDate, setCreatedDate] = useState('');
  const [mangaCover, setMangaCover] = useState(null);

  useEffect(() => {
    const date = label.createdAt.substring(0, 10);
    setCreatedDate(date);
  }, [label.createdAt]);

  useEffect(async () => {
    const mangaInfo = await client.service('/api/v2/manga-stories').get(label._id);
    const cover = mangaInfo.image;
    setMangaCover(cover);
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
  }, [label.participentsInfo, client.UPLOAD_URL]);

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
    <Link href={href || `/manga-story/${label._id}`}>
      <a className={styles.colabWrap__item} onClick={navigateToManga}>
        <div className={styles.colabWrap__image}>
          {
            mangaCover
            ? <img src={client.UPLOAD_URL + mangaCover} />
            : null
          }
        </div>
        <div className={styles.colabWrap__content}>
          <div className={styles.colabName}>{label.title}</div>
          <div className={styles.colabWrap__bot}>
            <div>
              <СardGenres
                title={'More Genres'}
                subTitle={'💪 all genres'}
                genres={label.genres}
                limit={2}
              />
            </div>
            <div>
              <ChapterContent label={label} />
            </div>
          </div>
            <div className={styles.colabWrap__nameContainer}>
              <div className={styles.colabWrap__name}>
                <div className={styles.colabWrap__personage}>by:</div>
                <div className={styles.colabWrap__authorName}>{label.authorInfo.name}</div>
              </div>
            </div>
        </div>
      </a>
    </Link>
  );
};

CollaborationCards.propTypes = {
  label: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  href: PropTypes.string,
};
CollaborationCards.defaultProps = {
  href: null,
};
export default CollaborationCards;
