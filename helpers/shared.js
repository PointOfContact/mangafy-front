import { notification } from 'antd';
import { logout } from 'store';

import client from '../api/client';

let toCheckType;
let isLt2M;

const openNotification = (type, message) => {
  notification[type]({
    message,
    placement: 'bottomLeft',
  });
};

const assertImg = (file) => {
  toCheckType =
    file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';

  if (!toCheckType) {
    openNotification('error', 'You can only upload JPG, JPEG, PNG, Gif file!');
  }
  isLt2M = file.size / 1024 / 1024 < 100;
  if (!isLt2M) {
    openNotification('error', 'Image must smaller than 100MB!');
  }
};

const queryImg = (file, props, updater, loadingImg) => {
  const jwt = client.getCookie('feathers-jwt');
  import('api/restClient')
    .then((m) => {
      m.default
        .service('/api/v2/uploads')
        .create(
          { uri: file },
          {
            headers: { Authorization: `Bearer ${jwt}` },
            mode: 'no-cors',
          }
        )
        .then((response) => response)
        .then((response) =>
          m.default.service('/api/v2/users').patch(
            props.user?._id,
            {
              avatar: response.id,
            },
            {
              headers: { Authorization: `Bearer ${jwt}` },
              mode: 'no-cors',
            }
          )
        )
        .then((res) => {
          updater(res);
          loadingImg(false);
        });
    })
    .catch((err) => openNotification('error', err.message));
};

export const beforeUpload = (file, props, updater = () => {}) => {
  // if (info.file.status !== 'uploading') {
  //   console.log(info.file, info.fileList);
  // }
  // if (info.file.status === 'done') {
  //   message.success(`${info.file.name} file uploaded successfully`);
  // } else if (info.file.status === 'error') {
  //   message.error(`${info.file.name} file upload failed.`);
  // }

  assertImg(file);

  if (toCheckType && isLt2M) {
    const reader = new FileReader();
    // encode dataURI
    reader.readAsDataURL(file);
    reader.addEventListener(
      'load',
      () => {
        queryImg(reader.result, props, updater);
      },
      false
    );
  }
  return toCheckType && isLt2M;
};

export const beforeUploadBase64 = (file, props, updater = () => {}, loadingImg) => {
  assertImg(file);

  if (toCheckType && isLt2M) {
    queryImg(file.base64, props, updater, loadingImg);
  }
  return toCheckType && isLt2M;
};

const removeCookies = () => {
  document.cookie = `${'feathers-jwt'}=;expires=${new Date(0).toUTCString()}`;
};

export const removeAllStorage = (page) => {
  localStorage.clear();
  sessionStorage.clear();
  logout();
  removeCookies();
  window.location.href = '/sign-in?page=' + page;
};

export function formatHtml(text, highlightUrls = true) {
  let urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
  let scriptRegex = /<script[\s\S]*?>[\s\S]*?<\/script>/;
  text?.replace(scriptRegex, '');
  if (highlightUrls) {
    text?.replace(urlRegex, function (url) {
      return '<a href="' + url + '">' + url + '</a>';
    });
  }
  return text;
}

export const followUser = (userId) => {
  const data = { userId };
  const jwt = client.getCookie('feathers-jwt');
  return import('api/restClient').then((m) =>
    m.default.service(`/api/v2/likes`).create(data, {
      headers: { Authorization: `Bearer ${jwt}` },
      mode: 'no-cors',
    })
  );
};

export const unFollowUser = (userId) => {
  const jwt = client.getCookie('feathers-jwt');
  return import('api/restClient').then((m) =>
    m.default.service(`/api/v2/likes`).remove(userId, {
      headers: { Authorization: `Bearer ${jwt}` },
      mode: 'no-cors',
    })
  );
};

export function buildShotURL(shotId, authorId) {
  if (authorId) {
    return `/shot/${authorId}?galleryId=${shotId}`;
  }
  return `/shot/${shotId}`;
}

export function likeChapter(ownerId, chapterId, likedUserId, participants, isLiked) {
  const data = {
    ownerId,
    chapterId,
    likedUserId,
    participants,
  };

  if (isLiked) {
    data.like = 'decrement';
  } else {
    data.like = 'increment';
  }

  const jwt = client.getCookie('feathers-jwt');

  return client
    .service('/api/v2/chapter-like')
    .create(data, {
      headers: { Authorization: `Bearer ${jwt}` },
      mode: 'no-cors',
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}

export async function subscribeToProject(mangaStoryId, userId, email) {
  const jwt = client.getCookie('feathers-jwt');

  const payload = { mangaStoryId, email, userId };
  const params = {
    mode: 'no-cors',
  };
  if (jwt) params.headers = { Authorization: `Bearer ${jwt}` };
  return client.service('/api/v2/manga-subscribe').create(payload, params);
}

export async function unSubscribeOfProject(subscriptionId, mangaStoryId) {
  const jwt = client.getCookie('feathers-jwt');
  const params = {
    query: { mangaStoryId },
    mode: 'no-cors',
  };
  if (jwt) params.headers = { Authorization: `Bearer ${jwt}` };
  return client.service('/api/v2/manga-subscribe').remove(subscriptionId, params);
}

export async function createComment(content, projectId) {
  const jwt = client.getCookie('feathers-jwt');
  return client.service('/api/v2/comments?page=mangaView').create(
    {
      content,
      mangaStoryId: projectId,
    },
    {
      headers: { Authorization: `Bearer ${jwt}` },
      mode: 'no-cors',
    }
  );
}

export async function createChapterComment(content, chapterId, senderId) {
  const jwt = client.getCookie('feathers-jwt');
  return client.service('/api/v2/comment-chapter').create(
    {
      content,
      chapterId,
      senderId,
    },
    {
      headers: { Authorization: `Bearer ${jwt}` },
      mode: 'no-cors',
    }
  );
}

export function validateEmail(email, user) {
  if (email === user?.email) return "You can't send a request to you";
  if (email.length === 0) {
    return 'Email is required';
  }
  const re = /\S+@\S+\.\S+/;
  if (!re.test(email)) {
    return 'Invalid email';
  }
}

export function validatePassword(password) {
  if (password.length === 0) {
    return 'Password is required';
  }
  if (password.length < 2) {
    return 'Password should be at least 2 characters length';
  }
}

export function validateName(name) {
  if (name.length === 0) {
    return 'Name is required';
  }
  if (name.length < 2) {
    return 'Name should be at least 2 characters length';
  }
}
