import { withAuthComponent, withAuthServerSideProps } from 'components/withAuth';
import Lenguage from 'features/createStory/lenguage';
import { store } from 'store';

export default withAuthComponent(Lenguage);

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
