import { Pagination, Row, Select, Input } from 'antd';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import * as qs from 'query-string';
import ColaborationCard from 'components/colaborationCard';
import cn from 'classnames';

import client from 'api/client';
import Footer from 'components/footer';
import Header from 'components/header';
import SvgSearch from 'components/icon/Search';
import ProfilesCard from 'components/profilesCard';
import { userTypes } from 'helpers/constant';
import { LinkCreator } from 'utils/linkCreator';
// import ProfilesMobile from './mobile';
import ProfilesHeader from 'components/profilesHeader'
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
    <div className="">
      <Head>
        <title>MangaFY - All graphic novel enthusiast, all genres, one Place</title>
        <meta
          name="description"
          content="Find an artist, storyteller or translator - tell them what you dream about, and collaborate"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
              </div>
            </div>
            <div className="output_selects">
              <div id="selects" className="box"></div>
            </div>
          </div>
        </section> */}
        <div className="container mangafy_container">
          <Row type="flux">
            <div className="wrap-to-cards">{<ProfilesCard users={users} client={client} />}</div>
            <div className={styles.colabCards}>
              <div className={'container'}>
                <div className={styles.colabWrap}>
                  {users &&
                    users.map((label) => (
                      <ProfilesCard key={label.id} label={label} client={client} />
                    ))}
                  <div className={cn(styles.PostColab)}>
                    <div className={cn(styles.PostColab__item)}>
                      <div className={cn(styles.PostColab__descr)}>
                        Have an idea to coomics and looking for collaboration?
                      </div>
                      <button className={cn(styles.PostColab__btn)}>Post Collab</button>
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
                  defaultCurrent={1}
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
      {/* <ProfilesMobile {...props} onChange={onChange} onInputChange={onInputChange} /> */}
    </div>
  );
};
Profiles.prototype = {
  user: PropTypes.object,
  mangaStories: PropTypes.array,
  selectedTypes: PropTypes.array,
  selectedGenres: PropTypes.array,
  genres: PropTypes.array,
  total: PropTypes.number,
  search: PropTypes.string,
  current: PropTypes.string,
};

export default Profiles;
