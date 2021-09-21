import client from 'api/client';

const onAccept = (id, isAccept) => {
  const jwt = client.getCookie('feathers-jwt');
  import('api/restClient').then((m) => {
    m.default
      .service('/api/v2/join-manga-story-requests')
      .patch(
        id,
        {
          status: isAccept ? 'accepted' : 'rejected',
        },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      )
      .then((response) => {
        Router.reload();
      });
  });
};
