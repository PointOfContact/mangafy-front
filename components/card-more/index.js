import React from 'react';

import cn from 'classnames';

import PrimaryButton from '../ui-elements/button';
import styles from './styles.module.scss';

const СardMore = ({ className, text, ...rest }) => (
  <div className={cn(styles.PostColab)}>
    <div className={cn(styles.PostColab__item)}>
      <div className={cn(styles.PostColab__descr)}>{text}</div>
      <PrimaryButton
        text="Post Collab"
        splitterStyle={{
          padding: '10px 14px 12px 14px',
          fontSize: '15px',
        }}
      />
    </div>
  </div>
);

СardMore.defaultProps = {
  className: {},
  text: '',
};

export default СardMore;
