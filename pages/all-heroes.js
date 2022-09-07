import { withAuthServerSideProps, withAuthComponent } from 'components/withAuth';
import client from 'api/client';
import AllHeroes from 'features/allHeroes';

export default AllHeroes;
export const getServerSideProps = withAuthServerSideProps(async (context, user = store.user) => {
  try {
    const res = await client.service('/api/v2/heroes').find({
      query: {
        $limit: 10000,
      },
    });

    console.log(res.data, 777);

    return {
      // props: {
      user,
      heroes: res.data,
      // }, // will be passed to the page component as props
    };
  } catch (error) {
    console.log('Error: access-denied.js', error);
    return { props: {} };
  }
});
