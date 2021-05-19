import React from 'react';

import cn from 'classnames';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const Quest = ({ point, status, title, description, navUrl }) => (
  <Link className={styles.link} href={navUrl}>
    <a>
      <div
        className={cn(
          styles.quest,
          status === 'WAIT' && styles.wait,
          status === 'FINISH' && styles.finish,
          status === 'PROCESS' && styles.process
        )}>
        <div className={styles.point}>
          <img src="/img/point.png" />
          {point && <span>{point}</span>}
        </div>
        <div className={styles.indo}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </a>
  </Link>
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
