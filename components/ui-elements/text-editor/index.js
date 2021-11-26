import React from 'react';

import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import PropTypes, { any } from 'prop-types';

import styles from './styles.module.scss';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
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

const TextEditor = ({ placeholder, result, disabled, value, ...res }) => (
  <QuillNoSSRWrapper
    placeholder={placeholder}
    className={styles.textEditor}
    onChange={(e) => result(e)}
    modules={modules}
    formats={formats}
    theme="snow"
    readOnly={disabled}
    value={value}
    {...res}
  />
);

TextEditor.propTypes = {
  result: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.any,
};

TextEditor.defaultProps = {
  placeholder: '',
  disabled: false,
  value: any,
};

export default TextEditor;
