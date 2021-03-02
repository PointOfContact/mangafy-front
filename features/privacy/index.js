import React from 'react';

import Footer from 'components/footer';
import Header from 'components/header';
import Head from 'next/head';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const Privacy = (props) => {
  const { user } = props;

  return (
    <div className="">
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
      <main className="main_back_2">
        <Header path="privacy" user={user} />
        <div className={styles.privacy_page}>
          <div className={styles.title_section}>
            <div className={styles.title_inner}>
              <div className={styles.page_title}>Privacy Policy</div>
              <div className={styles.page_description}>
                Simply pay the amount agreed upon with your freelancer (plus a standard 3%
                processing fee on payments). Your freelancers pay for our services with a percentage
                fee. Choose the plan suits your goals
              </div>
            </div>
            <div className={styles.image_block}>
              <img src="/img/privacy_image.png"></img>
            </div>
          </div>
          <div className={styles.info_section}>
            <div className={styles.update_block}>Updated October 4, 2019</div>
            <div className={styles.info_block}>
              <div className={styles.info_title}>Overview</div>
              <div className={styles.info_description}>
                Dribbble Holdings Ltd. (“Dribbble”, “we”, “us” or “our”) is committed to protecting
                the privacy of personal information (i.e. any information relating to an identified
                or identifiable natural person) who visit the https://dribbble.com website and
                Dribbble mobile software application (collectively, the “Site”) and use the services
                available thereon (the “Services”). Amendments to this Privacy Policy will be posted
                to the Site and/or Services and will be effective when posted. Your continued use of
                the Site and/or Services following the posting of any amendment to this Privacy
                Policy shall constitute your acceptance of such amendment.
              </div>
            </div>
            <div className={styles.info_block}>
              <div className={styles.info_title}>Consent and Information Collection and Use</div>
              <div className={styles.info_description}>
                When you register as a user of our Site and Services, we ask for personal
                information that will be used to activate your account, provide the Services to you,
                communicate with you about the status of your account, and for other purposes set
                out in this Privacy Policy. Your name, company name, address, telephone number,
                email address, credit card information and certain other information about you may
                be required by us to provide the Services or be disclosed by you during your use of
                the Services. You will also be asked to create a user name and private password,
                which will become part of your account information. <br></br>
                <br></br>By providing personal information to us and by retaining us to provide you
                with the Services, you voluntarily consent to the collection, use and disclosure of
                such personal information as specified in this Privacy Policy. The legal bases for
                our processing of personal information are primarily that the processing is
                necessary for providing the Services and that the processing is carried out in our
                legitimate interests, which are further explained below. Without limiting the
                foregoing, we may on occasion ask you to consent when we collect, use, or disclose
                your personal information in specific circumstances.<br></br>
                <br></br>We take steps designed to ensure that only those employees who need access
                to your personal information to fulfil their employment duties will have access to
                it. We may use and disclose your personal or account information for the following
                purposes<br></br>
                <br></br>- To provide the Site and Services to you and to other users of the Site
                and Services; <br></br>- To improve the quality of the Site and Services through
                polls, surveys and other similar feedback gathering activities conducted by Dribbble
                and/or third parties; <br></br>- To create, manage and control your account
                information, and to verify access rights to the Site and Services; <br></br>- To
                bill your account; <br></br>- To communicate with you (subject to your opt-out
                rights set forth in this Privacy Policy), including without limitation for the
                purpose of providing you with information about the Services, or informing you of
                changes or additions to the Services or of the availability of any other services or
                features we provide; <br></br>- To assess service levels, monitor traffic patterns
                and gauge popularity of different features and service options of the Site and/or
                Services; <br></br>- To enforce this Privacy Policy or our Terms of Service;{' '}
                <br></br>- To protect against fraud or error, and to respond to claims of any
                violation of our rights or those of any third parties; <br></br>- To respond to your
                requests for customer service; <br></br>- To protect the rights, property or
                personal safety of you, us, our users and the public; and As required to comply with
                applicable laws or as authorized by applicable laws. For the purposes of billing
                your account (if you have a paid account) and in order to process payments, Dribbble
                utilizes third party payment gateways, such as Stripe and Paypal, who will utilize
                your credit card and other payment information in accordance with their respective
                privacy policies. Dribbble shall not be liable to you or any other person for any
                damages that might result from unauthorized use, publication, disclosure or any
                other misuse of such payment information, including credit card information<br></br>
                <br></br>Dribbble may share your personal information with its registered API
                application providers, including Chrome tab extensions Panda and Muz.li which
                deliver relevant design stories and inspiration. We invite you to review their
                applicable data protection policies.<br></br>
                <br></br>When we disclose your personal information to third parties, we take
                reasonable measures to ensure that the rules set forth in this Privacy Policy are
                complied with and these third parties provide sufficient guarantees to implement
                appropriate technical and organisational measures.<br></br>
                <br></br>Your personal information may be stored and processed in any country where
                we have facilities or in which we engage third party service providers. By using the
                Services, you consent to the transfer of information to countries outside your
                country of residence, which may have different data protection rules than in your
                country. While such information is outside of Canada, it is subject to the laws of
                the country in which it is held, and may be subject to disclosure to the
                governments, courts or law enforcement or regulatory agencies of such other country,
                pursuant to the laws of such country. However, our practices regarding your personal
                information will at all times continue to be governed by this Privacy Policy and, if
                applicable, we will comply with the General Data Protection Regulation (“GDPR”)
                requirements providing adequate protection for the transfer of personal information
                from the EU/EEA to third country.<br></br>
                <br></br>We may occasionally communicate with you regarding our products, services,
                news and events. You have the option to not receive this information. We provide an
                opt-out function within all email communications of this nature, or will cease to
                communicate with you for this purpose if you contact us and tell us not to
                communicate this information to you. The only kind of these communications that you
                may not “opt-out” of are those required to communicate announcements related to the
                Services, including information specific to your Account, planned Services
                suspensions and outages. We will attempt to minimize this type of communication to
                you
              </div>
            </div>
            <div className={styles.info_block}>
              <div className={styles.info_title}>Age of Consent</div>
              <div className={styles.info_description}>
                We do not knowingly provide the Services to, and will not knowingly collect the
                personal information from anyone under the age of consent. If you live in a country
                in the EU/EEA, you must be at least 16 years old to use our Services or such greater
                age required in your country to register for or use our Services. If you live in any
                other country except those in the EU/EEA, you must be at least 13 years old to use
                our Services or such greater age required in your country to register for or use our
                Services. In addition to being of the minimum required age to use our Services under
                applicable law, if you are not old enough to have authority to agree to our Privacy
                Policy in your country, your parent or guardian must agree to our Privacy Policy on
                your behalf. If you have any concerns about your child’s personal information,
                please contact us at privacy@dribbble.com.<br></br>
                <br></br>Neither the Site nor the Services are intended for children under 13 years
                of age, and no one under age 13 may provide any personal information to, on or
                through the Site or Services. We do not knowingly collect personal information from
                children under 13. If you are under 13, do not use or provide any information to, on
                or through the Site or Services, make any purchases through the Site or Services,
                use any of the interactive or public comment features, or provide any information
                about yourself to us, including your name, address, telephone number, email address,
                or any screen name or user name you may use. If we learn we have collected or
                received personal information from a child under 13 without verification of parental
                consent, we will delete that information. If you believe we might have any
                information from or about a child under 13, please contact us at the email address
                provided in the paragraph above.
              </div>
            </div>
            <div className={styles.info_block}>
              <div className={styles.info_title}>Rights to Your Information</div>
              <div className={styles.info_description}>
                You have the right to access and edit your information at any time through the web
                interface provided as part of the Services. On written request and subject to proof
                of identity, you may access the personal information that we hold, used or
                communicated and ask that any necessary corrections be made, where applicable, as
                authorized or required by law. However, to make sure that the personal information
                we maintain about you is accurate and up to date, please inform us immediately of
                any change in your personal information by mail or e-mail.<br></br>
                <br></br>Under the GDPR, you may be entitled to additional rights, including: (i)
                the right to withdraw consent to processing where consent is the basis of
                processing; (ii) the right to access your personal information and certain other
                supplementary information, under certain conditions; (iii) the right to object to
                unlawful data processing, under certain conditions; (iv) the right to erasure of
                personal information about you, under certain conditions; (v) the right to demand
                that we restrict processing of your personal information, under certain conditions,
                if you believe we have exceeded the legitimate basis for processing, processing is
                no longer necessary, are processing, or believe your personal information is
                inaccurate; (vi) the right to data portability of personal information concerning
                you that you provided us in a structured, commonly used, and machine-readable
                format, under certain conditions; (vii) the right object to decisions being taken by
                automated means which produce legal effects concerning you or similarly
                significantly affect you, under certain conditions; (viii) the right to lodge a
                complaint with data protection authorities. If you want to learn more about your
                rights under the GDPR, you can visit the European Commission’s page on Data
                Protection.
              </div>
            </div>
            <div className={styles.info_block}>
              <div className={styles.info_title}>Changes to this Policy</div>
              <div className={styles.info_description}>
                We may update this Privacy Policy from time to time. If we do so, we will send an
                email to users subscribed to the Company News list. We will also add a site banner
                alerting users who may not be subscribed. If the change materially effects the
                treatment of your personal data, and we have your email but you are not subscribed
                to the Company News list, we will send you an email. (You are responsible for
                ensuring that we have an up-to-date email for this purpose.)
              </div>
            </div>
            <div className={styles.info_block}>
              <div className={styles.info_title}>Changes to this Policy</div>
              <div className={styles.info_description}>
                If you have any questions or comments about this Privacy Policy or your personal
                information, to make an access or correction request, to exercise any applicable
                rights, to make a complaint, or to obtain information about our policies and
                practices with respect to any service providers outside Canada, our Privacy Officer
                (or Data Protection Officer) can be reached by mail or email using the following
                contact information: by email at privacy@dribbble.com or by mail at 524 Yates St.,
                Victoria, BC, V8W 1K8, Canada.
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
};

Privacy.prototype = {
  user: PropTypes.object,
};

export default Privacy;
