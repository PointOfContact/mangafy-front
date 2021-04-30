import client from 'api/client';
import { withAuthServerSideProps, withAuthComponent } from 'components/withAuth';
import Profiles from 'features/profiles';
import { store } from 'store';

export default withAuthComponent(Profiles);

export const getServerSideProps = withAuthServerSideProps(async (context, user = null) => {
  try {
    const page = context.query.page || 1;
    const { search } = context.query;
    let genres = context.query.genres || null;
    let types = context.query.types || null;
    const count = user ? 12 : 11;

    const query = {
      $limit: count,
      $skip: (page - 1) * count,
    };
    if (genres && genres.length > 0) {
      genres = Array.isArray(genres) ? genres : [genres];
      query.genresIds = { $in: genres };
    }
    if (types) {
      types = Array.isArray(types) ? types : [types];
      query.type = types;
    }
    if (search) {
      query.$or = [
        { name: { $search: search } },
        { content: { $search: search } },
        { email: { $search: search } },
      ];
    }
    const res = await client.service('/api/v2/users').find({
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
        users: res.data,
        search: search || '',
        selectedGenres: genres,
        selectedTypes: types,
        genres: genresRes.data,
        total: res.total,
        current: Math.ceil((res.skip - 1) / res.limit) + 1,
      }, // will be passed to the page component as props
    };
  } catch (error) {
    return {
      props: {},
    };
  }
});
