import { notification } from 'antd';
import client from 'api/client';
import { EVENTS } from 'helpers/amplitudeEvents';
import myAmplitude from 'utils/amplitude';

export default {
  draft: {
    saveUserDataByKey: (email, user, setMangaStoryNew, mangaStoryNew) => {
      const data = {};
      data.payPalEmail = email;
      const jwt = client.getCookie('feathers-jwt');
      import('api/restClient').then((m) => {
        m.default
          .service('/api/v2/users')
          .patch(user._id, data, {
            headers: { Authorization: `Bearer ${jwt}` },
            mode: 'no-cors',
          })
          .then((res) => {
            setMangaStoryNew({ ...mangaStoryNew, authorInfo: res });
          })
          .catch((err) => {
            console.log(err.message);
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
          .patch(baseData._id, data, {
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
};
