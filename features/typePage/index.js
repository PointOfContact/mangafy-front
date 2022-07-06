/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';

import { notification } from 'antd';
import client from 'api/client';
import AnimePlatform from 'components/anime-platform';
import Footer from 'components/footer';
import FooterPolicy from 'components/footer-policy';
import Header from 'components/header';
import ModalDiscussion from 'components/modals/discussion';
import ButtonToTop from 'components/ui-elements/button-toTop';
// import FooterLogin from 'features/footerLogin';
import { NextSeo } from 'next-seo';
import Router from 'next/router';
import PropTypes from 'prop-types';
import * as qs from 'query-string';

import BestProfileImages from './bestProfileImages';
import FeedCreateButton from 'components/FeedCreateButton';
import styles from './styles.module.scss';

export default function LandingNew(props) {
  const {
    user,
    posts,
    dailyWarmUps,
    members,
    collaborations,
    getCurrentPostData,
    gallery,
    selectedCategories,
    selectedType,
  } = props;

  const [selectedPost, setSelectedPost] = useState(false);
  const [ogImage, setOgImage] = useState(getCurrentPostData);
  const [likesData, setLikesData] = useState([]);

  const ifOpenNewTab = !!getCurrentPostData;

  useEffect(() => {
    const ifTypeVideo = getCurrentPostData?.imageUrl?.includes('.mp4');

    const image = ifTypeVideo
      ? 'https://mangafy.club/api/v2/uploads/1645708912743-980848197-istockphoto-1017890344-170667a.jpg'
      : getCurrentPostData
      ? client.UPLOAD_URL + getCurrentPostData.imageUrl
      : `https://i.postimg.cc/cCy8qTg7/manga.jpg`;

    setOgImage(image);
  }, [getCurrentPostData]);

  const [showModal, changeShowModal] = useState(ifOpenNewTab);

  useEffect(() => {
    const { postId } = qs.parse(window.location.search);
    if (postId) {
      getPost(postId);
    }
  }, []);

  const getPost = async (postId) => {
    try {
      const newPosts = await client.service('/api/v2/posts').get(postId);
      setSelectedPost(newPosts);
      changeShowModal(true);
    } catch (err) {
      if (err.code === 400) {
        Router.push('/feed', undefined, { scroll: false });
      } else {
        notification.error({
          message: err.message,
          placement: 'bottomLeft',
        });
      }
    }
  };

  return (
    <>
      <NextSeo
        title={
          getCurrentPostData
            ? getCurrentPostData.title
            : 'MangaFY – From story buidling to a full digital release.'
        }
        description={
          getCurrentPostData
            ? getCurrentPostData.subTitle
            : 'The digital hub designed to help you produce your very owm comic or manga. From story buidling to a full digital release.'
        }
        canonical={
          getCurrentPostData
            ? `https://mangafy.club/feed?postId=${getCurrentPostData._id}`
            : 'https://www.mangafy.club'
        }
        openGraph={{
          url: getCurrentPostData
            ? `https://mangafy.club/feed?postId=${getCurrentPostData._id}`
            : 'https://www.mangafy.club',
          title: getCurrentPostData
            ? getCurrentPostData.title
            : 'Start your Graphic Novel Journey and Get Creative with MangaFY',
          description: getCurrentPostData
            ? getCurrentPostData.subTitle
            : 'The digital hub designed to help you produce your very owm comic or manga. From story buidling to a full digital release.',
          images: [
            {
              url: ogImage,
              width: 800,
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
          <Header user={user} />
          <main className={styles.main}>
            <BestProfileImages gallery={gallery} user={user} />
          </main>
        </div>
        {selectedPost && (
          <ModalDiscussion
            changeShowModal={changeShowModal}
            showModal={showModal}
            img={selectedPost.imageUrl}
            logo={selectedPost.logo}
            title={selectedPost.title}
            user={user}
            postId={selectedPost._id}
            likesCount={selectedPost.likesCount}
            ifVideo={selectedPost.imageUrl?.includes('.mp4')}
            logoNavigate={selectedPost.logoNavigate}
            likesData={likesData}
            setLikesData={setLikesData}
          />
        )}
        <Footer user={user} />
        <FooterPolicy />
        {/* <FooterLogin user={user} /> */}
        <FeedCreateButton user={user} />
      </div>
    </>
  );
}

LandingNew.propTypes = {
  user: PropTypes.object,
  posts: PropTypes.array,
  dailyWarmUps: PropTypes.array,
  members: PropTypes.array,
  collaborations: PropTypes.array,
  getCurrentPostData: PropTypes.any,
  gallery: PropTypes.array,
  selectedCategories: PropTypes.func,
  selectedType: PropTypes.func,
};

LandingNew.defaultProps = {
  user: null,
  posts: [],
  dailyWarmUps: [],
  members: [],
  collaborations: [],
  getCurrentPostData: {},
  gallery: [],
  selectedCategories: () => {},
  selectedType: () => {},
};
