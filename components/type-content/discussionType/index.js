import React from 'react';

import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const DiscussionType = (props) => {
  const { type } = props;

  switch (type) {
    case 'project':
      return <div className={styles.type}>Project</div>;
    case 'tutorial':
      return <div className={styles.type}>Tutorial</div>;
    default:
      return <></>;
  }
};

DiscussionType.propTypes = {
  type: PropTypes.string.isRequired,
};

export default DiscussionType;
