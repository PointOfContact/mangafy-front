/* eslint-disable no-nested-ternary */
import React from 'react';

import { Select, Row, Col } from 'antd';
import cn from 'classnames';
import AddButton from 'components/ui-elements/add-button';
import PropTypes from 'prop-types';

import styles from '../styles.module.scss';

const renderStory = (userGenres, setStoryEditMode) =>
  !!userGenres?.length && (
    <Row>
      <Col span={22}>
        {userGenres.map(({ value }, index) => (
          <button key={index} type="button" id={`myProfileGenresTag${index}Id`}>
            {value}
          </button>
        ))}
      </Col>
      <Col
        xs={{ span: 24 }}
        md={{ span: 2 }}
        xl={{ span: 2 }}
        xxl={{ span: 2 }}
        span={2}
        className={styles.add_button}>
        <AddButton className={styles.btn_ganres} onClick={() => setStoryEditMode(true)} />
      </Col>
    </Row>
  );

const CreateGeneres = ({
  userGenres,
  ifMyProfile,
  storyEditMode,
  setStoryEditMode,
  profileGenres,
  userData,
  genresMyProfileEnums,
  genres,
  handleChangeGenres,
}) => (
  <div className={cn('garners_buttons', styles.genres_wrap)}>
    {ifMyProfile ? (
      storyEditMode ? (
        <Select
          mode="multiple"
          MangaGenres={userData.skills || []}
          placeholder="Type or select an option"
          style={{ width: '100%' }}
          options={genresMyProfileEnums}
          value={genres}
          onChange={handleChangeGenres}
        />
      ) : (
        renderStory(userGenres, setStoryEditMode)
      )
    ) : (
      profileGenres?.map(({ name }, index) => (
        <button key={index} type="button" id={`myProfileGenresTag${index}Id`}>
          {name}
        </button>
      ))
    )}
  </div>
);

CreateGeneres.propTypes = {
  userGenres: PropTypes.array.isRequired,
  ifMyProfile: PropTypes.bool.isRequired,
  storyEditMode: PropTypes.bool.isRequired,
  setStoryEditMode: PropTypes.func.isRequired,
  profileGenres: PropTypes.array.isRequired,
  userData: PropTypes.object.isRequired,
  genresMyProfileEnums: PropTypes.any.isRequired,
  genres: PropTypes.array.isRequired,
  handleChangeGenres: PropTypes.func.isRequired,
};

export default CreateGeneres;
