import client from './client';

const patchRequest = async (status) => {
  const jwt = client.getCookie('feathers-jwt');
  const headers = {
    headers: { Authorization: `Bearer ${jwt}` },
  };
  const { default: restClient } = await import('api/restClient');
  return restClient.service('/api/v2/join-manga-story-requests').patch(
    {
      status,
    },
    {
      headers,
    }
  );
};

const createRequest = async ({ mangaStoryId, joinAs, isInvite }) => {
  const jwt = client.getCookie('feathers-jwt');
  const headers = {
    headers: { Authorization: `Bearer ${jwt}` },
  };
  const { default: restClient } = await import('api/restClient');
  const mangaStoryRequest = await restClient.service('/api/v2/join-manga-story-requests').create(
    {
      mangaStoryId,
      joinAs,
      isInvite,
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
      content: this.state.text || 'Hi',
      conversationId: conversation._id,
    },
    {
      headers,
    }
  );
};

export { createRequest, patchRequest };
