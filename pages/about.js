import { withAuthServerSideProps, withAuthComponent } from 'components/withAuth';
import About from 'features/about';
import { store } from 'store';

export default withAuthComponent(About);
export const getServerSideProps = withAuthServerSideProps(async (context, user = store.user) => {
  try {
    return {
      props: {
        user,
      }, // will be passed to the page component as props
    };
  } catch (error) {
    console.log('Error: about.js', error);
    return { props: {} };
  }
});
