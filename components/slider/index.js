import React from 'react';

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
        <img src="/img/goal-ico2.webp" alt=""></img>
      </div>
      <div>
        <img src="/img/goal-ico2.webp" alt=""></img>
      </div>
      <div>
        <img src="/img/goal-ico2.webp" alt=""></img>
      </div>
      <div>
        <img src="/img/goal-ico2.webp" alt=""></img>
      </div>
      <div>
        <img src="/img/goal-ico2.webp" alt=""></img>
      </div>
    </Slider>
  );
};

export default SimpleSlider;
