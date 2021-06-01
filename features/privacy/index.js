import React from 'react';

import Footer from 'components/footer';
import Header from 'components/header';
import Imgix from 'components/imgix';
import ButtonToTop from 'components/ui-elements/button-toTop';
import Head from 'next/head';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const Privacy = (props) => {
  const { user } = props;

  return (
    <>
      <Head>
        <title>MangaFY Privacy Policy</title>
        <meta name="description" content="MangaFY Privacy Policy"></meta>
        <meta property="og:url" content="http://mangafy.club" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="MangaFY Privacy Policy" />
        <meta property="og:description" content="MangaFY Privacy Policy" />
        <meta property="og:image" content="http://mangafy.club/img/indexMobSec3.webp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
                      alt=""
                    />
                  </div>
                </div>
                <div className={styles.info_section}>
                  <div className={styles.update_block}>Effective Date: 04-03-2021</div>
                  <div className={styles.info_block}>
                    <div className={styles.info_title}>Your privacy is important to us</div>
                    <div className={styles.info_description}>
                      Mangafy Lab is located at:
                      <br />
                      Mangafy Lab
                      <br />
                      Fikus 28/9 Tel Aviv Yaffo, Tel Aviv Yaffo <br />
                      6820256 Tel Aviv District , Israel
                      <br />
                      It is Mangafy Lab's policy to respect your privacy regarding any information
                      we may collect while operating our website. This Privacy Policy applies to{' '}
                      <a href="https://mangafy.club"> mangafy.club</a> (hereinafter, "us", "we", or
                      "mangafy.club"). We respect your privacy and are committed to protecting
                      personally identifiable information you may provide us through the Website. We
                      have adopted this privacy policy ("Privacy Policy") to explain what
                      information may be collected on our Website, how we use this information, and
                      under what circumstances we may disclose the information to third parties.
                      This Privacy Policy applies only to information we collect through the Website
                      and does not apply to our collection of information from other sources.
                      <br />
                      This Privacy Policy, together with the Terms of service posted on our Website,
                      set forth the general rules and policies governing your use of our Website.
                      Depending on your activities when visiting our Website, you may be required to
                      agree to additional terms of service.
                    </div>
                  </div>
                  <div className={styles.info_block}>
                    <div className={styles.info_title} id="tableofcontents">
                      Contents
                    </div>
                    <div className={styles.info_description}>
                      <ol>
                        <li>
                          <a href="#websitevisitors">
                            <strong>Website Visitors</strong>
                          </a>
                        </li>
                        <li>
                          <a href="#PII">
                            <strong>Personally-Identifying Information</strong>
                          </a>
                        </li>
                        <li>
                          <a href="#Security">
                            <strong>Security</strong>
                          </a>
                        </li>
                        <li>
                          <a href="#Ads">
                            <strong>Advertisements</strong>
                          </a>
                        </li>
                        <li>
                          <a href="#ExternalLinks">
                            <strong>Links To External Sites</strong>
                          </a>
                        </li>
                        <li>
                          <a href="#Remarketing">
                            <strong>Mangafy Lab uses Google AdWords for remarketing</strong>
                          </a>
                        </li>
                        <li>
                          <a href="#PIIProtection">
                            <strong>
                              Protection of Certain Personally-Identifying Information
                            </strong>
                          </a>
                        </li>
                        <li>
                          <a href="#Stats">
                            <strong>Aggregated Statistics</strong>
                          </a>
                        </li>
                        <li>
                          <a href="#Cookies">
                            <strong>Cookies</strong>
                          </a>
                        </li>
                        <li>
                          <a href="#Ecommerce">
                            <strong>E-commerce</strong>
                          </a>
                        </li>
                        <li>
                          <a href="#Changes">
                            <strong>Privacy Policy Changes</strong>
                          </a>
                        </li>
                        <li>
                          <a href="#Credit">
                            <strong>Contact Information &amp; Credit</strong>
                          </a>
                        </li>
                      </ol>
                    </div>
                  </div>
                  <div className={styles.info_block}>
                    <div className={styles.info_title} id="websitevisitors">
                      1. Website Visitors
                    </div>
                    <div className={styles.info_description}>
                      Like most website operators, Mangafy Lab collects non-personally-identifying
                      information of the sort that web browsers and servers typically make
                      available, such as the browser type, language preference, referring site, and
                      the date and time of each visitor request. Mangafy Lab's purpose in collecting
                      non-personally identifying information is to better understand how Mangafy
                      Lab's visitors use its website. From time to time, Mangafy Lab may release
                      non-personally-identifying information in the aggregate, e.g., by publishing a
                      report on trends in the usage of its website.
                      <br />
                      Mangafy Lab also collects potentially personally-identifying information like
                      Internet Protocol (IP) addresses for logged in users and for users leaving
                      comments on https://mangafy.club blog posts. Mangafy Lab only discloses logged
                      in user and commenter IP addresses under the same circumstances that it uses
                      and discloses personally-identifying information as described below.
                      <br />
                      <a href="#tableofcontents">Back to table of contents</a>
                    </div>
                  </div>
                  <div className={styles.info_block}>
                    <div className={styles.info_title} id="PII">
                      2. Personally-Identifying Information
                    </div>
                    <div className={styles.info_description}>
                      Certain visitors to Mangafy Lab's websites choose to interact with Mangafy Lab
                      in ways that require Mangafy Lab to gather personally-identifying information.
                      The amount and type of information that Mangafy Lab gathers depends on the
                      nature of the interaction. For example, we ask visitors who leave a comment at
                      https://mangafy.club to provide a username and email address.
                      <a href="#tableofcontents">Back to table of contents</a>
                    </div>
                  </div>
                  <div className={styles.info_block}>
                    <div className={styles.info_title} id="Security">
                      3. Security
                    </div>
                    <div className={styles.info_description}>
                      The security of your Personal Information is important to us, but remember
                      that no method of transmission over the Internet, or method of electronic
                      storage is 100% secure. While we strive to use commercially acceptable means
                      to protect your Personal Information, we cannot guarantee its absolute
                      security.
                      <br />
                      <a href="#tableofcontents">Back to table of contents</a>
                    </div>
                  </div>
                  <div className={styles.info_block}>
                    <div className={styles.info_title} id="Ads">
                      4. Advertisements
                    </div>
                    <div className={styles.info_description}>
                      Ads appearing on our website may be delivered to users by advertising
                      partners, who may set cookies. These cookies allow the ad server to recognize
                      your computer each time they send you an online advertisement to compile
                      information about you or others who use your computer. This information allows
                      ad networks to, among other things, deliver targeted advertisements that they
                      believe will be of most interest to you. This Privacy Policy covers the use of
                      cookies by Mangafy Lab and does not cover the use of cookies by any
                      advertisers.
                      <br />
                      <a href="#tableofcontents">Back to table of contents</a>
                    </div>
                  </div>

                  <div className={styles.info_block}>
                    <div className={styles.info_title} id="ExternalLinks">
                      5. Links To External Sites
                    </div>
                    <div className={styles.info_description}>
                      Our Service may contain links to external sites that are not operated by us.
                      If you click on a third party link, you will be directed to that third party's
                      site. We strongly advise you to review the Privacy Policy and terms of service
                      of every site you visit.
                      <br />
                      We have no control over, and assume no responsibility for the content, privacy
                      policies or practices of any third party sites, products or services.
                      <br />
                      <a href="#tableofcontents">Back to table of contents</a>
                    </div>
                  </div>
                  <div className={styles.info_block}>
                    <div className={styles.info_title} id="Remarketing">
                      6. Mangafy Lab uses Google AdWords for remarketing
                    </div>
                    <div className={styles.info_description}>
                      Mangafy Lab uses the remarketing services to advertise on third party websites
                      (including Google) to previous visitors to our site. It could mean that we
                      advertise to previous visitors who haven't completed a task on our site, for
                      example using the contact form to make an enquiry. This could be in the form
                      of an advertisement on the Google search results page, or a site in the Google
                      Display Network. Third-party vendors, including Google, use cookies to serve
                      ads based on someone's past visits. Of course, any data collected will be used
                      in accordance with our own privacy policy and Google's privacy policy.
                      <br />
                      You can set preferences for how Google advertises to you using the Google Ad
                      Preferences page, and if you want to you can opt out of interest-based
                      advertising entirely by cookie settings or permanently using a browser plugin.
                      <br />
                      <a href="#tableofcontents">Back to table of contents</a>
                    </div>
                  </div>
                  <div className={styles.info_block}>
                    <div className={styles.info_title} id="PIIProtection">
                      7. Protection of Certain Personally-Identifying Information
                    </div>
                    <div className={styles.info_description}>
                      Mangafy Lab discloses potentially personally-identifying and
                      personally-identifying information only to those of its employees, contractors
                      and affiliated organizations that (i) need to know that information in order
                      to process it on Mangafy Lab's behalf or to provide services available at
                      Mangafy Lab's website, and (ii) that have agreed not to disclose it to others.
                      Some of those employees, contractors and affiliated organizations may be
                      located outside of your home country; by using Mangafy Lab's website, you
                      consent to the transfer of such information to them. Mangafy Lab will not rent
                      or sell potentially personally-identifying and personally-identifying
                      information to anyone. Other than to its employees, contractors and affiliated
                      organizations, as described above, Mangafy Lab discloses potentially
                      personally-identifying and personally-identifying information only in response
                      to a subpoena, court order or other governmental request, or when Mangafy Lab
                      believes in good faith that disclosure is reasonably necessary to protect the
                      property or rights of Mangafy Lab, third parties or the public at large.
                      <br />
                      If you are a registered user of https://mangafy.club and have supplied your
                      email address, Mangafy Lab may occasionally send you an email to tell you
                      about new features, solicit your feedback, or just keep you up to date with
                      what's going on with Mangafy Lab and our products. We primarily use our blog
                      to communicate this type of information, so we expect to keep this type of
                      email to a minimum. If you send us a request (for example via a support email
                      or via one of our feedback mechanisms), we reserve the right to publish it in
                      order to help us clarify or respond to your request or to help us support
                      other users. Mangafy Lab takes all measures reasonably necessary to protect
                      against the unauthorized access, use, alteration or destruction of potentially
                      personally-identifying and personally-identifying information.
                      <br />
                      <a href="#tableofcontents">Back to table of contents</a>
                    </div>
                  </div>
                  <div className={styles.info_block}>
                    <div className={styles.info_title} id="Stats">
                      8. Aggregated Statistics
                    </div>
                    <div className={styles.info_description}>
                      Mangafy Lab may collect statistics about the behavior of visitors to its
                      website. Mangafy Lab may display this information publicly or provide it to
                      others. However, Mangafy Lab does not disclose your personally-identifying
                      information.
                      <br />
                      <a href="#tableofcontents">Back to table of contents</a>
                    </div>
                  </div>
                  <div className={styles.info_block}>
                    <div className={styles.info_title} d="Cookies">
                      9. Cookies
                    </div>
                    <div className={styles.info_description}>
                      To enrich and perfect your online experience, Mangafy Lab uses "Cookies",
                      similar technologies and services provided by others to display personalized
                      content, appropriate advertising and store your preferences on your computer.
                      <br />
                      A cookie is a string of information that a website stores on a visitor's
                      computer, and that the visitor's browser provides to the website each time the
                      visitor returns. Mangafy Lab uses cookies to help Mangafy Lab identify and
                      track visitors, their usage of https://mangafy.club, and their website access
                      preferences. Mangafy Lab visitors who do not wish to have cookies placed on
                      their computers should set their browsers to refuse cookies before using
                      Mangafy Lab's websites, with the drawback that certain features of Mangafy
                      Lab's websites may not function properly without the aid of cookies.
                      <br />
                      By continuing to navigate our website without changing your cookie settings,
                      you hereby acknowledge and agree to Mangafy Lab's use of cookies.
                      <br />
                      <a href="#tableofcontents">Back to table of contents</a>
                    </div>
                  </div>
                  <div className={styles.info_block}>
                    <div className={styles.info_title} id="Ecommerce">
                      10. E-commerce
                    </div>
                    <div className={styles.info_description}>
                      Those who engage in transactions with Mangafy Lab – by purchasing Mangafy
                      Lab's services or products, are asked to provide additional information,
                      including as necessary the personal and financial information required to
                      process those transactions. In each case, Mangafy Lab collects such
                      information only insofar as is necessary or appropriate to fulfill the purpose
                      of the visitor's interaction with Mangafy Lab. Mangafy Lab does not disclose
                      personally-identifying information other than as described below. And visitors
                      can always refuse to supply personally-identifying information, with the
                      caveat that it may prevent them from engaging in certain website-related
                      activities.
                      <br />
                      <a href="#tableofcontents">Back to table of contents</a>
                    </div>
                  </div>
                  <div className={styles.info_block}>
                    <div className={styles.info_title} id="Changes">
                      11. Privacy Policy Changes
                    </div>
                    <div className={styles.info_description}>
                      Although most changes are likely to be minor, Mangafy Lab may change its
                      Privacy Policy from time to time, and in Mangafy Lab's sole discretion.
                      Mangafy Lab encourages visitors to frequently check this page for any changes
                      to its Privacy Policy. Your continued use of this site after any change in
                      this Privacy Policy will constitute your acceptance of such change.
                      <br />
                      <a href="#tableofcontents">Back to table of contents</a>
                    </div>
                  </div>
                  <div className={styles.info_block}>
                    <div className={styles.info_title} id="Credit">
                      12. Contact Information &amp; Credit
                    </div>
                    <div className={styles.info_description}>
                      This privacy policy was created at . If you have any questions about our
                      Privacy Policy, please contact us via{' '}
                      <a href="mailto:max@mangafy.club">email</a> or <a href="tel:">phone</a>.
                      <br />
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
          <Footer />
        </div>
      </main>
    </>
  );
};

Privacy.PropTypes = {
  user: PropTypes.object,
};

export default Privacy;
