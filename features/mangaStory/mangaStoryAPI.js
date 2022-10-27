import { notification } from 'antd';
import client from 'api/client';
import { EVENTS } from 'helpers/amplitudeEvents';
import myAmplitude from 'utils/amplitude';

const API = {
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
      data.mangaStoryId = mangaStory._id;
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
            mangaStoryId: baseData._id,
          },
          options
        );
        setBaseData(data);
      } catch (err) {
        openNotification('error', err.message);
      }
    },
  },
  collab: {
    patchCollab: (newBaseData, callback = (data) => {}) => {
      const jwt = client.getCookie('feathers-jwt');
      import('api/restClient').then((m) => {
        m.default
          .service('/api/v2/manga-stories')
          .patch(newBaseData._id, newBaseData, {
            headers: { Authorization: `Bearer ${jwt}` },
          })
          .then((res) => {
            console.log(res, 'ewsssssssss');
            callback(res);
          })
          .catch((err) => {
            notification.error({
              message: err.message,
              placement: 'bottomLeft',
            });
          });
      });
    },
  },
  hiderCollab: {
    patchStory: (data, setBaseData, user, baseData, openNotification) => {
      data.mangaStoryId = baseData.mangaStoryId;
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
    leaveManga: (participantId, _id, setBaseData, history, user, setParticipantsData, baseData) => {
      const data = {
        participantId,
      };
      data.mangaStoryId = baseData._id;
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
        mangaStoryId: storyBoard.mangaStoryId,
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
            const dataEvent = [
              {
                event_type: EVENTS.CREATE_CHAPTER,
                event_properties: { chapter: res, storyBoardId: storyBoard._id },
              },
            ];
            myAmplitude(dataEvent);
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

    patch: (
      chapterId,
      data,
      upgradeChapterData = () => {},
      setEdit = () => {},
      setChapters = () => {}
    ) => {
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
            onUpload && onUpload(res);
          })
          .catch((err) => {
            if (!err.message === 'jwt expired') {
              notification.error({
                message: err.message,
                placement: 'bottomLeft',
              });
            }
            return err;
          });
      });
    },

    delete: (chapterId, index, chapters, setChapters, storyBoard) => {
      const jwt = client.getCookie('feathers-jwt');

      const deleteChapter = () => {
        const newChapter = chapters.filter((value) => value._id !== chapterId);
        setChapters([...newChapter]);
      };

      import('api/restClient').then((m) => {
        m.default
          .service('/api/v2/chapters')
          .remove(chapterId, {
            query: {
              mangaStoryId: storyBoard.mangaStoryId,
            },
            headers: { Authorization: `Bearer ${jwt}` },
            mode: 'no-cors',
          })
          .then(() => {
            const dataEvent = [
              {
                event_type: EVENTS.DELETE_CHAPTER,
                event_properties: { chapterId, storyBoardId: storyBoard._id },
              },
            ];
            myAmplitude(dataEvent);
            deleteChapter();
          })
          .catch((err) => {
            err.code === 404
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
              chapters[index].pages.sort((a, b) => a.order - b.order);
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
    patchPage: (
      index,
      pageItem,
      chapters,
      setChapters,
      setVisibleModal,
      data,
      chooseChapter = false,
      ifChooseChapter
    ) => {
      const jwt = client.getCookie('feathers-jwt');
      import('api/restClient').then((m) => {
        m.default
          .service('api/v2/pages')
          .patch(pageItem?.value?._id, data, {
            headers: { Authorization: `Bearer ${jwt}` },
            mode: 'no-cors',
          })
          .then((res) => {
            if (chooseChapter) {
              ifChooseChapter(index, res);
            } else {
              chapters[index].pages[pageItem?.index] = res;
              chapters[index].pages.sort(
                (firstItem, secondItem) => firstItem.order - secondItem.order
              );
              setChapters([...chapters]);
            }

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
    deletePage: (index, chapters, setChapters, pageItem, setVisibleModal, mangaId) => {
      const jwt = client.getCookie('feathers-jwt');
      import('api/restClient').then((m) => {
        m.default
          .service('api/v2/pages')
          .remove(pageItem?.value?._id, {
            query: {
              mangaStoryId: mangaId,
            },
            headers: { Authorization: `Bearer ${jwt}` },
            mode: `no-cors`,
          })
          .then(() => {
            chapters[index].pages.splice(pageItem?.index, 1);
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

export default API;
