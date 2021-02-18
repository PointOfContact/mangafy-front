import client from 'api/client';
import { withAuthServerSideProps, withAuthComponent } from 'components/withAuth';
import Start from 'features/createStory/start';
import { store } from 'store';

export default withAuthComponent(Start);
export const getServerSideProps = withAuthServerSideProps(
  async (context, user = store.user, jwt) => {
    try {
      if (!user) {
        context.res.writeHead(302, {
          Location: '/sign-in',
        });
        context.res.end();
        return { props: {} };
      }
      const genres = await client.service('/api/v2/genres').find();
      return {
        props: {
          user,
          genres: genres.data.map((g) => ({ value: g.name, _id: g._id })),
          jwt,
        }, // will be passed to the page component as props
      };
    } catch (error) {
      return { props: {} };
    }
  }
);
