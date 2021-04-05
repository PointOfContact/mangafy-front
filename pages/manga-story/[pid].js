import client from 'api/client';
import restClient from 'api/restClient';
import { withAuthComponent, withAuthServerSideProps } from 'components/withAuth';
import MangeStory from 'features/mangaStory';
import absoluteUrl from 'next-absolute-url';
import { store } from 'store';

export default withAuthComponent(MangeStory);
export const getServerSideProps = withAuthServerSideProps(async (context, user = null, jwt) => {
  const { origin } = absoluteUrl(context.req);

  try {
    user = user || store.user;
    const genres = await client.service('/api/v2/genres').find({
      query: {
        $limit: 100,
      },
    });
    const res = await client.service('/api/v2/manga-stories').get(context.params.pid);
    let requests = { data: [] };
    let comments = { data: [] };
    let storyBoard = {};
    let isParticipent = false;
    let hasStoryBoardPermision = false;
    if (user) {
      const options = {
        query: {
          mangaStoryId: context.params.pid,
          $limit: 100,
          $sort: {
            createdAt: -1,
          },
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
      isParticipent = user && res.participents.includes(user._id);
      if (isParticipent) {
        storyBoard = await client.service('/api/v2/story-boards').find({
          query: {
            mangaStoryId: res._id,
          },
        });
        hasStoryBoardPermision = storyBoard?.data[0].permittedUsers.includes(user._id);
      }
    }

    return {
      props: {
        genres: genres.data.map((g) => ({ value: g.name, _id: g._id })),
        path: context.req.url,
        user,
        mangaStory: res,
        requests: requests.data,
        pid: context.params.pid,
        comments: comments.data,
        isOwn: user && user._id === res.authorInfo._id,
        isParticipent,
        hasStoryBoardPermision,
        originUrl: `https://mangafy.club/manga-story/${context.params.pid}`,
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
