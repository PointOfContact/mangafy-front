import React, { useState, useEffect } from 'react';

import { Col, Button, Input, Tooltip } from 'antd';
import SvgLeftArrow from 'components/icon/LeftArrow';
import SvgRightArrow from 'components/icon/RightArrow';
import Imgix from 'components/imgix';
import { EVENTS } from 'helpers/amplitudeEvents';
import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';

const { TextArea } = Input;

const Amplitude = require('amplitude');

const amplitude = new Amplitude('3403aeb56e840aee5ae422a61c1f3044');

const ProjectDescription = ({ user }) => {
  const [loadings, changeLoadings] = useState([]);
  const [input, changeInput] = useState('');

  useEffect(() => {
    let mangaData = localStorage.getItem('mangaStory');
    mangaData = mangaData ? JSON.parse(mangaData) : {};
    const project_description = mangaData.project_description || '';
    changeInput(project_description);
  }, []);

  useEffect(() => {
    let mangaData = localStorage.getItem('mangaStory');
    mangaData = mangaData ? JSON.parse(mangaData) : {};
    mangaData.project_description = input || '';
    localStorage.setItem('mangaStory', JSON.stringify(mangaData));
  });
  const enterLoading = (index) => {
    const newLoadings = [...loadings];
    newLoadings[index] = true;
    changeLoadings(newLoadings);
    const data = [
      {
        platform: 'WEB',
        event_type: EVENTS.CREATE_MANGA_STORY_DESCRIPTION_NEXT,
        user_id: user?._id,
        user_properties: {
          ...user,
        },
        event_properties: input,
      },
    ];
    amplitude.track(data);
  };
  const handleInput = (evt) => {
    changeInput(evt.target.value);
  };
  const handleSubmit = () => {};
  const enabled = input.length > 30;

  return (
    <>
      <Head></Head>
      <main className="project_descr_page">
        <div className="container">
          <div className="row collab_radio">
            <Col className="col-lg-8">
              <div className="collab_div">
                <div className="logo_img_comp">
                  <Imgix
                    layout="fill"
                    src="https://mangafy.club/img/logo.webp"
                    alt="MangaFy logo"
                  />
                </div>
                <h1 className="collab">Graphic novel srory</h1>
                <p className="title_text">
                  The way to get started is to quit talking and begin doing.
                </p>
              </div>
              <Tooltip title="Minimum length is 30,maximum is 500." placement="bottom">
                <TextArea
                  autoSize={{ minRows: 3, maxRows: 5 }}
                  value={input}
                  placeholder="Describe what you're are looking for, why you care about it, how you plan to make it happen, and who you are. Your description should tell backers everything they need to know."
                  onChange={handleInput}
                  required
                  type="text"
                  minLength={30}
                  maxLength={500}
                  className="textarea_text"
                />
              </Tooltip>
              <div className="next_prev">
                <Link href="/create-a-story/project-title">
                  <Button id="projDesctPrevBtnId" className="title_but_prev">
                    <SvgLeftArrow width="13.503px" height="23.619px" />
                    <span> Previous</span>
                  </Button>
                </Link>
                <Link href="/create-a-story/your-story">
                  <Button
                    id="projDesctNextBtnId"
                    type="primary"
                    className="title_but"
                    disabled={!enabled}
                    loading={loadings[0]}
                    onClick={() => enterLoading(0)}>
                    <span>Next</span>
                    <SvgRightArrow width="13.503px" height="23.619px" />
                  </Button>
                </Link>
              </div>
            </Col>
          </div>
        </div>
      </main>
    </>
  );
};
ProjectDescription.propTypes = {
  user: PropTypes.objec,
};
export default ProjectDescription;
