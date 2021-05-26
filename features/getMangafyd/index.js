import React from 'react';

import PayPal from 'components/payPal';
import { EVENTS } from 'helpers/amplitudeEvents';
import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';

const Amplitude = require('amplitude');

const amplitude = new Amplitude('3403aeb56e840aee5ae422a61c1f3044');
const GetMangafyd = (props) => {
  const { user } = props;

  const giveItTry = (e) => {
    e.preventDefault();
    const data = [
      {
        platform: 'WEB',
        event_type: EVENTS.GET_MANGAFYD,
        user_id: user._id,
        user_properties: {
          ...user,
        },
      },
    ];
    amplitude.track(data);
  };
  return (
    <div className="get">
      <div>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="format-detection" content="telephone=no" />
          <title />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500;700;900&display=swap"
            rel="stylesheet"
          />
          {/* Favicon */}
          <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
          />
          <link type="text/css" rel="stylesheet" href="/static/css/twenty-twenty.css" />
          <link type="text/css" href="/static/css/jquery.arcticmodal-0.3.css" rel="stylesheet" />
          <link type="text/css" href="/static/css/style.css" rel="stylesheet" />
        </Head>
        <div className="wrapper">
          <header className="header">
            <div className="container"></div>
          </header>
          <div className="section1">
            <div className="container">
              <div className="section1__wrap">
                <div className="section1__logo-mobile">
                  <a href="#">
                    <img src="/img/getmangaf/logo.png" alt="" />
                  </a>
                </div>
                <div className="section1__left">
                  <Link href="/">
                    <a href="#" className="section1__logo">
                      <img src="/img/getmangaf/logo.png" alt="" />
                    </a>
                  </Link>
                  <div className="section1__subtitle subtitle">
                    Love manga? And always dreamed to be manga
                  </div>
                  <div className="section1__title title">
                    MANGAFY YOURSELF - TRANSFORM <br />
                    YOURSELF TO A MANGA CHARACTER
                  </div>
                  <div className="section1__buttons">
                    <a href="#exampleModal" className="btn-get arcticmodal-btn">
                      Get Mangafyed
                    </a>
                  </div>
                </div>
                <div className="section1__right">
                  <div id="container1" className="twentytwenty-container my-container">
                    {/* Изображение "ДО" */}
                    <img src="/img/getmangaf/1.jpg" />
                    {/* Изображение "ПОСЛЕ" */}
                    <img src="/img/getmangaf/img2.png" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section2">
            <div className="container">
              <div className="title">How? follow these simple steps</div>
              <div className="subtitle">
                Turning into anime character has never been easier! Here is a short guide to the
                most painless process.
              </div>
              <div className="section2__wrap">
                <div className="section2__box">
                  <div className="section2__img img1">
                    <div className="ico ico1">
                      <img src="/img/getmangaf/sec2-ico1.svg" alt="" />
                    </div>
                    <div className="circle" />
                  </div>
                  <div className="section2__descr">
                    Chose uour manga style you want to be presented in
                  </div>
                </div>
                <div className="section2__box">
                  <div className="section2__img img2">
                    <div className="ico ico2">
                      <img src="/img/getmangaf/sec2-ico2.svg" alt="" />
                    </div>
                    <div className="circle" />
                  </div>
                  <div className="section2__descr">
                    Upload your photo and give our talented cartoon artists some inspiration
                  </div>
                </div>
                <div className="section2__box last">
                  <div className="section2__img">
                    <div className="ico ico3">
                      <img src="/img/getmangaf/sec2-ico3.svg" alt="" />
                    </div>
                    <div className="circle" />
                  </div>
                  <div className="section2__descr">Submit your order and registration now</div>
                </div>
                <div className="section2__btn-wrap">
                  <a href="#" onClick={giveItTry} className="section2__btn">
                    Give it a try
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="section3">
            <div className="container">
              <div className="section3__wrap">
                <div className="section3__title">
                  Let our team turn you into your desired manga <br />
                  or comic character.
                </div>
                <a href="#" onClick={giveItTry} className="section3__btn">
                  Give it a try
                </a>
              </div>
            </div>
          </div>
          <div className="section4">
            <div className="container">
              <div className="title">
                We provide you proffesional and personal manga <br />
                work that features:
              </div>
              <div className="section4__wrap">
                <div className="section4__box">
                  <div className="section4__img">
                    <img src="/img/getmangaf/s4-ico1.svg" alt="" />
                  </div>
                  <div className="section4__descr">
                    High resoultion digital
                    <br />
                    work
                  </div>
                </div>
                <div className="section4__box">
                  <div className="section4__img">
                    <img src="/img/getmangaf/s4-ico2.svg" alt="" />
                  </div>
                  <div className="section4__descr">
                    Personaly balanaced <br />
                    work - 50% you/ 50% manga
                  </div>
                </div>
                <div className="section4__box">
                  <div className="section4__img">
                    <img src="/img/getmangaf/s4-ico3.svg" alt="" />
                  </div>
                  <div className="section4__descr">
                    Proffesonally hannd drawn <br />
                    original work
                  </div>
                </div>
                <div className="section4__box">
                  <div className="section4__img">
                    <img src="/img/getmangaf/s4-ico4.svg" alt="" />
                  </div>
                  <div className="section4__descr">Social media ready</div>
                </div>
                <div className="section4__box">
                  <div className="section4__img">
                    <img src="/img/getmangaf/s4-ico5.svg" alt="" />
                  </div>
                  <div className="section4__descr">We won&apos;t wtop until you are satisfied</div>
                </div>
              </div>
            </div>
          </div>
          <div className="section5">
            <div className="container">
              <div className="section5__wrap">
                <div className="section5__descr">
                  Want to surprise someone special - we got you covered.
                </div>
                <a href="#" onClick={giveItTry} className="section5__btn">
                  Give it a try
                </a>
              </div>
            </div>
          </div>
          <div className="section6">
            <div className="container">
              <div className="title">Faster upload photos, we will create magic!</div>
              <form>
                <div className="upload-file__wrapper">
                  <input
                    type="file"
                    name="files"
                    id="upload-file__input"
                    className="upload-file__input"
                    multiple
                    accept="image/jpeg,image/png,image/gif"
                  />
                  <label className="upload-file__label" htmlFor="upload-file__input">
                    <span className="upload-file__text">Upload Photo</span>
                  </label>
                </div>
              </form>
            </div>
          </div>
          <div className="section7">
            <div className="containner get">
              <div className="title">Choose style:</div>
              <div className="section7__wrap">
                <div className="section7__box">
                  <div id="container2" className="twentytwenty-container2 my-container2">
                    {/* Изображение "ДО" */}
                    <img src="/img/getmangaf/img2.png" />
                    {/* Изображение "ПОСЛЕ" */}
                    <img src="/img/getmangaf/img2-2.png" />
                  </div>
                  <div className="section7__descr">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod,
                    adipiscing elit.
                  </div>
                  <div className="section7__buy">
                    <div className="section7__price">20 $</div>
                    <a href="#" className="section7__btn">
                      Choose
                    </a>
                  </div>
                </div>
                <div className="section7__box">
                  <div id="container3" className="twentytwenty-container2 my-container2">
                    {/* Изображение "ДО" */}
                    <img src="/img/getmangaf/img2.png" />
                    {/* Изображение "ПОСЛЕ" */}
                    <img src="/img/getmangaf/img2-2.png" />
                  </div>
                  <div className="section7__descr">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod,
                    adipiscing elit.
                  </div>
                  <div className="section7__buy">
                    <div className="section7__price">24 $</div>
                    <a href="#" className="section7__btn">
                      Choose
                    </a>
                  </div>
                </div>
                <div className="section7__box">
                  <div id="container4" className="twentytwenty-container2 my-container2">
                    {/* Изображение "ДО" */}
                    <img src="/img/getmangaf/img2.png" />
                    {/* Изображение "ПОСЛЕ" */}
                    <img src="/img/getmangaf/img2-2.png" />
                  </div>
                  <div className="section7__descr">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod,
                    adipiscing elit.
                  </div>
                  <div className="section7__buy">
                    <div className="section7__price">35 $</div>
                    <a href="#" className="section7__btn">
                      Choose
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section8">
            <div className="container">
              <form className="form">
                <input type="text" className="name" placeholder="Name" />
                <input type="text" className="mail" placeholder="Email" />
                <button className="pay">Pay</button>
              </form>
              <PayPal />
            </div>
          </div>
          <footer className="footer">
            <div className="container">
              <div className="footer__wrap">
                <div className="footer__descr">
                  <div className="text">
                    Are you an artist and want to work with us? <br /> Write to us!
                  </div>
                  <div className="social">
                    <a href="#" className="social__btn">
                      <img src="/img/getmangaf/twitter.svg" alt="" />
                    </a>
                    <a href="#" className="social__btn">
                      <img src="/img/getmangaf/fb.svg" alt="" />
                    </a>
                    <a href="#" className="social__btn">
                      <img src="/img/getmangaf/inst.svg" alt="" />
                    </a>
                  </div>
                </div>
                <div className="footer__made">
                  made with
                  <svg
                    width={13}
                    height={13}
                    viewBox="0 0 13 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9.54688 0.761719C8.84145 0.761719 8.1947 0.985258 7.62463 1.42614C7.07809 1.84882 6.71422 2.38718 6.5 2.77865C6.28578 2.38715 5.92191 1.84882 5.37537 1.42614C4.8053 0.985258 4.15855 0.761719 3.45312 0.761719C1.48454 0.761719 0 2.37192 0 4.50719C0 6.81403 1.85207 8.39234 4.65585 10.7817C5.13198 11.1874 5.67166 11.6474 6.23259 12.1379C6.30652 12.2026 6.40148 12.2383 6.5 12.2383C6.59852 12.2383 6.69348 12.2026 6.76741 12.1379C7.32839 11.6473 7.86805 11.1874 8.34445 10.7814C11.1479 8.39234 13 6.81403 13 4.50719C13 2.37192 11.5155 0.761719 9.54688 0.761719Z"
                      fill="#7B65F3"
                    />
                  </svg>
                </div>
                <div className="footer__copy">© 2021 MangaFy Inc. All rights reserved</div>
              </div>
            </div>
          </footer>
          <div className="modal">
            <div className="box-modal" id="exampleModal">
              <div className="box-modal_close arcticmodal-close" />
              <div className="title">Thank you.</div>
              <div className="subtitle">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis non molestiae
                debitis at numquam temporibus fuga magni, voluptas assumenda libero, nam est nisi
                quo dolorem aliquid accusamus ipsam nesciunt laboriosam.
              </div>
              <div className="follow">Follow us</div>
              <div className="social">
                <a href="#" className="social__btn">
                  <img src="/img/getmangaf/twitter.svg" alt="" />
                </a>
                <a href="#" className="social__btn">
                  <img src="/img/getmangaf/fb.svg" alt="" />
                </a>
                <a href="#" className="social__btn">
                  <img src="/img/getmangaf/inst.svg" alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <script type="text/javascript" src="/static/jq.js"></script>
      <script type="text/javascript" src="/static/libs/jquery.inputmask.bundle.js"></script>
      <script type="text/javascript" src="/static/js/jq.event.move.js"></script>
      <script type="text/javascript" src="/static/js/jq.twenty-twenty.js"></script>
      <script type="text/javascript" src="/static/js/jquery.arcticmodal-0.3.min.js"></script>
      <script type="text/javascript" src="/static/js/main.js"></script>
    </div>
  );
};

GetMangafyd.propTypes = {
  user: PropTypes.object,
};

GetMangafyd.defaultProps = {
  user: {},
};

export default GetMangafyd;
