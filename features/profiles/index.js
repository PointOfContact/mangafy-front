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
import FooterLogin from 'features/footerLogin';
import { EVENTS } from 'helpers/amplitudeEvents';
import { userTypes } from 'helpers/constant';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';

import styles from './styles.module.scss';

const Profiles = (props) => {
  const { users, total, current, user, genres, search, selectedTypes, selectedGenres } = props;

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
        title="All manga enthusiast, all genres, one Place - MangaFY"
        description="All manga enthusiast, all genres, one Place - MangaFY"
        additionalLinkTags={[
          {
            rel: 'icon',
            href: 'http://mangafy.club/profiles',
          },
        ]}
      />
      <ButtonToTop />
      <div className={styles.hidden}>
        <main className="main_back_2">
          <Header user={user} path="profiles" />
          <ProfilesHeader user={user} />
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
                            <a>
                              <PrimaryButton text="Join" className={cn(styles.PostColab__btn)} />
                            </a>
                          </Link>
                        </div>
                      </div>
                    )}
                    {users &&
                      users.map((u) => <ProfilesCard key={u._id} user={u} genres={genres} />)}
                  </div>
                </div>

                <div className={styles.pagination}>
                  <Paginations
                    pageSize={user ? 12 : 11}
                    total={total}
                    current={current}
                    prefix="profiles"
                  />
                </div>
              </div>
            </Row>
          </div>
        </main>
      </div>
      <Footer />
      <FooterPolicy />
      <FooterLogin user={user} />
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
  selectedTypes: [],
  selectedGenres: [],
  search: '',
};

export default Profiles;
