import React, { useState } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import { notification } from 'antd';
import client from 'api/client';
import Button from 'components/ui-new/Button';
import Input from 'components/ui-new/Input';

const CreateStory = ({ storyInfo, goNext, setStoryInfo, loading, setLoading }) => {
  const [error, setError] = useState(false);

  function inputChangeHandler(title) {
    setError(false);
    setStoryInfo({ ...storyInfo, projectName: title.trim().toLowerCase() });
  }

  function nextHandler() {
    setLoading('next');
    if (!storyInfo.projectName) {
      setLoading(null);
      setError('Please enter the name of your project');
    } else if (!storyInfo.projectName.match(/^[a-z]+$/)) {
      setLoading(null);
      setError('Please enter corrent project name without spaces and numbers');
    } else if (storyInfo.projectName.length < 3) {
      setLoading(null);
      setError('Project name should be more than 2 characters');
    } else if (storyInfo.projectName.length >= 20) {
      setLoading(null);
      setError('Project name should be less than 20 characters');
    } else {
      client
        .service('/api/v2/manga-stories')
        .find({
          query: {
            title: storyInfo.projectName,
          },
        })
        .then((stories) => {
          if (stories.data.length > 0) {
            notification.error({
              message: 'This title is already taken',
              placement: 'bottomLeft',
            });
            setLoading(null);
          } else {
            goNext();
          }
        });
    }
  }

  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.content)}>
        <div className={cn(styles.title)}>Bring your creative ideas to life.</div>
        <div className={cn(styles.descr)}>
          Accept donations. Find collaborations. Produce your story. It’s easier than you think.
        </div>
        <div className={cn(styles.createStoryForm)}>
          <Input
            rounded
            pink
            md
            type="text"
            className={styles.input}
            err={error}
            errPosAbs
            placeholder="Your Project"
            onChange={inputChangeHandler}
            defaultValue={storyInfo.projectName}
          />
          <span className={cn(styles.mangafy)}>.mangafy.club</span>
        </div>
        <div className={styles.buttons}>
          <Button onClick={nextHandler} loading={loading === 'next'} rounded pink>
            Let’s do it
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateStory;
