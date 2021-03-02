import React from 'react';

import { Input, Row, Select } from 'antd';
import client from 'api/client';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import cn from 'classnames';
import ColaborationCard from 'components/colaborationCard';
import CollaborationsHeader from 'components/collaborationsHeader';
import Footer from 'components/footer';
import Header from 'components/header';
import SvgSearch from 'components/icon/Search';
import Paginations from 'components/paginations';
import SearchForCollaborations from 'components/searchForCollaborations';
import PrimaryButton from 'components/ui-elements/button';
import FooterPolicy from 'components/footer-policy';
import ButtonToTop from 'components/ui-elements/button-toTop';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import PropTypes from 'prop-types';
import * as qs from 'query-string';
import {options} from 'helpers/constant'
import { LinkCreator } from 'utils/linkCreator';

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
  } = props;
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
                      {mangaStories &&
                        mangaStories.map((label) => (
                          <ColaborationCard key={label._id} label={label} client={client} />
                        ))}
                      <div className={cn(styles.PostColab)}>
                        <div className={cn(styles.PostColab__item)}>
                          <div className={cn(styles.PostColab__descr)}>
                            Have an idea to coomics and looking for collaboration?
                          </div>
                          <Link href="/create-a-story/start">
                            <span>
                              <PrimaryButton text="Post Collab" className={cn(styles.PostColab__btn)} />
                            </span>
                          </Link>
                        </div>
                      </div>
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
                      onChange={(page, pageSize) => {
                        onChange(page, pageSize);
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