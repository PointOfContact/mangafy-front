import React, { useState } from 'react';

import { Popover } from 'antd';
import cn from 'classnames';
import DeleteProjectModal from 'components/deleteProjectModal';
import SvgDustbin from 'components/icon/Dustbin';
import PropTypes from 'prop-types';

import styles from '../styles.module.scss';

const DeleteProjectButton = ({ label, user, mangaStory }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleClick = (e) => {
    e.stopPropagation();
    setIsModalVisible(true);
  };

  return (
    label.author === user?._id && (
      <div className={cn(styles.deleteCard, styles.deleteCardMobile)}>
        <span onClick={(e) => handleClick(e)}>
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
