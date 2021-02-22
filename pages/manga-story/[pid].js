import client from 'api/client';
import restClient from 'api/restClient';
import { withAuthComponent, withAuthServerSideProps } from 'components/withAuth';
import MangeStory from 'features/mangaStory';
import { store } from 'store';

export default withAuthComponent(MangeStory);
export const getServerSideProps = withAuthServerSideProps(async (context, user = null, jwt) => {
  try {
    user = user || store.user;
    const res = await client.service('/api/v2/manga-stories').get(context.params.pid);
    let requests = { data: [] };
    let comments = { data: [] };
    if (user) {
      const options = {
        query: {
          mangaStoryId: context.params.pid,
        },
        headers: { Authorization: `Bearer ${jwt}` },
      };
      if (user._id !== res.authorInfo._id) {
        options.query.senderId = user._id;
      }

      requests = await restClient.service('/api/v2/join-manga-story-requests').find(options);
      comments = await client.service('/api/v2/comments').find({
        query: {
          mangaStoryId: context.params.pid,
        },
      });
    }
    return {
      props: {
        path: context.req.url,
        user,
        mangaStory: res,
        requests: requests.data,
        pid: context.params.pid,
        comments: comments.data,
        isOwn: user && user._id === res.authorInfo._id,
        originUrl: `https://mangafy.club${context.req.url}`,
      }, // will be passed to the page component as props
    };
  } catch (error) {
    console.error(error);
    if (context.res) {
      context.res.writeHead(302, {
        Location: '/404',
      });
      context.res.end();
    }
  }
});

MangeStory.getInitialProps = async ({ req }) => {
  let protocol = 'https:';
  const host = req ? req.headers.host : window.location.hostname;
  if (host.indexOf('localhost') > -1) {
    protocol = 'http:';
  }

  return {
    host,
  };
};
