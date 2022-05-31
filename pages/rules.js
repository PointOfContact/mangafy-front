import '../styles/terms.module.scss';
import '../styles/policy.css';

import React, { Component } from 'react';
import Link from 'next/link';

import { NextSeo } from 'next-seo';

class Rules extends Component {
  render() {
    return (
      <>
        <NextSeo
          title="MangaFY Community Rules."
          description="Our Community Guidelines and policies apply to all MangaFY content and define what you can and cannot do on MangaFY."
          additionalLinkTags={[
            {
              rel: 'icon',
              href: '/favicon.ico',
            },
          ]}
        />
        <div className="terms">
          <header id="header" className="gnb" style={{ backgroundColor: 'rgb(123, 100, 242)' }}>
            <Link href="/">
              <a className="MangaFY-logo">
                MangaFY
              </a>
            </Link>
          </header>
          <div className="wrap" data-sticky-wrap>
            <section className="about" style={{ marginTop: '70px' }}>
              <div className="block" style={{ fontSize: '24px' }}>
                MangaFY COMMUNITY GUIDELINES
              </div>
              <div className="block">
                <p>
                  Here at MangaFY, we strive to provide the best reading, writing, and social
                  experiences to our community. We have created these Community Guidelines to ensure
                  that all of our users feel safe and comfortable using our service. We take these
                  guidelines very seriously and encourage you to help us keep MangaFY a safe place
                  for everyone.
                </p>
                <p>
                  The following content is not allowed in MangaFY LIVE chats or in MangaFY story
                  comments:
                </p>
                <h3>Off-Topic Posts</h3>
                <p>
                  Please be sure to keep chat messages and comments on-topic and about the plot of
                  the story.{' '}
                </p>
                <p>
                  If you have questions about coins or about the MangaFY App itself, please do not
                  post them in the comments or in chats. For all questions unrelated to the story,
                  please email us at{' '}
                  <a href="mailto:support@mangafy.club">support@support@mangafy.club</a> and we will
                  help you.
                </p>
                <h3>Threats and Violence</h3>
                <p>Do not threaten to harm a person, a group of people, or someone’s property.</p>
                <p>
                  Do not share violent content that is intended to be shocking, sensational, or
                  gratuitous.
                </p>
                <h3>Harassment and Bullying</h3>
                <p>
                  Do not bully or harass any MangaFY users. We have zero tolerance for bullying or
                  harassment of any kind on MangaFY. Please be polite and respectful to others.
                </p>
                <h3>Inappropriate Language</h3>
                <p>
                  Please keep your language PG-13 while commenting and participating in MangaFY LIVE
                  chats. Refrain from using swear words, slurs, and other derogatory terms.
                </p>
                <h3>Illegal Content</h3>
                <p>
                  Do not share any type of illegal content, such as drugs, contraband, or illegal
                  weapons.
                </p>
                <h3>Nudity or Sexual Content</h3>
                <p>Do not share any type of pornographic content.</p>
                <h3>Impersonation</h3>
                <p>Do not pretend to be someone you are not.</p>
                <h3>Hate Speech</h3>
                <p>
                  Do not share any content that demeans, defames, or promotes discrimination on the
                  basis of race, ethnicity, national origin, religion, sexual orientation, gender
                  identity, disability, or veteran status.
                </p>
                <h3>Personal Information</h3>
                <p>
                  Do not share any personal or identifying information on MangaFY - this includes
                  but is not limited to your full name, address, phone number, or any additional
                  information that could be used to identify you outside of MangaFY.
                </p>
                <p>
                  Do not share your MangaFY account information, credit card information, or any
                  passwords. MangaFY will never ask for your personal information.
                </p>
                <p>
                  Do not ask for or share the personal information of other users, respect their
                  privacy as they respect your privacy.
                </p>
                <h3>Terrorism</h3>
                <p>Do not share any content that promotes terrorism.</p>
                <h3>Spam</h3>
                <p>Do not share large amounts of untargeted, unwanted or repetitive content.</p>
                <p>Do not promote additional services or brands on the MangaFY platform.</p>
                <h3>Profile Photos</h3>
                <p>Do not use a profile photo that violates any of the above guidelines.</p>
                <p>
                  MangaFY also recommends that you do not use an identifying photo as your profile
                  photo - example: of your face, of your home, etc.
                </p>
                <p>
                  By participating in community functions within MangaFY, including MangaFY LIVE
                  chats and story comments, you agree to follow these guidelines.
                </p>
                <p>
                  If you violate any of these Community Guidelines, we will take action either by
                  limiting your account activity, terminating your account, or notifying law
                  enforcement. Please take these guidelines seriously and honor the spirit in which
                  they are intended.
                </p>
                <p>
                  If you see content violating these Community Guidelines, please report it using
                  the Report function within the app or contact us at{' '}
                  <a href="mailto:support@MangaFY.club">support@MangaFY.club</a>.
                </p>
              </div>
            </section>
          </div>
          <footer data-sticky-footer className="footer">
            <div className="footer-left" style={{ width: '70%' }}>
              <span style={{ color: 'rgb(47, 47, 47)' }}>
                MangaFY , Inc. © 2020. All rights reserved.
              </span>
              <span>
                <Link href="/rules">
                  <a>Community Guidelines</a>
                </Link>
              </span>
              <span>/</span>
              <span>
                <Link href="/content">
                  <a>Content</a>
                </Link>
              </span>
              <span>/</span>
              <span>
                <Link href="/terms">
                <a>Terms</a>
                </Link>
              </span>
              <span>/</span>
              <span>
                <Link href="/privac-policy">
                  <a>Privacy Policy</a>
                </Link>
              </span>
            </div>
            <div className="footer-right">
              <a
                className="link"
                target="_blank"
                href="https://mangafy.herokuapp.com/sign-a"
                rel="noreferrer">
                Write on MangaFY
              </a>{' '}
              <a
                className="link icon"
                target="_blank"
                href="https://www.facebook.com/mangafyy"
                rel="noreferrer">
                {' '}
                <i className="fa fa-facebook" aria-hidden="true" />
              </a>
              <a
                className="link icon"
                target="_blank"
                href="https://twitter.com/Mangafy1"
                rel="noreferrer">
                {' '}
                <i className="fa fa-twitter" aria-hidden="true" />
              </a>
              <a
                className="link icon"
                target="_blank"
                href="//instagram.com/MangaFYfiction/"
                rel="noreferrer">
                <i className="fa fa-instagram" aria-hidden="true" />
              </a>
              <a className="link icon" target="_blank" href="//blog.MangaFY.club/" rel="noreferrer">
                <i className="fa fa-tumblr" aria-hidden="true" />
              </a>
              <a className="link icon" href="mailto:info@MangaFY.club">
                <i className="fa fa-envelope" aria-hidden="true" />
              </a>
            </div>
          </footer>
        </div>
      </>
    );
  }
}
export default Rules;
