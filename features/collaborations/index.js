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
import { options } from 'helpers/constant';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import PropTypes from 'prop-types';
import * as qs from 'query-string';
import { LinkCreator } from 'utils/linkCreator';

import styles from './styles.module.scss';

const Cookiebubble = dynamic(() => import('react-cookie-bubble'), {
  ssr: false,
});

const Collaborations = (props) => {
  const { mangaStories, total, current, user } = props;
  const onChange = (page) => {
    const parsed = qs.parse(location.search);
    Router.push(LinkCreator.toQuery({ ...parsed, page }, '/collaborations'));
  };
  return (
    <>
      <Head>
        <title>MangaFY - platform for community collaboration.</title>
        <meta
          name="description"
          content="At the heart of our vision – collaborations – allowing visionary of various roles to engage in a team effort to bring a story from uncertainty to digital life, with you – the artists – taking control of the production."></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ButtonToTop />
      <div className={'wrapper'}>
        <div className={'content'}>
          <Header path="collaborations" user={user} />
          <main>
            <CollaborationsHeader />
            <SearchForCollaborations genres={options} />
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
                          <Link href="/sign-in">
                            <span>
                              <PrimaryButton
                                text="Post Collab"
                                className={cn(styles.PostColab__btn)}
                              />
                            </span>
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
                      total={total}
                      current={current}
                      onChange={(page) => {
                        onChange(page);
                      }}
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
    </>
  );
};

Collaborations.propTypes = {
  user: PropTypes.object,
  mangaStories: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
};

Collaborations.defaultProps = {
  user: null,
};

export default Collaborations;
