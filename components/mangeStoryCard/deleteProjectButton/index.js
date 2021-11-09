import React from 'react';

import { notification } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import SvgDustbin from 'components/icon/Dustbin';
import Popconfirm from 'components/popconfirm';
import { EVENTS } from 'helpers/amplitudeEvents';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';

import styles from '../styles.module.scss';

const DeleteProjectButton = ({ label, user, index, mangaStories, setMangaStories }) => {
  const mangaStory = mangaStories[index];

  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const data = {
      event_type: EVENTS.DELETE_PROJECT,
      event_properties: { mangaStoryId: mangaStory._id },
      user_id: user._id,
      user_properties: {
        ...user,
      },
    };

    myAmplitude(data);
  };

  const confirmDelete = () => {
    const jwt = client.getCookie('feathers-jwt');
    import('api/restClient').then((m) => {
      m.default
        .service('/api/v2/manga-stories')
        .remove(mangaStory._id, {
          headers: { Authorization: `Bearer ${jwt}` },
          mode: 'no-cors',
        })
        .then(() => {})
        .catch((err) => {
          if (err.code === 404) {
            delete mangaStories[index];
            setMangaStories([...mangaStories]);
          } else {
            notification.error({
              message: err.message,
              placement: 'bottomLeft',
            });
          }
        });
    });
  };

  return (
    label.author === user?._id && (
      <div
        onClick={(e) => handleClick(e)}
        className={cn(styles.deleteCard, styles.deleteCardMobile)}>
        <span>
          <Popconfirm
            overlayClassName={styles.popConfirm}
            position={'right'}
            title={'Delete project'}
            onConfirm={confirmDelete}
            item={
              <span>
                <SvgDustbin width="14px" height="14px" />
              </span>
            }
          />
        </span>
      </div>
    )
  );
};

DeleteProjectButton.propTypes = {
  label: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  setMangaStories: PropTypes.func,
  mangaStories: PropTypes.array,
};

DeleteProjectButton.defaultProps = {
  setMangaStories: () => {},
  mangaStories: [],
};

export default DeleteProjectButton;
