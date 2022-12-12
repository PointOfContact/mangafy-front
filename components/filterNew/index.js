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

const FilterNew = ({ activeTab, filters, onChange }) => {
  const [currentContent, setCurrentContent] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    setSelectedOptions([]);
    setCurrentContent(null);
  }, [activeTab]);

  const searchChangeHandler = (event) => {
    const value = event.target.value;
    applyFilter({
      inQuery: 'search',
      value,
      title: 'Search',
    });
  };

  const debouncedSearchChangeHandler = useMemo(() => {
    return AwesomeDebouncePromise(searchChangeHandler, 500);
  }, []);

  const filterClickHandler = (filterName) => {
    if (filterName === currentContent) setCurrentContent(null);
    else setCurrentContent(filterName);
  };

  const currentContentElement = useMemo(() => {
    let newCurrentContentElement = null;
    switch (currentContent) {
      case 'search':
        const searchFilter = selectedOptions.find((op) => op.inQuery === 'search');
        newCurrentContentElement = (
          <SearchInput
            searchChangeHandler={debouncedSearchChangeHandler}
            defaultValue={searchFilter?.value || ''}
          />
        );
        break;
      case null:
        break;
      default:
        const currentFilter = filters.find((f) => f.title === currentContent);
        if (currentFilter) {
          newCurrentContentElement = (
            <Options
              selectedOptions={selectedOptions}
              inQuery={currentFilter.inQuery}
              applyFilter={applyFilter}
              options={currentFilter?.options.map((option) => {
                const isSelected = selectedOptions.find((so) => {
                  return so.inQuery === option.inQuery && so.value === option.value;
                });
                let isDisabled = false;

                // A place for checking isDisabled conditions

                return {
                  ...option,
                  isSelected,
                  isDisabled,
                };
              })}
            />
          );
        }
        break;
    }
    return newCurrentContentElement;
  }, [currentContent, selectedOptions, filters]);

  function applyFilter({ inQuery, value, title }) {
    setSelectedOptions((prev) => {
      const newSelectedOptions = [...prev];
      if (inQuery === 'search') {
        if (value) {
          const searchOption = newSelectedOptions.find((so) => so.inQuery === 'search');
          if (searchOption) searchOption.value = value;
          else newSelectedOptions.push({ inQuery: 'search', value, title: 'Search' });
        } else {
          const searchOptionIndex = newSelectedOptions.findIndex((so) => so.inQuery === 'search');
          if (searchOptionIndex !== -1) newSelectedOptions.splice(searchOptionIndex, 1);
        }
      } else {
        const optionIndex = newSelectedOptions.findIndex(
          (option) => option.inQuery === inQuery && option.value === value
        );
        if (optionIndex !== -1) {
          newSelectedOptions.splice(optionIndex, 1);
        } else {
          newSelectedOptions.push({
            inQuery,
            value,
            title,
            isDisabled: false,
            isSelected: true,
          });
        }
      }
      onChange(newSelectedOptions);
      return newSelectedOptions;
    });
  }

  return (
    <div>
      <FiltersInput
        currentContent={currentContent}
        filterClickHandler={(filterType) => filterClickHandler(filterType)}
        filters={filters}
      />
      {currentContentElement}
      <SelectedFilters applyFilter={applyFilter} selectedOptions={selectedOptions} />
    </div>
  );
};

const Options = ({ applyFilter, options, inQuery, selectedOptions }) => {
  return (
    <div className={cn(styles.options)}>
      {options.length > 0 ? (
        options.map((option) => {
          if (selectedOptions.some((so) => so.value === option.value)) option.isSelected = true;
          return (
            <Option
              inQuery={inQuery}
              applyFilter={(args) => applyFilter(args)}
              option={option}
              key={option.value}
            />
          );
        })
      ) : (
        <p className={styles.noOptions}>There is no options yet</p>
      )}
    </div>
  );
};

const SelectedFilters = ({ applyFilter, selectedOptions }) => {
  const selectedOptionsElements = Array.isArray(selectedOptions)
    ? selectedOptions
        .filter((option) => option.inQuery !== 'search')
        .map((option) => (
          <Option
            inQuery={option.inQuery}
            applyFilter={(args) => applyFilter(args)}
            option={option}
            key={option.value}
          />
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
  const searchVisible = filters.some((f) => f.title === 'Search');
  filters.forEach((filter) => {
    if (filter.title !== 'Search') {
      filtersElements.push(
        <div
          key={filter.title}
          className={cn(
            styles.filter,
            currentContent === filter.title ? styles.filter_active : null
          )}
          onClick={() => filterClickHandler(filter.title)}>
          {filter.title}
          <SvgBottomArrow />
        </div>
      );
    }
  });
  return (
    <div className={styles.searchAndFilters}>
      {searchVisible ? (
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
        {searchVisible ? (
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
      <input type="text" placeholder="Search" defaultValue={defaultValue} />
    </div>
  );
};

export default FilterNew;
