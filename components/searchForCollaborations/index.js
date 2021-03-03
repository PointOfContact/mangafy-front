import React from 'react';

import { Input, Select } from 'antd';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import cn from 'classnames';
import SvgSearch from 'components/icon/Search';
import Router from 'next/router';
import PropTypes from 'prop-types';
import * as qs from 'query-string';
import { LinkCreator } from 'utils/linkCreator';

import styles from './styles.module.scss';

const { Option } = Select;

const menuOptions = (handleCompasitionClick) => [
  <Option key="all">Doesn't matter</Option>,
  <Option key="collaboration">Joint Collab</Option>,
  <Option key="paid">Paid Collab</Option>,
];
const menuGenresOptions = (genres = [], handleMenuClick) => (
  <>
    <Option className="filterItem" key="all">
      All
    </Option>
    ,
    {genres.map((g) => (
      <Option className="filterItem" key={g._id}>
        {g.name}
      </Option>
    ))}
  </>
);

const SearchForCollaborations = (props) => {
  const { genres, search, selectedCompensationModel = [], selectedGenres = [] } = props;
  const searchAPI = (search) => {
    const parsed = qs.parse(location.search);
    Router.push(
      LinkCreator.toQuery({ ...parsed, search }, '/collaborations'),
      LinkCreator.toQuery({ ...parsed, search }, '/collaborations'),
      {
        scroll: false,
      }
    );
  };

  const onInputChange = async (e) => {
    const { value } = e.target;
    await AwesomeDebouncePromise(searchAPI, 500)(value);
  };

  const handleCompasitionClick = (keys) => {
    const parsed = qs.parse(location.search);
    if (keys && keys.includes('all')) {
      delete parsed.compensationModel;
      Router.push(
        LinkCreator.toQuery({ ...parsed }, '/collaborations'),
        LinkCreator.toQuery({ ...parsed }, '/collaborations'),
        {
          scroll: false,
        }
      );
      return;
    }
    Router.push(
      LinkCreator.toQuery({ ...parsed, compensationModel: keys }, '/collaborations'),
      LinkCreator.toQuery({ ...parsed, compensationModel: keys }, '/collaborations'),
      {
        scroll: false,
      }
    );
  };
  const handleGenresClick = (keys) => {
    const parsed = qs.parse(location.search);
    if (keys && keys.includes('all')) {
      delete parsed.genres;
      Router.push(
        LinkCreator.toQuery({ ...parsed }, '/collaborations'),
        LinkCreator.toQuery({ ...parsed }, '/collaborations'),
        {
          scroll: false,
        }
      );
      return;
    }
    Router.push(
      LinkCreator.toQuery({ ...parsed, genres: keys }, '/collaborations'),
      LinkCreator.toQuery({ ...parsed, genres: keys }, '/collaborations'),
      {
        scroll: false,
      }
    );
  };

  return (
    <>
      <div className={styles.box}>
        <div className={'container'}>
          <div className={styles.box__wrapper}>
            <form className={styles.box__search}>
              <i className={styles.box__search_icon}>
                <SvgSearch width="30" height="30" />
              </i>
              <Input
                className={cn(styles.box__search_field, 'collaborations-search-input')}
                type="text"
                placeholder="Search for collaborations"
                initialValue={search}
                defaultValue={search}
                allowClear
                onChange={onInputChange}
              />
              <button type="submit" className={styles.box__search_submit}>
                <SvgSearch width="22" height="22" />
              </button>
            </form>
            <div className={styles.box__nav}>
              <Select
                bordered={false}
                showArrow={true}
                allowClear={true}
                showSearch={false}
                placeholder="User Type"
                defaultValue={selectedCompensationModel}
                onChange={handleCompasitionClick}
                dropdownClassName="select-filter"
                className={cn(styles.box__nav_select, 'select-filter')}>
                {menuOptions(handleCompasitionClick)}
              </Select>
              <Select
                bordered={false}
                menuItemSelectedIcon={null}
                showArrow={true}
                showSearch={false}
                allowClear={true}
                mode="multiple"
                placeholder="All Genres"
                defaultValue={selectedGenres || []}
                value={selectedGenres || []}
                onChange={handleGenresClick}
                dropdownClassName="select-filter"
                className={cn(styles.box__nav_select, 'select-filter')}>
                {menuGenresOptions(genres)}
              </Select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

SearchForCollaborations.propTypes = {
  selectedCompensationModel: PropTypes.string,
  selectedGenres: PropTypes.array,
  genres: PropTypes.array.isRequired,
  search: PropTypes.string,
};

SearchForCollaborations.defaultProps = {
  selectedCompensationModel: null,
  selectedGenres: [],
  search: '',
};

export default SearchForCollaborations;
