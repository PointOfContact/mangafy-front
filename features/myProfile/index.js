import React, { useState } from 'react';

import client from 'api/client';
import Footer from 'components/footer';
import Header from 'components/header';
import ProfileContent from 'components/profile/profileContent';
import ProfileOpenCollabs from 'components/profile/profileOpenCollabs';
import ProfileTopBar from 'components/profile/profileTopBar';
import { EVENTS } from 'helpers/amplitudeEvents';
import { beforeUpload } from 'helpers/shared';
import Head from 'next/head';
import PropTypes from 'prop-types';

const Amplitude = require('amplitude');

const amplitude = new Amplitude('3403aeb56e840aee5ae422a61c1f3044');

const MyProfile = (props) => {
  const { user, mangaStories, total, originUrl, profile } = props;
  const { genres: genresEnums } = props;
  const [isMyProfile] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [storyEditMode, setStoryEditMode] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const [userData, setUserData] = useState({
    name: user.name,
    type: user.type,
    content: user.content,
    genresIds: user.genresIds,
  });

  const cancelEditMode = () => {
    setEditMode(false);
    setUserData({ ...userData, name: user.name, type: user.type });
    setErrMessage('');
  };

  const saveUserDataByKey = (...keys) => {
    const data = {};
    keys.forEach((item) => (data[item] = userData[item]));
    const jwt = client.getCookie('feathers-jwt');
    import('../../api/restClient').then((m) => {
      m.default
        .service('/api/v2/users')
        .patch(user._id, data, {
          headers: { Authorization: `Bearer ${jwt}` },
          mode: 'no-cors',
        })
        .then((res) => {
          setUserData(res);
          setEditMode(false);
          setStoryEditMode(false);
        })
        .catch((err) => {
          setErrMessage(err.message);
        });
    });
  };

  const cancelStoryEditMode = () => {
    setStoryEditMode(false);
    setUserData({
      ...userData,
      content: userData.content,
      genresIds: userData.genresIds,
    });
    setErrMessage('');
  };
  const handleChangeGenres = (value, selectedObj) => {
    const data = [
      {
        platform: 'WEB',
        event_type: EVENTS.PROJECT_CREATED,
        user_id: user._id,
        user_properties: {
          ...user,
        },
      },
    ];
    amplitude.track(data);
    const genresIds = selectedObj.map((item) => item._id);
    return setUserData({ ...userData, genresIds });
  };
  const userGenres = genresEnums.filter(
    (item) => userData.genresIds && userData.genresIds.includes(item._id)
  );
  const genres = userGenres.map((item) => item.value);

  return (
    <div className="">
      <Head>
        <title>MangaFY present {user.name}.</title>
        <meta name="description" content={user.name} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main_back_2">
        <Header path="myProfile" user={user} />
        <ProfileTopBar
          {...{
            user,
            beforeUpload,
            editMode,
            userData,
            setEditMode,
            setUserData,
            errMessage,
            cancelEditMode,
            saveUserDataByKey,
            originUrl,
          }}
        />
        <ProfileContent
          {...{
            storyEditMode,
            setStoryEditMode,
            cancelStoryEditMode,
            saveUserDataByKey,
            setUserData,
            user,
            userData,
            userGenres,
            handleChangeGenres,
            mangaStories,
            profile,
            genresEnums,
            genres,
            total,
            isMyProfile,
          }}
        />
        <ProfileOpenCollabs
          {...{
            user,
            total,
            client,
            mangaStories,
          }}
        />
        <Footer />
      </main>
    </div>
  );
};

MyProfile.propTypes = {
  user: PropTypes.object.isRequired,
  mangaStories: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  originUrl: PropTypes.string.isRequired,
  profile: PropTypes.object.isRequired,
  genres: PropTypes.array.isRequired,
};

export default MyProfile;
