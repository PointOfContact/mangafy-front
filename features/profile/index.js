/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import client from 'api/client';
import cn from 'classnames';
import Footer from 'components/footer';
import FooterPolicy from 'components/footer-policy';
import HeaderNew from 'components/headerNew';
import ProfileContent from 'components/profile/profileContent';
import ProfileOpenCollabs from 'components/profile/profileOpenCollabs';
import ProfileTopBar from 'components/profile/profileTopBar';
import ButtonToTop from 'components/ui-elements/button-toTop';
import FooterLogin from 'features/footerLogin';
import { EVENTS } from 'helpers/amplitudeEvents';
import { beforeUploadBase64 } from 'helpers/shared';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';

import styles from './styles.module.scss';

const Profile = (props) => {
  const router = useRouter();
  const { user, profile, userProfile, originUrl } = props;
  const ifMyProfile = user?._id === profile?._id;
  const mangaStoriesMyProfile = userProfile?.mangaStories?.data;
  const [mangaStories, setMangaStories] = useState(profile?.mangaStories?.data);
  const total = ifMyProfile ? userProfile?.mangaStories?.data : profile?.mangaStories?.data?.length;
  const { genres: genresEnums } = props;
  const { genresUser: genresMyProfileEnums } = props;
  const [editMode, setEditMode] = useState(false);
  const [loadingImg, setLoadingImg] = useState(false);
  const [storyEditMode, setStoryEditMode] = useState(false);
  const ifOwner = user?._id === router.query.pid;
  const [showModalEdit, setShowModalEdit] = useState(ifOwner && router.query.editModal === 'true');
  const [errMessage, setErrMessage] = useState('');
  const [userData, setUserData] = useState({
    name: user?.name,
    type: user?.type,
    types: user?.types,
    content: user?.content,
    genresIds: user?.genresIds,
    galleryLikedUsers: user?.galleryLikedUsers,
    avatar: user?.avatar,
  });

  const profileGenres = genresEnums?.data?.filter(
    (item) => profile.genresIds && profile.genresIds.includes(item._id)
  );

  const userGenres = genresMyProfileEnums?.filter(
    (item) => userData.genresIds && userData.genresIds.includes(item._id)
  );

  const genres = userGenres.map((item) => item.value);

  const gallerys = profile?.gallery
    .filter((item) => !(item?.image?.slice(-3) === 'pdf' || item?.image?.slice(-3) === 'PDF'))
    .map((gallery) => ({
      url: `https://mangafy.club/api/v2/uploads/${gallery}`,
      width: 800,
      height: 600,
      alt: 'MangaFy gallery',
    }));

  const userImg = {
    url: `https://mangafy.club/api/v2/uploads/${profile.avatar}`,
    width: 800,
    height: 600,
    alt: 'MangaFy user avatar',
  };

  const cancelEditMode = () => {
    setEditMode(false);
    setUserData({ ...userData, name: user.name, type: user.type });
    setErrMessage('');
  };

  const saveUserDataByKey = (...keys) => {
    const data = {};
    keys.forEach((item) => (data[item] = userData[item]));
    if (data?.name) {
      data.name = data.name?.replace(/  +/g, ' ');
    }
    const jwt = client.getCookie('feathers-jwt');
    import('../../api/restClient').then((m) => {
      m.default
        .service('/api/v2/users')
        .patch(user?._id, data, {
          headers: { Authorization: `Bearer ${jwt}` },
          mode: 'no-cors',
        })
        .then((res) => {
          if (data.type) {
            const event = {
              event_type: EVENTS.ADDED_USER_TYPES,
              event_properties: { type: res.type },
            };
            myAmplitude(event);
          }
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
        event_type: EVENTS.ADDED_GENRES,
      },
    ];
    myAmplitude(data);
    const genresIds = selectedObj.map((item) => item._id);
    return setUserData({ ...userData, genresIds });
  };

  const images = [userImg, ...gallerys];
  const bioUser = props?.profile?.content;

  return (
    <>
      <NextSeo
        title={`Let's give a big hello to ${profile.name}!`}
        description={`Check their work or cool projects at MangaFY. Welcome aboard. ${
          bioUser && bioUser
        }`}
        canonical={`https://mangafy.club/profile/${profile._id}`}
        openGraph={{
          url: `https://mangafy.club/profile/${profile._id}`,
          title: `Let's give a big hello to ${profile.name}!`,
          description: `Check their work or cool projects at MangaFY. Welcome aboard. ${
            bioUser && bioUser
          }`,
          images: [
            {
              url: !images[0].url.includes('undefined')
                ? images[0].url
                : 'https://mangafy.club/img/collab_baner.webp',
              height: 600,
              alt: 'manga',
            },
          ],
          site_name: 'MangaFY',
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
      <ButtonToTop user={user} />
      <div className={'wrapper'}>
        <div className={'content'}>
          <HeaderNew user={user} />
          <main>
            <section className={cn(styles.container)}>
              <div className="container">
                <ProfileTopBar
                  {...{
                    user,
                    profile,
                    beforeUploadBase64,
                    editMode,
                    userData,
                    setEditMode,
                    setUserData,
                    errMessage,
                    setErrMessage,
                    cancelEditMode,
                    saveUserDataByKey,
                    originUrl,
                    ifMyProfile,
                    setLoadingImg,
                    loadingImg,
                    genresMyProfileEnums,
                    userGenres,
                    genres,
                    handleChangeGenres,
                    showModalEdit,
                    setShowModalEdit,
                  }}
                />
              </div>
            </section>

            <section>
              <div className={cn('container', styles.container_profile)}>
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
                    profileGenres,
                    handleChangeGenres,
                    mangaStories,
                    mangaStoriesMyProfile,
                    profile,
                    genresMyProfileEnums,
                    genres,
                    total,
                    ifMyProfile,
                  }}
                />
              </div>
            </section>
            {/* <section>
              <div className={cn(styles.container, 'container')}>
                <ProfileOpenCollabs
                  {...{
                    user,
                    total,
                    client,
                    mangaStoriesMyProfile,
                    mangaStories,
                    setMangaStories,
                    ifMyProfile,
                  }}
                />
              </div>
            </section> */}
          </main>
        </div>
        {!user && <Footer user={user} />}
        {!user && <FooterPolicy />}
        <FooterLogin user={user} />
      </div>
    </>
  );
};

Profile.propTypes = {
  mangaStoriesMyProfile: PropTypes.array,
  profile: PropTypes.object.isRequired,
  user: PropTypes.object,
  total: PropTypes.number,
  limit: PropTypes.number,
  genres: PropTypes.object.isRequired,
  originUrl: PropTypes.string,
};

Profile.defaultProps = {
  mangaStoriesMyProfile: [],
  user: null,
  search: '',
  limit: 9,
  originUrl: '',
  total: null,
};

export default Profile;
