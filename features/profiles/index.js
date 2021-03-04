import React from 'react';

import { Row } from 'antd';
import cn from 'classnames';
import Footer from 'components/footer';
import FooterPolicy from 'components/footer-policy';
import Header from 'components/header';
import Paginations from 'components/paginations';
import ProfilesCard from 'components/profilesCard';
import ProfilesHeader from 'components/profilesHeader';
import SearchForMembers from 'components/searchForMembers';
import PrimaryButton from 'components/ui-elements/button';
import ButtonToTop from 'components/ui-elements/button-toTop';
import { userTypes } from 'helpers/constant';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import PropTypes from 'prop-types';
import * as qs from 'query-string';
import { LinkCreator } from 'utils/linkCreator';

import styles from './styles.module.scss';

const Profiles = (props) => {
  const { users, total, current, user, genres, search, selectedTypes, selectedGenres } = props;
  const onChange = (page) => {
    const parsed = qs.parse(location.search);
    Router.push(LinkCreator.toQuery({ ...parsed, page }, '/profiles'));
  };

  return (
    <>
      <Head>
        <title>MangaFY - All graphic novel enthusiast, all genres, one Place</title>
        <meta
          name="description"
          content="Find an artist, storyteller or translator - tell them what you dream about, and collaborate"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ButtonToTop />
      <main className="main_back_2">
        <Header user={user} path="profiles" />
        <ProfilesHeader />
        <SearchForMembers
          genres={genres}
          search={search}
          selectedTypes={selectedTypes}
          selectedGenres={selectedGenres}
          userTypes={userTypes}
        />
        <div className="container mangafy_container">
          <Row type="flux">
            <div className={styles.colabCards}>
              <div className={'container'}>
                <div className={styles.colabWrap}>
                  {!user && (
                    <div className={cn(styles.PostColab)}>
                      <div className={cn(styles.PostColab__item)}>
                        <div className={cn(styles.PostColab__descr)}>Welcome to MangaFY club</div>
                        <Link href="/create-a-story/start">
                          <span>
                            <PrimaryButton text="Join" className={cn(styles.PostColab__btn)} />
                          </span>
                        </Link>
                      </div>
                    </div>
                  )}
                  {users && users.map((u) => <ProfilesCard key={u._id} user={u} genres={genres} />)}
                </div>
              </div>

              <div className={styles.pagination}>
                <Paginations
                  total={total}
                  current={current}
                  onChange={(page) => {
                    onChange(page);
                  }}
                />
              </div>
            </div>
          </Row>
        </div>
      </main>
      <Footer />
      <FooterPolicy />
    </>
  );
};

Profiles.propTypes = {
  users: PropTypes.array.isRequired,
  user: PropTypes.object,
  mangaStories: PropTypes.array,
  selectedTypes: PropTypes.array,
  selectedGenres: PropTypes.array,
  genres: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  search: PropTypes.string,
};

Profiles.defaultProps = {
  mangaStories: [],
  user: null,
  selectedTypes: '',
  selectedGenres: [],
  search: '',
};

export default Profiles;
