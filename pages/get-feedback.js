import client from 'api/client';
import { withAuthServerSideProps, withAuthComponent } from 'components/withAuth';
import GetFeedback from 'features/get-feedback';
import { store } from 'store';

export default withAuthComponent(GetFeedback);
export const getServerSideProps = withAuthServerSideProps(
  async (context, user = store.user, jwt) => {
    try {
      if (!user) {
        context.res.writeHead(302, {
          Location: '/sign-in?page=get-feedback',
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
          isPage: true,
          genres: genres.data.map((g) => ({ value: g.name, _id: g._id })),
          jwt,
        }, // will be passed to the page component as props
      };
    } catch (error) {
      console.log('Error: get-feedback.js', error);

      return { props: {} };
    }
  }
);
