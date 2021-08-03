import client from 'api/client';
import { withAuthServerSideProps, withAuthComponent } from 'components/withAuth';
import LandingNew from 'features/typePage';
import moment from 'moment';
import { store } from 'store';

export default withAuthComponent(LandingNew);
export const getServerSideProps = withAuthServerSideProps(async (context, user = null) => {
  try {
    const selectedCategories = context.query.categories || null;
    const selectedType = context.query.compensationModel || null;
    const gallery = await client.service('/api/v2/gallery').find({ query: { count: 100 } });
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
        visibleDate: {
          $gte: moment().format('YYYY-MM-DD'),
          $lt: moment().add(1, 'day').format('YYYY-MM-DD'),
        },
      },
    });
    const query = {
      $limit: 5,
      $sort: {
        internalOrder: -1,
        createdAt: -1,
      },
    };
    const members = await client.service('/api/v2/users').find({
      query,
    });
    const query1 = {
      $limit: 6,
      $sort: {
        internalOrder: -1,
        createdAt: -1,
      },
      published: true,
    };
    const collaborations = await client.service('/api/v2/manga-stories').find({
      query: query1,
    });

    const getCurrentPostData =
      !!context.query.postId && (await client.service('api/v2/posts').get(context.query.postId));

    return {
      props: {
        gallery,
        posts: posts.data,
        selectedCategories,
        selectedType,
        dailyWarmUps: dailyWarmUps.data,
        members: members.data,
        collaborations: collaborations.data,
        user: user || store.user,
        getCurrentPostData,
      },
    };
  } catch (error) {
    return { props: {} };
  }
});
