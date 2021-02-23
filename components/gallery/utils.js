import client from 'api/client';

const likeGallery = (galleryId, userId) => {
  const data = { galleryId, userId };
  const jwt = client.getCookie('feathers-jwts');

  return import('api/restClient').then((m) =>
    m.default.service(`/api/v2/gallery-likes`).create(data, {
      headers: { Authorization: `Bearer ${jwt}` },
      mode: 'no-cors',
    })
  );
};

const removeImg = (images, _id, fromPath, userData) => {
  const newImages = images.filter((item) => item._id !== _id);
  const data = { gallery: [...newImages.map((item) => item._id)] };
  const jwt = client.getCookie('feathers-jwt');

  return import('api/restClient').then((m) =>
    m.default.service(`/api/v2/${fromPath}`).patch(userData._id, data, {
      headers: { Authorization: `Bearer ${jwt}` },
      mode: 'no-cors',
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

const adaptedDataImages = (images, res) => [...images.map((item) => item._id), res.id];

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
  prepareDataImages,
  adaptedDataImages,
  beforeGalleryUpload,
  socials,
};
