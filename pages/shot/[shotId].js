import client from 'api/client';
import { withAuthServerSideProps, withAuthComponent } from 'components/withAuth';
import { store } from 'store';
import ShotPage from 'features/shotPage';

export default withAuthComponent(ShotPage);

export const getServerSideProps = withAuthServerSideProps(async (context, user = store.user) => {
  let shot = null;
  // let comments = null;
  let allShots = null;
  let author = null;

  try {
    try {
      shot = await client.service(`/api/v2/short-stories`).get(context.params.shotId);
    } catch {
      shot = await client
        .service(`/api/v2/posts`)
        .find({ query: { postType: 'Portfolio', _id: context.params.shotId, $limit: 1 } });
    }

    // comments = await client
    //   .service('/api/v2/portfolio-comment')
    //   .find({ query: { portfolioId: context.params.shotId, $limit: 100 } });
    allShots = await client
      .service('/api/v2/short-stories')
      .find({ query: { authorId: shot.authorId, $limit: 20 } });
    author = await client.service('/api/v2/users').get(shot.authorId);
  } catch (err) {
    console.log('Shot page error: ', err);
    if (context.res) {
      context.res.writeHead(302, {
        Location: '/404',
      });
      context.res.end();
    }
  }

  return {
    props: {
      user: user,
      serverSideShot: shot,
      serverSideAuthor: author,
      // serverSideComments: comments,
      allShots: allShots?.data || [],
    },
  };
});
