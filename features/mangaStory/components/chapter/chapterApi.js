import { notification } from 'antd';
import client from 'api/client';

const chapterApi = {
  create: (chapterName, storyBoard, chapters, setCreateChapter, setChapters) => {
    const data = {
      title: chapterName,
      storyBoardId: storyBoard?._id,
    };

    const jwt = client.getCookie('feathers-jwt');

    // eslint-disable-next-line import/extensions
    import('../../../../api/restClient').then((m) => {
      m.default
        .service('/api/v2/chapters')
        .create(data, {
          headers: { Authorization: `Bearer ${jwt}` },
          mode: 'no-cors',
        })
        .then((res) => {
          setCreateChapter(false);
          setChapters([...chapters, res]);
        })
        .catch((err) => {
          notification.error({
            message: err.message,
            placement: 'bottomLeft',
          });
          return err;
        });
    });
  },

  patch: (chapterId, setEdit, editName, renameData, setChapters) => {
    const data = {
      title: editName,
    };

    const jwt = client.getCookie('feathers-jwt');

    import('../../../../api/restClient').then((m) => {
      m.default
        .service('/api/v2/chapters')
        .patch(chapterId, data, {
          headers: { Authorization: `Bearer ${jwt}` },
          mode: 'no-cors',
        })
        .then((res) => {
          setEdit('');
          setChapters(renameData(res, res._id));
        })
        .catch((err) => {
          notification.error({
            message: err.message,
            placement: 'bottomLeft',
          });
          return err;
        });
    });
  },
};

export default chapterApi;
