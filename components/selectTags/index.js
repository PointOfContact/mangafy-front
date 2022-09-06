import Button from 'components/ui-new/Button';
import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

const suggestedTags = ['manga', 'short story', 'webtoon', 'character'];

const SelectTags = ({ className, onChange, defaultSelectedTags }) => {
  const [selectedTags, setSelectedTags] = useState(defaultSelectedTags || []);
  const [newTag, setNewTag] = useState('');

  function onInput(e) {
    setNewTag(e.target.value);
  }

  function pushTag(tag) {
    if (!tag) return;
    setSelectedTags((oldTags) => {
      const newTags = oldTags?.slice();
      newTags.push(tag);
      return newTags;
    });
  }

  function popTag() {
    setSelectedTags((oldTags) => {
      const newTags = oldTags?.slice();
      newTags.pop();
      return newTags;
    });
  }

  function keyPressHandler(e) {
    if (e.key === 'Enter') {
      pushTag(newTag);
      setNewTag('');
      e.target.value = '';
    } else if (!newTag && e.key === 'Backspace') {
      popTag();
    }
  }

  useEffect(() => {
    onChange(selectedTags);
  }, [selectedTags]);

  const tagsElements = selectedTags.map((tag) => (
    <span key={tag} className={styles.select__tag}>
      {tag}
    </span>
  ));

  const suggestedTagsElements = suggestedTags.map((tag) => (
    <span key={tag} onClick={() => pushTag(tag)}>
      {tag}
    </span>
  ));

  return (
    <div className={cn(className, styles.select)}>
      <div className={styles.select__tags}>
        {tagsElements}
        <input
          className={styles.select__input}
          placeholder={'Input any tags'}
          contentEditable="true"
          onKeyDown={keyPressHandler}
          onInput={onInput}></input>
      </div>
      <div className={styles.select__suggested}>Suggested: {suggestedTagsElements}</div>
    </div>
  );
};

export default SelectTags;
