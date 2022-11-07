import React, { useCallback, useMemo } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import Imgix from 'components/imgix';
import client from 'api/client';
import Link from 'next/link';
import { likeChapter } from 'helpers/shared';
import { notification } from 'antd';
import Button from 'components/ui-new/Button';
import myAmplitude from 'utils/amplitude';
import { EVENTS } from 'helpers/amplitudeEvents';
import Diamond from 'components/icon/new/Diamond';
import Chapter from './Chapter';

const ProjectChapters = ({
  preview,
  isParticipant,
  isOwner,
  className,
  project,
  updateProjectInfo,
  user,
  isMobile,
  onCommentClick,
  setIsSignInModalOpened,
}) => {
  const chapters = project?.storyBoards?.data[0]?.chapters.filter((ch) => ch.published);

  let hasPaidSubscription = false;
  // check for paid subscription will be here

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

  // blur all chapters except first if user has no paid subscription
  if (!hasPaidSubscription) {
    chapters.forEach((chapter, index) => {
      if (index > 0) {
        chapter.blur = true;
      }
    });
  }

  return (
    <div className={cn(className, styles.chapters, isMobile && styles.chapters_mobile)}>
      <div className={cn(styles.chapters__sectionTitle)}>
        Episodes
        {(isParticipant || isOwner) && (
          <Link href={'/project/production/' + project._id + '?tab=details'}>
            <a className={styles.chapters__edit}>
              <Button rounded pink>
                Edit
              </Button>
            </a>
          </Link>
        )}
        {preview && (
          <Link href={'/profile/' + user?._id + '/projects'}>
            <a className={styles.chapters__edit}>
              <Button rounded pink>
                Back to projects
              </Button>
            </a>
          </Link>
        )}
      </div>
      {chapters?.length === 0 && (
        <div className={styles.noChapters}>
          <div className={styles.noChapters__text}>
            {isOwner
              ? 'Is the new episode ready? Show it to the world! '
              : 'Episode 1 in progress... In the meantime, you can support us!'}
          </div>
          <div className={styles.noChapters__btns}>
            {isOwner ? (
              <>
                <Link href={'/project/production/' + project._id + '?tab=episodes'}>
                  <a>
                    <Button rounded pink sm>
                      Upload
                    </Button>
                  </a>
                </Link>
              </>
            ) : (
              <>
                {/* <Button outline rounded pink sm>
                  Subscribe
                </Button> */}
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
              </>
            )}
          </div>
        </div>
      )}
      {chapters?.map((chapter) => (
        <Chapter project={project} chapter={chapter} isLiked={isLiked} />
      ))}
    </div>
  );
};

export default ProjectChapters;
