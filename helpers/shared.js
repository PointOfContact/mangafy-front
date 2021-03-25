import { notification } from 'antd';
import { logout } from 'store';

import client from '../api/client';

export const beforeUpload = (file, props, updater = () => {}) => {
  // if (info.file.status !== 'uploading') {
  //   console.log(info.file, info.fileList);
  // }
  // if (info.file.status === 'done') {
  //   message.success(`${info.file.name} file uploaded successfully`);
  // } else if (info.file.status === 'error') {
  //   message.error(`${info.file.name} file upload failed.`);
  // }
  const openNotification = (type, message) => {
    notification[type]({
      message,
    });
  };

  const isJpgOrPng =
    file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';

  if (!isJpgOrPng) {
    openNotification('error', 'You can only upload JPG, JPEG, PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 100;
  if (!isLt2M) {
    openNotification('error', 'Image must smaller than 100MB!');
  }

  const reader = new FileReader();
  // encode dataURI
  reader.readAsDataURL(file);
  reader.addEventListener(
    'load',
    () => {
      const jwt = client.getCookie('feathers-jwt');
      import('api/restClient')
        .then((m) => {
          m.default
            .service('/api/v2/uploads')
            .create(
              { uri: reader.result },
              {
                headers: { Authorization: `Bearer ${jwt}` },
                mode: 'no-cors',
              }
            )
            .then((response) => response)
            .then((response) =>
              m.default.service('/api/v2/users').patch(
                props.user._id,
                {
                  avatar: response.id,
                },
                {
                  headers: { Authorization: `Bearer ${jwt}` },
                  mode: 'no-cors',
                }
              )
            )
            .then((res) => updater(res));
        })
        .catch((err) => openNotification('error', err.message));
    },
    false
  );
  return isJpgOrPng && isLt2M;
};

const removeCookies = () => {
  const allCookies = document.cookie.split(';');

  // The "expire" attribute of every cookie is
  // Set to "Thu, 01 Jan 1970 00:00:00 GMT"
  for (let i = 0; i < allCookies.length; i++)
    document.cookie = `${allCookies[i]}=;expires=${new Date(0).toUTCString()}`;
};

export const removeAllStorage = () => {
  localStorage.clear();
  sessionStorage.clear();
  logout();
  removeCookies();
  window.location.href = '/';
};
