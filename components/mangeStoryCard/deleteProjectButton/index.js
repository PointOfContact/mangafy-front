import React, { useState } from 'react';

import { Popover } from 'antd';
import cn from 'classnames';
import DeleteProjectModal from 'components/deleteProjectModal';
import SvgDustbin from 'components/icon/Dustbin';
import { EVENTS } from 'helpers/amplitudeEvents';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';

import styles from '../styles.module.scss';

const DeleteProjectButton = ({ label, user, mangaStory }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

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
    setIsModalVisible(true);
  };

  return (
    label.author === user?._id && (
      <div
        onClick={(e) => handleClick(e)}
        className={cn(styles.deleteCard, styles.deleteCardMobile)}>
        <span>
          <Popover placement="left" content={'Delete project'} trigger="hover">
            <SvgDustbin width="14px" height="14px" />
          </Popover>
        </span>
        <DeleteProjectModal
          user={user}
          mangaStory={mangaStory}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      </div>
    )
  );
};

DeleteProjectButton.propTypes = {
  label: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  mangaStory: PropTypes.array.isRequired,
};

export default DeleteProjectButton;
