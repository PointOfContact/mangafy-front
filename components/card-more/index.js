import React, { useState } from 'react';

import cn from 'classnames';
import ModalCreateProject from 'components/modalCreateProject';
import PrimaryButton from 'components/ui-elements/button';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const СardMore = ({ text }) => {
  const [createProjectModal, showCreateProjectModal] = useState(false);

  return (
    <div className={cn(styles.PostColab)}>
      <div className={cn(styles.PostColab__item)}>
        <div className={cn(styles.PostColab__descr)}>{text}</div>
        <PrimaryButton
          text="Post Collab"
          splitterStyle={{
            padding: '10px 14px 12px 14px',
            fontSize: '15px',
          }}
          onClick={() => showCreateProjectModal(true)}
        />
      </div>
      <ModalCreateProject
        createProjectModal={createProjectModal}
        showCreateProjectModal={showCreateProjectModal}
      />
    </div>
  );
};

СardMore.propTypes = {
  text: PropTypes.string,
};

СardMore.defaultProps = {
  text: '',
};

export default СardMore;
