import React, { useState, useEffect } from 'react';

import { Button, Tooltip } from 'antd';
import SvgLeftArrow from 'components/icon/LeftArrow';
import SvgRightArrow from 'components/icon/RightArrow';
import Imgix from 'components/imgix';
import { EVENTS } from 'helpers/amplitudeEvents';
import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

const Amplitude = require('amplitude');

const amplitude = new Amplitude('3403aeb56e840aee5ae422a61c1f3044');

const Introduce = ({ user }) => {
  const [loadings, changeLoading] = useState([]);
  const [input, changeInput] = useState('');
  const enterLoading = (index) => {
    const newLoadings = [...loadings];
    newLoadings[index] = true;
    changeLoading(newLoadings);
    const data = {
      platform: 'WEB',
      event_type: EVENTS.CREATE_MANGA_STORY_TITLE_NEXT,
      user_id: user?._id,
      user_properties: {
        ...user,
      },
      event_properties: input,
    };
    if (user) {
      data.user_id = user._id;
      data.user_properties = user;
    } else {
      data.device_id = uuidv4();
    }
    amplitude.track([data]);
  };
  const handleInput = (evt) => {
    changeInput(evt.target.value);
  };
  const enabled = input.length > 2;
  useEffect(() => {
    let mangaData = localStorage.getItem('mangaStory');
    mangaData = mangaData ? JSON.parse(mangaData) : {};
    const introduce = mangaData.introduce || '';
    changeInput(introduce);
  }, []);

  useEffect(() => {
    let mangaData = localStorage.getItem('mangaStory');
    mangaData = mangaData ? JSON.parse(mangaData) : {};
    mangaData.introduce = input;
    localStorage.setItem('mangaStory', JSON.stringify(mangaData));
  });

  return (
    <>
      <Head></Head>
      <main className="project_title_page">
        <div className="container">
          <div className="row collab_radio">
            <div className="col-lg-12">
              <div className="collab_div">
                <div className="logo_img_comp">
                  <Imgix
                    layout="fill"
                    src="https://mangafy.club/img/logo.webp"
                    alt="MangaFy logo"
                  />
                </div>
                <h1 className="collab">Introduce your project*</h1>
                <p className="title_text">
                  Two things remain irretrievable: time and a first impression. (c) Cynthia Ozick
                </p>
              </div>
              <Tooltip title="Minimum length is 10,maximum is 50." placement="bottom">
                <input
                  placeholder="Great projects comes with great titles"
                  onChange={handleInput}
                  required
                  type="text"
                  minLength={10}
                  value={input}
                  maxLength={50}
                  className="input_text"
                />
              </Tooltip>

              <div className="next_prev">
                <Link href="/create-a-story/genres">
                  <a>
                    <Button id="projTiltePrevBtnId" className="title_but_prev">
                      <SvgLeftArrow width="13.503px" height="23.619px" />
                      <span> Previous</span>
                    </Button>
                  </a>
                </Link>
                <Link href="/create-a-story/project-description">
                  <a>
                    <Button
                      id="projTilteNextBtnId"
                      type="primary"
                      className="title_but"
                      disabled={!enabled}
                      loading={loadings[0]}
                      onClick={() => enterLoading(0)}>
                      <span>Next</span>
                      <SvgRightArrow width="13.503px" height="23.619px" />
                    </Button>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

Introduce.propTypes = {
  user: PropTypes.objec,
};
export default Introduce;
