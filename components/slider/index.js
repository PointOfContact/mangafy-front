import React from 'react';

import cn from 'classnames';
import SvgClock from 'components/icon/Clock';
import SvgPortfolio from 'components/icon/Portfolio';
import moment from 'moment';
import Router from 'next/router';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

import Slider from "react-slick";


const SimpleSlider = ({}) => {
  var settings = {
    infinite: true,
		autoplay: true,
		dots: true,
		arrows: false,
		autoplaySpeed: 3000,
		slidesToShow: 1,
		slidesToScroll: 1
  };

  return (
    <Slider {...settings}>
        <div>
          <img src="/img/goal-ico2.png" alt=""></img>
        </div>
      <div>
        <img src="/img/goal-ico2.png" alt=""></img>
      </div>
      <div>
        <img src="/img/goal-ico2.png" alt=""></img>
      </div>
      <div>
        <img src="/img/goal-ico2.png" alt=""></img>
      </div>
      <div>
        <img src="/img/goal-ico2.png" alt=""></img>
      </div>
    </Slider>
  );
};


export default SimpleSlider;
