import React from 'react';

import { Select } from 'antd';
import cn from 'classnames';
import Router from 'next/router';
import PropTypes from 'prop-types';
import * as qs from 'query-string';
import { LinkCreator } from 'utils/linkCreator';

import styles from './styles.module.scss';

const { Option } = Select;

const menuOptions = () => [
  <Option key="all">Doesn&apos;t matter</Option>,
  <Option key="notPaid">Not Paid Posts</Option>,
  <Option key="paid">Paid Posts</Option>,
];
const menuCategoriesOptions = (categories = []) => (
  <>
    <Option className="filterItem" key="all">
      All
    </Option>
    ,
    {categories.map((g) => (
      <Option className="filterItem" key={g.key}>
        {g.value}
      </Option>
    ))}
  </>
);

const SearchForDiscussions = (props) => {
  const { categories, selectedType = [], selectedCategories = [] } = props;

  const handleCompasitionClick = (keys) => {
    const parsed = qs.parse(location.search);
    if (keys && keys.includes('all')) {
      delete parsed.compensationModel;
      Router.push(
        LinkCreator.toQuery({ ...parsed }, '/new-page'),
        LinkCreator.toQuery({ ...parsed }, '/new-page'),
        {
          scroll: false,
        }
      );
      return;
    }
    Router.push(
      LinkCreator.toQuery({ ...parsed, compensationModel: keys }, '/new-page'),
      LinkCreator.toQuery({ ...parsed, compensationModel: keys }, '/new-page'),
      {
        scroll: false,
      }
    );
  };
  const handleCategoriesClick = (keys) => {
    const parsed = qs.parse(location.search);
    if (keys && keys.includes('all')) {
      delete parsed.categories;
      Router.push(
        LinkCreator.toQuery({ ...parsed }, '/new-page'),
        LinkCreator.toQuery({ ...parsed }, '/new-page'),
        {
          scroll: false,
        }
      );
      return;
    }
    Router.push(
      LinkCreator.toQuery({ ...parsed, categories: keys }, '/new-page'),
      LinkCreator.toQuery({ ...parsed, categories: keys }, '/new-page'),
      {
        scroll: false,
      }
    );
  };

  return (
    <>
      <div className={styles.box}>
        <div className={styles.box__wrapper}>
          <div className={styles.box__nav}>
            <Select
              bordered={false}
              menuItemSelectedIcon={null}
              showArrow={true}
              showSearch={false}
              allowClear={true}
              mode="multiple"
              placeholder="All Categories"
              defaultValue={selectedCategories || []}
              value={selectedCategories || []}
              onChange={handleCategoriesClick}
              dropdownClassName="select-filter"
              className={cn(styles.box__nav_select, 'select-filter')}>
              {menuCategoriesOptions(categories)}
            </Select>
            <Select
              bordered={false}
              showArrow={true}
              allowClear={true}
              showSearch={false}
              placeholder="User Type"
              defaultValue={selectedType}
              onChange={handleCompasitionClick}
              dropdownClassName="select-filter"
              className={cn(styles.box__nav_select, 'select-filter')}>
              {menuOptions(handleCompasitionClick)}
            </Select>
          </div>
        </div>
      </div>
    </>
  );
};

SearchForDiscussions.propTypes = {
  selectedType: PropTypes.string,
  selectedCategories: PropTypes.array,
  categories: PropTypes.array.isRequired,
};

SearchForDiscussions.defaultProps = {
  selectedType: null,
  selectedCategories: [],
};

export default SearchForDiscussions;
