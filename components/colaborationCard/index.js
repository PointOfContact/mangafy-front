import React, { useEffect, useState } from 'react';
import СardGenres from 'components/card-genres';
import Imgix from 'components/imgix';
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
        <div className={styles.colabWrap__image}>
          {
            label.gallery.length > 0
            ? <img src={label.gallery[0]} />
            : <img src="/img/getmangaf/collabCardBg.svg" />
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
            <div className={styles.colabWrap__nameContainer}>
              <div className={styles.colabWrap__name}>
                <p className={styles.colabWrap__personage}>by:</p> 
                <p className={styles.colabWrap__authorName}>{label.authorInfo.name}</p>
              </div>
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
};
export default CollaborationCards;
