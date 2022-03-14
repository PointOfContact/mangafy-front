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

function uploadFilePromise(
  url,
  file,
  fileName,
  callback,
  setLoading,
  resolve,
  setOnUploadProgress,
  setOnUploadTimer,
  process = false
) {
  const options = {
    headers: {
      'Content-Type': file.type,
    },
    mode: 'cors',
    onUploadProgress: (progressEvent) => {
      const percent = (progressEvent.loaded / progressEvent.total) * 100;
      const dateTime = (progressEvent.total - progressEvent.loaded) / progressEvent.timeStamp / 0.5;
      const time = !!Math.round(dateTime) && `${Math.ceil(dateTime)} left`;
      if (process) {
        setOnUploadProgress(Math.round(percent));
        setOnUploadTimer(time);
      }
    },
  };

  return new Promise((res, rej) => {
    axios
      .put(url, file, options)
      .then(() => {
        callback(fileName, resolve);
        setLoading(false);
        res(fileName);
        if (process) {
          setOnUploadTimer(false);
          setOnUploadProgress(false);
        }
      })
      .catch((error) => {
        notification.error({
          message: error.message,
          placement: 'bottomLeft',
        });
        if (process) {
          setOnUploadTimer(false);
          setOnUploadProgress(false);
        }
        rej(error.message);
      });
  });
}

const beforeUploadFromAMZ = (
  file,
  callback,
  setLoading = () => {},
  resolve,
  setOnUploadProgress,
  setOnUploadTimer,
  process
) =>
  getSignedUrlPromise(file.name, file.type, setLoading).then(({ url, fileName }) =>
    uploadFilePromise(
      url,
      file,
      fileName,
      callback,
      setLoading,
      resolve,
      setOnUploadProgress,
      setOnUploadTimer,
      process
    )
  );

export default beforeUploadFromAMZ;
