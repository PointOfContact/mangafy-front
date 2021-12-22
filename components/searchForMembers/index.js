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

const menuOptions = (userTypes, handleCompasitionClick) => {
  const userTupe = userTypes.map((type) => <Option key={type.key}>{type.value}</Option>);
  const all = [<Option key="all">All Artist Types</Option>];
  return all.concat(userTupe);
};

const SearchForMembers = (props) => {
  const { genres, search, selectedTypes = [], selectedGenres = [], userTypes = [] } = props;

  const searchAPI = (search) => {
    const parsed = qs.parse(location.search);
    parsed.page = 1;
    Router.push(
      LinkCreator.toQuery({ ...parsed, search }, '/profiles'),
      LinkCreator.toQuery({ ...parsed, search }, '/profiles'),
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
      delete parsed.types;
      Router.push(
        LinkCreator.toQuery({ ...parsed }, '/profiles'),
        LinkCreator.toQuery({ ...parsed }, '/profiles'),
        {
          scroll: false,
        }
      );
      return;
    }
    Router.push(
      LinkCreator.toQuery({ ...parsed, types: keys }, '/profiles'),
      LinkCreator.toQuery({ ...parsed, types: keys }, '/profiles'),
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
        LinkCreator.toQuery({ ...parsed }, '/profiles'),
        LinkCreator.toQuery({ ...parsed }, '/profiles'),
        {
          scroll: false,
        }
      );
      return;
    }
    Router.push(
      LinkCreator.toQuery({ ...parsed, genres: keys }, '/profiles'),
      LinkCreator.toQuery({ ...parsed, genres: keys }, '/profiles'),
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
            <form className={styles.box__search} onSubmit={(e) => e.preventDefault()}>
              <i className={styles.box__search_icon}>
                <SvgSearch width="30" height="30" />
              </i>
              <Input
                className={cn(styles.box__search_field, 'collaborations-search-input')}
                type="text"
                placeholder="Search for members"
                initialValue={search}
                defaultValue={search}
                allowClear
                onChange={onInputChange}
              />
              <button
                id="searchForMembersSubmitId"
                type="submit"
                className={styles.box__search_submit}>
                <SvgSearch width="22" height="22" />
              </button>
            </form>
            <div className={styles.box__nav}>
              <Select
                bordered={false}
                showArrow={true}
                allowClear={true}
                showSearch={false}
                placeholder="Artist Type"
                defaultValue={selectedTypes}
                onChange={handleCompasitionClick}
                dropdownClassName="select-filter"
                className={cn(styles.box__nav_selectDef, 'select-filter')}>
                {menuOptions(userTypes, handleCompasitionClick)}
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
                className={cn(
                  styles.box__nav_selectDef,
                  !selectedGenres?.length && styles.box__nav_select,
                  'select-filter'
                )}>
                {menuGenresOptions(genres)}
              </Select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

SearchForMembers.propTypes = {
  selectedTypes: PropTypes.string,
  selectedGenres: PropTypes.array,
  genres: PropTypes.array.isRequired,
  search: PropTypes.string,
  userTypes: PropTypes.array,
};

SearchForMembers.defaultProps = {
  selectedTypes: null,
  selectedGenres: [],
  search: '',
  userTypes: [],
};

export default SearchForMembers;
