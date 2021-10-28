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
    const mangaView = await client.service('/api/v2/manga-view').get(getNameViewUrl);

    console.log('mangaView', mangaView);
    console.log('process.env', process.env);

    if (!mangaView?.storyBoardId && process.env.NEXT_PUBLIC_REDIRECT_ENABLED) {
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
        ...mangaView,
      },
    };
  } catch (error) {
    console.log('Error: index.js', error);
    return {
      props: {},
    };
  }
});
