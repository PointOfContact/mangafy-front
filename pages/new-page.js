import client from 'api/client';
import { withAuthServerSideProps, withAuthComponent } from 'components/withAuth';
import LandingNew from 'features/typePage';
import { store } from 'store';

export default withAuthComponent(LandingNew);
export const getServerSideProps = withAuthServerSideProps(async (context, user = null) => {
  try {
    const selectedCategories = context.query.categories || null;
    const selectedType = context.query.compensationModel || null;
    const posts = await client.service('/api/v2/posts').find({
      query: {
        $limit: 5,
        $sort: {
          createdAt: -1,
        },
      },
    });
    const dailyWarmUps = await client.service('/api/v2/daily-warm-ups').find({
      query: {
        $limit: 100,
      },
    });
    const query = {
      $limit: 5,
      $sort: {
        createdAt: -1,
      },
    };
    const members = await client.service('/api/v2/users').find({
      query,
    });
    const query1 = {
      $limit: 6,
      $sort: {
        createdAt: -1,
      },
      published: true,
    };
    const collaborations = await client.service('/api/v2/manga-stories').find({
      query: query1,
    });
    return {
      props: {
        posts: posts.data,
        selectedCategories,
        selectedType,
        dailyWarmUps: dailyWarmUps.data,
        members: members.data,
        collaborations: collaborations.data,
        user: user || store.user,
      },
    };
  } catch (error) {
    return { props: {} };
  }
});
