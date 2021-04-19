import * as React from 'react';

import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const ShortStory = ({ title, description }) => (
  <div className={cn(styles.shortStory)}>
    <h2>{title}</h2>
    <pre>{description}</pre>
  </div>
);

ShortStory.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ShortStory;
