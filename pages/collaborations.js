import client from 'api/client';
import { withAuthComponent, withAuthServerSideProps } from 'components/withAuth';
import Collaborations from 'features/collaborations';
import { store } from 'store';

export default withAuthComponent(Collaborations);
export const getServerSideProps = withAuthServerSideProps(async (context, user = null) => {
  try {
    const page = context.query.page || 1;
    const { search } = context.query;
    let genres = context.query.genres || null;
    const compensationModel = context.query.compensationModel || null;
    const query = {
      $limit: 9,
      $skip: (page - 1) * 9,
      $sort: {
        createdAt: -1,
      },
      published: true,
    };
    if (genres && genres.length > 0) {
      genres = Array.isArray(genres) ? genres : [genres];
      query.genresIds = { $in: genres };
    }
    if (compensationModel) {
      query.compensationModel = compensationModel;
    }
    if (search) {
      query.$or = [
        { compensationModel: { $search: search } },
        { title: { $search: search } },
        { description: { $search: search } },
        { story: { $search: search } },
        { country: { $search: search } },
        { preferredLanguage: { $search: search } },
      ];
    }
    const res = await client.service('/api/v2/manga-stories').find({
      query,
    });
    const genresRes = await client.service('/api/v2/genres').find({
      query: {
        $limit: 100,
      },
    });
    return {
      props: {
        user: user || store.user,
        search: search || '',
        genres: genresRes.data,
        selectedGenres: genres,
        selectedCompensationModel: compensationModel,
        mangaStories: res.data,
        total: res.total,
        current: Math.ceil((res.skip - 1) / res.limit) + 1,
      }, // will be passed to the page component as props
    };
  } catch (error) {
    console.log('error', error);
    return { props: {} };
  }
});
