import React, { useState } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import { notification } from 'antd';
import Input from 'components/ui-new/Input';
import Button from 'components/ui-new/Button';

const SetupPayout = ({ storyInfo, createStory, goBack, setStoryInfo, loading }) => {
  const [error, setError] = useState('');

  function inputChangeHandler(text) {
    setError('');
    setStoryInfo({ ...storyInfo, paypal: text.trim() });
  }

  function nextHandler() {
    if (!storyInfo.paypal) {
      setError('Please enter your paypal email or skip this step');
    } else if (!storyInfo.paypal.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      setError('Please enter correct paypal email');
    } else {
      createStory(false);
    }
  }

  function skipHandler() {
    setStoryInfo({ ...storyInfo, paypal: null });
    createStory(true);
  }

  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.content)}>
        <div className={cn(styles.title)}>Accept donations</div>
        <div className={cn(styles.descr)}>Setup instant payouts to your paypal account</div>
        <Input
          pink
          rounded
          onChange={inputChangeHandler}
          className={styles.input}
          placeholder="Your paypal account"
          err={error}
        />
        <div className={styles.buttons}>
          {/* <PrimaryButton text="Let’s go" onClick={nextHandler} loading={loading === 'next'} /> */}
          <Button pink rounded onClick={nextHandler} loading={loading === 'next'}>
            Let's go
          </Button>
          <Button
            pink
            rounded
            outline
            className={styles.button_blackLoading}
            onClick={goBack}
            loading={loading === 'prev'}>
            Go back
          </Button>
        </div>
        <button onClick={skipHandler} className={cn(styles.skip)}>
          Skip for now
        </button>
      </div>
    </div>
  );
};

export default SetupPayout;
