import client from 'api/client';
import { withAuthServerSideProps, withAuthComponent } from 'components/withAuth';
import FeedNew from 'features/feedNew';
import moment from 'moment';
import { store } from 'store';

export default withAuthComponent(FeedNew);
export const getServerSideProps = withAuthServerSideProps(async (context, user = null, jwt) => {
  try {
    const queryPosts = {
      $limit: 10,
      $sort: {
        createdAt: -1,
      },
      postType: 'Project',
    };

    const posts = await client.service('/api/v2/posts').find({ query: queryPosts });

    const genres = (await client.service('/api/v2/genres').find()).data.map((genre) => ({
      title: genre.name,
      value: genre._id,
    }));

    const bannerProject = await client
      .service('/api/v2/manga-stories')
      .get('633bf4bdd9d2d65581db8a61');

    return {
      props: {
        user,
        posts: posts.data,
        jwt,
        genres,
        bannerProject,
      },
    };
  } catch (error) {
    console.log('Error: feed.js', error);
    return { props: {} };
  }
});
