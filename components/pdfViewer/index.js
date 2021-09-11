import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
// import { Document, Page, pdfjs } from 'react-pdf';
import useWindowSize from 'utils/useWindowSize';

import styles from './styles.module.scss';

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFViewer = ({ url }) => {
  const [numPages, setNumPages] = useState(null);
  const { width } = useWindowSize();
  const [size, setSize] = useState(width);

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }
  useEffect(() => {
    if (width > 1400) {
      setSize(width - 200);
    } else if (width > 1000) {
      setSize(width - 120);
    } else if (width > 768) {
      setSize(width - 100);
    } else {
      setSize(width - 70);
    }
  }, [width]);

  return (
    <div className={styles.pdf}>
      {/* <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from({ length: numPages }, (_, index) => (
          <Page
            width={size}
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            renderAnnotationLayer={false}
            renderTextLayer={false}
          />
        ))}
      </Document> */}
    </div>
  );
};

PDFViewer.propTypes = {
  url: PropTypes.string,
};

PDFViewer.defaultProps = {
  url: '',
};

export default PDFViewer;
