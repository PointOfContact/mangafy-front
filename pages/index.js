import client from 'api/client';
import { withAuthServerSideProps, withAuthComponent } from 'components/withAuth';
import MiddlewareIndexPage from 'features/middlewareIndexPage';
import { store } from 'store';

export default withAuthComponent(MiddlewareIndexPage);

const getViewUrlName = (host) => {
  const splitDomin = host?.split('.');
  let arrayLength;
  switch (process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT) {
    case 'development':
      arrayLength = 1;
      break;
    case 'staging':
      arrayLength = 3;
      break;
    default:
      arrayLength = 2;
      break;
  }
  const viewUrlName = splitDomin.length > arrayLength && splitDomin[0];
  return viewUrlName;
};

export const getServerSideProps = withAuthServerSideProps(async (context, user = null, jwt) => {
  const host = context?.req?.headers?.host;
  const viewUrlName = getViewUrlName(host);

  if (!viewUrlName) {
    context.res.writeHead(301, {
      Location: `https://mangafy.club/feed`,
    });
    context.res.end();
    // return {
    //   props: {
    //     user: user || store.user,
    //   },
    // };
  }
  try {
    const mangaView = await client.service('/api/v2/manga-view').get(viewUrlName);

    if (!mangaView?.storyBoardId && process.env.NEXT_PUBLIC_REDIRECT_ENABLED) {
      context.res.writeHead(301, {
        Location: 'https://mangafy.club/feed',
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
        viewUrlName,
      },
    };
  } catch (error) {
    console.log('Error: index.js', error);
    return {
      props: {
        user: user || store.user,
      },
    };
  }
});
