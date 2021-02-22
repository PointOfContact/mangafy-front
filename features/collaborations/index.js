import React from 'react';

import { Row, Select } from 'antd';
import client from 'api/client';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import cn from 'classnames';
import ColaborationCard from 'components/colaborationCard';
import CollaborationsHeader from 'components/collaborationsHeader';
import Footer from 'components/footer';
import Header from 'components/header';
import PrimaryButton from 'components/ui-elements/button';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import PropTypes from 'prop-types';
import * as qs from 'query-string';
import { LinkCreator } from 'utils/linkCreator';

import styles from './styles.module.scss';

const { Option } = Select;
const Cookiebubble = dynamic(() => import('react-cookie-bubble'), {
  ssr: false,
});

const menuOptions = (handleCompasitionClick) => [
  <Option key="all">Doesn't matter</Option>,
  <Option key="collaboration">Joint Collab</Option>,
  <Option key="paid">Paid Collab</Option>,
];
const menuGenresOptions = (genres = [], handleMenuClick) => [
  <Option className="filterItem" key="all">
    All
  </Option>,
  ...genres.map((g) => (
    <Option className="filterItem" key={g._id}>
      {g.name}
    </Option>
  )),
];

const Collaborations = (props) => {
  const {
    mangaStories,
    total,
    current,
    user,
    genres,
    search,
    selectedCompensationModel = [],
    selectedGenres = [],
  } = props;
  const searchAPI = (search) => {
    const parsed = qs.parse(location.search);
    Router.push(LinkCreator.toQuery({ ...parsed, search }, '/collaborations'));
  };

  const onInputChange = async (e) => {
    const { value } = e.target;
    await AwesomeDebouncePromise(searchAPI, 500)(value);
  };
  const onChange = (page, pageSize) => {
    const parsed = qs.parse(location.search);
    Router.push(LinkCreator.toQuery({ ...parsed, page }, '/collaborations'));
  };
  const handleCompasitionClick = (keys) => {
    const parsed = qs.parse(location.search);
    if (keys && keys.includes('all')) {
      delete parsed.compensationModel;
      Router.push(LinkCreator.toQuery({ ...parsed }, '/collaborations'));
      return;
    }
    Router.push(LinkCreator.toQuery({ ...parsed, compensationModel: keys }, '/collaborations'));
  };
  const handleGenresClick = (keys) => {
    const parsed = qs.parse(location.search);
    if (keys && keys.includes('all')) {
      delete parsed.genres;
      Router.push(LinkCreator.toQuery({ ...parsed }, '/collaborations'));
      return;
    }
    Router.push(LinkCreator.toQuery({ ...parsed, genres: keys }, '/collaborations'));
  };
  return (
    <div className="">
      <Head>
        <title>MangaFY - platform for community collaboration.</title>
        <meta
          name="description"
          content="At the heart of our vision – collaborations – allowing visionary of various roles to engage in a team effort to bring a story from uncertainty to digital life, with you – the artists – taking control of the production."></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main_back_2 colab_page">
        <Header path="collaborations" user={user} />
        <CollaborationsHeader />
        {/* <section className="search_collab">
          <div className="container mangafy_container search_field">
            <div className="row">
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-lg-4 col-md-4">
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
                        placeholder="Search for collab"
                        initialValue={search}
                        allowClear
                        onChange={onInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-8">
                    <div className="dropdowns">
                      <Select
                        bordered={false}
                        showArrow={true}
                        allowClear={true}
                        showSearch={false}
                        placeholder="Collab type"
                        defaultValue={selectedCompensationModel}
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
              </div>
            </div>
          </div>
        </section> */}
        <div className="container mangafy_container">
          <Row type="flux">
            <div className={styles.colabCards}>
              <div className={'container'}>
                <div className={styles.colabWrap}>
                  {mangaStories &&
                    mangaStories.map((label) => (
                      <ColaborationCard key={label.id} label={label} client={client} />
                    ))}
                  <div className={cn(styles.PostColab)}>
                    <div className={cn(styles.PostColab__item)}>
                      <div className={cn(styles.PostColab__descr)}>
                        Have an idea to coomics and looking for collaboration?
                      </div>
                      <Link href="/create-a-story/start">
                        <PrimaryButton text="Post Collab" className={cn(styles.PostColab__btn)} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Row>
          {/* <div className="row">
            <div className="col-lg-12">
              <div className="pagination_cards">
                <Pagination
                  hideOnSinglePage
                  showSizeChanger={false}
                  pageSize={9}
                  defaultCurrent={9}
                  total={total}
                  current={current}
                  onChange={(page, pageSize) => {
                    onChange(page, pageSize);
                  }}
                />
              </div>
            </div>
          </div> */}
        </div>
        <Footer />
      </main>
      <div>
        <Cookiebubble
          messageTextColor="#212121"
          buttonColor="#7b65f3"
          iconVisibility={true}
          boxPosition="bottom-right"
          iconColor="#7b65f3"
        />
      </div>
      <div></div>
    </div>
  );
};

Collaborations.prototype = {
  user: PropTypes.object,
  mangaStories: PropTypes.array,
  selectedCompensationModel: PropTypes.array,
  selectedGenres: PropTypes.array,
  genres: PropTypes.array,
  total: PropTypes.number,
  current: PropTypes.number,
  search: PropTypes.string,
};

export default Collaborations;
