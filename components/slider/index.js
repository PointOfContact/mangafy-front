import React from 'react';

import Imgix from 'components/imgix';
import Slider from 'react-slick';

const SimpleSlider = ({}) => {
  const settings = {
    infinite: true,
    autoplay: true,
    dots: true,
    arrows: false,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      <div>
        <Imgix
          layout="responsive"
          width={267}
          height={350}
          quality={50}
          src="https://mangafy.club/img/goal-ico1.webp"
          alt=""
        />
      </div>
      <div>
        <Imgix
          layout="responsive"
          width={267}
          height={350}
          quality={50}
          src="https://mangafy.club/img/goal-ico2.webp"
          alt=""
        />
      </div>
      <div>
        <Imgix
          layout="responsive"
          width={267}
          height={350}
          quality={50}
          src="https://mangafy.club/img/goal-ico3.webp"
          alt=""
        />
      </div>
    </Slider>
  );
};

export default SimpleSlider;
