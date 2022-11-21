import client from 'api/client';
import { withAuthComponent, withAuthServerSideProps } from 'components/withAuth';
import Subscribed from 'features/subscribed';
import { store } from 'store';

export default withAuthComponent(Subscribed);
export const getServerSideProps = withAuthServerSideProps(async (context, user = null) => {
  const profile = await client.service('/api/v2/users').get(context.params.pid);
  return {
    props: {
      profile,
      user: user || store.user,
    },
  };
});
