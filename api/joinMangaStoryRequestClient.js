import client from './client';

const patchRequest = async (reqId, status) => {
  const jwt = client.getCookie('feathers-jwt');
  const headers = { Authorization: `Bearer ${jwt}` };
  const { default: restClient } = await import('api/restClient');
  return restClient.service('/api/v2/join-manga-story-requests').patch(
    reqId,
    {
      status,
    },
    {
      headers,
    }
  );
};

const getRequest = async (reqId) => {
  const jwt = client.getCookie('feathers-jwt');
  const headers = { Authorization: `Bearer ${jwt}` };
  const { default: restClient } = await import('api/restClient');
  return restClient.service('/api/v2/join-manga-story-requests').get(reqId, {
    headers,
  });
  // const genres = await client.service('/api/v2/genres').find({
  //   query: {
  //     $limit: 100,
  //   },
  // });
};

const createRequest = async ({ mangaStoryId, joinAs, isInvite, senderId, text, taskId }) => {
  const jwt = client.getCookie('feathers-jwt');
  const headers = {
    Authorization: `Bearer ${jwt}`,
  };
  const { default: restClient } = await import('api/restClient');
  const mangaStoryRequest = await restClient.service('/api/v2/join-manga-story-requests').create(
    {
      mangaStoryId,
      joinAs,
      isInvite,
      senderId,
      taskId,
    },
    {
      headers,
    }
  );
  const conversation = await restClient.service('/api/v2/conversations').create(
    {
      joinMangaStoryRequestId: mangaStoryRequest._id,
    },
    {
      headers,
    }
  );
  return restClient.service('/api/v2/messages').create(
    {
      content: text || 'Hi',
      conversationId: conversation._id,
    },
    {
      headers,
    }
  );
};

export { createRequest, patchRequest, getRequest };
