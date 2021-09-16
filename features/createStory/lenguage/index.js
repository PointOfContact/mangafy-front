import React, { useState, useEffect } from 'react';

import { Button, Select } from 'antd';
import SvgLeftArrow from 'components/icon/LeftArrow';
import SvgRightArrow from 'components/icon/RightArrow';
import Imgix from 'components/imgix';
import { EVENTS } from 'helpers/amplitudeEvents';
import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';

import { OPTIONS } from './constant';

const Lenguage = ({ user }) => {
  const [loadings, changeLoading] = useState([]);
  const [selectedItems, changeSelectedItems] = useState([]);

  const enterLoading = (index) => {
    const newLoadings = [...loadings];
    newLoadings[index] = true;
    changeLoading(newLoadings);
    const data = [
      {
        event_type: EVENTS.CREATE_MANGA_STORY_LANGUAGES_NEXT,
        user_id: user?._id,
        user_properties: {
          ...user,
        },
        event_properties: selectedItems,
      },
    ];
    myAmplitude(data);
  };

  const handleChange = (selectedItems) => {
    changeSelectedItems(selectedItems);
  };

  useEffect(() => {
    let mangaData = localStorage.getItem('mangaStory');
    mangaData = mangaData ? JSON.parse(mangaData) : {};
    const prefered_language = mangaData.prefered_language || [];
    changeSelectedItems(prefered_language);
  }, []);

  useEffect(() => {
    let mangaData = localStorage.getItem('mangaStory');
    mangaData = mangaData ? JSON.parse(mangaData) : {};
    mangaData.prefered_language = selectedItems;
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
                  <Imgix
                    layout="fill"
                    src="https://mangafy.club/img/logo.webp"
                    alt="MangaFy logo"
                  />
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
                  <a>
                    <Button id="countryPrevBtnId" className="title_but_prev">
                      <SvgLeftArrow width="13.503px" height="23.619px" />
                      <span> Previous</span>
                    </Button>
                  </a>
                </Link>
                <Link href="/create-a-story/language">
                  <a>
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
Lenguage.propTypes = {
  user: PropTypes.object.required,
};

export default Lenguage;
