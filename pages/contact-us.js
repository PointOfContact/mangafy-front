import { withAuthServerSideProps, withAuthComponent } from 'components/withAuth';
import Start from 'features/contactUs';
import { store } from 'store';

export default withAuthComponent(Start);
export const getServerSideProps = withAuthServerSideProps(
  async (context, user = store.user, jwt) => {
    try {
      return {
        props: {
          user,
          jwt,
        }, // will be passed to the page component as props
      };
    } catch (error) {
      return { props: {} };
    }
  }
);
