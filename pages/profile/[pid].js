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
    return {
      props: {
        user: user || store.user,
        profile,
        userProfile: user,
        genres,
        genresUser: genres.data.map((g) => ({ value: g.name, _id: g._id })),
        originUrl: `https://mangafy.club/profile/${profile._id}`,
      }, // will be passed to the page component as props
    };
  } catch (error) {
    console.log('Error: profile.js', error);

    if (context.res) {
      context.res.writeHead(302, {
        Location: '/404',
      });
      context.res.end();
    }
  }
});
