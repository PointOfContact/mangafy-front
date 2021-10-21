import React from 'react';

import Footer from 'components/footer';
import Header from 'components/header';
import Imgix from 'components/imgix';
import ButtonToTop from 'components/ui-elements/button-toTop';
import FooterLogin from 'features/footerLogin';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const Privacy = (props) => {
  const { user } = props;

  return (
    <>
      <NextSeo
        title="MangaFY Privacy Policy"
        description="MangaFY Privacy Policy"
        canonical="http://mangafy.club"
        openGraph={{
          url: 'http://mangafy.club',
          title: 'MangaFY Privacy Policy',
          description: 'MangaFY Privacy Policy',
          type: 'article',
          images: [
            {
              url: 'http://mangafy.club/img/indexMobSec3.webp',
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
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/favicon.ico',
          },
        ]}
      />
      <ButtonToTop />
      <main className="main_back_2">
        <div className={'wrapper'}>
          <div className={styles.terms_page}>
            <Header path="privacy" user={user} />
            <main>
              <div className={styles.privacy_page}>
                <div className={styles.title_section}>
                  <div className={styles.title_inner}>
                    <div className={styles.page_title}>Privacy Policy</div>
                  </div>
                  <div className={styles.image_block}>
                    <Imgix
                      width={240}
                      height={302}
                      layout="fixed"
                      src="https://mangafy.club/img/privacy_image.webp"
                      alt="MangaFy privacy"
                    />
                  </div>
                </div>
                <div className={styles.info_section}>
                  <div className={styles.update_block}>Effective Date: 14-10-2021</div>
                  <div className={styles.info_block}>
                    <div className={styles.info_title}>Your privacy is important to us</div>
                    <div className={styles.info_description}>
                      It is Mangafy Lab's policy to respect your privacy regarding any information
                      we may collect while operating our website. This Privacy Policy applies to
                      <br />
                      <br />
                      <Link href={`https://mangafy.club/`}>
                        <a>mangafy.club</a>
                      </Link>
                      <br />
                      <br />
                      (hereinafter, "us", "we", or "mangafy.club"). We respect your privacy and are
                      committed to protecting personally identifiable information you may provide us
                      through the Website. We have adopted this privacy policy ("Privacy Policy") to
                      explain what information may be collected on our Website, how we use this
                      information, and under what circumstances we may disclose the information to
                      third parties. This Privacy Policy applies only to information we collect
                      through the Website and does not apply to our collection of information from
                      other sources. This Privacy Policy, together with the Terms of service posted
                      on our Website, set forth the general rules and policies governing your use of
                      our Website. Depending on your activities when visiting our Website, you may
                      be required to agree to additional terms of service.
                    </div>
                  </div>

                  <div className={styles.info_block}>
                    <div className={styles.info_title}>What this policy covers</div>
                    <div className={styles.info_description}>
                      Your privacy is important to us, and so is being transparent about how we
                      collect, use, and share information about you. This policy is intended to help
                      you understand:
                      <br />
                      <br />
                      <ul>
                        <li>What information do we collect about you</li>
                        <li>How we use the information we collect</li>
                        <li>How we share information we collect</li>
                        <li>How we store and secure the information we collect</li>
                        <li>How to access and control your information</li>
                        <li>How to delete your profile and projects</li>
                        <li>Other important privacy information and how to contact us</li>
                      </ul>
                    </div>
                  </div>

                  <div className={styles.info_block}>
                    <div className={styles.info_title}>Information We Collect</div>
                    <div className={styles.info_description}>
                      We collect information about you when you provide it to us, when you use our
                      Services, and when other sources provide it to us, as further described below.
                    </div>
                  </div>

                  <div className={styles.info_block}>
                    <div className={styles.info_title}>
                      Information we collect automatically when you use the Services
                    </div>
                    <div className={styles.info_description}>
                      We keep track of certain information about you when you visit and interact
                      with our Services, including the type of browser you use, access times, pages
                      viewed, entities clicked, your IP address and the page you visited before
                      navigating to the Services.
                    </div>
                    <div className={styles.info_description}>
                      How much of this information we collect depends on the type and settings of
                      the device you use to access the Services.
                    </div>
                  </div>

                  <div className={styles.info_block}>
                    <div className={styles.info_title}>Public Data vs Private Data in MangaFY</div>
                    <div className={styles.info_description}>
                      We don't want you to get a surprise that you've shared something you intended
                      to keep private. You have full control over the visibility of your data, and
                      all defaults favor privacy.
                    </div>
                    <div className={styles.info_description}>
                      You have the ability to make projects private, in which case only added
                      members will be able to view the projects. Actions on private projects will
                      not show up in profiles. Private projects are not visible in search.
                    </div>
                    <div className={styles.info_description}>
                      Your member profile is public. That includes your name, username, and bio, not
                      your email. (If you set your full name to be your email, people will see
                      that.) Your Profile page indicates each item's visibility status, as either
                      Always Public or Always Hidden. Your avatar will be public to the internet,
                      but you always have the option to remove the photo in favor of initials only.
                    </div>
                    <div className={styles.info_description}>
                      Other users will only see actions on your public projects (unless they are
                      part of one of your private projects). Collab pages will list only public
                      projects.
                    </div>
                  </div>

                  <div className={styles.info_block}>
                    <div className={styles.info_title}>Purposes</div>
                    <div className={styles.info_description}>
                      When we collect personal information, we shall indicate the purpose of the
                      collection and, upon request, offer more information about the collection.
                      <br />
                      <br />
                      We may collect information from you such as your name, e-mail address, avatar
                      photo, preferred method of communication, interaction with our website, social
                      media sites, and mobile applications (including IP addresses, browser type,
                      language, access times, referring website, and so on), and other information
                      you provide to us.
                      <br />
                      <br />
                      We collect, use and disclose your personal information for the following
                      purposes:
                      <br />
                      <br />
                      <ul>
                        <li>
                          to allow us to communicate with you (including through the use of
                          commercial electronic messages),
                        </li>
                        <li>
                          to customize the advertising and content that is presented to you on our
                          website,
                        </li>
                        <li>to verify your personal information</li>
                        <li>
                          to operate, customize and improve our website, social media sites, mobile
                          applications, advertisements, products, and services;
                        </li>
                        <li>to allow you to use portions of our website such as our forums;</li>
                        <li>
                          to allow you to participate in our contests, and to administer those
                          contests;
                        </li>
                        <li>to monitor your compliance with any of your agreements with us;</li>
                        <li>
                          to administer our provision of, and your payment for, products or services
                          you request from us;
                        </li>
                        <li>
                          to provide newsletters, electronic messages and information you request
                          from us;
                        </li>
                        <li>
                          to provide other information to you regarding our products and services;
                        </li>
                        <li>
                          to protect us, yourself and others from fraud and error and to safeguard
                          our business interests;
                        </li>
                        <li>to comply with legal and regulatory requirements; and</li>
                        <li>for other purposes, we may inform you about from time-to-time.</li>
                      </ul>
                      When your personal information is to be used for a purpose not previously
                      identified, the new purpose will be disclosed to you prior to such use, and
                      your consent will be sought unless the use is authorized or required by law.
                      <br />
                      <br />
                      We may work with other companies to provide services on our behalfs, such as
                      website hosting services, payment processing services, and product delivery
                      services. Those service providers will be permitted to obtain only the
                      personal information they need to deliver the service in question, and they
                      will be required to maintain the confidentiality of that information.
                    </div>
                  </div>

                  <div className={styles.info_block}>
                    <div className={styles.info_title}>Links to other Websites</div>
                    <div className={styles.info_description}>
                      Our website, social media sites, and mobile applications may contain links to
                      websites of third parties. We are not responsible for the privacy practices or
                      the content of those other websites.
                    </div>
                  </div>

                  <div className={styles.info_block}>
                    <div className={styles.info_title}>Cookies and Log Files</div>
                    <div className={styles.info_description}>
                      To track user information, we utilize cookies and log files. Cookies are tiny
                      bits of data that a web server sends to your web browser and stores on your
                      computer's hard drive. Cookies are used to track which page variants a visitor
                      has viewed, if a visitor has clicked on a page variant, to analyze traffic
                      patterns, and to evaluate the popularity of service alternatives. We will use
                      your information to provide you with relevant content and services.
                    </div>
                  </div>

                  <div className={styles.info_block}>
                    <div className={styles.info_title}>Your Choices</div>
                    <div className={styles.info_description}>
                      You have the right to request a copy of your information, to object to our use
                      of your information (including for marketing purposes), to request the
                      deletion or restriction of your information, or to request your information in
                      a structured, electronic format. Below, we describe the tools and processes
                      for making these requests. You can exercise some of the choices by logging
                      into the Services and using settings available within the Services or your
                      account. Where the Services are administered for you by an administrator (see
                      “Notice to End Users” below), you may need to contact your administrator to
                      assist with your requests first. For all other requests, you may contact us as
                      provided in the Contact Us section below to request assistance.
                      <br />
                      <br />
                      Your request and choices may be limited in certain cases: for example, if
                      fulfilling your request would reveal information about another person, or if
                      you ask to delete information which we or your administrator are permitted by
                      law or have compelling legitimate interests to keep. Where you have asked us
                      to share data with third parties, for example, by installing third-party apps,
                      you will need to contact those third-party service providers directly to have
                      your information deleted or otherwise restricted. If you have unresolved
                      concerns, you may have the right to complain to a data protection authority in
                      the country where you live, where you work or where you feel your rights were
                      infringed.
                    </div>
                  </div>

                  <div className={styles.info_block}>
                    <div className={styles.info_title}>
                      Deleting your account (It's easier than you think )
                    </div>
                    <div className={styles.info_description}>
                      If you no longer wish to use our Services, you or your administrator may be
                      able to deactivate your Services account. If you can deactivate your own
                      account, that setting is available to you in your profile settings under
                      editing mode and by "Delete account".
                    </div>
                  </div>

                  <div className={styles.info_block}>
                    <div className={styles.info_title}>Deleting your projects</div>
                    <div className={styles.info_description}>
                      If you would like to delete an entire project, which is a collection of
                      multiple shots, log in to your account and scroll to the bottom of the
                      left-hand sidebar. Any projects you have will be listed; click on the project
                      you would like to delete. Once the new page loads scroll to the bottom of the
                      left-hand sidebar and click “delete project”.
                      <br />
                      <br />
                      Please be aware that deleting your account does not delete your information;
                      your information remains visible to other Service users based on your past
                      participation within the Services. For more information on how to delete your
                      information, see below.
                    </div>
                  </div>

                  <div className={styles.info_block}>
                    <div className={styles.info_title}>
                      Request that we stop using your information
                    </div>
                    <div className={styles.info_description}>
                      In some cases, you may ask us to stop accessing, storing, using and otherwise
                      processing your information where you believe we don’t have the appropriate
                      rights to do so. For example, if you believe a Services account was created
                      for you without your permission or you are no longer an active user, you can
                      request that we delete your account as provided in this policy. Where you gave
                      us consent to use your information for a limited purpose, you can contact us
                      to withdraw that consent, but this will not affect any processing that has
                      already taken place at the time. You can also opt-out of our use of your
                      information for marketing purposes by contacting us, as provided below. When
                      you make such requests, we may need time to investigate and facilitate your
                      request. If there is delay or dispute as to whether we have the right to
                      continue using your information, we will restrict any further use of your
                      information until the request is honored or the dispute is resolved, provided
                      your administrator does not object (where applicable). If you object to
                      information about you being shared with a third-party app, please disable the
                      app or contact your administrator to do so.
                    </div>
                  </div>

                  <div className={styles.info_block}>
                    <div className={styles.info_title}>Changes to this Policy</div>
                    <div className={styles.info_description}>
                      We may update this Privacy Policy from time to time. If we do so, we will send
                      an email to users subscribed to our newsletter. We will also add a site banner
                      alerting users who may not be subscribed. If the change materially affects the
                      treatment of your personal data, and we have your email but you are not
                      subscribed to the Company News list, we will send you an email. (You are
                      responsible for ensuring that we have an up-to-date email for this purpose.)
                      <br />
                      <br />
                      If you disagree with any changes to this privacy policy, you will need to stop
                      using the Services and deactivate your account(s), as outlined above.
                    </div>
                  </div>

                  <div className={styles.info_block}>
                    <div className={styles.info_title}>Contact Us</div>
                    <div className={styles.info_description}>
                      Your information is controlled by MangaFY, Inc.  If you have questions or
                      concerns about how your information is handled, please direct your inquiry to
                      MangaFY
                      <Link href={'mailto:yo@mangafy.club'}>
                        <a className={styles.openMail}>info@mangafy.club</a>
                      </Link>
                      .
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
          <Footer />
          <FooterLogin user={user} />
        </div>
      </main>
    </>
  );
};

Privacy.PropTypes = {
  user: PropTypes.object,
};

export default Privacy;
