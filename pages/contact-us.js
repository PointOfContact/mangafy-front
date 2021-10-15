import { withAuthServerSideProps, withAuthComponent } from 'components/withAuth';
import ContactUs from 'features/contactUs';
import { store } from 'store';

export default withAuthComponent(ContactUs);
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
      console.log('Error: contact-us.js', error);
      return { props: {} };
    }
  }
);
