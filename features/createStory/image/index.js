import React, { useState, useEffect } from 'react';

import { InboxOutlined } from '@ant-design/icons';
import { Button, notification, Upload } from 'antd';
import client from 'api/client';
import SvgLeftArrow from 'components/icon/LeftArrow';
import { EVENTS } from 'helpers/amplitudeEvents';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';

const Amplitude = require('amplitude');

const amplitude = new Amplitude('3403aeb56e840aee5ae422a61c1f3044');

const { Dragger } = Upload;

const Introduce = ({ user }) => {
  const [fileList, changeFileList] = useState([]);
  const [loadings, changeLoadings] = useState([]);
  const [image, changeImage] = useState(null);

  const openNotification = (type, message) => {
    notification[type]({
      message,
    });
  };

  const publish = async () => {
    const mangaData = JSON.parse(localStorage.getItem('mangaStory'));
    const jwt = client.getCookie('feathers-jwt');
    import('api/restClient').then((m) => {
      const res = mangaData.image
        ? m.default.service('/api/v2/uploads').create(
            { uri: mangaData.image },
            {
              headers: { Authorization: `Bearer ${jwt}` },
            }
          )
        : Promise.resolve(null);
      res
        .then((response) => {
          const data = {
            story: mangaData.project_description,
            introduce: mangaData.project_story,
            description: mangaData.project_story,
            title: mangaData.introduce,
            searchingFor: mangaData.collaborators.map((c) => c.label),
            compensationModel: mangaData.compensation ? 'paid' : 'collaboration',
            country: mangaData.country,
            preferredLanguage: mangaData.prefered_language,
            price: mangaData.compensation,
            launchDate: mangaData.date_picker,
            genresIds: mangaData.manga_genres_obj.map((g) => g._id),
          };
          if (response) {
            data.image = response.id;
          }
          return m.default.service('/api/v2/manga-stories').create(data, {
            headers: { Authorization: `Bearer ${jwt}` },
          });
        })
        .then((res) => {
          const data = [
            {
              platform: 'WEB',
              event_type: EVENTS.CREATE_MANGA_STORY,
              user_id: user._id,
              user_properties: {
                ...user,
              },
              event_properties: {
                ...res,
              },
            },
          ];
          amplitude.track(data);
          localStorage.removeItem('mangaStory');
          Router.push(`/manga-story/${res._id}`);
        })
        .catch((err) => {
          openNotification('error', err.message);
          Router.push(`/my-profile`);
        });
    });
  };

  const propsImg = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      changeFileList(newFileList);
    },
    beforeUpload: (file) => {
      changeFileList([...fileList, file]);
      const reader = new FileReader();
      // encode dataURI
      reader.readAsDataURL(file);

      reader.addEventListener(
        'load',
        () => {
          console.log('encoded file: ', reader.result);
          changeImage(reader.result);
        },
        false
      );
      return false;
    },
    fileList,
  };
  useEffect(() => {
    let mangaData = localStorage.getItem('mangaStory');
    mangaData = mangaData ? JSON.parse(mangaData) : {};
    const imageA = image || '';
    changeImage(imageA);
  }, []);

  useEffect(() => {
    let mangaData = localStorage.getItem('mangaStory');
    mangaData = mangaData ? JSON.parse(mangaData) : {};
    mangaData.image = image || '';
    localStorage.setItem('mangaStory', JSON.stringify(mangaData));
  });

  return (
    <>
      <Head></Head>
      <main className="img_page">
        <div className="container collab_container">
          <div className="row collab_radio">
            <div className="col-lg-8">
              <div className="collab_div">
                <div className="logo_img_comp">
                  <img src="/img/logo.png" width="250" alt="" />
                </div>
                <h1 className="collab">Time to catch the eye!</h1>
                <p className="title_text">Add an image that clearly represents your project.</p>
                <Dragger {...propsImg}>
                  <p className="ant-upload-drag-icon proj_image_icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Drag and Drop File Uploading</p>
                </Dragger>
              </div>
              <div className="next_prev">
                <Link href="/create-a-story/language">
                  <Button id="imagePrevBtnId" className="title_but_prev image_previus">
                    <SvgLeftArrow width="13.503px" height="23.619px" />
                    <span> Previous</span>
                  </Button>
                </Link>
                <div className="skip_next">
                  {user ? (
                    <Button
                      id="publishBtnId"
                      type="primary"
                      loading={loadings[2]}
                      onClick={publish}
                      className="title_but">
                      Publish!
                    </Button>
                  ) : (
                    <Link href={'/sign-up'}>
                      <button type="primary" className="title_but">
                        Create account!
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Introduce;
