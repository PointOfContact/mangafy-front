import React from 'react';

import Footer from 'components/footer';
import FooterPolicy from 'components/footer-policy';
import HeaderNew from 'components/headerNew';
import { ShareButtons } from 'components/share';
import ButtonToTop from 'components/ui-elements/button-toTop';
import FooterLogin from 'features/footerLogin';
import { NextSeo } from 'next-seo';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const ShowcaseYourWork = ({ user }) => (
  <>
    <NextSeo
      title="Showcase Your Work"
      description="For creatives, showcasing your work is vitally important. Your portfolio is your
      shop window — what you put on display and how you dress it, is important to how you are perceived."
      canonical="https://mangafy.club/resources/showcase-your-work"
      openGraph={{
        url: 'https://mangafy.club/resources/showcase-your-work',
        title: 'Showcase Your Work',
        description:
          'For creatives, showcasing your work is vitally important. Your portfolio is your shop window — what you put on display and how you dress it, is important to how you are perceived.',
        type: 'article',
        images: [
          {
            url: 'https://mangafy.club/img/setovi.jpg',
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
    <ButtonToTop user={user} />
    <div className={'wrapper'}>
      <div className={'content'}>
        <HeaderNew user={user} />
        <div className={styles.content}>
          <h1 className={styles.pageTitle}>Showcase your work via your MangaFY profile</h1>
          <br />
          <div className={styles.share}>
            <div className={styles.items}>
              <ShareButtons shareUrl="https://mangafy.club/resources/showcase-your-work" text="" />
            </div>
          </div>
          <div>
            <p>
              For creatives, showcasing your work is vitally important. Your portfolio is your shop
              window — what you put on display and how you dress it, is important to how you are
              perceived. It connects you to potential employers, clients, and opportunities. And it
              helps you to grow your network, which you are nothing without. In the world of the
              graphic novel, the situation is not different
            </p>
            <p>Your portfolio has an important role to play, so it needs to be great!</p>
          </div>
          <div>
            <br />
            <h2>First of all: Simple, clean and to the point.</h2>
            <p>
              People will spend seconds looking through your portfolio! Make it easy to scan and
              view your (best) work.
            </p>
            <br />
            <h3>Create ‘About Me’ Page or Section</h3>
            <p>
              People hire and collaborate with people, not portfolios. That’s why your portfolio
              should not only provide an impactful description of what kind of job you’re looking
              for but also who you are. The “About me” section/page is ideal for in-depth
              information about your passions, favorite genres, and interests as well as your
              current level of expertise. Adding the “About Me” page/section is also a great way to
              humanize your portfolio. However, don’t try to write your entire autobiography on that
              page. Your “About Me" page should be concise and to the point, similar to other parts
              of your portfolio.
            </p>
            <br />
            <h3>Put a Heavy Emphasis on the Writing</h3>
            <p>
              Many portfolio websites start with a list of projects – designers simply display their
              works to their visitors. While it’s perfectly fine to let your work sell itself, it’s
              always interesting to read about the person or team who created it. Remember, 
              <span className={styles.italic}>people</span> hire people, not portfolios. That’s why
              it’s recommended to put your writing front and center, even before your visual work.
            </p>
            <br />
            <h3>Make Your Contact Information Prominent</h3>
            <p>
              Your contact information is one of the most critical elements of your design. It’s
              vital to make sure that it’s easy for visitors to get in touch with you. Keep all your
              social links in one place.
            </p>
            <br />
            <h3>Present Your Talents</h3>
            <p>
              When it comes to presenting creative talent, nothing can beat a portfolio. You can
              showcase your work to potential clients, and they will use your portfolio to determine
              your experience, taste, and, most importantly, your ability to solve real-world
              business problems.
            </p>
            <br />
            <h3>Improve Your Organizational Skills</h3>
            <p>
              A portfolio will help you to stay organized. A portfolio is dynamic and everchanging,
              tracing your creative evolution. Since you need to update your portfolio regularly,
              you’ll learn how to structure and prioritize all your projects. In MangaFY you can
              find a task on a daily basis
            </p>
            <br />
            <h3>Learn New Things</h3>
            <p>
              A portfolio will encourage you to learn new things. Spending time on it is a great way
              to flex your creative muscles. Working on a portfolio will help you jot down your
              thoughts about your design process, as well as experiment and try different techniques
              without taking too much risk. This creative freedom will make you a better designer.
            </p>
            <div className={styles.share}>
              <div className={styles.items}>
                <ShareButtons
                  shareUrl="https://mangafy.club/resources/showcase-your-work"
                  text="Liked? Share"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer user={user} />
      <FooterPolicy />
      <FooterLogin user={user} />
    </div>
  </>
);

ShowcaseYourWork.propTypes = {
  user: PropTypes.object.isRequired,
};

export default ShowcaseYourWork;
