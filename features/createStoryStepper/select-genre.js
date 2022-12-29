import React, { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import { notification } from 'antd';
import Button from 'components/ui-new/Button';
import Select from 'components/ui-new/Input/Select';

const selectGenre = ({ genres, storyInfo, goNext, goBack, setStoryInfo, loading }) => {
  const [error, setError] = useState(false);
  const options = [];
  const [selected, setSelected] = useState(storyInfo.genres || []);
  if (genres && genres.length < 1) options = [{ key: 0, value: 'Can not get genres types' }];
  else {
    genres.forEach((genre) => {
      options.push({
        key: genre._id,
        value: genre.name,
      });
    });
  }

  function selectChangeHandler(values) {
    setError(false);
    setSelected(values);
  }

  function handleGoNext() {
    if (selected.length > 2) {
      setError('You can select 2 or less genres');
      return;
    }
    setStoryInfo({ ...storyInfo, genres: selected });
    goNext();
  }

  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.content)}>
        <div className={cn(styles.title)}>Genre</div>
        <div className={cn(styles.descr)}>
          The genre you choose is an important part, so tell your readers what you want to create.
          Choose up to 2 main genres
        </div>
        <Select
          err={error}
          mode="multiple"
          placeholder="Genres"
          options={options}
          defaultValue={storyInfo.genres || []}
          onChange={selectChangeHandler}
          rounded
          full
        />
        <div className={styles.buttons}>
          <Button onClick={handleGoNext} loading={loading === 'next'} rounded pink>
            Let’s go
          </Button>
          <Button
            className={styles.button_blackLoading}
            onClick={() => goBack()}
            loading={loading === 'prev'}
            rounded
            pink
            outline>
            Go back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default selectGenre;
