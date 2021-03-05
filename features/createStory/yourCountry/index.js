import React, { useState, useEffect } from 'react';

import { Button, Select } from 'antd';
import SvgLeftArrow from 'components/icon/LeftArrow';
import SvgRightArrow from 'components/icon/RightArrow';
import { EVENTS } from 'helpers/amplitudeEvents';
import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';

import { OPTIONS } from './constant';

const Amplitude = require('amplitude');

const amplitude = new Amplitude('3403aeb56e840aee5ae422a61c1f3044');

const Country = ({ user }) => {
  const [loadings, changeLoading] = useState([]);
  const [selectedItems, changeSelectedItems] = useState([]);

  const enterLoading = (index) => {
    const newLoadings = [...loadings];
    newLoadings[index] = true;
    changeLoading(newLoadings);
    const data = [
      {
        platform: 'WEB',
        event_type: EVENTS.CREATE_MANGA_STORY_COUNTRY_NEXT,
        user_id: user?._id,
        user_properties: {
          ...user,
        },
        event_properties: selectedItems,
      },
    ];
    amplitude.track(data);
  };

  const handleChange = (selectedItems) => {
    changeSelectedItems(selectedItems);
  };

  useEffect(() => {
    let mangaData = localStorage.getItem('mangaStory');
    mangaData = mangaData ? JSON.parse(mangaData) : {};
    const country = mangaData.country || [];
    changeSelectedItems(country);
  }, []);

  useEffect(() => {
    let mangaData = localStorage.getItem('mangaStory');
    mangaData = mangaData ? JSON.parse(mangaData) : {};
    mangaData.country = selectedItems;
    localStorage.setItem('mangaStory', JSON.stringify(mangaData));
  });

  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
  return (
    <>
      <Head></Head>
      <main className="your_country_page">
        <div className="container">
          <div className="row collab_radio">
            <div className="col-lg-8">
              <div className="collab_div">
                <div className="logo_img_comp">
                  <img src="/img/logo.png" width="250" alt="" />
                </div>
                <h1 className="collab">Where are you from?</h1>
                <Select
                  showSearch
                  placeholder="Inserted are removed"
                  value={selectedItems}
                  onChange={handleChange}
                  style={{ width: '100%' }}>
                  {filteredOptions.map((item) => (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </div>
              <div className="next_prev">
                <Link href="/create-a-story/project-description">
                  <Button id="countryPrevBtnId" className="title_but_prev">
                    <SvgLeftArrow width="13.503px" height="23.619px" />
                    <span> Previous</span>
                  </Button>
                </Link>
                <Link href="/create-a-story/language">
                  <Button
                    id="countryNextBtnId"
                    type="primary"
                    className="title_but"
                    loading={loadings[0]}
                    disabled={!selectedItems}
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
Country.propTypes = {
  user: PropTypes.object.required,
};

export default Country;
