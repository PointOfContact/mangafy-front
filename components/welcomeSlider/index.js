import React from 'react';

import client from 'api/client';
import cn from 'classnames';
import SvgWelcomeSliderIco1 from 'components/icon/WelcomeSliderIco1';
import SvgWelcomeSliderIco2 from 'components/icon/WelcomeSliderIco2';
import SvgWelcomeSliderIco3 from 'components/icon/WelcomeSliderIco3';
import Imgix from 'components/imgix';
import Slider from 'react-slick';

import styles from './styles.module.scss';

const WelcomeSlider = () => {
  const settings = {
    infinite: true,
    autoplay: true,
    centerMode: false,
    dots: false,
    arrows: false,
    autoplaySpeed: 5000,
    variableWidth: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          centerMode: true,
        },
      },
    ],
  };

  const users = [
    {
      id: '1',
      src: 'cc4dd418bedc5d0563c4497b3755bb5abe1b173fb1e1c5199948ed7f4fffa1e7.png',
      icon: 'icons/welcome-slider-ico1.svg',
      type: 'reader',
      navURL: '/',
    },
    {
      id: '2',
      src: 'a2e322ac4d2b2c08093857f09c959a8e692c1bf291cb7fd8e197a4d59317b11a.png',
      icon: 'icons/welcome-slider-ico2.svg',
      type: 'writer',
      navURL: '/',
    },
    {
      id: '3',
      src: '256d58d8418e8208cfc477b96fba0e5bdf2c26556440cef25ce7eba9d14ecbde.png',
      icon: 'icons/welcome-slider-ico3.svg',
      type: 'artist',
      navURL: '/',
    },
    {
      id: '4',
      src: '19a4026534069d413702cd4ea4208958731b68b48e85f1dcc7eb3991adf4b43d.png',
      icon: 'icons/welcome-slider-ico1.svg',
      type: 'reader',
      navURL: '/',
    },
    {
      id: '5',
      src: '71df9c80a7f4fc18599e1342fac966c5163b4696dd88224476ee720bcf3bf487.jpeg',
      icon: 'icons/welcome-slider-ico2.svg',
      type: 'writer',
      navURL: '/',
    },
    {
      id: '6',
      src: 'f9c89829fe01a891324c9e0cbc7339bb7a27053919df736a388528421918f845.jpeg',
      icon: 'icons/welcome-slider-ico3.svg',
      type: 'artist',
      navURL: '/',
    },
    {
      id: '8',
      src: 'ea7a49675333bf7d7c83171c9e819d4434b8882c78798b8369ec994f827bfffd.png',
      icon: 'icons/welcome-slider-ico2.svg',
      type: 'writer',
      navURL: '/',
    },
  ];

  const setIconSize = (iconName) => {
    switch (iconName) {
      case 'icons/welcome-slider-ico1.svg':
        return <SvgWelcomeSliderIco1 width={26} height={16} />;
      case 'icons/welcome-slider-ico2.svg':
        return <SvgWelcomeSliderIco2 width={18} height={18} />;
      default:
        return <SvgWelcomeSliderIco3 width={21} height={21} />;
    }
  };

  return (
    <Slider {...settings}>
      {users?.map((user) => (
        // <Link key={user.id} href={user.navURL}>
        //   <a>
        <div key={user.id} className={styles.sliderItem}>
          <Imgix layout="fill" src={client.UPLOAD_URL + user.src} alt="MangaFy user icon" />
          <div className={cn(styles.sliderItem__info, styles.sliderItem__infoOrangeDark)}>
            Hey! I am a {user.type}
            <div className={styles.sliderItem__ico}>{setIconSize(user.icon)}</div>
          </div>
        </div>
        //   </a>
        // </Link>
      ))}
    </Slider>
  );
};

export default WelcomeSlider;
