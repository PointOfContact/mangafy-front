import { notification } from 'antd';
import client from 'api/client';
import { EVENTS } from 'helpers/amplitudeEvents';
import myAmplitude from 'utils/amplitude';

export default {
  draft: {
    saveUserDataByKey: (email, user, setUserData) => {
      const data = {};
      data.payPalEmail = email;
      const jwt = client.getCookie('feathers-jwt');
      import('api/restClient').then((m) => {
        m.default
          .service('/api/v2/users')
          .patch(user?._id, data, {
            headers: { Authorization: `Bearer ${jwt}` },
            mode: 'no-cors',
          })
          .then((res) => {
            setUserData(res);
            return res;
          })
          .catch((err) => {
            console.log(err.message);
            notification.error({
              message: err.message,
              placement: 'bottomLeft',
            });
            return err;
          });
      });
    },

    leaveManga: (mangaStory, showBubble) => {
      const data = {};
      data.payPalPublished = showBubble;
      const jwt = client.getCookie('feathers-jwt');
      return import('api/restClient').then((m) =>
        m.default
          .service('/api/v2/manga-stories')
          .patch(mangaStory._id, data, {
            headers: { Authorization: `Bearer ${jwt}` },
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            notification.error({
              message: err.message,
              placement: 'bottomLeft',
            });
          })
      );
    },
  },
  bannerSection: {
    getBaseData: async (reader, setBaseData, baseData, openNotification) => {
      try {
        const jwt = client.getCookie('feathers-jwt');
        const { default: api } = await import('api/restClient');
        const options = {
          headers: { Authorization: `Bearer ${jwt}` },
          mode: 'no-cors',
        };
        const { id: image } = await api
          .service('/api/v2/uploads')
          .create({ uri: reader.result }, options);
        const data = await api.service('/api/v2/manga-stories').patch(
          baseData._id,
          {
            image,
          },
          options
        );
        setBaseData(data);
      } catch (err) {
        openNotification('error', err.message);
      }
    },
  },
  hiderCollab: {
    patchStory: (data, setBaseData, user, baseData, openNotification) => {
      const jwt = client.getCookie('feathers-jwt');
      return import('api/restClient').then((m) =>
        m.default
          .service('/api/v2/manga-stories')
          .patch(baseData?._id, data, {
            headers: { Authorization: `Bearer ${jwt}` },
          })
          .then((res) => {
            setBaseData(res);
            const event_type = data.published ? EVENTS.GO_TO_PUBLIC : EVENTS.GO_TO_PRIVATE;
            const eventData = [
              {
                event_type,
                event_properties: { mangaStoryId: baseData._id },
                user_id: user._id,
                user_properties: {
                  ...user,
                },
              },
            ];
            myAmplitude(eventData);
          })
          .catch((err) => {
            openNotification('error', err.message);
          })
      );
    },
  },
  storyTab: {
    leaveManga: (
      newParticipantsData,
      participantId,
      _id,
      setBaseData,
      history,
      user,
      setParticipantsData
    ) => {
      const data = { participents: newParticipantsData };
      const jwt = client.getCookie('feathers-jwt');
      return import('api/restClient').then((m) =>
        m.default
          .service('/api/v2/manga-stories')
          .patch(_id, data, {
            headers: { Authorization: `Bearer ${jwt}` },
          })
          .then((res) => {
            setParticipantsData(res.participentsInfo);
            if (participantId === user._id) {
              history.push(`/collaborations`);
            } else {
              setBaseData(res);
            }
          })
          .catch((err) => {
            notification.error({
              message: err.message,
              placement: 'bottomLeft',
            });
          })
      );
    },
  },

  chapter: {
    create: (chapterName, storyBoard, chapters, setCreateChapter, setChapters, lengthChapters) => {
      const data = {
        title: chapterName,
        order: lengthChapters,
        storyBoardId: storyBoard?._id,
      };

      const jwt = client.getCookie('feathers-jwt');

      import('api/restClient').then((m) => {
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

    patch: (chapterId, setEdit, editName, upgradeChapterData, setChapters) => {
      const data = {
        title: editName,
      };

      const jwt = client.getCookie('feathers-jwt');

      import('api/restClient').then((m) => {
        m.default
          .service('/api/v2/chapters')
          .patch(chapterId, data, {
            headers: { Authorization: `Bearer ${jwt}` },
            mode: 'no-cors',
          })
          .then((res) => {
            setEdit('');
            setChapters(upgradeChapterData(res, res._id));
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
  },

  pages: {
    createPage: (
      chapterId,
      index,
      chapters,
      pageCount,
      storyBoard,
      setChapters,
      setVisibleModal
    ) => {
      const data = {
        title: 'Page 1',
        text: 'hello my page',
        order: pageCount + 1,
        storyBoard: storyBoard?._id,
        chapterId,
      };

      const jwt = client.getCookie('feathers-jwt');

      import('api/restClient').then((m) => {
        m.default
          .service('api/v2/pages')
          .create(data, {
            headers: { Authorization: `Bearer ${jwt}` },
            mode: 'no-cors',
          })
          .then((res) => {
            chapters[index].pages.push(res);
            setChapters([...chapters]);
            setVisibleModal(false);
          })
          .catch((err) => {
            notification.error({
              message: err.message,
              placement: 'bottomLeft',
            });
            setVisibleModal(false);
          });
      });
    },
  },
};
