import client from 'api/client';
import { withAuthComponent, withAuthServerSideProps } from 'components/withAuth';
import Profile from 'features/profile';
import { store } from 'store';

export default withAuthComponent(Profile);

export const getServerSideProps = withAuthServerSideProps(async (context, user = null) => {
  try {
    const profile = await client.service('/api/v2/users').get(context.params.pid);
    const genres = await client.service('/api/v2/genres').find({
      query: {
        $limit: 100,
      },
    });
    const res = await client.service('/api/v2/manga-stories').find({
      query: {
        author: context.params.pid,
        $limit: 3,
      },
    });
    return {
      props: {
        user: user || store.user,
        profile,
        genres,
        mangaStories: res.data || [],
        total: Math.ceil(res.total / res.limit),
        limit: res.limit,
        current: Math.ceil((res.skip - 1) / res.limit) + 1,
      }, // will be passed to the page component as props
    };
  } catch (error) {
    if (context.res) {
      context.res.writeHead(302, {
        Location: '/404',
      });
      context.res.end();
    }
  }
});
