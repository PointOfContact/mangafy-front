import { withAuthServerSideProps, withAuthComponent } from 'components/withAuth';
import uploadExample from 'features/uploadExample';
import { store } from 'store';

export default withAuthComponent(uploadExample);
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
