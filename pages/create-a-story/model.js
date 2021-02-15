import { withAuthComponent, withAuthServerSideProps } from 'components/withAuth';
import Compensation from 'features/createStory/compensation';
import { store } from 'store';

export default withAuthComponent(Compensation);

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
