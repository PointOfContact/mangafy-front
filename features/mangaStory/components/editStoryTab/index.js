import React from 'react';

import cn from 'classnames';
import PrimaryButton from 'components/ui-elements/button';
import TextArea from 'components/ui-elements/text-area';
import ProsTypes from 'prop-types';

import styles from './styles.module.scss';
import { Grammarly, GrammarlyEditorPlugin } from '@grammarly/editor-sdk-react';

const EditStoryTab = ({ baseData, onChangeSingleField, cancelEditMode, saveMangaStoryData }) => (
  <div className={styles.container}>
    <h2 className={styles.inspirationTitle}>My Goal</h2>
    <Grammarly clientId={`${process.env.NEXT_PUBLIC_GRAMMARLY_ID}`}>
      <GrammarlyEditorPlugin>
        <TextArea
          isFullWidth={true}
          placeholder="Type here..."
          value={baseData.introduce}
          onChange={onChangeSingleField}
          type="text"
          className={styles.textarea_text}
          name="introduce"
        />
      </GrammarlyEditorPlugin>
      <p>Note: This is private text and is displayed only to the user</p>
      <h2 className={styles.descriptionTitle}>Project Description</h2>
      <GrammarlyEditorPlugin>
        <TextArea
          isFullWidth={true}
          placeholder="Type here..."
          value={baseData.story}
          onChange={onChangeSingleField}
          type="text"
          className={styles.textarea_text}
          name="story"
        />
      </GrammarlyEditorPlugin>
    </Grammarly>
    <div className={cn(styles.editProfile, 'buttonsProfile_styles')}>
      <PrimaryButton text="Discard" isDark className={styles.discard} onClick={cancelEditMode} />
      <PrimaryButton
        text="Save"
        className={styles.save}
        onClick={() => saveMangaStoryData(baseData, 'introduce', 'story')}
      />
    </div>
  </div>
);

EditStoryTab.propTypes = {
  baseData: ProsTypes.object.isRequired,
  onChangeSingleField: ProsTypes.func.isRequired,
  cancelEditMode: ProsTypes.func.isRequired,
  saveMangaStoryData: ProsTypes.func.isRequired,
};

EditStoryTab.defaultProps = {
  baseData: {},
  onChangeSingleField: () => {},
  cancelEditMode: () => {},
  saveMangaStoryData: () => {},
};

export default EditStoryTab;
