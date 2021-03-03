import React from 'react';

import { Row, Select } from 'antd';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import cn from 'classnames';
import Footer from 'components/footer';
import FooterPolicy from 'components/footer-policy';
import Header from 'components/header';
import Paginations from 'components/paginations';
import ProfilesCard from 'components/profilesCard';
import ProfilesHeader from 'components/profilesHeader';
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

const { Option } = Select;

const menuOptions = (handleCompasitionClick) =>
  userTypes.map(({ key, value }) => <Option key={key}>{value}</Option>);
const menuGenresOptions = (genres = [], handleMenuClick) => [
  ...genres.map((g) => (
    <Option className="filterItem" key={g._id}>
      {g.name}
    </Option>
  )),
];

const Profiles = (props) => {
  const { users, total, current, user, genres, search, selectedTypes, selectedGenres } = props;
  const onChange = (page, pageSize) => {
    const parsed = qs.parse(location.search);
    Router.push(LinkCreator.toQuery({ ...parsed, page }, '/profiles'));
  };

  const searchAPI = (search) => {
    const parsed = qs.parse(location.search);
    Router.push(LinkCreator.toQuery({ ...parsed, search }, '/profiles'));
  };

  const onInputChange = async (e) => {
    const { value } = e.target;
    await AwesomeDebouncePromise(searchAPI, 500)(value);
  };

  const handleCompasitionClick = (keys) => {
    const parsed = qs.parse(location.search);
    if (keys && keys.includes('all')) {
      delete parsed.collaboration;
      Router.push(LinkCreator.toQuery({ ...parsed }, '/profiles'));
      return;
    }
    Router.push(LinkCreator.toQuery({ ...parsed, types: keys }, '/profiles'));
  };

  const handleGenresClick = (keys) => {
    const parsed = qs.parse(location.search);
    if (keys && keys.includes('all')) {
      delete parsed.genres;
      Router.push(LinkCreator.toQuery({ ...parsed }, '/profiles'));
      return;
    }
    Router.push(LinkCreator.toQuery({ ...parsed, genres: keys }, '/profiles'));
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
        {/* <section className="search_collab">
          <div className="container mangafy_container search_field">
            <div className="row">
              <div className="col-lg-12">
                <div className="row df">
                  <div className="col-lg-4 col-md-5">
                    <div
                      style={{
                        display: 'flex',
                      }}>
                      <button>
                        <SvgSearch width="30px" height="30px" />
                      </button>
                      <Input
                        type="text"
                        style={{
                          width: '100%',
                        }}
                        placeholder="Search for collaborations"
                        initialValue={search}
                        allowClear
                        onChange={onInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-6">
                    <div className="dropdowns">
                      <Select
                        bordered={false}
                        showArrow={true}
                        allowClear={true}
                        showSearch={false}
                        menuItemSelectedIcon={null}
                        mode="multiple"
                        placeholder="User type"
                        defaultValue={selectedTypes || []}
                        value={selectedTypes || []}
                        onChange={handleCompasitionClick}
                        style={{ width: '50%' }}
                        className="dropdownCollaboration">
                        {menuOptions(handleCompasitionClick)}
                      </Select>
                      <Select
                        bordered={false}
                        menuItemSelectedIcon={null}
                        showArrow={true}
                        showSearch={false}
                        allowClear={true}
                        mode="multiple"
                        placeholder="Genres"
                        defaultValue={selectedGenres || []}
                        value={selectedGenres || []}
                        onChange={handleGenresClick}
                        style={{ width: '50%' }}
                        className="dropdownCollaboration">
                        {menuGenresOptions(genres)}
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="output_selects">
                  <div id="selects" className="box"></div>
                </div>
              </div>
            </div>
            <div className="output_selects">
              <div id="selects" className="box"></div>
            </div>
          </div>
        </section> */}
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
                  onChange={(page, pageSize) => {
                    onChange(page, pageSize);
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
