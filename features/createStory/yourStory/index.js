import React, { useState, useEffect } from 'react';

import { Button, Input, Tooltip } from 'antd';
import SvgLeftArrow from 'components/icon/LeftArrow';
import SvgRightArrow from 'components/icon/RightArrow';
import { EVENTS } from 'helpers/amplitudeEvents';
import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';

const { TextArea } = Input;
const Amplitude = require('amplitude');

const amplitude = new Amplitude('3403aeb56e840aee5ae422a61c1f3044');

const ProjectStory = ({ user }) => {
  const [loadings, changeLoading] = useState([]);
  const [input, changeInput] = useState('');

  const enterLoading = (index) => {
    const newLoadings = [...loadings];
    newLoadings[index] = true;
    changeLoading(newLoadings);
    const data = [
      {
        platform: 'WEB',
        event_type: EVENTS.CREATE_MANGA_STORY_STORY_NEXT,
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

  useEffect(() => {
    let mangaData = localStorage.getItem('mangaStory');
    mangaData = mangaData ? JSON.parse(mangaData) : {};
    const project_story = mangaData.project_story || '';
    changeInput(project_story);
  }, []);

  useEffect(() => {
    let mangaData = localStorage.getItem('mangaStory');
    mangaData = mangaData ? JSON.parse(mangaData) : {};
    mangaData.project_story = input;
    localStorage.setItem('mangaStory', JSON.stringify(mangaData));
  });

  const enabled = input.length > 2;
  return (
    <>
      <Head></Head>
      <main className="story_page">
        <div className="container">
          <div className="row collab_radio">
            <div className="cool-lg-8">
              <div className="collab_div">
                <div className="logo_img_comp">
                  <img src="/img/logo.png" width="250" alt="" />
                </div>
                <h1 className="collab">Introduce your graphic novel project/idea</h1>
                <p className="title_text">
                  And at other times your dreams can remain just daydreams for far too long.
                </p>
              </div>
              <Tooltip title="Minimum length is 10,maximum is 50." placement="bottom">
                <TextArea
                  autoSize={{ minRows: 3, maxRows: 10 }}
                  placeholder="Tell the community, in short, about your project, share your inspiration, story, and setting and outline your collaboration goals."
                  value={input}
                  onChange={handleInput}
                  required
                  type="text"
                  minLength={10}
                  maxLength={50}
                  className="textarea_text"
                />
              </Tooltip>

              <div className="next_prev">
                <Link href="/create-a-story/project-description">
                  <Button id="storyPrevBtnId" className="title_but_prev">
                    <SvgLeftArrow width="13.503px" height="23.619px" />
                    <span> Previous</span>
                  </Button>
                </Link>
                <Link href="/create-a-story/your-country">
                  {/* <Button type="primary" className="title_but" loading={loadings[0]} onClick={() => this.enterLoading(0)}>
                                        <span>Next</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10.503" height="15.619" viewBox="0 0 13.503 23.619">
                                            <path id="Icon_ionic-ios-arrow-back" data-name="Icon ionic-ios-arrow-back" d="M15.321,18l8.937-8.93a1.688,1.688,0,0,0-2.391-2.384L11.742,16.8a1.685,1.685,0,0,0-.049,2.327L21.86,29.32a1.688,1.688,0,0,0,2.391-2.384Z" transform="translate(24.754 29.813) rotate(-180)" fill="#fff" />
                                        </svg>
                                    </Button> */}
                  <Button
                    id="stroyNextBtnId"
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
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

ProjectStory.propTypes = {
  user: PropTypes.object.required,
};

export default ProjectStory;
