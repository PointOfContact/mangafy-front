import { withAuthServerSideProps, withAuthComponent } from 'components/withAuth';
import LandingNew from 'features/typePage';
import { store } from 'store';

export default withAuthComponent(LandingNew);

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
