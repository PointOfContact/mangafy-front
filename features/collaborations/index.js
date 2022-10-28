import React, { useState } from 'react';

import { Row } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import CollaborationCards from 'components/colaborationCard';
import CollaborationsHeader from 'components/collaborationsHeader';
import Footer from 'components/footer';
import FooterPolicy from 'components/footer-policy';
import HeaderNew from 'components/headerNew';
import ModalCreateProject from 'components/modalCreateProject';
import Paginations from 'components/paginations';
import FilterNew from 'components/filterNew';
import PrimaryButton from 'components/ui-elements/button';
import ButtonToTop from 'components/ui-elements/button-toTop';
import FooterLogin from 'features/footerLogin';
import { EVENTS } from 'helpers/amplitudeEvents';
import { userTypes } from 'helpers/constant';
import { NextSeo } from 'next-seo';
// import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';

import styles from './styles.module.scss';

// const Cookiebubble = dynamic(() => import('react-cookie-bubble'), {
//   ssr: false,
// });

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
    pageUrl,
  } = props;
  const [createProjectModal, showCreateProjectModal] = useState(false);

  const data = {
    event_type: EVENTS.OPENED_ALL_COLLABORATION,
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
        canonical={`https://mangafy.club${pageUrl}`}
        openGraph={{
          url: `https://mangafy.club${pageUrl}`,
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
      <ButtonToTop user={user} />
      <div className={styles.hidden}>
        <div className={'content'}>
          <HeaderNew user={user} />
          <main>
            <CollaborationsHeader user={user} />
            <div className="container mangafy_container">
              <div className="container">
                <FilterNew
                  category="Category"
                  genres="Genre"
                  compensationModel={props.hideCollabType ? null : 'Collab type'}
                  search
                />
              </div>
              <Row type="flux">
                <div className={styles.colabCards}>
                  <div className={'container'}>
                    <div className={styles.colabWrap}>
                      <div className={cn(styles.PostColab)}>
                        <div className={cn(styles.PostColab__item)}>
                          <div className={cn(styles.PostColab__descr)}>
                            Produce your story. <br />
                            It's easiar than you think.
                          </div>
                          <PrimaryButton
                            text="Let's do!"
                            className={cn(styles.PostColab__btn)}
                            onClick={() => {
                              showCreateProjectModal(true);
                            }}
                          />
                        </div>
                      </div>
                      {mangaStories &&
                        mangaStories.map((label) => (
                          <CollaborationCards
                            href={
                              pageUrl === '/collaborations'
                                ? `/project/production/${label._id}?tab=details`
                                : `/project/view/${label?.storyBoards?.data[0]?._id}`
                            }
                            key={label._id}
                            label={label}
                            client={client}
                          />
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
                      prefix={pageUrl === '/collaborations' ? 'collaborations' : 'projects'}
                    />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
        <Footer user={user} />
        <FooterPolicy />
        {/* <Cookiebubble
          messageTextColor="#212121"
          buttonColor="#7b65f3"
          iconVisibility={true}
          boxPosition="bottom-right"
          iconColor="#7b65f3"
        /> */}
      </div>
      <FooterLogin user={user} cookieVisibility={false} />
      <ModalCreateProject
        createProjectModal={createProjectModal}
        showCreateProjectModal={showCreateProjectModal}
        user={user}
      />
    </>
  );
};

Collaborations.propTypes = {
  user: PropTypes.object,
  mangaStories: PropTypes.array,
  total: PropTypes.any,
  current: PropTypes.number,
  genres: PropTypes.array,
  selectedGenres: PropTypes.array,
  selectedCompensationModel: PropTypes.array,
  search: PropTypes.string,
  selectedTypes: PropTypes.array,
  pageUrl: PropTypes.string,
};

Collaborations.defaultProps = {
  user: null,
  selectedGenres: [],
  selectedCompensationModel: [],
  selectedTypes: [],
  search: '',
  mangaStories: [],
  total: 0,
  current: 0,
  genres: [],
  pageUrl: '/collaborations',
};

export default Collaborations;
