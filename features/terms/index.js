import React from 'react';

import Footer from 'components/footer';
import Header from 'components/header';
import Imgix from 'components/imgix';
import ButtonToTop from 'components/ui-elements/button-toTop';
import FooterLogin from 'features/footerLogin';
import { NextSeo } from 'next-seo';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const Terms = ({ user }) => (
  <>
    <NextSeo
      title="MangaFY Terms of Service"
      description="MangaFY Terms of Service"
      canonical=""
      openGraph={{
        url: 'https://mangafy.club/terms',
        title: 'MangaFY Terms of Service',
        description: 'MangaFY Terms of Service',
        type: 'article',
        images: [
          {
            url: 'https://mangafy.club/img/indexMobSec3.webp',
            width: 800,
            height: 600,
            alt: '',
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
        <Header path="terms" user={user} />
        <main>
          <div className={styles.terms_page}>
            <div className={styles.title_section}>
              <div className={styles.title_inner}>
                <div className={styles.page_title}>Terms MangaFY</div>
                <div className={styles.page_description}>
                  Hi There! If you’re reading this, you’re probably like me – spending most of your
                  time writing at your desk, in-front of a computer or a notebook, hoping to one day
                  see your vision turning into a graphic novel (comic or even a manga!).
                </div>
              </div>
              <div className={styles.image_block}>
                <Imgix
                  width={240}
                  height={310}
                  layout="fixed"
                  src="https://mangafy.club/img/about_image.webp"
                  alt="mangaFy about"
                />
              </div>
            </div>
            <div className={styles.info_section}>
              <div className={styles.page_title}>Service Master Terms of Use</div>
              <div className={styles.update_block}>26th of May, 2021</div>
              <div className={styles.info_block}>
                <div className={styles.info_description}>
                  At this stage, MangaFY is currently in an initial demo trial run. Users own all
                  data and have copyrights to their materials. In any case of ceasing operations,
                  MangaFY will not hold or store any user property or content. Nor will MangaFY be
                  involved in the team production and creation process or communication between
                  parties on their projects. Projects belong to the users. And will not be
                  accountable. Once an official launch begins or new features added, the T&C section
                  will be updated accordingly to reflect such changes.
                </div>
              </div>
              <div className={styles.info_block}>
                <div className={styles.info_title}> Article 1. Introduction</div>
                <div className={styles.info_description}>
                  <ol>
                    <li>
                      These MangaFY Master Terms of Use (referred to as these “Terms of Use” or, to
                      distinguish them from individual terms of use, these “Master Terms of Use”)
                      apply to all conduct in cases where Users use the services (the services are
                      collectively referred to as the “Services,” and individual services are
                      referred to as “Individual Services”) provided byMangaFY. (the “Company”).
                      Users shall agree to these Terms of Use and use the Services in accordance
                      with these Terms of Use.
                    </li>
                    <li>
                      Terms and conditions for use of the Services are set forth in these Terms of
                      Use as well as terms of use, guidelines, and other agreements relating to
                      Individual Services. These individual terms of use, rules, and so on
                      (“Individual Terms of Use etc.”) apply as a constituent part of the agreement
                      pursuant to these Terms of Use. In cases where these Terms of Use do not apply
                      pursuant to Individual Terms of Use etc., only the relevant Individual Terms
                      of Use etc. apply.
                    </li>
                  </ol>
                </div>
              </div>
              <div className={styles.info_block}>
                <div className={styles.info_title}> Article 2. Definitions</div>
                <div className={styles.info_description}>
                  The terms used in these Terms of Use are defined as set forth below.
                  <ol>
                    <li> “User” means a person who uses the Services. </li>
                    <li>
                      “Account” means any one of multiple types of authority of utilization of the
                      Services issued by the Company to a User who registers accounts pursuant to
                      the procedures specified in Article 7 or other provisions. Users are required
                      to acquire necessary accounts according to the Individual Services that User
                      wishes to use.
                    </li>
                    <li>
                      “Registered Email Address” means email address information provided by User to
                      the Company for the purpose of receiving the Services.
                    </li>
                    <li>
                      “ID” means a text string used for identification of an individual by making
                      reference to the Registered Email Address and Password when using the
                      Services. One ID is issued for each account.
                    </li>
                    <li>
                      “Password” means a text string used for identification of an individual by
                      making reference to a Registered Email Address when using the Services.
                    </li>
                    <li>
                      “Posted Information” means all data and information transmitted, distributed,
                      posted, uploaded, registered, or edited (“Posted etc.” or “Post etc.”) by User
                      when using the Services including images, text, translation, and information
                      relating to displayed items.
                    </li>
                  </ol>
                </div>
              </div>
              <div className={styles.info_block}>
                <div className={styles.info_title}>
                  Article 3. Revision of these Terms of Use and Individual Terms of Use etc.
                </div>
                <div className={styles.info_description}>
                  <ol>
                    <li>
                      The Company may, at its discretion, revise these Terms of Use and Individual
                      Terms of Use etc. at any time.
                    </li>
                    <li>
                      Except when otherwise specified by the Company, revised versions of these
                      Terms of Use and Individual Terms of Use etc. shall take effect when indicated
                      on the Services.
                    </li>
                    <li>
                      In the case where User uses the Services after the revised versions of these
                      Terms of Use and Individual Terms of Use etc. come into effect, User shall be
                      deemed to have consented to all of the revised versions of these Terms of Use
                      and Individual Terms of Use etc.
                    </li>
                  </ol>
                </div>
              </div>
              <div className={styles.info_block}>
                <div className={styles.info_title}>Article 4. Handling of Personal Information</div>
                <div className={styles.info_description}>
                  The Company shall properly handle personal information in accordance with its
                  Privacy Policy.
                </div>
              </div>
              <div className={styles.info_block}>
                <div className={styles.info_title}>
                  Article 5. Confidentiality of Communications
                </div>
                <div className={styles.info_description}>
                  <ol>
                    <li>
                      The Company shall maintain the secrecy of communications of User
                      communications in accordance.
                    </li>
                    <li>
                      In the cases set forth in the following items, the Company shall not bear the
                      duty to protect the secrecy of communications specified in the preceding
                      paragraph to the extent indicated in each item:
                      <ol>
                        <li>
                          In cases where compulsory disposition or a court order is issued pursuant
                          to the Code of Criminal Procedure or the Act on Wiretapping for Criminal
                          Investigation, to the extent of such compulsory disposition or court
                          order;
                        </li>
                        <li>
                          In cases where compulsory disposition is issued pursuant to laws and
                          regulations, to the extent of such disposition or court order;
                        </li>
                        <li>
                          In cases where the Company determines that the requirements for demand for
                          disclosure pursuant to Article 4 of the Act on the Limitation of Liability
                          for Damages of Specified Telecommunications Service Providers and the
                          Right to Demand Disclosure of Identification Information of the Senders
                          are satisfied, to the extent of that demand; and
                        </li>
                        <li>
                          In cases where the Company determines that disclosure is necessary to
                          protect the life, body, or property of a third party, to the extent
                          necessary to protect the life, body, or property of the third party.
                        </li>
                      </ol>
                    </li>
                  </ol>
                </div>
              </div>
              <div className={styles.info_block}>
                <div className={styles.info_title}> Article 6. Account Registration</div>
                <div className={styles.info_description}>
                  <ol>
                    <li>
                      The Services may include content that can be used only by Users with
                      registered accounts.
                    </li>
                    <li>
                      Persons who wish to register an account may, after agreeing to these Terms of
                      Use, apply for account registration by the method designated by the Company.
                      The information that must be input when performing such registration is
                      referred to as “Registered Information.”
                    </li>
                    <li>
                      When performing the application specified in Paragraph 2, User shall provide
                      to the Company User’s own true, accurate, and current information as
                      Registered Information.
                    </li>
                    <li>
                      Registration of a person who applies for account registration (“Registration
                      Applicant”) shall be complete when the Company approves the registration.
                    </li>
                    <li>
                      In any of the following cases, the Company may, at its discretion, reject the
                      registration application of a Registration Applicant without disclosing the
                      reason.
                      <ol>
                        <li>
                          In cases where the Registration Applicant requested registration not using
                          the method specified in Paragraph 2;
                        </li>
                        <li>
                          In cases where an application is made by providing fraudulent, false, or
                          misleading information;
                        </li>
                        <li>
                          In cases where the Registration Applicant breached contractual duties in
                          relation to any services provided by the Company or in transactions with
                          other Users in the past; further, in cases where the Company determines
                          that there is a likelihood of such breach in the future;
                        </li>
                        <li>
                          In cases where the Registration Applicant violated these Terms of Use;
                        </li>
                        <li>
                          In cases where the Registration Applicant engaged in prohibited conduct
                          specified in Article 15 in the past or the Company determines that there
                          is a likelihood of Registration Applicant engaging in such prohibited
                          conduct in the future;
                        </li>
                        <li>
                          In cases where the Registration Applicant is a minor, adult ward, person
                          under curatorship, or person under assistance and the Registration
                          Applicant’s legal representative, guardian, curator, or assistant does not
                          consent;
                        </li>
                        <li>
                          In cases where the Registration Applicant is an anti-social force, was
                          formerly an anti-social force, uses anti-social forces, or its main
                          investors or officers and employees are constituent members of anti-social
                          forces; or
                        </li>
                        <li>
                          In other cases where the Company determines that the application is
                          inappropriate.
                        </li>
                      </ol>
                    </li>
                    <li>
                      In cases where the Company does not approve an application for account
                      registration, the Company shall not bear a duty to disclose the reason for not
                      approving the application to the applicant and shall not bear any liability
                      whatsoever with regard to damage incurred by the applicant as a result of the
                      non-approval.
                    </li>
                    <li>
                      In cases falling under any of the following items in relation to a User who
                      registered an account, the Company may cancel or temporarily suspend the
                      User’s membership, cancel rights associated with the User’s membership, or
                      refuse use of the Services in the future.
                      <ol>
                        <li>
                          In cases where the Company determines that the User fell under or falls
                          under any of the grounds specified in each item of Paragraph 5;
                        </li>
                        <li>
                          In cases of violation of laws and regulations or these Terms of Use;
                        </li>
                        <li>
                          In cases where the User is determined to have engaged in prohibited
                          conduct specified in Article 15 in the past or is likely to engage in such
                          prohibited conduct in the future;
                        </li>
                        <li> In cases of improper conduct; </li>
                        <li>
                          In cases where problems with other Users or third parties exceed certain
                          levels established by the Company, regardless of willful misconduct or
                          negligence;
                        </li>
                        <li>
                          In cases where complaints received from other Users or third parties
                          exceed certain levels established by the Company, regardless of willful
                          misconduct or negligence;
                        </li>
                        <li>
                          In cases where the User does not login at least a certain number of times
                          within a certain period specified by the Company;
                        </li>
                        <li>
                          In the case where the Company determines that continued provision of the
                          Services is unfeasible based on reasonable grounds; or
                        </li>
                        <li>
                          In cases where the Company otherwise determines that there are substantial
                          impediments to the execution of business operations.
                        </li>
                      </ol>
                    </li>
                  </ol>
                </div>
              </div>
              <div className={styles.info_block}>
                <div className={styles.info_title}>Article 7. Change of Registered Information</div>
                <div className={styles.info_description}>
                  <ol>
                    <li>
                      If a change occurs to Registered Information, User shall promptly notify the
                      Company of the relevant changed information by the method specified by the
                      Company.
                    </li>
                    <li>
                      If a User incurs any disadvantage as a result of failure to provide notice,
                      the Company shall not bear any liability whatsoever.
                    </li>
                  </ol>
                </div>
                <div className={styles.info_description}>
                  8. Control etc. of Registered Email Address, ID, and Password
                </div>
                <div className={styles.info_description}>
                  <ol>
                    <li>
                      User shall register as User’s Registered Email Address a useable email address
                      that is under User’s control, and in the case where a Registered Email Address
                      is no longer under User’s control, User must change the Registered Email
                      Address to a different useable email address under User’s control.
                    </li>
                    <li>
                      User shall endeavor to prevent improper use of User’s Registered Email
                      Addresses, Passwords, and IDs (“Registered Email Address etc.”) and shall bear
                      all responsibility for control of the Registered Email Address etc.
                    </li>
                    <li>
                      The Company shall not bear any liability whatsoever for damage and the like
                      incurred as a result of use of User’s Registered Email Address etc. by a third
                      party. Conduct performed using a Registered Email Address etc. shall be deemed
                      the conduct of the User who holds that Registered Email Address etc. even in
                      the case where such use was made by a third party without the User’s consent
                      or otherwise improperly, and User consents to bear responsibility for such
                      conduct. Further, the Company shall not bear any liability whatsoever for
                      damage arising as a result of such conduct, regardless of User’s willful
                      misconduct or negligence.
                    </li>
                    <li>
                      In the case where a Registered Email Address etc. or other such information is
                      divulged to a third party or there is a likelihood of such divulgence, User
                      shall promptly notify the Company; provided, however, that while the Company
                      can suspend or terminate use of the Services by the relevant Registered Email
                      Address etc., the Company shall not bear any liability whatsoever for damage
                      resulting from such divulgence of information.
                    </li>
                    <li>
                      User may not make any claims whatsoever to the Company for investigation
                      regarding temporary suspension of use of the Services, damages incurred, lost
                      profits, and so on arising from theft, loss, or improper use by a third party
                      of User’s Registered Email Address etc.
                    </li>
                    <li>
                      Registration of a usable phone number under the control of User may be
                      necessary for some Individual Services. In this case, this article shall also
                      apply to that phone number.
                    </li>
                  </ol>
                </div>
              </div>
              <div className={styles.info_block}>
                <div className={styles.info_title}> Article 9. Account Possession</div>
                <div className={styles.info_description}>
                  <ol>
                    <li>
                      In principle, each User may have one account of each type. In cases where it
                      is necessary for activities using the Services such as distinguishing between
                      art works or names, User is allowed to have multiple accounts to the extent
                      not otherwise in violation of these Terms of Use.
                    </li>
                    <li>
                      Users may not under any circumstances transfer or loan an account to a third
                      party.
                    </li>
                  </ol>
                </div>
              </div>
              <div className={styles.info_block}>
                <div className={styles.info_title}> Article Use Environment</div>
                <div className={styles.info_description}>
                  <ol>
                    <li>
                      User shall maintain all hardware, software, and so on necessary for use of the
                      Services at User’s own expense and under User’s own responsibility.
                    </li>
                    <li>
                      Users shall take measures according to their own use environments for the
                      prevention of infection with computer viruses, unauthorized access, leaks of
                      information, and the like.
                    </li>
                    <li>
                      The Company shall not have any involvement in or bear any responsibility
                      whatsoever for User’s use environments. User shall bear all liability and
                      damage arising from the hardware, communications lines, software, and so on
                      used by User and all liability and damage caused by errors in the use of the
                      Services by User, and the Company shall not bear any liability whatsoever,
                      regardless of User’s willful misconduct or negligence.
                    </li>
                    <li>
                      Users may in some instances acquire software for use of the Services via
                      application distribution services provided by third parties (“Distribution
                      Services”). In such case, the Company makes no warranties regarding the
                      performance, details, or continuity of Distribution Services. The Company
                      shall not bear any liability even in the case where User is unable to acquire
                      such software because of suspension or discontinuation of all or part of such
                      Distribution Services due to defects or other reasons.
                    </li>
                  </ol>
                </div>
              </div>
              <div className={styles.info_block}>
                <div className={styles.info_title}> Article 11. User Responsibilities</div>
                <div className={styles.info_description}>
                  <ol>
                    <li>
                      User shall use the Services under its own responsibility and shall bear all
                      responsibility for actions taken when using the Services and their results.
                    </li>
                    <li>
                      Transactions by User with other Users conducted by using the Services are
                      direct transactions between the Users, and the Company is not a party to any
                      agreement.
                    </li>
                    <li>
                      All types of work, communications, performance of legal duties, resolution of
                      problems, and so on in conjunction with the transactions between Users
                      specified in the preceding paragraph shall be performed by the Users who are
                      parties to the transaction.
                    </li>
                    <li>
                      User shall bear all responsibility relating to Posted the Information that
                      User Posts etc. by using the Services. The Company shall not bear any
                      responsibility whatsoever regarding Posted Information that is Posted etc. by
                      User using the Services.
                    </li>
                    <li>
                      In the case where the Company or a third party incurs damage as a result of
                      violation of these Terms of Use by User, User shall be liable to pay
                      compensation to the Company for all such damage.
                    </li>
                    <li>
                      In the case where dispute arises between the User and a third party relating
                      to the service, the User is responsible for resolution of this conflict, and
                      the Company shall not bear any liability whatsoever. User must pay
                      compensation for damage and resolve the matter under its own responsibility
                      and at its own expense (including attorneys&apos; fees and all expenses
                      related to the dispute etc.). However, situations where the Company is
                      responsible due to the intention or gross negligence shall be excluded.
                    </li>
                  </ol>
                </div>
              </div>
              <div className={styles.info_block}>
                <div className={styles.info_title}> Article 12. Prohibited Conduct</div>
                <div className={styles.info_description}>
                  When using the Services, User must not engage in the conduct set forth in the
                  following items.
                  <ol>
                    <li>
                      Conduct that infringes or is likely to infringe on the copyrights, design
                      rights or other Intellectual Property Rights of the Company or third parties;
                    </li>
                    <li>
                      Reproducing Posted Information Posted etc. to the Services or a related
                      services without the consent of the copyright holder (author);
                    </li>
                    <li>
                      Engaging in activities that have a commercial or business objective, use that
                      has a profit-making objective, or use in preparation for such profit-making
                      objectives, regardless of the means, by using, diverting, reselling,
                      reproducing, transmitting, translating, adapting, modifying, and so on the
                      Services or a portion of the Services (the content, information, functions,
                      system, programs, etc.) or other secondary use or reproduction of the
                      Services;
                    </li>
                    <li>
                      Conduct that infringes or is likely to infringe on the property, privacy, or
                      rights to likeness of the Company or third parties;
                    </li>
                    <li>
                      Engaging in inappropriate discrimination against or malicious slander of the
                      Company or a third party, abetting inappropriate discrimination against a
                      third party, or harming the honor or reputation of a third party;
                    </li>
                    <li>
                      Conduct in violation of the Act on Regulation of Stalking Conduct, making
                      large numbers of telephone calls or telephone calls over an extended period of
                      time or excessive and repeated inquiries of the same nature, transmitting
                      large numbers of messages using a messaging function, or making demands
                      regarding which there is no duty or which are baseless;
                    </li>
                    <li> Impersonation of another person; </li>
                    <li>
                      Conduct that is linked to or likely to be linked to fraud or other criminal
                      behavior;
                    </li>
                    <li>
                      Engaging in any of the following conduct in relation to the Posted Information
                      data that constitutes constitutes obscenity, obscenity, child pornography, or
                      child abuse in violation of laws, regulations, or other criteria established
                      by the Company (referred to as “Improper Data”):
                      <ol>
                        <li> Issuing, posting, editing, or displaying Improper Data; </li>
                        <li> Selling media that contains Improper Data; and </li>
                        <li>
                          Posting or displaying advertisements that allude to the transmission,
                          display, or sale of media that contains Improper Data;
                        </li>
                      </ol>
                    </li>
                    <li>
                      Conduct that is likely to glamorize, provoke, or abet suicide, self-injurious
                      behavior, substance abuse, and so on;
                    </li>
                    <li>
                      Posting etc. Posted Information data that contains any of the following:
                      <ol>
                        <li>
                          Information that maliciously slanders Posted Information that has been
                          Posted etc.;
                        </li>
                        <li>
                          Information that can be used to identify an individual (including cases
                          where an individual can be identified by collating such information with
                          other Posted Information that has been Posted etc.) such as the name,
                          address, workplace, or telephone number of the contributor or third party
                          (including employees of the Company)
                        </li>
                        <li>
                          Information whose veracity is difficult to confirm and false information;
                          and
                        </li>
                        <li>Other information that the Company determines to be inappropriate;</li>
                      </ol>
                    </li>
                    <li> Impersonating an operator or third party; </li>
                    <li>
                      Exchanging one’s use rights to the Services for cash, goods, or other economic
                      benefit by any method other than the method specified by the Company;
                    </li>
                    <li>
                      Acquiring multiple accounts of the same type (excluding cases specifically
                      permitted under Article 11);
                    </li>
                    <li>
                      Posting Posted Information for the purpose of commercial advertising,
                      publicity, or inducement (except in cases specifically permitted by the
                      Company), Posted Information that contains affiliate links, Posted Information
                      that contains inducements to other parties such as MLM or “pay to surf,”
                      Posted Information that induces traffic to adult sites, one-click fraud sites,
                      sites intended to distribute viruses or other malicious computer programs, or
                      other sites determined by the Company to be inappropriate (including simply
                      posting links to such sites), or other Posted Information that the Company
                      determines to be inappropriate;
                    </li>
                    <li>
                      Inappropriately delaying responses to or ignoring communications from the
                      Company or other Users who are conducting transactions between Users;
                    </li>
                    <li>
                      Despite receiving any reward from a company, etc., acts that fall under the
                      guise of a third party, such as advertising (“stealth marketing”), or acts
                      using the Service in stealth marketing, etc;
                    </li>
                    <li>
                      Using expression linked to discrimination on the basis of race, ethnicity,
                      sex, age, belief, and so on;
                    </li>
                    <li>
                      Conduct that imposes excessive loads on the Service servers, hinders operation
                      of the Services or network systems, or is likely to have such results;
                    </li>
                    <li>
                      Improperly rewriting or deleting data stored on the Company’s facilities;
                    </li>
                    <li> Transmitting or posting viruses or other harmful computer programs; </li>
                    <li>
                      Conduct that the Company determines violates laws and regulations, public
                      order, these Terms of Use, or Individual Terms of Use etc. or infringes on the
                      rights of another person;
                    </li>
                    <li>
                      Posting or editing expression that extols or incites extremist ideas or
                      antisocial behavior;
                    </li>
                    <li>
                      Posting or editing expression that extols or incites discrimination on the
                      basis of race, belief, occupation, sex, religion, and so on;
                    </li>
                    <li>
                      Posting or editing expression that extols or incites cult-like religious
                      activity or extreme political activity;
                    </li>
                    <li>
                      Using the Services to display, sell, purchase, register, or engage in other
                      transactions involving the products set forth below:
                    </li>
                    <li>
                      <ol>
                        <li>
                          Stimulants, narcotics, psychotropic agents, marijuana, opium, poisons,
                          toxic substances, and other prohibited goods;
                        </li>
                        <li>
                          Marijuana seeds and products related to legal drugs (unregulated drugs);
                        </li>
                        <li> Firearms, swords, weapons, explosives, chemical weapons;</li>
                        <li>
                          Products that contain images or other data corresponding to obscenity,
                          child pornography, or child abuse;
                        </li>
                        <li>
                          Products that contain uncorrected representations of exposed sexual organs
                          or explicit images of sexual intercourse;
                        </li>
                        <li> Used undergarments, uniforms, etc.; </li>
                        <li> Prostitution and child prostitution; </li>
                        <li> Products relating to gambling, lotteries, etc.; </li>
                        <li>
                          Products relating to unlimited chain investment schemes and multi-level
                          marketing;
                        </li>
                        <li> Tobacco; </li>
                        <li>
                          Counterfeit currency, public documents (including driver’s licenses and
                          passports), memberships, documents, electromagnetic recordings, and other
                          such products;
                        </li>
                        <li>Bank accounts and the like; </li>
                        <li>
                          Gift cards, prepaid cards, revenue stamps, postage stamps, multiple use
                          tickets, other securities, and coupons;
                        </li>
                        <li>
                          Counterfeit brand products, imitation products, and pirated versions
                          (illegal copies, etc.);
                        </li>
                        <li>
                          Game copying devices, Pandora Batteries, and other devices that facilitate
                          illegal copies and related products;
                        </li>
                        <li>
                          Products obtained through theft, robbery, fraud, blackmail, embezzlement,
                          misappropriation, or other crimes;
                        </li>
                        <li>
                          Air guns, stun guns, pepper spray, swords whose possession is prohibited
                          by laws and regulations; bugging devices, ultra-compact cameras, infrared
                          cameras, and other products likely to be used for crimes;
                        </li>
                        <li>
                          Products that infringe on patent rights, utility model rights, design
                          rights, trademark rights, copyrights,
                        </li>
                        <li>
                          Products regarding which the displaying party does not have sales rights
                          and so on such as products for which the displaying party did not
                          participate in the creation (not including cases where copyrights and
                          other rights were assigned by the creator);
                        </li>
                        <li>
                          Provision of services not involving a material creation and products
                          likely to entail the provision of such services;
                        </li>
                        <li> Softwares that contain security threats such as computer viruses. </li>
                        <li>
                          Physical function examination kits, medical devices (medical supplies),
                          pharmaceutical products, and pharmaceutical products the sale of which is
                          prohibited in Japan;
                        </li>
                        <li> Human remains and parts of human remains; </li>
                        <li> Animals, parts of animals, insects, and other organisms; </li>
                        <li>
                          Personal information, trade secrets, and other information not generally
                          released to the public;
                        </li>
                        <li>
                          Products for which a license or qualification required for sale is not
                          held or satisfied;
                        </li>
                        <li>
                          Other products whose trading violates laws and regulations (the Act on
                          Specified Commercial Transactions, the Firearm and Sword Control Law, laws
                          regulating narcotics, the Convention on International Trade in Endangered
                          Species of Wild Fauna and Flora, and other relevant laws and regulations);
                        </li>
                        <li>Products intended to convert credit card credit limits to cash; </li>
                        <li> Products for which the service provision period is lengthy; </li>
                        <li>
                          Products whose sale requires permits and approvals, registration, notice,
                          and so on; and
                        </li>
                        <li>
                          Other products outside the scope of the Company’s prohibitions and terms
                          of use that the Company determines to be inappropriate; and
                        </li>
                      </ol>
                    </li>
                    <li>
                      In situations where a User uses the Service to provide Products, license or
                      service to other Users, the act that brings disadvantages to other Users of
                      the Service, such as demanding different charges depending on the payment
                      method.
                    </li>
                    <li> Other conduct that the Company determines to be inappropriate.</li>
                  </ol>
                </div>
              </div>
              <div className={styles.info_block}>
                <div className={styles.info_title}>
                  Article 13. Responses to Violation etc. and Cancellation of Registration
                </div>
                <div className={styles.info_description}>
                  <ol>
                    <li>
                      In cases where it is determined by the Company that User has violated these
                      Terms of Use or the Company otherwise determines that it is necessary, the
                      Company may, at its discretion and without prior notice, take the following
                      measures against the relevant User; provided, however, that the Company shall
                      not be obligated to take these measures or to disclose the reasons for taking
                      these measures.
                      <ol>
                        <li>
                          Demand that the User cease the conduct in violation of or suspected of
                          being in violation of these Terms of Use and not repeat such conduct, as
                          well as achieve these objectives by seeking a court injunction;
                        </li>
                        <li>
                          Conduct consultations to resolve claims, demands, and so on with another
                          person (including out-of-court dispute resolution proceedings);
                        </li>
                        <li> Demand deletion or revision of Posted Information; </li>
                        <li>
                          Delete all or some Posted Information, modify the scope of public
                          disclosure, or make Posted Information inaccessible;
                        </li>
                        <li> Suspend use by the User; </li>
                        <li> Compel the User to withdraw; and </li>
                        <li> Reject a membership application. </li>
                      </ol>
                    </li>
                    <li>
                      Users may not make any objection regarding the Company’s measures specified in
                      the preceding paragraph.
                    </li>
                    <li>
                      Users shall release the Company from liability in cases where the Company
                      takes the measures specified in each item of Paragraph 1 in relation to
                      outcomes caused by those measures.
                    </li>
                    <li>
                      User acknowledges in advance that the Company may take the measures specified
                      in Paragraph 1 at its discretion and without prior notice.
                    </li>
                    <li>
                      In the case where User falls under any of the following items, the Company
                      may, at its discretion and without prior notice, suspend use of the Services,
                      compulsorily cancel User’s registration, and thereafter reject use of the
                      Services by User.
                      <ol>
                        <li>
                          In the case where it is revealed that User submitted a membership
                          application not in accordance with the method specified in Article 7,
                          Paragraph 2;
                        </li>
                        <li>
                          In the case where User violates these Terms of Use or Individual Terms of
                          Use etc.;
                        </li>
                        <li>
                          In the case where it is revealed that User falls under any item of Article
                          7, Paragraph 5;
                        </li>
                        <li>
                          In the case where User suspends payments or becomes insolvent or a
                          petition is filed for the commencement of bankruptcy proceedings,
                          commencement of civil rehabilitation proceedings, commencement of
                          corporate reorganization proceedings, commencement or special liquidation,
                          or commencement of other comparable proceedings (this item is applicable
                          to Users who use fee-based services);
                        </li>
                        <li>
                          In the case where no response is made to an inquiry or other communication
                          from the Company requesting a response for 30 or more days;
                        </li>
                        <li>
                          In the case where multiple claims or inquiries regarding User are received
                          by the Company from other Users or third parties;
                        </li>
                        <li>
                          In the case where the Company determines that User is not appropriate as a
                          User; or
                        </li>
                        <li> In other cases determined by the Company to be inappropriate. </li>
                      </ol>
                    </li>
                    <li>
                      In the case where a User falls under any items of the preceding paragraph and
                      the Company temporarily suspends use of the Services by the relevant User or
                      cancels the User’s registration, all obligations owed by User to the Company
                      shall be accelerated, and User must immediately repay all obligations owed to
                      the Company.
                    </li>
                  </ol>
                </div>
              </div>
              <div className={styles.info_block}>
                <div className={styles.info_title}> Article 14. Cancellation of Registration</div>
                <div className={styles.info_description}>
                  <ol>
                    <li>
                      User shall follow the procedure provided by the Company to request for
                      deleting the account when requesting for cancellation, and follow the methods
                      provided by the Company to delete the account.
                    </li>
                    <li>
                      In the case where User’s registration (in cases where User is registered under
                      separate qualifications for an Individual Service, including such
                      registration) is cancelled, all rights of User to use the Services shall be
                      extinguished, and the Company may delete all Registered Information and Posted
                      Information of User.
                    </li>
                    <li>
                      The Company shall not bear a duty to restore the Registered Information or the
                      posted content of the relevant User for any reason.
                    </li>
                  </ol>
                </div>
              </div>
              <div className={styles.info_block}>
                <div className={styles.info_title}>
                  Article 15. Authority to Delete Posted Information
                </div>
                <div className={styles.info_description}>
                  In the following cases, regardless of whether Posted Information is unlawful or
                  violates these Terms of Use, the Company may delete all or some related Posted
                  Information or take measures such as modifying the scope of public access;
                  provided, however, that the Company shall not bear a duty to take these measures
                  or to disclose the reasons for taking such measures.
                  <ol>
                    <li>
                      In cases where a public agency or specialist (a national or regional public
                      body, a reliability-confirmed body specified in the Act on the Limitation of
                      Liability for Damages of Specified Telecommunications Service Providers and
                      the Right to Demand Disclosure of Identification Information of the Senders,
                      Internet hotline, attorney, etc.) indicates or expresses an opinion that
                      Posted Information is unlawful, contrary to public morals, or infringes on the
                      rights of another person;
                    </li>
                    <li>
                      In cases where a third party makes a claim of rights regarding Posted
                      Information;
                    </li>
                    <li>
                      In cases where the Company determines that Posted Information that has been
                      Posted, etc. infringes on the copyrights of a third party;
                    </li>
                    <li>
                      In cases where the Service experience problems due to the coding of letters in
                      the Posted Information, or the Company determined the likeliness to be so.
                    </li>
                    <li>
                      In cases where the volume of information registered by User exceeds the volume
                      designated by the Company; or
                    </li>
                    <li>
                      In other cases where the Company determines that it is necessary to delete the
                      relevant information in accordance with laws and regulations or social norms.
                    </li>
                  </ol>
                </div>
              </div>
              <div className={styles.info_block}>
                <div className={styles.info_title}>
                  Article 16. Procedures in Cases of Copyright Infringement
                </div>
                <div className={styles.info_description}>
                  <ol>
                    <li>
                      In cases where there is an infringement of the copyrights to User’s own work
                      on the Service, such User may provide notice to the Company by a method
                      designated by the Company of the items designated by the Company.
                    </li>
                    <li>
                      In cases where notice is made pursuant to the order of a court, public
                      prosecutor’s office, or administrative organization, the Company shall respond
                      in compliance with such order.
                    </li>
                    <li>
                      Disputes relating to the infringement specified in Paragraph 1 shall be
                      resolved among the parties at their own costs and responsibilities.In the case
                      where the Company incurs damage as a result of such problems, the
                      party/parties to whom such problems are attributable shall (if they are
                      multiple parties, jointly and severally) pay compensation for such damage.
                    </li>
                    <li>
                      This article shall apply mutatis mutandis to infringement of rights other than
                      copyrights.
                    </li>
                  </ol>
                </div>
              </div>
              <div className={styles.info_block}>
                <div className={styles.info_title}> Article 17. Use Fees</div>
                <div className={styles.info_description}>
                  <ol>
                    <li>
                      Except in the case of MangaFY Premium features and in cases specified
                      otherwise in Individual Terms of Use etc. of the Services, use of the Services
                      shall be without charge.
                    </li>
                    <li>
                      The particulars of the fee-based services, use fees, methods of payment, and
                      so on shall be separately specified in the Individual Terms of Use etc.
                    </li>
                  </ol>
                </div>
              </div>
              <div className={styles.info_block}>
                <div className={styles.info_title}>
                  Article 18. Warranties and Duties Relating to Posted Information
                </div>
                <div className={styles.info_description}>
                  <ol>
                    <li>
                      When Posting etc. Posted Information using the Services, User warrants to the
                      Company that the relevant Posted Information does not infringe on the rights
                      of third parties.
                    </li>
                    <li>
                      In the case where any dispute arises with a third party on the grounds that
                      Posted Information Posted etc. by User infringes on the third party’s rights,
                      User shall resolve the matter at its own expense and under its own
                      responsibility and shall not cause any damage whatsoever to the Company.
                    </li>
                    <li>
                      User shall, under its own responsibility, manage and store all data including
                      images and text produced by User. User shall maintain appropriate backups of
                      images, text, and other data uploaded to the Services, and the Company makes
                      no warranties whatsoever regarding the preservation and so on of images, text,
                      and other data.
                    </li>
                  </ol>
                </div>
              </div>
              <div className={styles.info_block}>
                <div className={styles.info_title}>
                  Article 19. Ownership and Licensing of Intellectual Property Rights
                </div>
                <div className={styles.info_description}>
                  <ol>
                    <li>
                      Know-how, copyrights, design rights, trademarks, patent rights, utility model
                      rights, rights under the Unfair Competition Prevention Law Act (including
                      rights to receive design registrations, rights arising from trademark
                      applications, rights to receive patents, and rights to receive utility model
                      rights; referred to as “Intellectual Property Rights”; corresponding rights in
                      foreign countries and comparable rights that arise as a result of future
                      amendment and so on of laws and regulations are included in Intellectual
                      Property Rights) relating to the Services and to all text, images, videos,
                      music, logos, services, programs, and other information ancillary to the
                      Services as well as all other rights belong to the Company or the third
                      parties who licensed to the Company the use, application, or implementation of
                      those rights.
                    </li>
                    <li>
                      Intellectual Property Rights and all other rights to Posted Information Posted
                      etc. by using the Services belong to the User who created the relevant Posted
                      Information; provided, however, that, if prescribed explicitly, the User
                      hereby transfers the Intellectual Property Right to the Company.
                    </li>
                    <li>
                      User authorizes the Company to use information which user posted in the
                      following ways:
                      <ol>
                        <li>
                          The Company and third parties licensed by the Company shall provide the
                          User&apos;s posted information free of charge within the necessary range
                          for smooth provision, use promotion, advertisement / advertisement,
                          construction, improvement and maintenance of the Company&apos;s system.
                          Non-exclusive, permanent use, use (including modification of the necessary
                          limit in light of the purpose of use) and implementation.For example, the
                          Company post user&apos;s posted information on MangaFY official SNS
                          account such as Twitter, Facebook, Instagram, website operated by our
                          company, or materials created by our company for the purpose of promoting
                          and introducing this service・ It can be reprinted.
                        </li>
                        <li>
                          The Company may provide a function that allows user to view posted
                          information on MangaFY and individual services, and our affiliated
                          services. Post information may be processed according to the display
                          format provided by the service. The Company will provide a means for users
                          who have posted the information to check how the posted information is
                          displayed in the service, and a contact point for inquiries about it.
                        </li>
                      </ol>
                    </li>
                    <li>
                      User shall not exercise author’s moral rights against the Company and third
                      parties licensed by the Company in relation to the use, application or
                      implementation etc. within the extent prescribed in the preceding paragraph.
                    </li>
                    <li>
                      When the Company uses Posted Information in the format specified in Paragraph
                      3, the Company is entitled to omit display of some information or names and so
                      on (including display of nicknames and other modified names).
                    </li>
                  </ol>
                </div>
              </div>
              <div className={styles.info_block}>
                <div className={styles.info_title}>
                  Article 20. Original work and translation in the translation function
                </div>
                <div className={styles.info_description}>
                  In the Service, in order to deliver the work to more users, a function has been
                  set to solicit a translation from the user for the title, caption (description) or
                  the text of the work in some of the posted information. The process up to the
                  reflection of the translation and the attribution of the rights of the translation
                  submitted by applying for the offer are as follows.
                  <ol>
                    <li>
                      work submission user:
                      <ol>
                        <li>A work submission user is a user who submits a work on the Service.</li>
                        <li>
                          When submitting or editing a work on the Service, the work submission user
                          sets whether or not to request a translation for each work.
                        </li>
                        <li>
                          The user who submits the work can choose whether to approve the
                          translation provided by the translation user (defined in the next
                          section). In addition, the work submission user can choose whether to
                          publish only the approved translation or to publish the provided
                          translation once and approve it later.
                        </li>
                        <li>
                          If the Work Contributor determines that the translation is malicious, the
                          Work Contributor may block the Translator who posted the translation and
                          return the translation of the Work to the content immediately prior to the
                          translation by the Translator.
                        </li>
                        <li>
                          Upon approval of the translation by the work submission user, the
                          copyright of the translation (including Articles 27 and 28 of the
                          Copyright Act; the same shall apply hereinafter) is transferred from the
                          translation user to the work submission user free of charge.
                        </li>
                      </ol>
                    </li>
                    <li>
                      Translation user:
                      <ol>
                        <li>
                          A translation user is a user who provides a translation on the Service. No
                          special qualifications required.
                        </li>
                        <li>
                          If a translation is solicited for a work posted on the Service, the
                          translation user can provide a translation to the translation solicitation
                          part of the work. However, if the translation user is blocked by the user
                          who submits the work, no translations can be provided to the work of the
                          user who submits the work unless the block is removed.
                        </li>
                        <li>
                          The copyright of the translation approved by the Work Contributor shall be
                          transferred to the Work Contributor free of charge at the time of the
                          approval. When a translation user submits a translation, at the time of
                          the submission, the translation user consents to the transfer of the
                          copyright in respect of the translation submitted by the translation user
                          to the user who submitted the work and to the non-exercise of moral
                          rights.
                        </li>
                        <li>
                          When a translation is approved, the user name of the translation user who
                          posted the translation before the translation is approved is listed as a
                          translation contributor. However, this does not apply to translation users
                          who are blocked by the user who submitted the work.
                        </li>
                      </ol>
                    </li>
                  </ol>
                </div>
              </div>
              <div className={styles.info_block}>
                <div className={styles.info_title}> Article 21. Translation of Tags</div>
                <div className={styles.info_description}>
                  Within the functions of some of the Services, User may propose translations of
                  tags attached to Posted Information into Roman letters or other languages (“Tag
                  Translations”) for the purpose of facilitating the use of search functions within
                  the Services by individuals who use various languages. In such cases, User shall
                  comply with the conditions set forth in the following items. Users shall propose
                  Tag Translations after agreeing to the following items.
                  <ol>
                    <li>
                      Proposed Tag Translations shall be used anonymously on the Services. The names
                      of Users who make proposals shall not be displayed.
                    </li>
                    <li>
                      Proposed Tag Translations may be used and modified without charge and
                      non-exclusively to the extent necessary for the effective provision of the
                      Services and related services, facilitation of use, advertising and publicity,
                      and development, improvement, and maintenance of the Company’s systems. See
                      (help) for examples of suggested translations .
                    </li>
                    <li>
                      Proposed Tag Translations are provided to third parties as “anonymous
                      translation data not including personal information” to enhance the quality of
                      translations.
                    </li>
                  </ol>
                </div>
              </div>
              <div className={styles.info_block}>
                <div className={styles.info_title}>Article 21-2 Automatic Translation Function</div>
                <div className={styles.info_description}>
                  <ol>
                    <li>
                      In the Services, users are permitted to use the function by which terms,
                      sentences or posted information on the Service will be translated
                      automatically (“Automatic Translation Function”) in certain cases designated
                      by the Company. The languages to be translated shall be designated by the
                      Company on the Services.
                    </li>
                    <li>
                      The Company offers the Automatic Translation Function on the Services in order
                      to display translations for users’ convenience and reference. The Company
                      makes no warranties whatsoever regarding the accuracy, validity, or
                      suitability for particular purpose, in relation to the Automatic Translation
                      Function.
                    </li>
                    <li>
                      In cases where users make an inquiry to the Company about translations by the
                      Automatic Translation Function, the Company shall not bear a duty to reply or
                      answer to such inquiry.
                    </li>
                    <li>
                      The Company shall bear no liability whatsoever in regard to, and shall be in
                      no way obligated to respond to, any problems arising between Users or between
                      Users and third parties in connection with the Automatic Translation Function,
                      except where explicitly specified otherwise.
                    </li>
                    <li>
                      Users shall refer to and use the translations made by Automatic Translation
                      Function under their own responsibility upon the prior consent of themselves
                      to Paragraph 3 and 4 in this Article 22-2
                    </li>
                  </ol>
                </div>
              </div>
              <div className={styles.info_block}>
                <div className={styles.info_title}> Article 22. Monitoring Operations</div>
                <div className={styles.info_description}>
                  <ol>
                    <li>
                      The Company and third parties entrusted by the Company shall have the right,
                      at the Company’s sole discretion, to monitor whether User is using the
                      Services in accordance with these Terms of Use and Individual Terms of Use
                      etc. and to confirm that User is not engaged in any conduct in violation of
                      these Terms of Use or other inappropriate conduct unless such monitoring or
                      confirmation violates such User’s secrecy of communications.
                    </li>
                    <li>
                      The Company shall have the right to mechanically filter messages sent and
                      received on MangaFY Message, to maintain appropriate operation of the Service
                      by suspending the message feature of the User who sent messages including
                      inappropriate wordings.
                    </li>
                  </ol>
                </div>
              </div>
              <div className={styles.info_block}>
                <div className={styles.info_title}> Article 23 Disclaimers</div>
                <div className={styles.info_description}>
                  <ol>
                    <li>
                      The Company will not participate in User communications and transactions, etc.
                      Even in the event of a dispute between Users or between a User and a third
                      party, the matter shall be resolved between the relevant Users or the User and
                      third party, and the Company will not bear any responsibility whatsoever.
                    </li>
                    <li>
                      In cases where the Company determines that it is necessary, the Company may,
                      at its discretion and without the provision of notice to Users, modify,
                      suspend, discontinue, or terminate the Services (including SDK and the like
                      distributed by the Services, hereinafter in this Article 25 the same shall
                      apply.) or delete or modify the particulars of the Services. In this case, the
                      Company will not bear any liability to pay compensation or indemnification for
                      any direct or indirect damage, losses, or other expenses (whether foreseeable
                      or unforeseeable) incurred as a result of such modification, etc. of the
                      Services.
                    </li>
                    <li>
                      Even if provision of the Services is delayed, interrupted, etc. as a result of
                      any of the reasons set forth below or other reasons, the Company will not bear
                      any liability whatsoever for the resulting damage incurred by Users or other
                      persons, except when specifically provided in these Terms of Use or Individual
                      Terms of Use etc.
                      <ol>
                        <li>
                          Implementation of periodic or emergency maintenance to the Services’s
                          equipment, etc.;
                        </li>
                        <li>
                          Unavailability of the Services because of disaster, power outage, or the
                          like;
                        </li>
                        <li>
                          Unavailability of the Services because of earthquake, explosion, flooding,
                          tsunami, or other natural disaster;
                        </li>
                        <li>
                          Unavailability of the Services because of war, riot, civil disorder,
                          disturbance, labor dispute, or the like;
                        </li>
                        <li>
                          Breakdown, upkeep, maintenance or the like of equipment and systems used
                          by the Company;
                        </li>
                        <li>
                          Decrease of display speeds or other failures due to excessive accesses or
                          other unforeseeable factors;
                        </li>
                        <li>
                          Occurrence of a security problem that cannot be prevented by the usual
                          techniques such as preventing viewing use , known-free software and
                          anti-virus measures
                        </li>
                        <li>
                          In other cases where the Company determines that temporary suspension of
                          the Services is necessary for operational or technical reasons.
                        </li>
                      </ol>
                    </li>
                    <li>
                      The Company makes no warranties whatsoever regarding the accuracy, timeliness,
                      usefulness, reliability, or suitability for particular purpose of the
                      Services, the absence of any actual or legal defects, or the absence of any
                      infringement on the rights of third parties. The Company will not bear any
                      duties whatsoever to provide the Services free of such defects etc. Further,
                      the Company makes no warranties including warranties regarding the status of
                      provision of the Services, accessibility, or status of use.
                    </li>
                    <li>
                      In cases where User uses the Services or information learned from the
                      Services, User must comply with laws and regulations in the country or region
                      of use, and the Company will not bear any liability whatsoever regarding
                      violations of laws and regulations by User.
                    </li>
                    <li>
                      The Company shall provide to Users a simple and high-quality payment
                      environment and information on User needs, but the Company makes no warranties
                      regarding the absence of problems and so on in payment transactions. Further,
                      the Company will not bear any duties to make permanent updates or improvements
                      to or correct problems etc. in the Services.
                    </li>
                    <li>
                      The Company will not bear any duty to manage or store Posted Information
                      Posted etc. by Users.
                    </li>
                    <li>
                      The Company will not bear any liability whatsoever regarding the lawfulness,
                      accuracy, and so on of Posted Information Posted etc. by Users. The Company
                      will also not bear any liability whatsoever regarding the compliance of Posted
                      Information Posted etc. by User with the internal rules and the like of the
                      corporations, organizations, and so on with which the relevant User is
                      affiliated.
                    </li>
                    <li>
                      In the cases set forth below, the Company is entitled to access, store, or
                      disclose to third parties (referred to in this paragraph as “Access etc.”) the
                      details of the relevant Posted Information unless such Access etc. violates
                      such User’s secrecy of communications. The Company will not bear any liability
                      whatsoever with regard to any resulting damage incurred by Users.
                      <ol>
                        <li>
                          If the Company sends an email or text message to the Registered Email
                          Address of the User who Posted etc. the Posted Information requesting
                          consent to Access etc. and the circumstances set forth in the any of the
                          following items occurs;
                          <ol>
                            <li> If User consents to Access etc.; </li>
                            <li>
                              If an email or text message response from User is not received by the
                              Company’s email servers within seven days from when the Company sent
                              an email or text message requesting consent to Access etc.; provided,
                              however, that this shall not include instances resulting from
                              emergency or other unavoidable circumstances;
                            </li>
                          </ol>
                        </li>
                        <li>
                          In cases where Access etc. is necessary to identify and resolve technical
                          problems with the Services;
                        </li>
                        <li>
                          In cases where a proper inquiry is received from a court, the police, or
                          other public agency pursuant to laws and regulations;
                        </li>
                        <li>
                          In cases where a User engaged in conduct in violation or suspected of
                          being in violation of these Terms of Use, and the Company determines that
                          it is necessary to confirm the particulars of Posted Information;
                        </li>
                        <li>
                          In cases where there is an imminent risk to the life, body, or property of
                          a person and the Company determines that there is an urgent need for
                          Access etc.; or
                        </li>
                        <li>
                          In other cases where Access etc. is necessary for proper operation of the
                          Services or related services.
                        </li>
                      </ol>
                    </li>
                    <li> In cases where the Company determines that ther </li>
                    <li>
                      Notwithstanding the Company’s disclaimer set forth in Paragraphs 1 to 10 and
                      the other provisions of these Terms of Use (referred to as the “Disclaimers”),
                      in the case where the agreement between the Company and User relating to the
                      Services (including these Terms of Use) constitutes a consumer contract
                      specified in the Consumer Contract Act, the Disclaimers shall not apply and
                      the following items shall apply:
                      <ol>
                        <li>
                          the Company will not bear any liability whatsoever for damage incurred by
                          User because of the Company’s nonperformance of obligations due to the
                          Company’s negligence (excluding gross negligence) or unlawful conduct by
                          the Company and that has occurred due to special circumstances (including
                          cases where the Company or User foresaw or could have foreseen the
                          occurrence of damage).
                        </li>
                        <li>
                          the Company will compensate for actual damage incurred by User arisen
                          normally and directly because of the Company’s nonperformance of
                          obligations due to the Company’s negligence (excluding gross negligence)
                          or unlawful conduct by the Company; provided, however that for User who
                          incurred such damages in relation to fee-based services the amount of such
                          compensation shall not exceed the total amount of payment for use fees
                          etc. that is actually received by the Company from the damaged User within
                          the period of 1 month prior to happening of the cause of such damages, or
                          for Uses who incurred such damages in relation to free services the amount
                          shall not exceed 1,000 USD.
                        </li>
                      </ol>
                    </li>
                    <li>
                      Other than the cases fell in the preceding paragraph, in cases where the
                      Company, by any chance, bears liability to User in relation to use of the
                      Services by User pursuant to the preceding paragraph, except in the case of
                      the Company’s willful misconduct or gross negligence, the Company shall pay
                      compensation for actual damage incurred by User to the extent of ordinary and
                      direct damage, and in the case of fee-based services, up to the aggregate
                      amount of use fees paid to the Company by User during the one-year period
                      before User has made a claim for such compensation for damage.
                    </li>
                  </ol>
                </div>
              </div>
              <div className={styles.info_block}>
                <div className={styles.info_title}>Article 24. Exclusion of Anti-Social Forces</div>
                <div className={styles.info_description}>
                  <ol>
                    <li>
                      User represents and warrants that it is currently not a member of an organized
                      crime group, a person cease to be a member of an organized crime group within
                      the past five years, a quasi-member of an organized crime group, a constituent
                      member of a company affiliated with an organized crime group, a corporate
                      extortionist (sokaiya), a social campaign advocate racketeer
                      (shakai-undo-to-hyobo-goro), a crime group with special intelligence, or any
                      other person comparable to the foregoing (“Anti-Social Forces etc.”) and that
                      it does not cooperate with and is not involved in the maintenance, management,
                      or operation of any Anti-Social Forces etc. such as by the provision of funds
                      or otherwise does not have any interaction with or involvement in any
                      Anti-Social Forces etc.
                    </li>
                    <li>
                      User represents and warrants that it shall not directly or through the use of
                      third parties engage in the conduct set forth in the following items with
                      regard to other Users and the Company.
                      <ol>
                        <li> Use of violent or threatening expression or behavior; </li>
                        <li> Unjust demands that exceed legal responsibility; </li>
                        <li>
                          Conduct damaging the reputation or obstructing the business of other
                          parties by spreading rumors, or using fraudulent means or force;
                        </li>
                        <li> Other conduct comparable to the preceding items.</li>
                      </ol>
                    </li>
                  </ol>
                </div>
              </div>
              <div className={styles.info_block}>
                <div className={styles.info_title}> Article 25. Links to External Sites</div>
                <div className={styles.info_description}>
                  <ol>
                    <li>
                      With regard to external sites linked from content or advertising in the
                      Services, the Company does not make any express or implied warranties
                      regarding the accuracy, timeliness, completeness, merchantability, or fitness
                      for particular purpose with regard to information displayed on those external
                      sites, and even in the case where User or a third party incurs damage or
                      detriment as a result of using such external sites, the Company will not bear
                      any liability whatsoever. Each User is requested to access external sites
                      based on its own determinations and under its own responsibility.
                    </li>
                    <li>
                      The presence of links to external sites from information provided on the
                      System does not signify the existence of any commercial relationship between
                      the Company and the relevant external site.
                    </li>
                  </ol>
                </div>
              </div>
              <div className={styles.info_block}>
                <div className={styles.info_title}> Article 26. Notices and Communications</div>
                <div className={styles.info_description}>
                  <ol>
                    <li>
                      In cases where it is necessary to provide notice to or communicate with the
                      User, the Company shall mail documents, post on a website, or use email or. In
                      cases where User determines that communication with the Company is necessary,
                      User shall communicate with the Company by using methods designated by the
                      Company. In cases where the Company provides notice to or communicates with
                      User by posting on a website, such notice or communication shall take effect
                      after the passage of 48 hours from its posting, and in the case where the
                      Company uses other means, the notice or communication shall take effect when
                      sent by the Company to User.
                    </li>
                    <li>
                      Except in cases where the Company determines that it is particularly
                      necessary, the Company shall not accept communications by telephone or in
                      person.
                    </li>
                    <li>
                      Except when pursuant to laws, regulations, statutes, and the like in Japan,
                      the Company shall not disclose or divulge to third parties other than User any
                      personal information of User learned in relation to provision of the Services
                      and shall not use such personal information in excess of the scope necessary
                      for provision of the Services.
                    </li>
                    <li>
                      Except in the cases specified in the following paragraph, the Company shall
                      not disclose email communication histories to third parties.
                    </li>
                    <li>
                      The Company may disclose the subject matter of an inquiry without obtaining
                      User’s agreement in the case of investigation, seizure, or the like in the
                      form of compulsory disposition pursuant to an order issued by a judge, in the
                      case of an inquiry (Code of Criminal Procedure, Article 197, Paragraph 2) from
                      a public agency with investigative authority pursuant to statute, and in other
                      cases where provision is required pursuant to laws and regulations.
                    </li>
                  </ol>
                </div>
              </div>
              <div className={styles.info_block}>
                <div className={styles.info_title}> Article 26-2 Handling of Fan Letters etc.</div>
                <div className={styles.info_description}>
                  <ol>
                    <li>
                      The Company shall not act as an intermediary for any mail sent to users,
                      including fan letters (“Fan Letter(s) etc.”). Please send fan Letters etc.
                      directly to the target user. If Fan Letter etc. reaches the Company, the
                      Company will dispose of the Fan Letter etc. and will not return it to the
                      sender of the Fan Letter etc. (“Sender”).
                    </li>
                    <li>
                      As a general rule, Fan Letters etc. received by the Company will be destroyed
                      without being opened. However, in cases where it is difficult to dispose of
                      Fan Letters etc. in an unopened package, we may have no choice but to open the
                      package and dispose of them.
                    </li>
                    <li>
                      The Company shall not be liable to the User, the Sender, or any third party
                      for any damage incurred by the User, the sender, or any third party as a
                      result of the Company&apos;s actions as set forth in the preceding two
                      paragraphs.
                    </li>
                  </ol>
                </div>
              </div>
              <div className={styles.info_block}>
                <div className={styles.info_title}>
                  Article 27. Effectiveness of these Terms of Use
                </div>
                <div className={styles.info_description}>
                  <ol>
                    <li>
                      Even if a portion of these Terms of Use or Individual Terms of Use etc. is
                      determined to be void pursuant to laws and regulations, the other provisions
                      of these Terms of Use or Individual Terms of Use etc. shall remain valid.
                    </li>
                    <li>
                      Even in the case where a portion of these Terms of Use or Individual Terms of
                      Use etc. is determined to be void or is cancelled in relation to a particular
                      User, these Terms of Use or Individual Terms of Use etc. shall remain valid in
                      relation to other Users.
                    </li>
                  </ol>
                </div>
              </div>
              <div className={styles.info_block}>
                <div className={styles.info_title}> Article 28. Assignment of Business, etc.</div>
                <div className={styles.info_description}>
                  <ol>
                    <li>
                      In the case where the Company assigns the business relating to the Services to
                      a third party or in the case where the Company undergoes a corporate division,
                      merger, or other organizational restructuring (“Business Assignment etc.”),
                      the Company is entitled to assign to the relevant third party its status under
                      agreements between User and the Company (including these Terms of Use and
                      Individual Terms of Use etc.) and information provided by User to the Company
                      in the course of using the Services.
                    </li>
                    <li>
                      In the case of the preceding paragraph, User consents in advance to a Business
                      Assignment etc.
                    </li>
                    <li>
                      The Company is entitled to assign to third parties its claims against Users,
                      and the relevant User approves the provision of its personal information to
                      such third parties for such purpose.
                    </li>
                  </ol>
                </div>
              </div>
              <div className={styles.info_block}>
                <div className={styles.info_title}>
                  Article 29. Governing Law and Court of Competent Jurisdiction
                </div>
                <div className={styles.info_description}>
                  <ol>
                    <li>
                      These Terms of Use and Individual Terms of Use etc. shall be governed by the
                      laws of Israel.
                    </li>
                    <li>
                      If litigation between User and the Company becomes necessary, the Tel Aviv
                      District Court shall be the exclusive court of first instance.
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer user={user} />
      <FooterLogin user={user} />
    </div>
  </>
);

Terms.propTypes = {
  user: PropTypes.object,
};

Terms.defaultProps = {
  user: null,
};

export default Terms;
