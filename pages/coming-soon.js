import { withAuthServerSideProps, withAuthComponent } from 'components/withAuth';
import CommingSoon from 'features/commingSoon';
import { store } from 'store';

export default withAuthComponent(CommingSoon);
export const getServerSideProps = withAuthServerSideProps(async (context, user = store.user) => {
  try {
    return {
      props: {
        user,
      }, // will be passed to the page component as props
    };
  } catch (error) {
    console.log('Error: coming-soon.js', error);
    return { props: {} };
  }
});
