import React from 'react';

import cn from 'classnames';
import PrimaryButton from 'components/ui-elements/button';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const СardMore = ({ text }) => (
  <div className={cn(styles.PostColab)}>
    <div className={cn(styles.PostColab__item)}>
      <div className={cn(styles.PostColab__descr)}>{text}</div>
      <Link href="/create-a-story/start">
        <PrimaryButton
          text="Post Collab"
          splitterStyle={{
            padding: '10px 14px 12px 14px',
            fontSize: '15px',
          }}
        />
      </Link>
    </div>
  </div>
);

СardMore.propTypes = {
  text: PropTypes.string,
};

СardMore.defaultProps = {
  text: '',
};

export default СardMore;
