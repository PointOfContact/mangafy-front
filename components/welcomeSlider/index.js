import React from 'react';

import Imgix from 'components/imgix';
import Slider from 'react-slick';
import cn from 'classnames';

import styles from './styles.module.scss';

const WelcomeSlider = ({}) => {
    const settings = {  
        infinite: true,
        autoplay: true,
        centerMode: false,
        dots: false,
        arrows: false,
        autoplaySpeed: 2000,
        variableWidth: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
		{
			breakpoint: 767,
			settings: {
				centerMode: true
			}
		}
		]
    };

    return (
        <Slider {...settings}>
            <div className={styles.sliderItem}>
                <img src="img/welcome-slider-ico1.png" />
                <div className={cn(styles.sliderItem__info, styles.sliderItem__infoOrangeDark)}>
                    Hey! I am a reader
                    <div className={styles.sliderItem__ico}>
                        <img src="icons/welcome-slider-ico1.svg" />
                    </div>
                </div>
            </div>
            <div className={styles.sliderItem}>
                <img src="img/slider-ico2.png" />
                <div className={cn(styles.sliderItem__info)}>
                    Hey! I am a writer
                    <div className={styles.sliderItem__ico}>
                        <img src="icons/welcome-slider-ico2.svg" />
                    </div>
                </div>
            </div>
            <div className={styles.sliderItem}>
                <img src="img/slider-ico3.png" />
                <div className={cn(styles.sliderItem__info, styles.sliderItem__infoPrimaryLight)}>
                    Hey! I'm an artist
                    <div className={styles.sliderItem__ico}>
                        <img src="icons/welcome-slider-ico3.svg" />
                    </div>
                </div>
            </div>
            <div className={styles.sliderItem}>
                <img src="img/slider-ico4.png" />
                <div className={cn(styles.sliderItem__info, styles.sliderItem__infoOrangeDark)}>
                    Hey! I am a reader
                    <div className={styles.sliderItem__ico}>
                        <img src="icons/welcome-slider-ico1.svg" />
                    </div>
                </div>
            </div>
            <div className={styles.sliderItem}>
                <img src="img/slider-ico2.png" />
                <div className={cn(styles.sliderItem__info)}>
                    Hey! I am a writer
                    <div className={styles.sliderItem__ico}>
                        <img src="icons/welcome-slider-ico2.svg" />
                    </div>
                </div>
            </div>
            <div className={styles.sliderItem}>
                <img src="img/welcome-slider-ico1.png" />
                <div className={cn(styles.sliderItem__info, styles.sliderItem__infoOrangeDark)}>
                    Hey! I am a reader
                    <div className={styles.sliderItem__ico}>
                        <img src="icons/welcome-slider-ico1.svg" />
                    </div>
                </div>
            </div>
            <div className={styles.sliderItem}>
                <img src="img/slider-ico2.png" />
                <div className={cn(styles.sliderItem__info, styles.sliderItem__infoPrimaryLight)}>
                    Hey! I'm an artist
                    <div className={styles.sliderItem__ico}>
                        <img src="icons/welcome-slider-ico3.svg" />
                    </div>
                </div>
            </div>
            <div className={styles.sliderItem}>
                <img src="img/slider-ico3.png" />
                <div className={cn(styles.sliderItem__info)}>
                    Hey! I am a writer
                    <div className={styles.sliderItem__ico}>
                        <img src="icons/welcome-slider-ico2.svg" />
                    </div>
                </div>
            </div>
            <div className={styles.sliderItem}>
                <img src="img/slider-ico4.png" />
                <div className={cn(styles.sliderItem__info, styles.sliderItem__infoOrangeDark)}>
                    Hey! I am a writer
                    <div className={styles.sliderItem__ico}>
                        <img src="icons/welcome-slider-ico1.svg" />
                    </div>
                </div>
            </div>
        </Slider>
    );
};

export default WelcomeSlider;
