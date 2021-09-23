import client from 'api/client';
import { withAuthServerSideProps, withAuthComponent } from 'components/withAuth';
import MiddlewareIndexPage from 'features/middlewareIndexPage';
import { store } from 'store';

export default withAuthComponent(MiddlewareIndexPage);

export const getServerSideProps = withAuthServerSideProps(async (context, user = null, jwt) => {
  const viewUrlName = context?.req?.headers?.host;
  const getNameViewUrl =
    !!viewUrlName && viewUrlName.slice(0, viewUrlName.lastIndexOf('mangafy') - 1);

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

    const storyBoard = await client.service('/api/v2/story-boards').find({
      query: {
        mangaStoryId: mangaStory?.data[0]?._id,
      },
    });

    if (!mangaStory?.data?.length) {
      context.res.writeHead(301, {
        Location: 'https://mangafy.club',
      });
      context.res.end();
      return {
        props: {},
      };
    }

    return {
      props: {
        user: user || store.user,
        storyBoardId: storyBoard?.data[0]?._id,
        mangaUrls: storyBoard?.data[0]?.mangaUrls,
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
