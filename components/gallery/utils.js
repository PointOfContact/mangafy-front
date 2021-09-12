import { notification } from 'antd';
import client from 'api/client';

const getShortStorys = (authorId, onSuccess, onFailure) => {
  const jwt = client.getCookie('feathers-jwt');
  import('../../api/restClient').then((m) => {
    m.default
      .service('/api/v2/short-stories')
      .find({
        query: {
          authorId,
          $limit: 1000,
        },
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then((res) => {
        onSuccess(res);
      })
      .catch((err) => {
        onFailure(err);
        return err;
      });
  });
};

const likeGallery = (galleryId, userId) => {
  const data = { galleryId, userId };
  const jwt = client.getCookie('feathers-jwt');

  return import('api/restClient').then((m) =>
    m.default.service(`/api/v2/gallery-likes`).create(data, {
      headers: { Authorization: `Bearer ${jwt}` },
      mode: 'no-cors',
    })
  );
};

const removeImg = (images, _id, fromPath, userData) => {
  const newImages = images.filter(
    (item) =>
      item._id !== _id &&
      (!item.renderItem || item._id?.slice(-3) === 'PDF' || item?._id?.slice(-3) === 'pdf')
  );
  const data = { gallery: [...newImages.map((item) => item._id)] };
  const jwt = client.getCookie('feathers-jwt');

  return import('api/restClient').then((m) =>
    m.default.service(`/api/v2/${fromPath}`).patch(userData._id, data, {
      headers: { Authorization: `Bearer ${jwt}` },
      mode: 'no-cors',
    })
  );
};

const removeShortStory = (shortStoryId, onSuccess, onFailure) => {
  const jwt = client.getCookie('feathers-jwt');

  return import('api/restClient').then((m) =>
    m.default
      .service(`/api/v2/short-stories`)
      .remove(shortStoryId, {
        headers: { Authorization: `Bearer ${jwt}` },
        mode: 'no-cors',
      })
      .then(onSuccess)
      .catch((err) => {
        onFailure(err);
        return err;
      })
  );
};

const prepareDataImages = (gallery) => {
  const prepareData = [];
  gallery &&
    gallery.forEach((item) => {
      prepareData.push({
        original: client.UPLOAD_URL + item,
        _id: item,
      });
    });
  return prepareData;
};

const adaptedDataImages = (images, res) => {
  const imgs = images
    .filter(
      (item) =>
        (item._id &&
          item.renderItem &&
          (item._id?.slice(-3) === 'pdf' || item._id?.slice(-3) === 'PDF')) ||
        (item._id && !item.renderItem)
    )
    .map((item) => item._id);

  return [res.id, ...imgs];
};

const beforeGalleryUpload = (
  file,
  setShowUploadList,
  fromPath,
  userData,
  mangaStories,
  images,
  setImages,
  setUserData,
  setErrMessage,
  setLoading
) =>
  new Promise((resolve) => {
    setLoading(true);
    const openNotification = (type, message) => {
      notification[type]({
        message,
        placement: 'bottomLeft',
      });
    };

    const isJpgOrPng =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/jpg' ||
      file.type === 'application/pdf';

    if (!isJpgOrPng) {
      openNotification('error', 'You can only upload JPG, JPEG, PDF or PNG file!');
    }

    const isLt2M = file.size / 1024 / 1024 < 50;
    if (!isLt2M) {
      openNotification('error', 'Image must be smaller than 50MB!');
    }

    if (isJpgOrPng && isLt2M) {
      // eslint-disable-next-line no-undef
      const reader = new FileReader();
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
                .then((response) => {
                  setShowUploadList(false);
                  return response;
                })
                .then((response) => {
                  setImages((imgs) => {
                    m.default
                      .service(`/api/v2/${fromPath}`)
                      .patch(
                        fromPath === 'users' ? userData._id : mangaStories._id,
                        {
                          gallery: adaptedDataImages(imgs, response),
                        },
                        {
                          headers: { Authorization: `Bearer ${jwt}` },
                          mode: 'no-cors',
                        }
                      )
                      .then((res) => {
                        setUserData(res);
                        setShowUploadList(false);
                        setLoading(false);
                        setImages(prepareDataImages(res.gallery));
                        resolve(res);
                      });
                    return imgs;
                  });
                })
                .catch((err) => {
                  setErrMessage(err.message);
                  setShowUploadList(false);
                  setLoading(false);
                  setTimeout(() => {
                    setErrMessage('');
                  }, 2000);
                });
            })
            .catch((err) => {
              setErrMessage(err.message);
              setShowUploadList(false);
              setLoading(false);
              setTimeout(() => {
                setErrMessage('');
              }, 2000);
            });
        },
        false
      );
    }
  });

const createGallery = async (data, onSuccess, onFailure) => {
  const jwt = client.getCookie('feathers-jwt');
  const { default: api } = await import('api/restClient');
  api
    .service('/api/v2/short-stories')
    .create(data, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
    .then(onSuccess)
    .catch((err) => {
      onFailure(err);
      return err;
    });
};

const editGallery = async (galleryId, data, onSuccess, onFailure) => {
  const jwt = client.getCookie('feathers-jwt');
  const { default: api } = await import('api/restClient');
  api
    .service('/api/v2/short-stories')
    .patch(galleryId, data, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
    .then(onSuccess)
    .catch((err) => {
      onFailure(err);
      return err;
    });
};

const socials = [
  {
    id: '1',
    name: 'facebook',
    link: 'https://facebook.com',
  },
  {
    id: '2',
    name: 'twitter',
    link: 'https://twitter.com',
  },
  {
    id: '3',
    name: 'instagram',
    link: 'https://instagram.com',
  },
  {
    id: '4',
    name: 'dribbble',
    link: 'https://dribbble.com',
  },
  {
    id: '5',
    name: 'deviantart',
    link: 'https://deviantart.com',
  },
  {
    id: '6',
    name: 'behance',
    link: 'https://behance.com',
  },
  {
    id: '7',
    name: 'patreon',
    link: 'https://patreon.com',
  },
  {
    id: '8',
    name: 'ticktok',
    link: 'https://ticktok.com',
  },
  {
    id: '9',
    name: 'webtoons',
    link: 'https://webtoons.com',
  },
  {
    id: '10',
    name: 'tapas',
    link: 'https://tapas.io',
  },
];

export {
  likeGallery,
  removeImg,
  removeShortStory,
  prepareDataImages,
  adaptedDataImages,
  beforeGalleryUpload,
  getShortStorys,
  createGallery,
  editGallery,
  socials,
};
