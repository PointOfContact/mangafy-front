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
};

const createRequest = async ({
  mangaStoryId,
  joinAs,
  isInvite,
  senderId,
  text,
  taskId,
  userId,
}) => {
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

  const isConv = await restClient.service('/api/v2/conversations').find({
    query: {
      $sort: {
        createdAt: -1,
      },
      $or: [{ participents: [userId, senderId] }, { participents: [senderId, userId] }],
    },
    headers: { Authorization: `Bearer ${jwt}` },
  });

  const conv = isConv?.data?.find((item) => !item.joinMangaStoryRequestId && !item.mangaStoryId);

  let conversation;

  if (!conv?._id) {
    conversation = await restClient.service('/api/v2/conversations').create(
      {
        participents: [senderId],
      },
      {
        headers,
      }
    );
  }

  return restClient.service('/api/v2/messages').create(
    {
      content: text || 'Hi',
      conversationId: conv?._id || conversation._id,
      joinMangaStoryRequestId: mangaStoryRequest._id,
    },
    {
      headers,
    }
  );
};

export { createRequest, patchRequest, getRequest };
