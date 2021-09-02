import React from 'react';

import { Row } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import ColaborationCard from 'components/colaborationCard';
import CollaborationsHeader from 'components/collaborationsHeader';
import Footer from 'components/footer';
import FooterPolicy from 'components/footer-policy';
import Header from 'components/header';
import Paginations from 'components/paginations';
import SearchForCollaborations from 'components/searchForCollaborations';
import PrimaryButton from 'components/ui-elements/button';
import ButtonToTop from 'components/ui-elements/button-toTop';
import FooterLogin from 'features/footerLogin';
import { EVENTS } from 'helpers/amplitudeEvents';
import { userTypes } from 'helpers/constant';
import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';

import styles from './styles.module.scss';

const Cookiebubble = dynamic(() => import('react-cookie-bubble'), {
  ssr: false,
});

const Collaborations = (props) => {
  const {
    mangaStories,
    total,
    current,
    user,
    genres,
    selectedGenres,
    selectedCompensationModel,
    search,
    selectedTypes,
  } = props;

  const data = {
    event_type: EVENTS.OPENED_ALL_PROFILES,
    user_id: user?._id,
    user_properties: {
      ...user,
    },
  };
  myAmplitude(data);

  return (
    <>
      <NextSeo
        title="MangaFY - platform for community collaboration."
        description="At the heart of our vision – collaborations – allowing visionary of various roles to engage in a team effort to bring a story from uncertainty to digital life, with you – the artists – taking control of the production."
        canonical="http://mangafy.club/collaborations"
        openGraph={{
          url: 'http://mangafy.club/collaborations',
          title: 'MangaFY - platform for community collaboration.',
          description:
            'At the heart of our vision – collaborations – allowing visionary of various roles to engage in a team effort to bring a story from uncertainty to digital life, with you – the artists – taking control of the production.',
          images: [
            {
              url: '',
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
      <ButtonToTop />
      <div className={styles.hidden}>
        <div className={'content'}>
          <Header path="collaborations" user={user} />
          <main>
            <CollaborationsHeader />
            <SearchForCollaborations
              genres={genres}
              selectedGenres={selectedGenres}
              selectedCompensationModel={selectedCompensationModel}
              selectedTypes={selectedTypes}
              userTypes={userTypes}
              search={search}
            />
            <div className="container mangafy_container">
              <Row type="flux">
                <div className={styles.colabCards}>
                  <div className={'container'}>
                    <div className={styles.colabWrap}>
                      <div className={cn(styles.PostColab)}>
                        <div className={cn(styles.PostColab__item)}>
                          <div className={cn(styles.PostColab__descr)}>
                            Have an idea for a graphic novel or manga and looking for collaboration?
                          </div>
                          <Link href="/create-a-story/start">
                            <a>
                              <PrimaryButton
                                text="Post Collab"
                                className={cn(styles.PostColab__btn)}
                              />
                            </a>
                          </Link>
                        </div>
                      </div>
                      {mangaStories &&
                        mangaStories.map((label) => (
                          <ColaborationCard key={label._id} label={label} client={client} />
                        ))}
                    </div>
                  </div>
                </div>
              </Row>
              <div className="row">
                <div className="col-lg-12">
                  <div className={styles.pagination_cards}>
                    <Paginations
                      pageSize={11}
                      total={total}
                      current={current}
                      prefix="collaborations"
                    />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
        <Footer />
        <FooterPolicy />
        <Cookiebubble
          messageTextColor="#212121"
          buttonColor="#7b65f3"
          iconVisibility={true}
          boxPosition="bottom-right"
          iconColor="#7b65f3"
        />
      </div>
      <FooterLogin user={user} cookieVisibility={false} />
    </>
  );
};

Collaborations.propTypes = {
  user: PropTypes.object,
  mangaStories: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  genres: PropTypes.array.isRequired,
  selectedGenres: PropTypes.array,
  selectedCompensationModel: PropTypes.array,
  search: PropTypes.string,
  selectedTypes: PropTypes.array,
};

Collaborations.defaultProps = {
  user: null,
  selectedGenres: [],
  selectedCompensationModel: [],
  selectedTypes: [],
  search: '',
};

export default Collaborations;
