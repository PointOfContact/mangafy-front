import client from './client';

const findStoryBoard = (userId, mangaStoryId, onSuccess, onFailure = () => {}) => {
  const jwt = client.getCookie('feathers-jwt');
  import('./restClient').then((m) => {
    m.default
      .service('/api/v2/story-boards')
      .find({
        query: {
          mangaStoryId,
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

const patchStoryBoard = (storyBoardId, data, onSuccess, onFailure = () => {}) => {
  const jwt = client.getCookie('feathers-jwt');
  import('./restClient').then((m) => {
    m.default
      .service('/api/v2/story-boards')
      .patch(storyBoardId, data, {
        headers: { Authorization: `Bearer ${jwt}` },
        mode: 'no-cors',
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

const findLayouts = (onSuccess, onFailure = () => {}) => {
  const jwt = client.getCookie('feathers-jwt');
  import('./restClient').then((m) => {
    m.default
      .service('/api/v2/layouts')
      .find({
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

const createHero = (data, onSuccess, onFailure = () => {}) => {
  const jwt = client.getCookie('feathers-jwt');
  import('./restClient').then((m) => {
    m.default
      .service('/api/v2/heroes')
      .create(data, {
        headers: { Authorization: `Bearer ${jwt}` },
        mode: 'no-cors',
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

const patchHero = (heroId, data, onSuccess, onFailure = () => {}) => {
  const jwt = client.getCookie('feathers-jwt');
  import('./restClient').then((m) => {
    m.default
      .service('/api/v2/heroes')
      .patch(heroId, data, {
        headers: { Authorization: `Bearer ${jwt}` },
        mode: 'no-cors',
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

const deleteHero = (heroId, onSuccess, onFailure = () => {}, mangaStoryId) => {
  const jwt = client.getCookie('feathers-jwt');
  import('./restClient').then((m) => {
    m.default
      .service('/api/v2/heroes')
      .remove(heroId, {
        query: {
          mangaStoryId,
        },
        headers: { Authorization: `Bearer ${jwt}` },
        mode: 'no-cors',
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

const getPages = (storyBoardId, data, onSuccess, onFailure = () => {}) => {
  const jwt = client.getCookie('feathers-jwt');
  import('./restClient').then((m) => {
    m.default
      .service('/api/v2/pages')
      .find({
        query: {
          storyBoard: storyBoardId,
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

const createPage = (data, onSuccess, onFailure = () => {}) => {
  const jwt = client.getCookie('feathers-jwt');
  import('./restClient').then((m) => {
    m.default
      .service('/api/v2/pages')
      .create(data, {
        headers: { Authorization: `Bearer ${jwt}` },
        mode: 'no-cors',
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

const patchPage = (pageId, data, onSuccess, onFailure = () => {}) => {
  const jwt = client.getCookie('feathers-jwt');
  import('./restClient').then((m) => {
    m.default
      .service('/api/v2/pages')
      .patch(pageId, data, {
        headers: { Authorization: `Bearer ${jwt}` },
        mode: 'no-cors',
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

const deletePage = (pageId, mangaStoryId, onSuccess, onFailure = () => {}) => {
  const jwt = client.getCookie('feathers-jwt');
  import('./restClient').then((m) => {
    m.default
      .service('/api/v2/pages')
      .remove(pageId, {
        query: {
          mangaStoryId,
        },
        headers: { Authorization: `Bearer ${jwt}` },
        mode: 'no-cors',
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

const uploadFile = (uri, onSuccess, onFailure = () => {}) => {
  const jwt = client.getCookie('feathers-jwt');
  import('api/restClient').then((m) => {
    m.default
      .service('/api/v2/uploads')
      .create(
        { uri },
        {
          headers: { Authorization: `Bearer ${jwt}` },
          mode: 'no-cors',
        }
      )
      .then((res) => {
        onSuccess(res);
      })
      .catch((err) => {
        onFailure(err);
      });
  });
};

export {
  findStoryBoard,
  patchStoryBoard,
  findLayouts,
  createHero,
  patchHero,
  deleteHero,
  createPage,
  patchPage,
  deletePage,
  uploadFile,
};
