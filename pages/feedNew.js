import client from 'api/client';
import { withAuthServerSideProps, withAuthComponent } from 'components/withAuth';
import FeedNew from 'features/feedNew';
import moment from 'moment';
import { store } from 'store';

export default withAuthComponent(FeedNew);
export const getServerSideProps = withAuthServerSideProps(async (context, user = null, jwt) => {
  try {
    const queryPosts = {
      $limit: 20,
      $sort: {
        createdAt: -1,
      },
    };

    const posts = await client.service('/api/v2/posts').find({ query: queryPosts });

    return {
      props: {
        user,
        posts: posts.data,
        jwt,
      },
    };
  } catch (error) {
    console.log('Error: feed.js', error);
    return { props: {} };
  }
});
