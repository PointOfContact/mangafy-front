import React, { useCallback, useMemo } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import Comment from 'components/icon/new/Comment';
import Fire from 'components/icon/new/Fire';
import Imgix from 'components/imgix';
import client from 'api/client';
import Avatar from 'components/Avatar';
import Link from 'next/link';
import { likeChapter } from 'helpers/shared';
import { notification } from 'antd';
import Button from 'components/ui-new/Button';
import myAmplitude from 'utils/amplitude';
import { EVENTS } from 'helpers/amplitudeEvents';
import Diamond from 'components/icon/new/Diamond';

const ProjectChapters = ({
  className,
  project,
  updateProjectInfo,
  user,
  isMobile,
  onCommentClick,
  setIsSignInModalOpened,
}) => {
  const chapters = project?.storyBoards?.data[0]?.chapters.filter((ch) => ch.published);

  const isLiked = useCallback(
    (chapter) => {
      return chapter?.likedUsers?.some((likedUser) => likedUser === user?._id);
    },
    [chapters]
  );

  function onLike(chapter) {
    const chapterId = chapter._id;

    if (!user) {
      setIsSignInModalOpened(true);
      return;
    }

    likeChapter(project.author, chapterId, user._id, project.participents, isLiked(chapter))
      .then((res) => {
        updateProjectInfo();
        const eventData = [
          {
            event_type: EVENTS.LIKE_EPISODES,
          },
        ];
        myAmplitude(eventData);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className={cn(className, styles.chapters, isMobile && styles.chapters_mobile)}>
      <div className={cn(styles.chapters__sectionTitle)}>Episodes</div>
      {chapters?.length === 0 && (
        <div className={styles.noChapters}>
          <div className={styles.noChapters__text}>
            Episode 1 in progress... In the meantime, you can support us!{' '}
          </div>
          <div className={styles.noChapters__btns}>
            <Button outline rounded pink sm>
              Subscribe
            </Button>
            {!!project?.authorInfo?.payPalEmail && (
              <a
                onClick={() => {
                  myAmplitude([
                    {
                      event_type: EVENTS.SUPPORT_LINK_CLICKED,
                      event_properties: {
                        author_id: project?.authorInfo?._id,
                        supporter_id: user?._id,
                      },
                    },
                  ]);
                }}
                href={`https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=${project?.authorInfo?.payPalEmail}&item_name=Friends+of+the+Park&item_number=Fall+Cleanup+Campaign&currency_code=USD`}>
                <Button sm pink rounded iconRight icon={<Diamond color="#fff" />}>
                  Support
                </Button>
              </a>
            )}
          </div>
        </div>
      )}
      {chapters?.map((chapter) => (
        <Link
          key={chapter._id}
          href={
            client.API_ENDPOINT +
            '/project/view/' +
            project.storyBoards.data[0]._id +
            '?chapter=' +
            chapter.order
          }>
          <a
            key={chapter._id}
            className={cn(
              styles.chapters__chapter,
              !chapter.published && styles.chapters__chapter_disabled
            )}>
            <div className={styles.chapters__cover}>
              {/* <Imgix layout="fill" objectFit="cover" src={client.UPLOAD_URL + chapter.chapterImg} /> */}
              <Avatar
                size={70}
                image={chapter.chapterImg}
                text={chapter.title[0]}
                borderRadius={10}
              />
            </div>
            <div className={styles.chapters__title}>{chapter.title}</div>
            <div className={styles.chapters__subtitle}>Chapter {chapter.order}</div>
            <div className={styles.chapters__info}>
              {/* <div className={styles.chapters__date}>20.06.2022</div> */}
              {/* {chapter.comments && ( */}
              <div
                className={styles.chapters__comments}
                onClick={(e) => {
                  e.preventDefault();
                  onCommentClick(chapter._id);
                }}>
                {chapter.comment?.length} <Comment color="#C3BAFA" />
              </div>
              {/* )} */}
              {chapter.likedUsers && (
                <div
                  className={cn(
                    styles.chapters__likes,
                    isLiked(chapter) && styles.chapters__likes_liked
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    onLike(chapter);
                  }}>
                  {chapter.likedUsers.length} <Fire color="#C3BAFA" />
                </div>
              )}
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default ProjectChapters;
