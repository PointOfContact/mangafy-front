import React from 'react';

import '@bloogrox/react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import PropTypes, { any } from 'prop-types';

import styles from './styles.module.scss';
import { GrammarlyEditorPlugin } from '@grammarly/editor-sdk-react';

const QuillNoSSRWrapper = dynamic(import('@bloogrox/react-quill'), {
  ssr: false,
  // eslint-disable-next-line react/display-name
  loading: () => <p>Loading ...</p>,
});

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'size',
  'color',
  'list',
  'bullet',
  'indent',
  'link',
  // 'image',
  // 'video',
];

const modules = {
  toolbar: {
    container: [
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ size: ['small', false, 'large', 'huge'] }, { color: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }, { align: [] }],
      ['link'],
      // ['link', 'image', 'video'],
      ['clean'],
    ],
  },
  clipboard: { matchVisual: false },
};
const TextEditor = ({ placeholder, result, disabled, value, onBlur, ...res }) => (
  <GrammarlyEditorPlugin clientId={`${process.env.NEXT_PUBLIC_GRAMMARLY_ID}`}>
    <QuillNoSSRWrapper
      placeholder={placeholder}
      className={styles.textEditor}
      onChange={(e) => result(e)}
      onBlur={onBlur}
      modules={modules}
      formats={formats}
      theme="snow"
      readOnly={disabled}
      value={value}
      {...res}
    />
  </GrammarlyEditorPlugin>
);

TextEditor.propTypes = {
  result: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.any,
  onBlur: PropTypes.func.isRequired,
};

TextEditor.defaultProps = {
  placeholder: '',
  disabled: false,
  value: any,
  onBlur: () => {},
};

export default TextEditor;
