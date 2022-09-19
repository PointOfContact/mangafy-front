import client from 'api/client';
import { withAuthServerSideProps, withAuthComponent } from 'components/withAuth';
import { store } from 'store';
import ShotPage from 'features/shotPage';

export default withAuthComponent(ShotPage);

export const getServerSideProps = withAuthServerSideProps(async (context, user = store.user) => {
  let shot = null;
  let allShots = null;
  let author = null;

  try {
    try {
      // try to get shot from short-stories
      shot = await client.service(`/api/v2/short-stories`).get(context.params.shotId);
    } catch {
      // if shot is not found, try to get it from posts (old shots)
      shot = await client.service(`/api/v2/posts`).get(context.params.shotId, {
        query: { postType: 'Portfolio', galleryId: context.query.galleryId },
      });
      shot.idOld = true;
    }

    if (!shot.isOld) {
      author = await client.service('/api/v2/users').get(shot.authorInfo._id);
    } else {
      // in old shots, authorId is shotId
      author = await client.service('/api/v2/users').get(shot._id);
    }

    allShots = author?.gallery.map((item) => ({ ...item, isOld: true, authorId: author._id }));
    const allNewShots = await client
      .service('/api/v2/short-stories')
      .find({ query: { authorId: author._id } });
    allShots = allShots.concat(allNewShots.data || []);
  } catch (err) {
    console.log('!!! Shot page error: ', err);
    if (context.res) {
      context.res.writeHead(302, {
        Location: '/404',
      });
      context.res.end();
    }
  }

  return {
    props: {
      user,
      serverSideShot: shot,
      serverSideAuthor: author,
      allShots: allShots,
    },
  };
});
