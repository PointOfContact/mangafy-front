import React, { useEffect, useState, useMemo } from 'react';
import Router, { useRouter } from 'next/router';
import { LinkCreator } from 'utils/linkCreator';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import * as qs from 'query-string';
import cn from 'classnames';
import { projectTypes, userTypes } from 'helpers/constant';
import SvgBottomArrow from 'components/icon/BottomArrow';
import SvgSearch from 'components/icon/Search';
import Option from './filterOption';
import client from 'api/client';

import styles from './styles.module.scss';
import { parse } from 'cookie';

const FilterNew = (props) => {
  const router = useRouter();

  const [filtersOptions, setFiltersOptions] = useState({
    genres: [],
    compensationModel: [],
    types: [],
    category: [],
  });

  useEffect(() => {
    getFilterOptions();
  }, []);

  const [currentContent, setCurrentContent] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    parseSelectedOptions();
  }, [router.query, filtersOptions]);

  async function getFilterOptions() {
    const newFilterOptions = {
      genres: [],
      compensationModel: [],
      types: [],
      category: [],
    };

    if (props.genres) {
      try {
        newFilterOptions.genres = (await client.service('/api/v2/genres').find()).data.map(
          (genre) => ({
            title: genre.name,
            value: genre._id,
            type: 'genres',
          })
        );
      } catch (error) {
        console.log(error);
      }
    }
    if (props.compensationModel)
      newFilterOptions.compensationModel = [
        { title: 'Collaboration', value: 'collaboration', type: 'compensationModel' },
        { title: 'Paid', value: 'paid', type: 'compensationModel' },
      ];
    if (props.types)
      newFilterOptions.types = userTypes.map((type) => ({
        title: type.value,
        value: type.key,
        type: 'types',
      }));
    if (props.category)
      newFilterOptions.category = projectTypes.map((pt) => ({
        title: pt,
        value: pt,
        type: 'category',
      }));
    setFiltersOptions(newFilterOptions);
  }

  function parseSelectedOptions() {
    const query = router.query;
    const newSelectedOptions = [];

    for (const filter in query) {
      if (filter !== 'search' && filter !== 'page') {
        // console.log(query)
        // console.log(filter)
        // console.log(query[filter])
        // console.log(filtersOptions[filter])
        if (query[filter] && filtersOptions[filter]?.length > 0) {
          if (!Array.isArray(query[filter])) query[filter] = [query[filter]];
          newSelectedOptions = newSelectedOptions.concat(
            query[filter].map((queryProp) => {
              const filterOption = filtersOptions[filter].find(
                (option) => option.value === queryProp
              );
              return {
                type: filterOption.type,
                title: filterOption.title,
                value: filterOption.value,
                isDisabled: false,
                isSelected: true,
              };
            })
          );
        }
      }
    }

    setSelectedOptions(newSelectedOptions);
  }

  const searchChangeHandler = (event) => {
    const value = event.target.value;
    applyFilter({
      type: 'search',
      value,
    });
  };

  const filterClickHandler = (filterName) => {
    if (filterName === currentContent) setCurrentContent(null);
    else setCurrentContent(filterName);
  };

  let currentContentElement = null;
  switch (currentContent) {
    case 'search':
      currentContentElement = (
        <SearchInput
          searchChangeHandler={searchChangeHandler}
          defaultValue={Router.query?.search}
        />
      );
      break;
    case null:
      break;
    default:
      console.log(currentContent);
      currentContentElement = (
        <Options
          options={filtersOptions[currentContent].map((option) => {
            let isSelected = false;
            // console.log('Option')
            // console.log(option)
            if (
              selectedOptions.find((so) => {
                return so.type === option.type && so.value === option.value;
              })
            )
              isSelected = true;
            let isDisabled = false;

            // A place for checking isDisabled conditions

            return {
              ...option,
              isSelected,
              isDisabled,
            };
          })}
          type={currentContent}
        />
      );
      break;
  }

  return (
    <div>
      <FiltersInput
        currentContent={currentContent}
        filterClickHandler={(filterType) => filterClickHandler(filterType)}
        filters={props}
      />
      {currentContentElement}
      <SelectedFilters selectedOptions={selectedOptions} />
    </div>
  );
};

const Options = ({ options }) => {
  return (
    <div className={cn(styles.options)}>
      {options.length > 0 ? (
        options.map((option) => (
          <Option applyFilter={(args) => applyFilter(args)} option={option} key={option.value} />
        ))
      ) : (
        <p className={styles.noOptions}>There is no options yet</p>
      )}
    </div>
  );
};

const SelectedFilters = ({ selectedOptions }) => {
  const selectedOptionsElements = Array.isArray(selectedOptions)
    ? selectedOptions.map((option) => (
        <Option applyFilter={(args) => applyFilter(args)} option={option} key={option.value} />
      ))
    : [];

  return (
    <div className={styles.isSelected}>
      {selectedOptionsElements.length > 0 ? (
        <>
          <div className={styles.selected}>
            <div className={styles.selectedLabel}>Selected: </div>
            {selectedOptionsElements}
          </div>
        </>
      ) : null}
    </div>
  );
};

const FiltersInput = ({ filterClickHandler, currentContent, filters }) => {
  const filtersElements = [];
  for (const filter in filters) {
    if (filters[filter] && filter !== 'search') {
      filtersElements.push(
        <div
          key={filter}
          className={cn(styles.filter, currentContent === filter ? styles.filter_active : null)}
          onClick={() => filterClickHandler(filter)}>
          {filters[filter]}
          <SvgBottomArrow />
        </div>
      );
    }
  }
  return (
    <div className={styles.searchAndFilters}>
      {filters.search ? (
        <div
          className={cn(
            styles.searchFilterMobile,
            currentContent === 'search' ? styles.searchFilterMobile_active : null
          )}
          onClick={() => filterClickHandler('search')}>
          <SvgSearch />
        </div>
      ) : null}
      <div className={styles.filters}>
        {filtersElements}
        {filters.search ? (
          <div
            className={cn(
              styles.filter,
              styles.filter_search,
              currentContent === 'search' ? styles.filter_active : null
            )}
            onClick={() => filterClickHandler('search')}>
            Search
            <SvgBottomArrow />
          </div>
        ) : null}
      </div>
    </div>
  );
};

const SearchInput = ({ isActive, searchChangeHandler, defaultValue }) => {
  return (
    <div className={cn(styles.search)} onChange={searchChangeHandler}>
      <input type="text" placeholder="Search for collaborators" defaultValue={defaultValue} />
    </div>
  );
};

const pushQuery = (query) => {
  Router.push(
    LinkCreator.toQuery(query, Router.pathname),
    LinkCreator.toQuery(query, Router.pathname),
    { scroll: false }
  );
};

const applyFilter = ({ type, value }) => {
  const parsed = qs.parse(location.search);
  parsed.page = 1;
  switch (type) {
    case 'search':
      if (!value) delete parsed.search;
      else parsed.search = value;
      break;

    default:
      if (!parsed[type]) parsed[type] = [value];
      else {
        if (!Array.isArray(parsed[type])) parsed[type] = [parsed[type]];
        if (parsed[type].includes(value)) {
          parsed[type] = parsed[type].filter((option) => option !== value);
        } else parsed[type].push(value);
      }
      break;
  }
  pushQuery(parsed);
};

export default FilterNew;
