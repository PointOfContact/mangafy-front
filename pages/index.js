import { withAuthServerSideProps, withAuthComponent } from 'components/withAuth';
import Landing from 'features/index';
import { store } from 'store';

export default withAuthComponent(Landing);

export const getServerSideProps = withAuthServerSideProps(async (context, user = null) => {
  try {
    return {
      props: {
        user: user || store.user,
      },
    };
  } catch (error) {
    return { props: {} };
  }
});
