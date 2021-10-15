import { notification } from 'antd';
import client from 'api/client';

const { default: axios } = require('axios');

async function getSignedUrlPromise(fileName, fileType, setLoading = () => {}) {
  const jwt = client.getCookie('feathers-jwt');
  const { default: restClient } = await import('api/restClient');
  setLoading(true);
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

function uploadFilePromise(url, file, fileName, callback, setLoading, resolve) {
  const options = {
    headers: {
      'Content-Type': file.type,
    },
    mode: 'cors',
  };

  return new Promise((res, rej) => {
    axios
      .put(url, file, options)
      .then((response) => {
        console.log('Done', response);
        callback(fileName, resolve);
        setLoading(false);
        res(fileName);
      })
      .catch((error) => {
        notification.error({
          message: error.message,
          placement: 'bottomLeft',
        });
        rej(error.message);
      });
  });
}

const beforeUploadFromAMZ = (file, callback, setLoading = () => {}, resolve) =>
  getSignedUrlPromise(file.name, file.type, setLoading).then(({ url, fileName }) =>
    uploadFilePromise(url, file, fileName, callback, setLoading, resolve)
  );

export default beforeUploadFromAMZ;
