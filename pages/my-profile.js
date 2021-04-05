import client from 'api/client';
import { withAuthServerSideProps, withAuthComponent } from 'components/withAuth';
import MyProfile from 'features/myProfile';
import absoluteUrl from 'next-absolute-url';
import { store } from 'store';

export default withAuthComponent(MyProfile);
export const getServerSideProps = withAuthServerSideProps(async (context, user = store.user) => {
  const { origin } = absoluteUrl(context.req);
  try {
    if (!user) {
      context.res.writeHead(302, {
        Location: '/sign-in?page=my-profile',
      });
      context.res.end();
      return { props: {} };
    }
    const genres = await client.service('/api/v2/genres').find({
      query: {
        $limit: 100,
      },
    });
    return {
      props: {
        user,
        profile: user,
        genres: genres.data.map((g) => ({ value: g.name, _id: g._id })),
        originUrl: `https://mangafy.club/profile/${user._id}`,
      }, // will be passed to the page component as props
    };
  } catch (error) {
    return { props: {} };
  }
});
