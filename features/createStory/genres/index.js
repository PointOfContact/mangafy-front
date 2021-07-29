import React, { useState, useEffect } from 'react';

import { Button, Select } from 'antd';
import SvgLeftArrow from 'components/icon/LeftArrow';
import SvgRightArrow from 'components/icon/RightArrow';
import Imgix from 'components/imgix';
import { EVENTS } from 'helpers/amplitudeEvents';
import { options } from 'helpers/constant';
import Head from 'next/head';
import Link from 'next/link';
import PropTypes, { array } from 'prop-types';

const Amplitude = require('amplitude');

const amplitude = new Amplitude('3403aeb56e840aee5ae422a61c1f3044');

const MangaGenres = (props) => {
  const [loadings, changeLoading] = useState([]);
  const [tags, changeTags] = useState(['DRAMA', 'FANTASY', 'COMEDY', 'ACTION']);
  const [selectedValues, changeSelectedValues] = useState([]);
  const [selectedValuesObj, changeSelectedValuesObj] = useState([]);
  const { label, value, closable, onClose, genres, user } = props;

  const enterLoading = (index) => {
    const newLoadings = [...loadings];
    newLoadings[index] = true;
    changeLoading(newLoadings);
    const data = [
      {
        platform: 'WEB',
        event_type: EVENTS.CREATE_MANGA_STORY_GENRES_NEXT,
        user_id: user?._id,
        user_properties: {
          ...user,
        },
        event_properties: selectedValues,
      },
    ];
    amplitude.track(data);
  };

  const a = () => {
    for (let i = 0; i < 3; i++) {
      return (obj = options[i]);
    }
  };

  const handleChange = (value, selectedValuesObj) => {
    changeSelectedValues(value);
    changeSelectedValuesObj(selectedValuesObj);
  };
  useEffect(() => {
    let mangaData = localStorage.getItem('mangaStory');
    mangaData = mangaData ? JSON.parse(mangaData) : {};
    const manga_genres = mangaData.manga_genres || [];
    changeSelectedValues(manga_genres);
  }, []);

  useEffect(() => {
    let mangaData = localStorage.getItem('mangaStory');
    mangaData = mangaData ? JSON.parse(mangaData) : {};
    mangaData.manga_genres = selectedValues || [];
    mangaData.manga_genres_obj = selectedValuesObj || [];
    localStorage.setItem('mangaStory', JSON.stringify(mangaData));
  });

  const enabled = selectedValues.length > 0;
  return (
    <>
      <Head></Head>
      <main className="garnes_page">
        <div className="container">
          <div className="row collab_radio">
            <div className="col-lg-8">
              <div className="collab_div">
                <div className="logo_img_comp">
                  <Imgix
                    layout="fill"
                    src="https://mangafy.club/img/logo.webp"
                    alt="MangaFy logo"
                  />
                </div>

                <h1 className="collab">Which Graphic Novel genre you aim to work on</h1>
                <p className="title_text">
                  Graphic novels can be comics, webtoons, manga, and can be divided into fiction,
                  non-fiction, fantasy, historic, horror, superhero themed and more. What are your
                  preferences.
                </p>
                <Select
                  mode="multiple"
                  MangaGenres={MangaGenres}
                  placeholder="Here are the most popular"
                  style={{ width: '100%' }}
                  options={genres}
                  value={selectedValues}
                  onChange={handleChange}
                />
                <br />
              </div>
              <div className="next_prev">
                <Link href="/create-a-story/model">
                  <Button id="genresPrevBtnId" className="title_but_prev">
                    <SvgLeftArrow width="13.503px" height="23.619px" />
                    <span>Previous</span>
                  </Button>
                </Link>
                <Link href="/create-a-story/project-title">
                  <Button
                    type="primary"
                    id="genresNextBtnId"
                    className="title_but"
                    loading={loadings[0]}
                    disabled={!enabled}
                    onClick={() => enterLoading(0)}>
                    <span>Next</span>
                    <SvgRightArrow width="13.503px" height="23.619px" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
MangaGenres.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  closable: PropTypes.bool,
  onClose: PropTypes.func,
  genres: PropTypes.array,
  user: PropTypes.object,
};
MangaGenres.defaultProps = {
  label: '',
  value: '',
  closable: false,
  onClose: () => {},
  genres: array,
  user: {},
};
export default MangaGenres;
