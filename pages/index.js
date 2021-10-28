import client from 'api/client';
import { withAuthServerSideProps, withAuthComponent } from 'components/withAuth';
import MiddlewareIndexPage from 'features/middlewareIndexPage';
import { store } from 'store';

export default withAuthComponent(MiddlewareIndexPage);

export const getServerSideProps = withAuthServerSideProps(async (context, user = null, jwt) => {
  const viewUrlName = context?.req?.headers?.host;
  console.log('viewUrlName', viewUrlName);
  const getNameViewUrl = !!viewUrlName && viewUrlName.split('.').reverse()[2];
  console.log('getNameViewUrl', getNameViewUrl);

  if (!getNameViewUrl) {
    return {
      props: {
        user: user || store.user,
      },
    };
  }

  try {
    const mangaStory = await client.service('/api/v2/manga-stories').find({
      query: { viewUrlName: getNameViewUrl },
    });
    console.log('mangaStory', mangaStory);

    const storyBoard = await client.service('/api/v2/story-boards').find({
      query: {
        mangaStoryId: mangaStory?.data[0]?._id,
      },
    });
    console.log('storyBoard', storyBoard);
    console.log('process.env', process.env);

    if (!mangaStory?.data?.length && process.env.NEXT_PUBLIC_REDIRECT_ENABLED) {
      context.res.writeHead(301, {
        Location: 'https://mangafy.club',
      });
      context.res.end();
      return {
        props: {},
      };
    }
    console.log('process.env', {
      // user: user || store.user,
      storyBoardId: storyBoard?.data[0]?._id,
      mangaUrls: storyBoard?.data[0]?.mangaUrls,
      mangaStoryId: mangaStory?.data[0]?._id,
      mangaStoryTitle: mangaStory?.data[0]?.title,
    });

    return {
      props: {
        user: user || store.user,
        storyBoardId: storyBoard?.data[0]?._id,
        mangaUrls: storyBoard?.data[0]?.mangaUrls,
        mangaStoryId: mangaStory?.data[0]?._id,
        mangaStoryTitle: mangaStory?.data[0]?.title,
      },
    };
  } catch (error) {
    console.log('Error: index.js', error);
    return {
      props: {},
    };
  }
});
