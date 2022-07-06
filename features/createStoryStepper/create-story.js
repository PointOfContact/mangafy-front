import PrimaryButton from 'components/ui-elements/button';
// import PrimaryInput from 'components/ui-elements/input';
import React, { useRef, useState } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import { notification } from 'antd';
import client from 'api/client';

const CreateStory = ({ storyInfo, goNext, setStoryInfo, loading, setLoading }) => {
  const [isValid, setIsValid] = useState(true);
  const inputRef = useRef(null);

  function inputChangeHandler() {
    if (!inputRef.current) return;
    setIsValid(true);
    setStoryInfo({ ...storyInfo, projectName: inputRef.current.value.trim().toLowerCase() });
  }

  function nextHandler() {
    setLoading('next');
    if (!storyInfo.projectName) {
      notification.error({
        message: 'Please enter the name of your project',
        placement: 'bottomLeft',
      });
      setLoading(null);
      setIsValid(false);
    } else if (!storyInfo.projectName.match(/^[a-z]+$/)) {
      notification.error({
        message: 'Please enter corrent project name without spaces and numbers',
        placement: 'bottomLeft',
      });
      setLoading(null);
      setIsValid(false);
    } else if (storyInfo.projectName.length < 3) {
      notification.error({
        message: 'Project name should be more than 2 characters',
        placement: 'bottomLeft',
      });
      setLoading(null);
      setIsValid(false);
    } else if (storyInfo.projectName.length >= 20) {
      notification.error({
        message: 'Project name should be less than 20 characters',
        placement: 'bottomLeft',
      });
      setLoading(null);
      setIsValid(false);
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
      // goNext()
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
          <input
            type="text"
            className={cn(styles.input, !isValid && styles.input_error)}
            placeholder="Your Project"
            ref={inputRef}
            onChange={inputChangeHandler}
            defaultValue={storyInfo.projectName}
          />
          <span className={cn(styles.mangafy)}>.mangafy.club</span>
        </div>
        <div className={styles.buttons}>
          <PrimaryButton text="Let’s do it" onClick={nextHandler} loading={loading === 'next'} />
        </div>
      </div>
    </div>
  );
};

export default CreateStory;
