import React from 'react';

import { Tooltip } from 'antd';
import cn from 'classnames';
import { deleteTagsFromString } from 'components/gallery/utils';
import Imgix from 'components/imgix';
import Avatar from 'components/ui-elements/avatar';
import Link from 'next/link';
import PropTypes from 'prop-types';

import DeleteProjectButton from './deleteProjectButton';
import styles from './styles.module.scss';

const MangeStoryCard = ({ mangaStories, setMangaStories, client, user }) =>
  mangaStories?.map((label, index) => (
    <Link
      key={label._id}
      href={label.author === user?._id ? `/manga-story/${label._id}` : `/project/${label._id}`}>
      <a>
        <div className={styles.mangeStoryCard}>
          <div>
            <div className={styles.titleBlok}>
              <h3 className={styles.title}>{label.title}</h3>
              <DeleteProjectButton
                label={label}
                user={user}
                index={index}
                mangaStories={mangaStories}
                setMangaStories={setMangaStories}
              />
            </div>
            <div className={styles.description}>
              <p>{deleteTagsFromString(label.story)}</p>
            </div>
            <div>
              {label.author === user?._id && (
                <div className={cn(styles.type, styles.isOwn)}>Own</div>
              )}
              {label.compensationModel === 'paid' ? (
                <div className={cn(styles.type, styles.isPaid)}>Paid</div>
              ) : (
                <div className={cn(styles.type, styles.isCollab)}>Collab</div>
              )}
              {label.published ? (
                <div className={cn(styles.type, styles.isPublic)}>Public</div>
              ) : (
                <div className={cn(styles.type, styles.isDraft)}>Draft</div>
              )}
            </div>
            <div className={styles.colabImg}>
              <Imgix
                className={styles.colabMainImg}
                width={304}
                height={172}
                layout="fixed"
                src={
                  label.image
                    ? client.UPLOAD_URL + label.image
                    : 'https://mangafy.club/img/collab_baner.webp'
                }
                alt="MangaFy collab baner"
              />
              <div className={styles.team}>
                <div className={styles.participents}>
                  {label?.participentsInfo?.map(({ avatar, name, _id }) => (
                    <Link className={styles.participentsCont} key={name} href={`/profile/${_id}`}>
                      <a>
                        <Tooltip placement="topLeft" title={name} arrowPointAtCenter>
                          {avatar ? (
                            <Imgix
                              width={46}
                              height={46}
                              src={client.UPLOAD_URL + avatar}
                              alt="Picture of the user"
                            />
                          ) : (
                            <Avatar text={name} size={46} />
                          )}
                        </Tooltip>
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  ));

MangeStoryCard.propTypes = {
  user: PropTypes.object,
  mangaStories: PropTypes.array,
  client: PropTypes.object,
  setMangaStories: PropTypes.func,
};

MangeStoryCard.defaultProps = {
  user: null,
  setMangaStories: () => {},
};

export default MangeStoryCard;
