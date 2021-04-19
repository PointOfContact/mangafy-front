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
  const newImages = images.filter((item) => item._id !== _id && !item.renderItem);
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

const adaptedDataImages = (images, res) => [
  ...images.filter((item) => item._id && !item.renderItem),
  res.id,
];

const beforeGalleryUpload = (
  file,
  setShowUploadList,
  fromPath,
  userData,
  mangaStories,
  images,
  setImages,
  setUserData,
  setErrMessage
) => {
  const openNotification = (type, message) => {
    notification[type]({
      message,
    });
  };

  const isJpgOrPng =
    file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';

  if (!isJpgOrPng) {
    openNotification('error', 'You can only upload JPG, JPEG or PNG file!');
  }

  const isLt2M = file.size / 1024 / 1024 < 5;
  if (!isLt2M) {
    openNotification('error', 'Image must be smaller than 5MB!');
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
                m.default
                  .service(`/api/v2/${fromPath}`)
                  .patch(
                    fromPath === 'users' ? userData._id : mangaStories._id,
                    {
                      gallery: adaptedDataImages(images, response),
                    },
                    {
                      headers: { Authorization: `Bearer ${jwt}` },
                      mode: 'no-cors',
                    }
                  )
                  .then((res) => {
                    setImages(prepareDataImages(res.gallery));
                    setUserData(res);
                    setShowUploadList(false);
                  });
              })
              .catch((err) => {
                setErrMessage(err.message);
                setShowUploadList(false);
                setTimeout(() => {
                  setErrMessage('');
                }, 2000);
              });
          })
          .catch((err) => {
            setErrMessage(err.message);
            setShowUploadList(false);
            setTimeout(() => {
              setErrMessage('');
            }, 2000);
          });
      },
      false
    );
  }
};

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
