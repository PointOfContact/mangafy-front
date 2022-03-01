/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-return-assign */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable guard-for-in */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-cond-assign */
/* eslint-disable no-bitwise */
/* eslint-disable no-shadow */
/* eslint-disable no-sequences */
/* eslint-disable no-multi-assign */
import React, { useEffect, useState } from 'react';

import { NextSeo } from 'next-seo';
import Head from 'next/head';
import PropTypes from 'prop-types';

const NewLending = ({ user }) => {
  const [loadedScriptsCount, setLoadedScriptsCount] = useState(0);

  useEffect(() => {
    window.scriptLoad = () => {
      setLoadedScriptsCount((s) => s + 1);
    };
  }, []);

  useEffect(() => {
    if (loadedScriptsCount < 4) return;

    (function (e) {
      const n = {};
      function i(o) {
        if (n[o]) return n[o].exports;
        const t = (n[o] = { i: o, l: !1, exports: {} });
        return e[o].call(t.exports, t, t.exports, i), (t.l = !0), t.exports;
      }
      (i.m = e),
        (i.c = n),
        (i.d = function (e, n, o) {
          i.o(e, n) || Object.defineProperty(e, n, { enumerable: !0, get: o });
        }),
        (i.r = function (e) {
          typeof Symbol !== 'undefined' &&
            Symbol.toStringTag &&
            Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
            Object.defineProperty(e, '__esModule', { value: !0 });
        }),
        (i.t = function (e, n) {
          if ((1 & n && (e = i(e)), 8 & n)) return e;
          if (4 & n && typeof e === 'object' && e && e.__esModule) return e;
          const o = Object.create(null);
          if (
            (i.r(o),
            Object.defineProperty(o, 'default', { enumerable: !0, value: e }),
            2 & n && typeof e !== 'string')
          )
            for (const t in e) i.d(o, t, ((n) => e[n]).bind(null, t));
          return o;
        }),
        (i.n = function (e) {
          const n =
            e && e.__esModule
              ? function () {
                  return e.default;
                }
              : function () {
                  return e;
                };
          return i.d(n, 'a', n), n;
        }),
        (i.o = function (e, n) {
          return Object.prototype.hasOwnProperty.call(e, n);
        }),
        (i.p = ''),
        i((i.s = 0));
    })([
      function (e, n) {
        function i(e, n, i) {
          return (
            n in e
              ? Object.defineProperty(e, n, {
                  value: i,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[n] = i),
            e
          );
        }

        (() => {
          let e;
          AOS.init({ startEvent: 'load' });
          new Vivus('anim-svg-cube', {
            type: 'delayed',
            duration: 200,
            animTimingFunction: Vivus.EASE,
          }),
            new Vivus('anim-cube-1', {
              type: 'delayed',
              duration: 200,
              animTimingFunction: Vivus.EASE,
            }),
            new Vivus('anim-cube-2', {
              type: 'delayed',
              duration: 200,
              animTimingFunction: Vivus.EASE,
            }),
            new Vivus('anim-cube-3', {
              type: 'delayed',
              duration: 200,
              animTimingFunction: Vivus.EASE,
            }),
            new Vivus('anim-cube-4', {
              type: 'delayed',
              duration: 200,
              animTimingFunction: Vivus.EASE,
            }),
            new Vivus('anim-cube-5', {
              type: 'delayed',
              duration: 200,
              animTimingFunction: Vivus.EASE,
            }),
            new Vivus('anim-cube-6', {
              type: 'delayed',
              duration: 200,
              animTimingFunction: Vivus.EASE,
            });
          $('.who-are-you__slider').slick(
            (i(
              (e = {
                slidesToShow: 1,
                infinite: !0,
                centerMode: !0,
                variableWidth: !0,
                adaptiveHeight: !1,
                dots: !1,
                arrows: !0,
                focusOnSelect: !0,
                slidesToScroll: 1,
              }),
              'focusOnSelect',
              !0
            ),
            i(e, 'responsive', [
              { breakpoint: 767, settings: { slidesToShow: 1, variableWidth: !0 } },
            ]),
            e)
          ),
            $('.slider-item').click(function () {
              const e = $(this).data('card');
              $('.who-are-you__descr-item').removeClass('active'),
                $(`.who-are-you__descr-item[data-card='${e}']`).addClass('active');
            }),
            $('.mob-mnu-btn').click(() => {
              $('.mob-mnu').addClass('open'), $('body').addClass('nav-sidebar-open');
            }),
            $('.mob-mnu__close').click(() => {
              $('.mob-mnu').removeClass('open'), $('body').removeClass('nav-sidebar-open');
            });
          const n = $('.button-to-top');
          $(window).scroll(() => {
            $(window).scrollTop() > 150 ? n.addClass('show') : n.removeClass('show');
          }),
            n.on('click', (e) => {
              e.preventDefault(), $('html, body').animate({ scrollTop: 0 }, '300');
            }),
            $('.creating__cards').slick({
              infinite: !1,
              slidesToScroll: 1,
              arrows: !1,
              dots: !1,
              variableWidth: !0,
              focusOnSelect: !0,
            }),
            $('.colab__nav').slick({
              infinite: !1,
              slidesToScroll: 1,
              arrows: !1,
              dots: !1,
              variableWidth: !0,
              focusOnSelect: !0,
            }),
            $(window).width() < 767
              ? ($('.creating__cards').slick('refresh'), $('.colab__nav').slick('refresh'))
              : ($('.creating__cards').slick('unslick'), $('.colab__nav').slick('unslick')),
            $(window).on('resize', () => {
              $(window).width() < 767
                ? ($('.creating__cards').slick('refresh'), $('.colab__nav').slick('refresh'))
                : ($('.creating__cards').slick('unslick'), $('.colab__nav').slick('unslick'));
            });
          const o = $('.who-are-you__slider');
          const t = $('.progress');
          const a = $('.creating__cards');
          const r = $('.progress-creating');
          const s = $('.colab__nav');
          const c = $('.progress-nav');
          function l(e) {
            const n = ((e + 1) / s.slick('getSlick').slideCount) * 100;
            c.css('background-size', ''.concat(n, '% 100%')).attr('aria-valuenow', n);
          }
          o.on('beforeChange', (e, n, i, a) => {
            let r;
            (r = ((a + 1) / o.slick('getSlick').slideCount) * 100),
              t.css('background-size', ''.concat(r, '% 100%')).attr('aria-valuenow', r);
          }),
            a.on('beforeChange', (e, n, i, o) => {
              let t;
              (t = ((o + 1) / a.slick('getSlick').slideCount) * 100),
                r.css('background-size', ''.concat(t, '% 100%')).attr('aria-valuenow', t);
            }),
            s.on('beforeChange', (e, n, i, o) => {
              l(o);
            }),
            l(0),
            $(window).scroll(() => {
              $(document).scrollTop() > 100
                ? $('.header').addClass('f-top')
                : $('.header').removeClass('f-top');
            }),
            $('.colab__nav-item')
              .click(function () {
                $('.colab__nav-item').removeClass('active').eq($(this).index()).addClass('active'),
                  $('.colab__tab').stop().slideUp().eq($(this).index()).stop().slideDown();
              })
              .eq(0)
              .addClass('active'),
            $('a.anchor').click(function (e) {
              return (
                e.preventDefault(),
                $('html, body').animate(
                  { scrollTop: `${$($(this).attr('href')).offset().top}px` },
                  { duration: 100, easing: 'swing' }
                ),
                !1
              );
            }),
            $('a.anchor-mob').click(function (e) {
              return (
                e.preventDefault(),
                $('body').removeClass('nav-sidebar-open'),
                $('html, body').animate(
                  { scrollTop: `${$($(this).attr('href')).offset().top + 100}px` },
                  { duration: 100, easing: 'swing' }
                ),
                !1
              );
            });
        })();
      },
    ]);
  }, [loadedScriptsCount]);

  return (
    <>
      <NextSeo
        title="Creating webcomics alone is tough"
        description="MangaFY Community Collaboration Platform. To create and promote webcomics, you need more than one person, you need a team and everyone does their job."
        canonical="https://mangafy.club/feed"
        openGraph={{
          url: 'https://mangafy.club/feed',
          title: 'Creating webcomics alone is tough',
          description:
            'MangaFY Community Collaboration Platform. To create and promote webcomics, you need more than one person, you need a team and everyone does their job.',
          type: 'article',
          images: [
            {
              url: 'https://mangafy.club/api/v2/uploads/1646134866432-334418070-metaData.png',
              width: 800,
              height: 600,
              alt: 'Manga Story Image',
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
      <Head>
        <title>Creating webcomics alone is tough</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;900&display=swap"
          rel="stylesheet"
        />
        <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
        <link
          rel="preload"
          href="https://cdn.jsdelivr.net/gh/kenwheeler/slick@1.8.1/slick/slick.css"
          as="style"
          onLoad="this.rel='stylesheet'"
          media="all"
        />

        <link rel="icon" type="image/x-icon" href="lendingImages/favicon.png" />

        <script
          onLoad="window.scriptLoad()"
          src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"
        />
        <script
          onLoad="window.scriptLoad()"
          src="https://cdnjs.cloudflare.com/ajax/libs/vivus/0.4.6/vivus.min.js"
        />
        <script onLoad="window.scriptLoad()" src="https://unpkg.com/aos@2.3.1/dist/aos.js" />
        <script
          onLoad="window.scriptLoad()"
          src="https://cdn.jsdelivr.net/gh/kenwheeler/slick@1.8.1/slick/slick.min.js"
        />
      </Head>
      <body>
        <div className="main-wrapper">
          <div className="wrapper">
            <a className="button-to-top"> </a>
            <div className="mob-mnu">
              <div className="ico">
                <img src="lendingImages/dist/mob-ico.png" alt="MangaFy landing image" />
              </div>
              <div className="mob-mnu__topline">
                <a href="#" className="header__logo">
                  <img src="lendingImages/dist/logo.png" alt="MangaFy landing image" />
                </a>
                <div className="mob-mnu__close">
                  <div className="bar"></div>
                  <div className="bar"></div>
                </div>
              </div>
              <div className="mob-mnu__wrap">
                <div className="mob-nav">
                  <a href="#problem" className="mob-nav__item anchor-mob">
                    Problem
                  </a>
                  <a href="#solution" className="mob-nav__item anchor-mob">
                    Solution
                  </a>
                  <a href="#features" className="mob-nav__item anchor-mob">
                    Features
                  </a>
                  <div className="social">
                    <a href="#" className="social__item">
                      <img src="lendingImages/dist/soc-ico1.png" alt="MangaFy landing image" />
                    </a>
                    <a href="#" className="social__item">
                      <img src="lendingImages/dist/soc-ico2.png" alt="MangaFy landing image" />
                    </a>
                    <a href="#" className="social__item">
                      <img src="lendingImages/dist/soc-ico3.png" alt="MangaFy landing image" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="main">
              <header className="header">
                <div className="header__wrap">
                  <a href="#" className="header__logo">
                    <img src="lendingImages/dist/logo.svg" alt="MangaFy landing image" />
                  </a>
                  <ul className="nav">
                    <li>
                      <a href="#problem" className="anchor">
                        Problem
                      </a>
                    </li>
                    <li>
                      <a href="#solution" className="anchor">
                        Solution
                      </a>
                    </li>
                    <li>
                      <a href="#features" className="anchor">
                        Features
                      </a>
                    </li>
                  </ul>
                  <a href="https://mangafy.club/sign-in" className="btn-access">
                    Request early access
                  </a>
                  <div className="mob-mnu-btn">
                    <div className="ico-menu">
                      <div className="bar"></div>
                      <div className="bar"></div>
                      <div className="bar"></div>
                    </div>
                  </div>
                </div>
              </header>
              <div className="main__anim-text">
                <div className="line">
                  <marquee
                    behavior="scroll"
                    weight="150"
                    loop="infinity"
                    truespeed="200"
                    scrolldelay="30">
                    <img src="lendingImages/dist/anim-text1.svg" alt="MangaFy landing image" />
                  </marquee>
                </div>
                <div className="line">
                  <marquee
                    behavior="scroll"
                    weight="150"
                    loop="infinity"
                    truespeed="200"
                    scrolldelay="30"
                    direction="right">
                    <img src="lendingImages/dist/anim-text1.svg" alt="MangaFy landing image" />
                  </marquee>
                </div>
                <div className="line">
                  <marquee
                    behavior="scroll"
                    weight="150"
                    loop="infinity"
                    truespeed="200"
                    scrolldelay="20">
                    <img src="lendingImages/dist/anim-text1.svg" alt="MangaFy landing image" />
                  </marquee>
                </div>
              </div>
              <div className="main__wrapper">
                <div className="main__wrap">
                  <div className="main__logo">
                    <img src="lendingImages/dist/main-logo2.svg" alt="MangaFy landing image" />
                  </div>
                  <div className="main__icons">
                    <div className="circle"></div>
                    <div className="img1">
                      <img src="lendingImages/dist/main-ico1.png" alt="MangaFy landing image" />
                    </div>
                    <div className="img2 lightning">
                      <img
                        src="lendingImages/dist/main-lightning.png"
                        alt="MangaFy landing image"
                      />
                    </div>
                    <div className="ico1" data-aos="zoom-in-up" data-aos-duration="1000">
                      <img src="lendingImages/dist/main-hero1.png" alt="MangaFy landing image" />
                    </div>
                    <div
                      className="ico2"
                      data-aos="fade-down-right"
                      data-aos-duration="3000"
                      data-aos-delay="300">
                      <img src="lendingImages/dist/main-hero2.png" alt="MangaFy landing image" />
                    </div>
                    <div
                      className="ico3"
                      data-aos="fade-down-left"
                      data-aos-duration="2000"
                      data-aos-delay="500">
                      <img src="lendingImages/dist/main-hero3.png" alt="MangaFy landing image" />
                    </div>
                  </div>
                  <div className="main__bot">
                    <div className="main__text">Community Collaboration Platform</div>
                    <a href="https://mangafy.club/sign-in" className="main__btn">
                      Request early access
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="creating" id="problem">
              <div className="container">
                <div className="creating__wrap">
                  <div className="creating__content">
                    <div
                      className="creating__ttl"
                      data-aos="fade-up"
                      data-aos-delay="100"
                      data-aos-offset="300">
                      <span className="line">
                        <b>Creating</b>
                      </span>
                      webcomics alone is tough
                    </div>
                    <div className="creating__cards">
                      <div
                        className="creating__cards-item"
                        data-aos="fade-right"
                        data-aos-delay="500">
                        <div className="wrap">
                          <div className="ttl">No time for art</div>
                          <div className="tetx">
                            There are too many stuff to do alone, which leaves no time for focused
                            actually art.
                          </div>
                        </div>
                      </div>
                      <div
                        className="creating__cards-item"
                        data-aos="fade-right"
                        data-aos-delay="600">
                        <div className="wrap">
                          <div className="ttl">Hard to organize</div>
                          <div className="tetx">
                            Working with a lot of and not dedicated tools to organize all thoughts
                            is annoying.
                          </div>
                        </div>
                      </div>
                      <div
                        className="creating__cards-item"
                        data-aos="fade-right"
                        data-aos-delay="700">
                        <div className="wrap">
                          <div className="ttl">Lack of skills</div>
                          <div className="tetx">
                            To create and promote webcomics, you need more than one person, you need
                            a team and everyone does their job.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="progress progress-creating"
                      role="progressbar"
                      aria-valuemin="0"
                      aria-valuemax="100"></div>
                  </div>
                  <div className="creating__right">
                    <div className="creating__mask">
                      <img src="lendingImages/dist/creating-bg1.png" alt="MangaFy landing image" />
                    </div>
                    <div className="creating__video">
                      <video
                        autoPlay="autoplay"
                        preload="auto"
                        no-controls
                        autoPlay
                        loop
                        playsinline
                        muted>
                        <source src="lendingImages/dist/video.mp4" type="video/mp4" />
                      </video>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="platform">
              <div className="container">
                <div className="platform__wrap">
                  <div className="platform__content">
                    <div className="creating__ttl" data-aos="fade-up" data-aos-delay="100">
                      <span className="line">
                        <b>MangaFY</b>
                      </span>
                      Community Collaboration Platform
                    </div>
                    <div className="platform__text" data-aos="fade-up" data-aos-delay="300">
                      We believe the fate of webcomics creation will be decided at the frontier of
                      technological innovation and human collaboration. To create and promote
                      webcomics, you need more than one person, you need a team and everyone does
                      their job.
                    </div>
                    <a href="https://mangafy.club/sign-in" className="platform__btn">
                      Request early access
                    </a>
                  </div>
                  <div className="platform__scheme">
                    <div className="center">
                      <object
                        type="image/svg+xml"
                        data="lendingImages/dist/platform-cube-ico.svg"></object>
                    </div>
                    <div className="line">
                      <object
                        id="anim-svg-cube"
                        type="image/svg+xml"
                        data="lendingImages/dist/cube-bg.svg"></object>
                    </div>
                    <div className="item it1">
                      <div className="cube">
                        <object
                          id="anim-cube-1"
                          type="image/svg+xml"
                          data="lendingImages/dist/cube1.svg"></object>
                      </div>
                      <img src="lendingImages/dist/cube-img1.svg" alt="MangaFy landing image" />
                    </div>
                    <div className="item it2">
                      <div className="cube">
                        <object
                          id="anim-cube-2"
                          type="image/svg+xml"
                          data="lendingImages/dist/cube2.svg"></object>
                      </div>
                      <img src="lendingImages/dist/cube-img2.svg" alt="MangaFy landing image" />
                    </div>
                    <div className="item it3">
                      <div className="cube">
                        <object
                          id="anim-cube-3"
                          type="image/svg+xml"
                          data="lendingImages/dist/cube3.svg"></object>
                      </div>
                      <img src="lendingImages/dist/cube-img3.svg" alt="MangaFy landing image" />
                    </div>
                    <div className="item it4">
                      <div className="cube">
                        <object
                          id="anim-cube-4"
                          type="image/svg+xml"
                          data="lendingImages/dist/cube4.svg"></object>
                      </div>
                      <img src="lendingImages/dist/cube-img4.svg" alt="MangaFy landing image" />
                    </div>
                    <div className="item it5">
                      <div className="cube">
                        <object
                          id="anim-cube-5"
                          type="image/svg+xml"
                          data="lendingImages/dist/cube5.svg"></object>
                      </div>
                      <img src="lendingImages/dist/cube-img5.svg" alt="MangaFy landing image" />
                    </div>
                    <div className="item it6">
                      <div className="cube">
                        <object
                          id="anim-cube-6"
                          type="image/svg+xml"
                          data="lendingImages/dist/cube6.svg"></object>
                      </div>
                      <img src="lendingImages/dist/cube-img6.svg" alt="MangaFy landing image" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="colab" id="features">
              <div className="container">
                <div className="colab__wrap">
                  <div className="ico2 lightning">
                    <img src="lendingImages/dist/lightning.png" alt="MangaFy landing image" />
                  </div>
                  <div className="colab__ttl" data-aos="fade-up">
                    Collaborative creating is a solution for modern webcomics creation culture
                  </div>
                  <div className="colab__subttl" data-aos="fade-up" data-aos-delay="300">
                    Here’s what you can do with <b>MangaFY</b>
                  </div>
                  <div className="colab__nav">
                    <div className="colab__nav-item active">
                      <div className="ico">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.419 32.097">
                          <defs>
                            <style>
                              {`
                         .a856e830-e619-44cf-b1c0-e687401a9f1c {
                          fill: none;
                          stroke: #000;
                          stroke-linecap: round;
                          stroke-linejoin: round;
                          stroke-width: 2px;
                        }
                        `}
                            </style>
                          </defs>
                          <g id="a720759d-c714-4616-9c1f-d6ff38d1674e" data-name="Слой 2">
                            <g id="ae3a4bb9-0638-4aba-b741-435ce28aec86" data-name="Слой 5">
                              <path
                                className="a856e830-e619-44cf-b1c0-e687401a9f1c"
                                d="M1 1h23.903v23.903H1z"
                              />
                              <path
                                className="a856e830-e619-44cf-b1c0-e687401a9f1c"
                                d="M6.806 28.774v2.323h23.613V7.194H28.29M12.613 7.484V19M7 13h11.516"
                              />
                            </g>
                          </g>
                        </svg>
                      </div>
                      <div className="text">Create</div>
                    </div>
                    <div className="colab__nav-item">
                      <div className="ico">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.516 33.581">
                          <defs>
                            <style>
                              {` .b67fb6ee-66c1-43cb-8347-2c1bc26b78ed {
                            fill: none;
                            stroke: #000;
                            stroke-linecap: round;
                            stroke-linejoin: round;
                            stroke-width: 2px;
                          }`}
                            </style>
                          </defs>
                          <g id="e3598b53-cd22-4323-bd69-59a14a036c7e" data-name="Слой 2">
                            <g id="efe3d1e5-eae0-420f-9867-a62b8092b686" data-name="Слой 2">
                              <path
                                className="b67fb6ee-66c1-43cb-8347-2c1bc26b78ed"
                                d="M1 14.452 31.516 2.387 19.71 32.581l-5.033-13.258L1 14.452zM4.806 1v7.161M1.226 4.71h7.161"
                              />
                            </g>
                          </g>
                        </svg>
                      </div>
                      <div className="text">Connect</div>
                    </div>
                    <div className="colab__nav-item">
                      <div className="ico">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.532 34.532">
                          <defs>
                            <style>
                              {`  .ad1a81ee-041c-477f-8b66-0db94ba0917d {
                            fill: none;
                            stroke: #000;
                            stroke-linecap: round;
                            stroke-linejoin: round;
                            stroke-width: 2px;
                          }`}
                            </style>
                          </defs>
                          <g id="ba991f3a-dcee-47cd-90c1-5ab3e5a203ee" data-name="Слой 2">
                            <g id="a5961385-ebc2-4bf2-9b5a-fecd8b27bb79" data-name="Слой 3">
                              <path
                                className="ad1a81ee-041c-477f-8b66-0db94ba0917d"
                                d="M1 1h32.532v32.532H1zM17.266 1.03v32.202M17.746 17.266h15.531"
                              />
                            </g>
                          </g>
                        </svg>
                      </div>
                      <div className="text">Organize</div>
                    </div>
                    <div className="colab__nav-item">
                      <div className="ico">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 39 39">
                          <defs>
                            <style>
                              {` .beae5df7-356b-442d-bd00-d017682c326a {
                            fill: none;
                            stroke: #000;
                            stroke-linecap: round;
                            stroke-linejoin: round;
                            stroke-width: 2px;
                          }`}
                            </style>
                          </defs>
                          <g id="bd20bace-4e51-4ea2-94ff-6ac513594da0" data-name="Слой 2">
                            <g id="a6559767-9412-4b8e-b2c7-d43577a0b58b" data-name="Слой 4">
                              <circle
                                className="beae5df7-356b-442d-bd00-d017682c326a"
                                cx="19.5"
                                cy="19.5"
                                r="18.5"
                              />
                              <path
                                className="beae5df7-356b-442d-bd00-d017682c326a"
                                d="m12.087 11.644 3.208 3.207-2.851 2.851M11.327 23.761a9.362 9.362 0 0 0 17.391 0"
                              />
                              <circle cx="24.964" cy="14.542" r="2.756" />
                            </g>
                          </g>
                        </svg>
                      </div>
                      <div className="text">Monetize</div>
                    </div>
                  </div>
                  <div
                    className="progress progress-nav"
                    role="progressbar"
                    aria-valuemin="0"
                    aria-valuemax="100"></div>
                  <div className="colab__tabs">
                    <div className="colab__tab">
                      <div className="text">
                        Create a space unique to your early fans and collaborators to get webcomics
                        feedback and follow your dream
                      </div>
                      <div className="img">
                        <img src="lendingImages/create.png" alt="MangaFy landing image" />
                      </div>
                    </div>
                    <div className="colab__tab">
                      <div className="text">
                        Webcomics are not the work of one person. Our goal is to provide a place
                        where writers, artists, translators, and editors can collaborate to create
                        new ideas.
                      </div>
                      <div className="img">
                        <img src="lendingImages/users.png" alt="MangaFy landing image" />
                      </div>
                    </div>
                    <div className="colab__tab">
                      <div className="text">
                        Focus on creativity. You can increase your productivity. Keeping organized
                        will allow you to spend less time looking for things and more time working
                        on meaningful tasks.
                      </div>
                      <div className="img">
                        <img src="lendingImages/setting.png" alt="MangaFy landing image" />
                      </div>
                    </div>
                    <div className="colab__tab">
                      <div className="text">
                        Most people tend to dismiss what they’re good at. Identify Your Passion And
                        Monetize It.
                      </div>
                      <div className="img">
                        <img src="lendingImages/storyBoard.png" alt="MangaFy landing image" />
                      </div>
                    </div>
                  </div>
                  <div
                    className="ico1"
                    data-aos="fade-down-left"
                    data-aos-duration="2500"
                    data-aos-delay="500">
                    <img src="lendingImages/dist/colab-girl.png" alt="MangaFy landing image" />
                  </div>
                </div>
              </div>
            </div>
            <div className="who-are-you" id="solution">
              <div className="container">
                <div className="who-are-you__wrap">
                  <div className="who-are-you__top">
                    <div className="creating__ttl" data-aos="fade-up" data-aos-delay="300">
                      <span className="line">
                        <b>WHO </b>
                      </span>
                       are
                      <br />
                      you?
                    </div>
                    <div className="platform__text" data-aos="fade-up" data-aos-delay="500">
                      As with most creative endeavors creating webcomics can be a singular task, but to
                      truly create enough content it’s best when you have a team working together.
                    </div>
                  </div>
                  <div className="who-are-you__slider">
                    <div className="slider-item" data-card="writer">
                      <div className="sqr">
                        <img src="lendingImages/dist/sqr-ico1.png" alt="MangaFy landing image" />
                      </div>
                      <div className="border"></div>
                      <div className="img tr-deley-1">
                        <img
                          src="lendingImages/dist/slider-item1.png"
                          alt="MangaFy landing image"
                        />
                      </div>
                    </div>
                    <div className="slider-item" data-card="artist">
                      <div className="sqr">
                        <img src="lendingImages/dist/sqr-ico2.png" alt="MangaFy landing image" />
                      </div>
                      <div className="border"></div>
                      <div className="img tr-deley-2">
                        <img
                          src="lendingImages/dist/slider-item2.png"
                          alt="MangaFy landing image"
                        />
                      </div>
                    </div>
                    <div className="slider-item" data-card="promoter">
                      <div className="sqr">
                        <img src="lendingImages/dist/sqr-ico3.png" alt="MangaFy landing image" />
                      </div>
                      <div className="border"></div>
                      <div className="img tr-deley-3">
                        <img
                          src="lendingImages/dist/slider-item3.png"
                          alt="MangaFy landing image"
                        />
                      </div>
                    </div>
                    <div className="slider-item" data-card="editor">
                      <div className="sqr">
                        <img src="lendingImages/dist/sqr-ico4.png" alt="MangaFy landing image" />
                      </div>
                      <div className="border"></div>
                      <div className="img tr-deley-4">
                        <img
                          src="lendingImages/dist/slider-item4.png"
                          alt="MangaFy landing image"
                        />
                      </div>
                    </div>
                    <div className="slider-item" data-card="beta-reader">
                      <div className="sqr">
                        <img src="lendingImages/dist/sqr-ico5.png" alt="MangaFy landing image" />
                      </div>
                      <div className="border"></div>
                      <div className="img tr-deley-5">
                        <img
                          src="lendingImages/dist/slider-item5.png"
                          alt="MangaFy landing image"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="progress"
                    role="progressbar"
                    aria-valuemin="0"
                    aria-valuemax="100"></div>
                  <div className="who-are-you__descr">
                    <div className="who-are-you__descr-item active" data-card="writer">
                      <div className="ttl">Writer</div>
                      <div className="text">
                        The writer is responsible for the script that the artist will work off of.
                        In addition to panel descriptions, the number of panels per page, dialogue,
                        captions, sound effects (aka SFX), and any other notes will help the artist
                        tell the story effectively. In addition to creating the world for the
                        artist, the writer provides feedback to help bring their vision to life.
                      </div>
                      <a href="https://mangafy.club/sign-in" className="btn-req">
                        <div className="wrap">Request early access</div>
                      </a>
                    </div>
                    <div className="who-are-you__descr-item" data-card="artist">
                      <div className="ttl">Illustrator</div>
                      <div className="text">
                        If there is only one artist credited on a webcomic book, there’s a good
                        chance that they did the pencils, inks, colours, letters (the definitions of
                        all of those can be found below) etc. Typically in the credits of a book,
                        especially superhero comics, you’ll see a number of creators credited.
                      </div>
                      <a href="https://mangafy.club/sign-in" className="btn-req">
                        <div className="wrap">Request early access</div>
                      </a>
                    </div>
                    <div className="who-are-you__descr-item" data-card="promoter">
                      <div className="ttl">Promoter</div>
                      <div className="text">
                        Works with colleagues, can develop the social media strategy introducing new
                        and innovative ways of working to deliver a first-class social media output.
                        You will be responsible for managing Social channels to communicate with
                        fans across multiple social platforms to engage people and raise funds for
                        new story.
                      </div>
                      <a href="https://mangafy.club/sign-in" className="btn-req">
                        <div className="wrap">Request early access</div>
                      </a>
                    </div>
                    <div className="who-are-you__descr-item" data-card="editor">
                      <div className="ttl">Editor</div>
                      <div className="text">
                        The editor is responsible for a lot of webcomics. In addition to normal
                        things like checking for any spelling/grammar errors, the editor is also
                        responsible for tracking continuity, checking over the pencils, inks,
                        colors, and letters, getting the book off to life, and keeping a schedule
                        for the entire team.
                      </div>
                      <a href="https://mangafy.club/sign-in" className="btn-req">
                        <div className="wrap">Request early access</div>
                      </a>
                    </div>
                    <div className="who-are-you__descr-item" data-card="beta-reader">
                      <div className="ttl">Beta Readers</div>
                      <div className="text">
                        A beta reader is a test reader of an unreleased work of literature or other
                        writing (similar to beta testing in software), giving feedback with the
                        angle of an average reader to the author about remaining issues. You&apos;ve
                        worked for months or years on your manuscript. You&apos;ve gone through it
                        yourself and done some edits.
                      </div>
                      <a href="https://mangafy.club/sign-in" className="btn-req">
                        <div className="wrap">Request early access</div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="join">
              <div className="container">
                <div className="join__wrap">
                  <div className="join__content">
                    <div className="creating__ttl" data-aos="fade-up">
                      <span className="line">
                        <b>Join</b>
                      </span>
                      <br />
                      the MangaFY big family
                    </div>
                    <a href="https://discord.com/invite/NYtkaaeqwS" className="platform__btn">
                      Request early access
                    </a>
                  </div>
                  <div className="join__right">
                    <div className="ico lightning">
                      <img
                        src="lendingImages/dist/join-lightning.png"
                        alt="MangaFy landing image"
                      />
                    </div>
                    <div
                      className="img"
                      data-aos="fade-zoom-in"
                      data-aos-duration="3000"
                      data-aos-delay="500">
                      <img src="lendingImages/dist/join-ico1.png" alt="MangaFy landing image" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <footer className="footer">
              <div className="container">
                <div className="footer__wrap">
                  <div className="footer__item">
                    <div className="text">
                      <b>Join our community.</b> Let’s create a future of remote work together
                    </div>
                    <div className="social">
                      <a href="https://www.facebook.com/mangafyy" className="social__item">
                        <img src="lendingImages/dist/soc-ico1.png" alt="MangaFy landing image" />
                      </a>
                      <a href="https://twitter.com/be_mangafy" className="social__item">
                        <img src="lendingImages/dist/soc-ico2.png" alt="MangaFy landing image" />
                      </a>
                      <a href="https://www.instagram.com/be.mangafy/" className="social__item">
                        <img src="lendingImages/dist/soc-ico3.png" alt="MangaFy landing image" />
                      </a>
                    </div>
                  </div>
                  <div className="footer__line"></div>
                  <div className="footer__bot">
                    <div className="copy">© 2021 MangaFy Inc. All rights reserved</div>
                    <div className="footer__made">
                      Made with
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 13 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M9.54688 0.761719C8.84145 0.761719 8.1947 0.985258 7.62463 1.42614C7.07809 1.84882 6.71422 2.38718 6.5 2.77865C6.28578 2.38715 5.92191 1.84882 5.37537 1.42614C4.8053 0.985258 4.15855 0.761719 3.45312 0.761719C1.48454 0.761719 0 2.37192 0 4.50719C0 6.81403 1.85207 8.39234 4.65585 10.7817C5.13198 11.1874 5.67166 11.6474 6.23259 12.1379C6.30652 12.2026 6.40148 12.2383 6.5 12.2383C6.59852 12.2383 6.69348 12.2026 6.76741 12.1379C7.32839 11.6473 7.86805 11.1874 8.34445 10.7814C11.1479 8.39234 13 6.81403 13 4.50719C13 2.37192 11.5155 0.761719 9.54688 0.761719Z"
                          fill="#fff"></path>
                      </svg>
                    </div>
                    <div className="footer__nav">
                      <a href="https://mangafy.club/privacy-policy" className="footer__nav-item">
                        Privacy Policy
                      </a>
                      <a href="https://mangafy.club/terms" className="footer__nav-item">
                        Terms and Conditions
                      </a>
                      <a
                        href="https://form.typeform.com/to/bAv7ReI7?typeform-source=trello.com"
                        className="footer__nav-item">
                        Contact us
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </>
  );
};

NewLending.propTypes = {
  user: PropTypes.object,
};

NewLending.defaultProps = {
  user: null,
};

export default NewLending;
