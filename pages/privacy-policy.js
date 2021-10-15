import { withAuthServerSideProps, withAuthComponent } from 'components/withAuth';
import Privacy from 'features/privacy';
import { store } from 'store';

export default withAuthComponent(Privacy);
export const getServerSideProps = withAuthServerSideProps(async (context, user = store.user) => {
  try {
    return {
      props: {
        user,
      }, // will be passed to the page component as props
    };
  } catch (error) {
    return { props: {} };
  }
});
