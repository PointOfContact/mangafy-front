import client from 'api/client';
import { withAuthServerSideProps, withAuthComponent } from 'components/withAuth';
import { store } from 'store';
import HeroesView from 'features/heroesView';

export default withAuthComponent(HeroesView);

export const getServerSideProps = withAuthServerSideProps(async (context, user = store.user) => {
  const pid = context.params.pid;
  let heroes = null;

  try {
    heroes = await client.service('/api/v2/heroes').get(pid);
  } catch (err) {
    console.log('🚀 ~ file: [pid].js ~ line 19 ~ getServerSideProps ~ err', err);
  }

  return {
    props: {
      user,
      heroes,
    },
  };
});
