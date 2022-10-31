import React, { useEffect, useMemo, useRef, useState } from 'react';
import cn from 'classnames';
import PrimaryButton from 'components/ui-elements/button';
import styles from './styles.module.scss';
import PrimarySelect from 'components/ui-elements/select';
import { notification } from 'antd';

const selectGenre = ({ genres, storyInfo, goNext, goBack, setStoryInfo, loading }) => {
  const options = [];
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
    setStoryInfo({ ...storyInfo, genres: values });
  }

  function handleShowError() {
    notification.warning({
      message: 'You can select 2 or less genres',
      placement: 'bottomLeft',
    });
  }

  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.content)}>
        <div className={cn(styles.title)}>Genre</div>
        <div className={cn(styles.descr)}>
          The genre you choose is an important part, so tell your readers what you want to create.
          Choose up to 2 main genres
        </div>
        {/* <MultiSelect className={styles.multiselect} options={options} onChange={(selected) => console.log(selected)} /> */}
        <PrimarySelect
          options={options}
          mode="multiple"
          isFullWidth={true}
          placeholder="Genres"
          onChange={selectChangeHandler}
          value={storyInfo.genres}
          {...(storyInfo.genres?.length >= 2 && {
            open: false,
            onDropdownVisibleChange: handleShowError,
          })}
        />
        <div className={styles.buttons}>
          <PrimaryButton text="Let’s go" onClick={() => goNext()} loading={loading === 'next'} />
          <PrimaryButton
            isWhite={true}
            className={styles.button_blackLoading}
            text="Go back"
            onClick={() => goBack()}
            loading={loading === 'prev'}
          />
        </div>
      </div>
    </div>
  );
};

export default selectGenre;
