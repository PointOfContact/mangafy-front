import { withAuthServerSideProps, withAuthComponent } from 'components/withAuth';
import pageStart from 'features/pageStart';
import { store } from 'store';

export default withAuthComponent(pageStart);
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
