import React from 'react';

import cn from 'classnames';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const Quest = ({ point, status, title, description, navUrl }) => (
  <div
    className={cn(
      styles.quest,
      status === 'wait' && styles.wait,
      status === 'finish' && styles.finish,
      status === 'process' && styles.process
    )}>
    <div className={styles.point}>
      <img src="/img/point.png" />
      <span>{point}</span>
    </div>
    <Link href={navUrl}>
      <a>
        <div className={styles.indo}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
        </div>
      </a>
    </Link>
  </div>
);

Quest.propTypes = {
  point: PropTypes.number,
  status: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  navUrl: PropTypes.string,
};

Quest.defaultProps = {
  point: 0,
  status: '',
  title: '',
  description: '',
  navUrl: ' ',
};

export default Quest;
