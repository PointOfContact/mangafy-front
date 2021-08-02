import React, { useRef, useCallback, useEffect } from 'react';

import Router from 'next/router';
import PropTypes from 'prop-types';

const DeleteProject = ({ userId, mangaStoryId, setIsModalVisible }) => {
  const typeformRef = useRef(null);

  const onSubmit = useCallback(async () => {
    Router.push(`/profile/${userId}`);
    setIsModalVisible(false);
  }, []);

  useEffect(() => {
    import('@typeform/embed').then((typeformEmbed) => {
      typeformEmbed.makeWidget(
        typeformRef.current,
        `https://form.typeform.com/to/bM9HwBXl#userid=${userId}&mangastoryid=${mangaStoryId}`,
        {
          hideFooter: true,
          hideHeaders: true,
          opacity: 50,
          onSubmit,
        }
      );
    });
  }, [typeformRef, onSubmit]);

  return <div ref={typeformRef} style={{ height: '100%', width: '100%' }} />;
};

DeleteProject.propTypes = {
  userId: PropTypes.number.isRequired,
  mangaStoryId: PropTypes.number.isRequired,
  setIsModalVisible: PropTypes.func.isRequired,
};

export default DeleteProject;
