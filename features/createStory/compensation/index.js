import React, { useEffect, useState } from 'react';

import { Button, Radio, Slider } from 'antd';
import SvgLeftArrow from 'components/icon/LeftArrow';
import SvgRightArrow from 'components/icon/RightArrow';
import { EVENTS } from 'helpers/amplitudeEvents';
import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

const Amplitude = require('amplitude');

const amplitude = new Amplitude('3403aeb56e840aee5ae422a61c1f3044');

const Compensation = ({ user }) => {
  const [loadings, changeLoading] = useState([]);
  const [rangeValue, changeRangeValue] = useState(1);
  const [value, changeValue] = useState(0);
  const [showField, changeShowField] = useState(false);

  useEffect(() => {
    let mangaData = localStorage.getItem('mangaStory');
    mangaData = mangaData ? JSON.parse(mangaData) : {};
    const valueMange = mangaData.compensation || null;
    changeRangeValue(valueMange);
    changeValue(valueMange);
    changeShowField(!!valueMange);
  }, []);

  useEffect(() => {
    let mangaData = localStorage.getItem('mangaStory');
    mangaData = mangaData ? JSON.parse(mangaData) : {};
    mangaData.compensation = value;
    localStorage.setItem('mangaStory', JSON.stringify(mangaData));
  });

  const onChange = (value) => {
    changeValue(value);
  };

  const enterLoading = (index) => {
    const newLoadings = [...loadings];
    newLoadings[index] = true;
    changeLoading(newLoadings);
    const data = {
      platform: 'WEB',
      event_type: EVENTS.CREATE_MANGA_STORY_MODEL_NEXT,
      event_properties: {
        data: value,
      },
    };
    if (user) {
      data.user_id = user._id;
      data.user_properties = user;
    } else {
      data.device_id = uuidv4();
    }
    amplitude.track([data]);
  };

  const toggleFieldRange = (isVisible) => {
    changeValue(isVisible ? value : 0);
    changeShowField(isVisible);
  };

  const marks = {
    1: {
      style: {
        color: '#0070f3',
      },
      label: <strong>1$</strong>,
    },
    1000: {
      style: {
        color: '#0070f3',
      },
      label: <strong>1000$</strong>,
    },
  };

  let field = null;

  if (showField) {
    field = (
      <div className="fieldCard">
        <Slider
          marks={marks}
          defaultValue={rangeValue}
          onChange={onChange}
          max={1000}
          tooltipVisible
        />
      </div>
    );
  }

  return (
    <>
      <Head></Head>
      <main className="model_page">
        <div className="container">
          <div className="row collab_radio">
            <div className="12 col-sm-12">
              <div className="collab_div">
                <div className="logo_img_comp">
                  <img src="/img/logo.webp" width="250" alt="" />
                </div>
                <h1 className="collab">Choose your project type</h1>
                <Radio.Group value={showField}>
                  <div className="row">
                    <div className="col-lg-12">
                      <Radio value={true} onClick={() => toggleFieldRange(true)}>
                        Paid project
                      </Radio>
                    </div>
                    <div className="col-lg-12">
                      <Radio value={false} onClick={() => toggleFieldRange(false)}>
                        Collaboration
                      </Radio>
                    </div>
                  </div>
                  <div>{field}</div>

                  <hr className="horizon_line" />

                  <div className="next_prev">
                    <Link href="/create-a-story/looking-for">
                      <Button id="modelPrevBtnId" className="title_but_prev">
                        <SvgLeftArrow width="13.503px" height="23.619px" />
                        <span> Previous</span>
                      </Button>
                    </Link>
                    <Link href="/create-a-story/genres">
                      <Button
                        id="modelNextBtnId"
                        type="primary"
                        className="title_but"
                        loading={loadings[0]}
                        onClick={() => enterLoading(0)}>
                        <span>Next</span>
                        <SvgRightArrow width="13.503px" height="23.619px" />
                      </Button>
                    </Link>
                  </div>
                </Radio.Group>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

Compensation.propTypes = {
  user: PropTypes.object,
};

export default Compensation;
