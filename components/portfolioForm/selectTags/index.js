/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { Tag, Input } from 'antd';
import PropTypes from 'prop-types';
import { TweenOneGroup } from 'rc-tween-one';

import styles from './styles.module.scss';

const SelectTags = ({ selectedTags, setSelectedTags }) => {
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleClose = (removedTag) => {
    const currentTags = selectedTags.filter((tag) => tag !== removedTag);
    setSelectedTags(currentTags);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = (e) => {
    const value = `#${e.target.value}`;
    const valueExist = value.trim().length !== 1;
    if (valueExist && selectedTags.indexOf(value) === -1) {
      selectedTags = [...selectedTags, value];
    }

    setSelectedTags(selectedTags);
    setInputVisible(false);
    setInputValue('');
  };

  const forMap = (tag) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}>
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    );
  };

  const tagChild = selectedTags.map(forMap);

  return (
    <div className={styles.containerSelectedTags}>
      <div>
        <TweenOneGroup
          enter={{
            scale: 0.8,
            opacity: 0,
            type: 'from',
            duration: 100,
            onComplete: (e) => {
              e.target.style = '';
            },
          }}
          leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
          appear={false}>
          {tagChild}
        </TweenOneGroup>
      </div>
      {inputVisible && (
        <Input
          type="text"
          size="small"
          autoFocus
          style={{ width: 78 }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag onClick={() => setInputVisible(true)} className="site-tag-plus">
          <PlusOutlined /> Add tag
        </Tag>
      )}
    </div>
  );
};

SelectTags.propTypes = {
  selectedTags: PropTypes.array.isRequired,
  setSelectedTags: PropTypes.func.isRequired,
};

export default SelectTags;
