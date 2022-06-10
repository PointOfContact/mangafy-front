import client from 'api/client';
import { withAuthComponent, withAuthServerSideProps } from 'components/withAuth';
import Collaborations from 'features/collaborations';
import { store } from 'store';

export default withAuthComponent(Collaborations);
export const getServerSideProps = withAuthServerSideProps(async (context, user = null) => {
  try {
    const page = context.query.page || 1;
    const { search } = context.query;
    let types = context.query.types || null;
    let genres = context.query.genres || null;
    const compensationModel = context.query.compensationModel || null;
    const query = {
      $limit: 11,
      $skip: (page - 1) * 11,
      $sort: {
        createdAt: -1,
      },
      published: true,
      publishedChapters: true,
    };
    if (genres && genres.length > 0) {
      genres = Array.isArray(genres) ? genres : [genres];
      query.genresIds = { $in: genres };
    }
    if (types && types.length > 0) {
      types = Array.isArray(types) ? types : [types];
      query.searchingFor = { $in: types };
    }
    if (compensationModel) {
      query.compensationModel = compensationModel;
    }
    if (search) {
      query.$or = [
        { compensationModel: search },
        { title: search },
        { description: search },
        { story: search },
        { country: search },
        { preferredLanguage: search },
      ];
    }

    const res = await client.service('/api/v2/manga-stories').find({
      query,
    });

    const genresRes = await client.service('/api/v2/genres').find();

    return {
      props: {
        pageUrl: '/projects',
        user: user || store.user,
        search: search || '',
        genres: genresRes.data,
        selectedGenres: genres,
        selectedTypes: types,
        selectedCompensationModel: compensationModel,
        mangaStories: res.data,
        total: res.total,
        current: Math.ceil((res.skip - 1) / res.limit) + 1,
        hideCollabType: true
      }, // will be passed to the page component as props
    };
  } catch (error) {
    console.log('Error: collaboration.js', error);
    return {
      props: {
        pageUrl: '/projects',
        user: user || store.user,
      },
    };
  }
});
