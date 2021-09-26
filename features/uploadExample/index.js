import React from 'react';

import { Upload } from 'antd';
import client from 'api/client';
import AddButton from 'components/ui-elements/add-button';
import PropTypes from 'prop-types';

const { default: axios } = require('axios');

const UploadExample = () => {
  const [resultImg, setResultImg] = React.useState('');

  async function getSignedUrlPromise(fileName, fileType) {
    console.log('Fetching signed URL');
    const jwt = client.getCookie('feathers-jwt');
    const { default: restClient } = await import('api/restClient');
    return restClient
      .service('/api/v2/aws-upload')
      .find({
        query: {
          name: fileName,
          type: fileType,
        },
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then((data) => {
        console.log(`Received signed url:\n${data.url}`);
        return data;
      });
  }

  function uploadFilePromise(url, file, fileName) {
    console.log(`Uploading file ${fileName} (${file.size} bytes)`);
    const options = {
      headers: {
        'Content-Type': file.type,
      },
    };
    return new Promise((resolve, reject) => {
      axios
        .put(url, file, options)
        .then((a) => {
          console.log('Done', a);
          setResultImg(fileName);
          resolve();
        })
        .catch((error) => {
          console.error('Error: ', error);
          reject(error.statusText);
        });
    });
  }

  const beforeGalleryUpload = (file) =>
    // eslint-disable-next-line no-undef
    getSignedUrlPromise(file.name, file.type).then(({ url, fileName }) =>
      uploadFilePromise(url, file, fileName)
    );

  return (
    <>
      <Upload
        beforeUpload={beforeGalleryUpload}
        showUploadList={false}
        multiple={true}
        accept="image/jpg, image/png, application/pdf, image/jpeg ">
        <AddButton width="25px" height="25px" text={'Upload illustrations'} />
      </Upload>
      {resultImg && <img src={client.UPLOAD_URL + resultImg} />}
    </>
  );
};

UploadExample.propTypes = {
  user: PropTypes.object,
};

UploadExample.defaultProps = {
  user: null,
};

export default UploadExample;
