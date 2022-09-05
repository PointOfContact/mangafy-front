import client from 'api/client';
import { withAuthServerSideProps, withAuthComponent } from 'components/withAuth';
import MiddlewareIndexPage from 'features/middlewareIndexPage';
import { store } from 'store';

export default withAuthComponent(MiddlewareIndexPage);

export const getServerSideProps = withAuthServerSideProps(async (context, user = null, jwt) => {
  const viewUrlName = context?.req?.headers?.host;
  const splitDomin = viewUrlName?.split('.');
  const checkDomainForView = splitDomin.length >= 2 && splitDomin[0];
  const getNameViewUrl = checkDomainForView;
  console.log(getNameViewUrl, 'getNameViewUrl');
  if (!getNameViewUrl) {
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
    const mangaView = await client.service('/api/v2/manga-view').get(getNameViewUrl);

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
        getNameViewUrl,
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
