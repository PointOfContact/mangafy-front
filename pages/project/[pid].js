import client from 'api/client';
import { withAuthComponent, withAuthServerSideProps } from 'components/withAuth';
import ProjectView from 'features/project/ProjectView';
import { store } from 'store';

export default withAuthComponent(ProjectView);

export const getServerSideProps = withAuthServerSideProps(async (context, user) => {
  let ssProject = null;
  let ssComments = null;
  try {
    //   user = user || store.user;
    //   const genres = await client.service('/api/v2/genres').find({
    //     query: {
    //       $limit: 100,
    //     },
    //   });
    ssProject = await client.service('/api/v2/manga-stories').get(context.params.pid);
    ssComments = await client.service('/api/v2/comments').find({
      query: {
        mangaStoryId: context.params.pid,
        $sort: { createdAt: -1 },
        $limit: 1000,
      },
    });

    //   const requests = { data: [] };
    //   let comments = { data: [] };
    //   let storyBoard = {};
    //   let isParticipant = false;
    //   let hasStoryBoardPermision = false;
    //   if (user) {
    //     comments = await client.service('/api/v2/comments').find({
    //       query: {
    //         mangaStoryId: context.params.pid,
    //         $sort: { createdAt: -1 },
    //         $limit: 1000,
    //       },
    //     });
    //     isParticipant = user && res.participents.some((value) => value._id === user._id);
    //     if (isParticipant) {
    //       storyBoard = await client.service('/api/v2/story-boards').find({
    //         query: {
    //           mangaStoryId: res._id,
    //         },
    //       });
    //       hasStoryBoardPermision = storyBoard?.data[0].permittedUsers.includes(user._id);
    //     }
    //   }

    return {
      props: {
        user,
        ssProject,
        ssComments,
        // genres: genres.data.map((g) => ({ value: g.name, _id: g._id })),
        // path: context.req.url,
        // user,
        // mangaStory: res,
        // requests: requests.data,
        // pid: context.params.pid,
        // comments: comments.data,
        // isOwn: user && user._id === res.authorInfo._id,
        // isParticipant,
        // hasStoryBoardPermision,
        // storyBoard,
        // originUrl: `https://mangafy.club/manga-story/${context.params.pid}`,
      },
    };
  } catch (error) {
    console.log('Error: manga-story.js', error);
    //   if (error.code === 403) {
    //     context.res.writeHead(302, {
    //       Location: '/access-denied',
    //     });
    //     context.res.end();
    //   } else if (context.res) {
    //     context.res.writeHead(302, {
    //       Location: '/404',
    //     });
    //     context.res.end();
    //   }
  }
});
