import client from 'api/client';
import { withAuthComponent, withAuthServerSideProps } from 'components/withAuth';
import MangaGenres from 'features/createStory/genres';

export default withAuthComponent(MangaGenres);

export const getServerSideProps = withAuthServerSideProps(async (context, user = null) => {
  try {
    const genres = await client.service('/api/v2/genres').find();
    return {
      props: {
        user,
        genres: genres.data.map((g) => ({ value: g.name, _id: g._id })),
      }, // will be passed to the page component as props
    };
  } catch (error) {
    return { props: {} };
  }
});
