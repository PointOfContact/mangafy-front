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

    patch: (chapterId, data, upgradeChapterData, setEdit, setStoryBoard) => {
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
            setStoryBoard(upgradeChapterData(res, res._id));
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

    delete: (chapterId, index, chapters, setChapters) => {
      const jwt = client.getCookie('feathers-jwt');

      const deleteChapter = () => {
        const newChapter = chapters.filter((value) => value._id !== chapterId);
        setChapters([...newChapter]);
      };

      import('api/restClient').then((m) => {
        m.default
          .service('/api/v2/chapters')
          .remove(chapterId, {
            headers: { Authorization: `Bearer ${jwt}` },
            mode: 'no-cors',
          })
          .then(() => {
            deleteChapter();
          })
          .catch((err) => {
            err.code === 404 && err.name === 'NotFound'
              ? deleteChapter()
              : notification.error({
                  message: err.message,
                  placement: 'bottomLeft',
                });
            return err;
          });
      });
    },
  },

  pages: {
    createPage: (index, chapters, setChapters, setVisibleModal, data) => {
      const jwt = client.getCookie('feathers-jwt');
      return new Promise((resolve, reject) => {
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
              resolve(res);
            })
            .catch((err) => {
              notification.error({
                message: err.message,
                placement: 'bottomLeft',
              });
              reject(err);
              setVisibleModal(false);
            });
        });
      });
    },
    patchPage: (index, pageItem, chapters, setChapters, setVisibleModal, data) => {
      const jwt = client.getCookie('feathers-jwt');

      import('api/restClient').then((m) => {
        m.default
          .service('api/v2/pages')
          .patch(pageItem?.value?._id, data, {
            headers: { Authorization: `Bearer ${jwt}` },
            mode: 'no-cors',
          })
          .then((res) => {
            chapters[index].pages[pageItem?.index] = res;
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
    deletePage: (index, chapters, setChapters, pageItem, setVisibleModal) => {
      const jwt = client.getCookie('feathers-jwt');

      import('api/restClient').then((m) => {
        m.default
          .service('api/v2/pages')
          .remove(pageItem?.value?._id, {
            headers: { Authorization: `Bearer ${jwt}` },
            mode: `no-cors`,
          })
          .then(() => {
            delete chapters[index].pages[pageItem?.index];
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
